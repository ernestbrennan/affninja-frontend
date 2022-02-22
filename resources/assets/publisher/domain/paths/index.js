new Vue({
    el: '#paths',
    data: {
        domain_info: DOMAIN_INFO,
        lang_messages: LANG_MESSAGES,
        lang_domains: LANG_DOMAINS,
        flows: [],
        path_info: {
            path: '',
            status: 'moneypage',
            is_cache_result: 0,
            data_parameter: 'data1',
            identifiers: '',
            attributes: {},
        },
        paths: [],
        action: 'edit',
        settings_modal: null,
        modal_select2: null,
        index: null,
    },

    created() {
        this.getFlows();
    },

    mounted() {
        this.settings_modal = $('#settings_modal');

        this.getPaths();
    },

    watch: {
        'paths'() {
            this.$nextTick(() => {
                runTooltip();
                ContentPreloader.hide();
            })
        },
        'flows'() {
            this.$nextTick(() => {
                this.select2OnFlows();
            });
        },
    },

    methods: {
        getPaths() {
            ContentPreloader.show('#paths-list');

            let params = {
                domain_hash: this.domain_info.hash,
                with: ['flow', 'cloak']
            };

            api.get('/cloak_domain_paths.getList', {params: params}).then(response => {
                this.paths = response.data.response;
            });
        },

        getFlows() {
            api.get('/flow.getList').then(response => {
                this.flows = response.data.response;
            });
        },

        select2OnFlows() {
            if (!this.flows.length) {
                return;
            }

            let select_el = $('#flows'),
                selected_value = select_el.data('value'),
                options = '';

            this.flows.forEach(function (flow) {
                options += '<option value="' + flow.hash + '" '
                    + (flow.hash === selected_value ? ' selected' : '')
                    + ' data-offer_hash="' + flow.hash + '">'
                    + flow.title + '</option>';
            });

            select_el.html(options);

            this.modal_select2 = initSelect2Single('#flows')
                .change()
                .closest('#flows_wrap').show();

            this.path_info.flow_hash = select_el.val();
        },

        openSettingsModal(action, path) {
            this.action = action;

            let flows_el = $('#flows');

            switch (action) {
                case 'create':
                    flows_el.val(this.flows[0]['hash']).trigger("change");
                    this.path_info = {
                        path: '',
                        status: 'moneypage',
                        cloak_system_id: 2,
                        is_cache_result: 0,
                        data_parameter: 'data1',
                        identifiers: '',
                        attributes: {
                            api_key: '',
                            campaign_id: '',
                        }
                    };
                    break;

                case 'edit':
                    this.path_info = {
                        path: path.path,
                        status: path.status,
                        hash: path.hash,
                        cloak_system_id: path.cloak.cloak_system_id,
                        is_cache_result: path.cloak.is_cache_result,
                        data_parameter: path.data_parameter,
                        identifiers: path.identifiers,
                        attributes: path.cloak.attributes_array
                    };
                    flows_el.val(path.flow.hash).trigger("change");
                    break;
            }

            this.settings_modal.modal();
        },

        createPath() {
            let ladda = LaddaPreloader.start('#create_path'),
                params = this.path_info;

            params.flow_hash = $('#flows').val();
            params.domain_hash = this.domain_info.hash;

            api.post('/cloak_domain_paths.create', params).then(response => {
                this.paths.unshift(response.data.response);
                this.settings_modal.modal('hide');

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        editPath() {
            let ladda = LaddaPreloader.start('#edit_path'),
                params = this.path_info;

            params.flow_hash = $('#flows').val();
            params.domain_hash = this.domain_info.hash;

            api.post('/cloak_domain_paths.edit', params).then(response => {
                let index = _.findIndex(this.paths, {hash: response.data.response.hash});

                this.paths.splice(index, 1, response.data.response);

                this.settings_modal.modal('hide');
                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        removePath(path) {
            Swal.show(this.lang_domains.on_remove_page).then(() => {
                api.delete('/cloak_domain_paths.delete', {params: {hash: path.hash}})
                    .then(response => {
                        let index = _.findIndex(this.paths, {hash: path.hash});
                        this.paths.splice(index, 1);

                        showMessage('success', response.data.message);
                        removeTooltipDiv();
                    })
                    .catch(error => {
                        showMessage('error', response.data.message);
                        removeTooltipDiv();
                    });
            });
        },

        cleanAttributes() {
            this.path_info.attributes = {};
        },
    },
});