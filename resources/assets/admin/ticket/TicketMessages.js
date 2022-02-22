let vm = new Vue({
    el: '#ticket-messages',
    mixins: [ticket_mixin],
    data: {
        LANG_TICKETS: LANG_TICKETS,
        LANG_MESSAGES: LANG_MESSAGES,
        ticket: ticket,
        current_user_id: App.user.id,
        message: '',
        empty_message_error: false,
        close_ticket_btn: false,
    },

    mounted() {
        if (!this.ticket.is_read_admin) {
            this.markAsRead(this.ticket.hash);
        }
        this.$nextTick(() => {
            runTooltip();
        });

        this.close_ticket_btn = $('#close_ticket');
        if (this.ticket.status !== 'closed') {
            this.close_ticket_btn.removeClass('hidden');

            let self = this;
            this.close_ticket_btn.on('click', function () {
                self.closeTicket();
            });
        }
    },
    watch: {
        'ticket.messages'() {
            this.$nextTick(() => {
                runTooltip();
            });
        }
    },
    methods: {
        isMyMessage(message) {
            return message.user.role === 'administrator';
        },

        createMessage() {
            if (this.is_sending_message) {
                return;
            }
            if (empty(this.message)) {
                return this.empty_message_error = true;
            }

            this.is_sending_message = true;
            this.empty_message_error = false;
            let ladda = LaddaPreloader.start('#send_message_btn');

            TicketMessage.create(this.ticket.hash, this.message, ['user.profile']).then(message => {
                this.message = '';
                this.ticket.messages.unshift(message);

                this.is_sending_message = false;
                this.stopLadda(ladda);
            }, () => {
                this.is_sending_message = false;
                this.stopLadda(ladda);
            })
        },

        stopLadda(ladda) {
            this.$nextTick(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        closeTicket() {
            Swal.show(LANG_TICKETS.on_close_ticket, LANG_MESSAGES.close).then(() => {
                let ladda = LaddaPreloader.start('#close_ticket');

                Ticket.close(this.ticket.hash).then(() => {
                    this.ticket.status = 'closed';
                    this.close_ticket_btn.addClass('hidden');

                    showMessage('success', this.LANG_TICKETS.ticket_closed);
                    this.stopLadda(ladda);
                });
            }, () => {
            });
        },
    },
});