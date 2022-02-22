Vue.component('rating-mail-ru', {
    template: '#rating-mail-ru-tpl',
    data() {
        return {
            rating_mail_ru_info: {
                flow_hash: null,
                flow_widget_id: null,
                attributes: {
                    id: '',
                },
            },

            modal: null,
            action: null,
            modal_submit: false,
            loading: null,
            original_attributes: {},
            attributes_changed: false,
        }
    },

    mounted() {
        let self = this;

        this.modal = $('#rating-mail-ru-modal');

        this.modal.on('hide.bs.modal', function (event) {
            self.onCloseModal(event, self.modal);
        });

        this.modal.on('hidden.bs.modal', function () {
            self.action = null;
        });

        runPopover();
    },

    watch: {
        'rating_mail_ru_info.attributes': {
            handler() {
                this.attributes_changed = !_.isEqual(this.rating_mail_ru_info.attributes, this.original_attributes);
            },
            deep: true,
        },
    },

    methods: {
        onCloseModal(e, modal) {
            let self = this;

            if ((this.attributes_changed && !this.modal_submit) || (this.selected_pages_changed && !this.modal_submit)) {
                this.forbidHideModal(e);

                Swal.showSuccess(LANG_POSTBACKS.on_unsaved_changes, LANG_MESSAGES.save).then(() => {
                    this.attributes_changed = false;
                    modal.modal('hide');

                    switch (this.action) {
                        case 'create':
                            this.createWidget();
                            break;

                        case 'edit':
                            this.editWidget();
                            break;

                        default:
                            throw 'Unknown action';
                    }
                }, () => {
                    this.modal_submit = true;
                    this.modal.modal('hide');
                });
            }
        },

        openCreateModal(widget, flow_hash) {
            this.action = 'create';
            this.rating_mail_ru_info.flow_hash = flow_hash;
            this.rating_mail_ru_info.flow_widget_id = widget.id;
            this.rating_mail_ru_info.attributes.id = '';

            this.original_attributes = _.clone(this.rating_mail_ru_info.attributes);
            this.modal_submit = false;
            this.modal.modal();
        },

        createWidget() {
            this.modal_submit = true;
            this.loading = true;

            let params = {
                hash: this.rating_mail_ru_info.hash,
                attributes: {id: this.id},
            };

            this.$parent.createWidget(this.rating_mail_ru_info).then(response => {
                this.modal.modal('hide');
                this.attributes_changed = false;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },

        openEditModal(widget) {
            this.action = 'edit';
            this.rating_mail_ru_info.hash = widget.hash;
            _.assign(this.rating_mail_ru_info.attributes, widget.attributes_array);

            this.original_attributes = _.clone(this.rating_mail_ru_info.attributes);
            this.modal_submit = false;
            this.modal.modal();
        },

        editWidget() {
            this.modal_submit = true;
            this.loading = true;

            let params = {
                hash: this.rating_mail_ru_info.hash,
                attributes: this.rating_mail_ru_info.attributes,
            };

            this.$parent.editWidget(params).then(response => {
                this.modal.modal('hide');
                this.attributes_changed = false;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },

        forbidHideModal(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        },
    }
});
