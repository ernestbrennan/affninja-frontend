Vue.component('yandex-metrika', {
    template: '#yandex_metrika_component',
    data() {
        return {
            yandex_metrika_modal: null,
            yandex_metrika_info: {
                flow_hash: null,
                flow_widget_id: null,
                attributes: {
                    id: '',
                    webvisor: 0,
                },
            },
            original_attributes: {},
            action: null,
            attributes_changed: false,
            modal_submit: false,
        }
    },

    mounted() {
        let self = this;

        this.yandex_metrika_modal = $('#yandex_metrika_modal');

        this.yandex_metrika_modal.on('hide.bs.modal', function (event) {
            self.onCloseModal(event, self.yandex_metrika_modal);
        });

        this.yandex_metrika_modal.on('hidden.bs.modal', function () {
            self.action = null;
        });
        runPopover();
    },

    watch: {
        'yandex_metrika_info.attributes': {
            handler() {
                this.attributes_changed = !_.isEqual(this.yandex_metrika_info.attributes, this.original_attributes);
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
                    this.yandex_metrika_modal.modal('hide');
                });
            }
        },

        openCreateModal(widget, flow_hash) {
            this.action = 'create';
            this.yandex_metrika_info.flow_hash = flow_hash;
            this.yandex_metrika_info.flow_widget_id = widget.id;
            this.yandex_metrika_info.attributes.id = '';
            this.yandex_metrika_info.attributes.webvisor = 0;

            this.original_attributes = _.clone(this.yandex_metrika_info.attributes);
            this.modal_submit = false;
            this.yandex_metrika_modal.modal();
        },

        createWidget() {
            this.modal_submit = true;

            let ladda_handler = LaddaPreloader.start('#create_flow_widget');

            this.$parent.createWidget(this.yandex_metrika_info).then(() => {
                LaddaPreloader.stop(ladda_handler);

                this.yandex_metrika_modal.modal('hide');
                this.attributes_changed = false;
            }).catch(() => {
                LaddaPreloader.stop(ladda_handler);
            });
        },

        openEditModal(widget) {
            this.action = 'edit';
            this.yandex_metrika_info.hash = widget.hash;
            _.assign(this.yandex_metrika_info.attributes, widget.attributes_array);

            this.original_attributes = _.clone(this.yandex_metrika_info.attributes);
            this.modal_submit = false;
            this.yandex_metrika_modal.modal();
        },

        editWidget() {
            this.modal_submit = true;

            let ladda_handler = LaddaPreloader.start('#edit_flow_widget'),
                params = {
                    hash: this.yandex_metrika_info.hash,
                    attributes: this.yandex_metrika_info.attributes,
                };

            this.$parent.editWidget(params).then(response => {
                LaddaPreloader.stop(ladda_handler);

                this.yandex_metrika_modal.modal('hide');
                this.attributes_changed = false;
            }).catch(() => {
                LaddaPreloader.stop(ladda_handler);
            });
        },

        forbidHideModal(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        },
    }
});
