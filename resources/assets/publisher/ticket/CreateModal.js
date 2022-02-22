Vue.component('create-ticket-modal', {
    template: '#create-ticket-modal-tpl',
    data() {
        return {
            LANG_TICKETS: LANG_TICKETS,
            modal: null,
            title: '',
            error_title: false,
            message: '',
            error_message: false,
            on_create_relations: [],
        }
    },

    mounted() {
        this.modal = $('#create-ticket-modal');
    },

    methods: {

        openModal(on_create_relations) {
            this.on_create_relations = on_create_relations;
            this.modal.modal();
        },

        createTicket() {
            if (this.formHasErrors()) {
                return;
            }

            let ladda = LaddaPreloader.start('#create_ticket_btn');

            Ticket.create(this.title, this.message, this.on_create_relations).then(ticket => {
                this.$emit('created', ticket);
                this.title = '';
                this.message = '';

                this.modal.modal('hide');
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        formHasErrors() {
            let has_errors = false;

            // Validate title
            if (empty(this.title)) {
                this.error_title = true;
                has_errors = true;
            } else {
                this.error_title = false;
            }

            // Validate message
            if (empty(this.message)) {
                this.error_message = true;
                has_errors = true;
            } else {
                this.error_message = false;
            }

            return has_errors;

        }
    },
});