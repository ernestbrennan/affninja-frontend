Vue.component('custom-html', {
    template: '#custom_html_component',
    data: function () {
        return {
            custom_html_modal: null,
            custom_html_info: {
                flow_hash: null,
                flow_widget_id: null,
                attributes: {
                    TransitCode: '',
                    LandingCode: '',
                    SuccessCode: '',
                    CorrectCode: '',
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

        this.custom_html_modal = $('#custom_html_modal');

        this.custom_html_modal.on('hide.bs.modal', function (e) {
            self.onCloseModal(e, self.custom_html_modal);
        });

        this.custom_html_modal.on('hidden.bs.modal', function () {
            self.action = null;
        });

        this.$nextTick(() => {
            runPopover();
        });
    },

    watch: {
        'custom_html_info.attributes': {
            handler: function () {
                this.attributes_changed = !_.isEqual(this.custom_html_info.attributes, this.original_attributes);
            },
            deep: true,
        },
    },

    methods: {
        onCloseModal(e, modal) {
            if ((this.attributes_changed && !this.modal_submit) ||
                (this.selected_pages_changed && !this.modal_submit)) {
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
                    this.custom_html_modal.modal('hide');
                });
            }
        },

        openCreateModal(widget, flow_hash) {
            this.action = 'create';
            this.custom_html_info.flow_hash = flow_hash;
            this.custom_html_info.flow_widget_id = widget.id;
            this.custom_html_info.attributes.TransitCode = '';
            this.custom_html_info.attributes.LandingCode = '';
            this.custom_html_info.attributes.SuccessCode = '';
            this.custom_html_info.attributes.CorrectCode = '';

            this.original_attributes = _.clone(this.custom_html_info.attributes);
            this.modal_submit = false;
            this.custom_html_modal.modal();
        },

        createWidget() {
            this.modal_submit = true;

            let ladda_handler = LaddaPreloader.start('#create_flow_widget');

            this.$parent.createWidget(this.custom_html_info).then(() => {
                LaddaPreloader.stop(ladda_handler);

                this.custom_html_modal.modal('hide');
                this.attributes_changed = false;
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        openEditModal(widget) {
            this.action = 'edit';
            this.custom_html_info.hash = widget.hash;
            _.assign(this.custom_html_info.attributes, widget.attributes_array);

            this.original_attributes = _.clone(this.custom_html_info.attributes);
            this.modal_submit = false;
            this.custom_html_modal.modal();
        },

        editWidget() {
            this.modal_submit = true;

            let ladda_handler = LaddaPreloader.start('#edit_flow_widget'),
                params = {
                    hash: this.custom_html_info.hash,
                    attributes: this.custom_html_info.attributes,
                };

            this.$parent.editWidget(params).then(response => {
                LaddaPreloader.stop(ladda_handler);

                this.custom_html_modal.modal('hide');
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
