Vue.component('widget-modal', {
    template: '#widget-modal-tpl',
    data() {
        return {
            widget_info: {
                flow_hash: null,
                flow_widget_id: null,
                attributes: {
                    id: '',
                },
            },

            title: '',
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

        this.modal = $('#widget-modal');

        this.modal.on('hide.bs.modal', function (event) {
            self.onCloseModal(event, self.modal);
        });

        this.modal.on('hidden.bs.modal', function () {
            self.action = null;
        });

        runPopover();
    },

    watch: {
        'widget_info.attributes': {
            handler() {
                this.attributes_changed = !_.isEqual(this.widget_info.attributes, this.original_attributes);
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

        openCreateModal(widget, flow_hash, title) {
            this.action = 'create';
            this.title = title;

            this.widget_info.flow_hash = flow_hash;
            this.widget_info.flow_widget_id = widget.id;
            this.widget_info.attributes.id = '';

            this.original_attributes = _.clone(this.widget_info.attributes);
            this.modal_submit = false;
            this.modal.modal();
        },

        createWidget() {
            this.modal_submit = true;
            this.loading = true;

            let params = {
                hash: this.widget_info.hash,
                attributes: {id: this.id},
            };

            this.$parent.createWidget(this.widget_info).then(response => {
                this.modal.modal('hide');
                this.attributes_changed = false;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },

        openEditModal(widget, title) {
            this.action = 'edit';
            this.title = title;

            this.widget_info.hash = widget.hash;
            _.assign(this.widget_info.attributes, widget.attributes_array);

            this.original_attributes = _.clone(this.widget_info.attributes);
            this.modal_submit = false;
            this.modal.modal();
        },

        editWidget() {
            this.modal_submit = true;
            this.loading = true;

            let params = {
                hash: this.widget_info.hash,
                attributes: this.widget_info.attributes,
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
