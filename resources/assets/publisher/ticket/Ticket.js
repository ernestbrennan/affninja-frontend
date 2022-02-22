let vm = new Vue({
    el: '#tickets',
    data: {
        LANG_TICKETS: LANG_TICKETS,
        LANG_MESSAGES: LANG_MESSAGES,
        tickets: [],
        modal: null,
    },

    mounted() {
        this.getTickets();

        this.modal = $('#create_ticket_modal');
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

            Ticket.getList(['last_message_user.profile']).then(tickets => {
                this.tickets = tickets;

                this.$nextTick(() => {
                    ContentPreloader.hide();
                });
            });
        },

        openCreateTicketModal() {
            this.$refs.create_ticket_modal.openModal(['last_message_user.profile']);
        },

        onCreated(ticket) {
            this.tickets.unshift(ticket);
        },
    },
});
