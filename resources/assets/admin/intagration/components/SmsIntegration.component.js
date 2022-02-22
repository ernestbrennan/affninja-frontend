Vue.component('sms_integrations', {
    template: '#sms_integrations_tpl',
    props: ['offer_info', 'offer_sms_integration'],
    data() {
        return {
            integrations: [],
            integration_info: {},
            show_settings_form: false,
            sms_integration_exists: false,
            action: null,
            integration_settings_modal: null,
        }
    },

    mounted() {
        this.integration_settings_modal = $('#sms_integration_settings_modal');
    },

    watch: {
        "offer_sms_integration"() {
            if (this.offer_sms_integration !== null && Object.keys(this.offer_sms_integration).length > 0) {
                this.show_settings_form = true;
                this.show_edit_btn = true;
                this.sms_integration_exists = true;
                this.integration_info = _.pick(this.integrations[index], _.keys(this.integrations[index]));
            }
        },
        "offer_info"() {
            this.integration_info.offer_id = this.offer_info.id;
        }
    },

    methods: {

        getIntegrations() {
            ContentPreloader.show('#sms_integrations_wrap');

            api.get('/sms_integration.getList').then(response => {
                    this.integrations = response.data.response;

                    Vue.nextTick(function () {
                        ContentPreloader.hide();
                    });
                }
            );
        },

        openCreateModal() {
            this.action = 'create';
            this.refreshIntegrationInfo();
            this.integration_settings_modal.modal();
        },


        createIntegration() {
            var self = this,
                params = this.integration_info,
                ladda_handler = LaddaPreloader.start('#create_sms_integration_submit');

            api.post('/sms_integration.create', params).then(response => {
                self.integrations.unshift(response.data.response);
                self.integration_settings_modal.modal('hide');
                self.integration_info = {};

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda_handler);

            }, () => {
                LaddaPreloader.stop(ladda_handler);
            });
        },
        openEditModal(index) {
            this.action = 'edit';
            this.integration_info = _.pick(this.integrations[index], _.keys(this.integrations[index]));
            this.integration_settings_modal.modal();
        },


        editIntegration() {
            var self = this,
                params = this.integration_info,
                ladda_handler = LaddaPreloader.start('#edit_sms_integration_submit');

            api.post('/sms_integration.edit', params).then(response => {

                self.integration_settings_modal.modal('hide');
                self.integration_info = {};
                var index = _.findIndex(self.integrations, function (o) {
                    return o.id === params.id;
                });
                _.assign(self.integrations[index], response.data.response);

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda_handler);

            }, () => {
                LaddaPreloader.stop(ladda_handler);
            });
        },

        deleteIntegration(id, index) {
            Swal.show(LANG_INTEGRATIONS.on_delete_msg).then(() => {
                api.post('/sms_integration.delete', {id: id}).then(response => {
                    this.integrations.splice(index, 1);
                    this.integration_settings_modal.modal('hide');

                    showMessage('success', response.data.message);
                });
            }, () => {});
        },

        refreshIntegrationInfo() {
            this.integration_info = {
                title: '',
                extra: '{}',
                is_active: 1,
                info: '',
            };
        },
    }
});
