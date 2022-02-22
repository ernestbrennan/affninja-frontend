Vue.component('defer-ticket-modal', {
    template: '#defer-ticket-modal-tpl',
    data() {
        return {
            LANG_TICKETS: LANG_TICKETS,
            ticket: {},
            modal: null,
            deferred_until_at: null,
        }
    },

    mounted() {
        this.modal = $('#defer-ticket-modal');
    },

    methods: {

        openModal(ticket) {
            if (typeof ticket === 'undefined') {
                throw 'Specify ticket to defer!';
            }

            this.ticket = ticket;

            let deferred_until_at = DATE_TIME_TO_DEFAULT;

            if (!is_null(ticket.deferred_until_at)) {
                deferred_until_at = ticket.deferred_until_at;
            }

            this.deferred_until_at = deferred_until_at;

            this.modal.modal();
        },

        deferTicket() {
            if (_.get(this.ticket.responsible_user, 'id') === undefined) {
                return;
            }

            let ladda = LaddaPreloader.start('#defer_ticket_btn');

            Ticket.defer(
                this.ticket.hash,
                this.ticket.responsible_user.id,
                this.deferred_until_at,
            )
                .then(ticket => {

                    this.$emit('deffered', ticket);

                    this.modal.modal('hide');
                    LaddaPreloader.stop(ladda);
                }, () => {
                    LaddaPreloader.stop(ladda);
                });
        },
    },
});