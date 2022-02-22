let vm = new Vue({
    el: '#tickets',
    data: {
        LANG_TICKETS: LANG_TICKETS,
        LANG_MESSAGES: LANG_MESSAGES,
        tickets: [],
        selected_tickets: [],
    },

    mounted() {
        this.getTickets();
    },
    watch: {
        'tickets'() {
            this.$nextTick(() => {
                runTooltip();
            });
        }
    },
    methods: {
        getTickets() {
            ContentPreloader.show('#tickets');

            Ticket.getList(['user.group', 'last_message_user.profile', 'responsible_user']).then(tickets => {
                this.tickets = tickets;

                this.$nextTick(() => {
                    ContentPreloader.hide();
                });
            });
        },

        closeTicket(ticket) {
            Swal.show(LANG_TICKETS.on_close_ticket, LANG_MESSAGES.close).then(() => {
                Ticket.close(ticket.hash).then(() => {
                    ticket.status = 'closed';
                });
            }, () => {
            });
        },

        openTicket(ticket) {
            Swal.show(LANG_TICKETS.on_open_ticket, LANG_MESSAGES.open).then(() => {
                Ticket.open(ticket.hash).then(upd_ticket => {
                    ticket.status = upd_ticket.status;
                });
            }, () => {
            });
        },

        openDeferTicketModal(ticket) {
            this.$refs.defer_ticket_modal.openModal(ticket);
        },

        onDeffered(ticket) {
            let index = _.findIndex(this.tickets, {id: ticket.id});
            this.tickets[index].responsible_user = ticket.responsible_user;
            this.tickets[index].responsible_user_id = ticket.responsible_user_id;
            this.tickets[index].deferred_until_at = ticket.deferred_until_at;
        }
    },
});
