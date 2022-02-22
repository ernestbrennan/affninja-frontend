new Vue({
    el: '#domains',
    data: {
        LANG_MESSAGES: LANG_MESSAGES,
        LANG_DOMAINS: LANG_DOMAINS,
        USER_PERMISSIONS: USER_PERMISSIONS,
        CDN_HOST: CDN_HOST,
        domains: [],
        flows: [],
        is_cloaking_enabled: null,
        settings_modal: null,
        action: null,
        is_new_cloaking: 0,
        domain: {
            donor_url: '',
            fallback_flow_hash: null,
            domain: '',
            is_public: 1,
            type: 'parked',
            entity_type: 'flow',
        },
        availability: [
            {title: LANG_DOMAINS.all_flows, value: 1},
            {title: LANG_DOMAINS.selected_flows, value: 0},
        ],
        selected_availability: {},
        selected_flow: {},
        domains_loading: false,
        flows_loading: false,
        replace_modal: null,
        replacements_info: {
            cloak_domain_path_hash: '',
            replacements: [],

        },
        original_replacements: [],
        replacements_changed: false,
        pending_refresh_replacements: false,
    },

    components: {
        'multiselect': window.VueMultiselect.default
    },

    computed: {
        loading() {
            return this.domains_loading || this.flows_loading;
        },
    },

    created() {
        this.is_cloaking_enabled = in_array('CLOAKING', USER_PERMISSIONS);
        this.getFlowsForModal();
    },

    mounted() {
        this.getDomains();
        this.settings_modal = $('#settings-domain-modal');
        this.replace_modal = $('#replace_modal');

        let self = this;
        $(this.replace_modal).on('hide.bs.modal', function (event) {
            self.onCloseReplacementsModal(event, self.replace_modal);
        });
    },

    watch: {
        'is_new_cloaking'() {
            if (!this.is_new_cloaking) {
                this.domain.donor_url = '';
            }
        },
        'selected_availability.value'(value) {
            this.domain.is_public = value;
        },
        'selected_flow'() {
            if (!Object.size(this.selected_flow)) {
                return;
            }

            this.domain.fallback_flow_hash = this.selected_flow.hash;
        },
        'loading'() {
            if (this.loading) {
                return ContentPreloader.show('#domains-list-wrap');
            }

            ContentPreloader.hide();
        },
        'replacements_info.replacements'() {
            this.replacements_changed = !_.isEqual(this.replacements_info.replacements, this.original_replacements);
        }
    },

    methods: {
        openLinkModal(domain) {
            this.$refs.link_modal.openForDomains(domain);
        },

        openCreateDomainModal() {
            this.action = 'create';

            this.is_new_cloaking = 0;

            this.domain = {
                donor_url: '',
                fallback_flow_hash: null,
                domain: '',
                is_public: 1,
                type: 'parked',
                entity_type: 'flow',
            };

            this.selected_flow = {};
            this.selected_availability = {};

            this.settings_modal.modal();
        },

        createDomain() {
            let params = _.clone(this.domain),
                ladda = LaddaPreloader.start('#create_domain_submit');

            if (is_null(params.fallback_flow_hash)) {
                delete params.fallback_flow_hash;
            }

            if (this.is_new_cloaking) {
                params = _.omit(params, ['fallback_flow_hash']);
            }

            api.post('/domain.create', params).then(response => {
                this.domains.unshift(response.data.response);

                LaddaPreloader.stop(ladda);
                showMessage('success', response.data.message);
                this.settings_modal.modal('hide');
            }, error => {
                LaddaPreloader.stop(ladda);
            });
        },

        openEditDomainModal(domain) {
            this.action = 'edit';

            this.domain = {
                donor_url: domain.donor_url,
                fallback_flow_hash: _.get(domain, 'flow.hash', null),
                domain: domain.domain,
                domain_hash: domain.hash,
                is_public: domain.is_public,
                type: 'parked',
                entity_type: 'flow',
            };

            if (domain.donor_url.length) {
                this.is_new_cloaking = 1;
            } else {
                this.is_new_cloaking = 0;
            }

            this.selected_flow = _.find(this.flows, {hash: this.domain.fallback_flow_hash});
            this.selected_availability = _.find(this.availability, {value: this.domain.is_public});

            this.settings_modal.modal();
        },

        editDomain() {
            let params = _.clone(this.domain),
                ladda = LaddaPreloader.start('#edit_domain_submit');

            if (is_null(params.fallback_flow_hash)) {
                delete params.fallback_flow_hash;
            }

            if (this.is_new_cloaking) {
                params = _.omit(params, ['fallback_flow_hash', 'is_public']);
            }

            api.post('/domain.edit', params).then(response => {
                let index = _.findIndex(this.domains, {hash: response.data.response.hash});
                this.domains.splice(index, 1, response.data.response);

                LaddaPreloader.stop(ladda);
                showMessage('success', response.data.message);
                this.settings_modal.modal('hide');
            }, error => {
                LaddaPreloader.stop(ladda);
            });
        },

        deleteDomain(domain_hash) {
            Swal.show(LANG_DOMAINS.on_delete_msg).then(() => {

                api.post('/domain.delete', {domain_hash: domain_hash})
                    .then(response => {
                        let index = _.findIndex(this.domains, {hash: domain_hash});
                        this.domains.splice(index, 1);

                        showMessage('success', response.data.message);
                    })
                    .catch(error => {
                        showMessage('error', error.message);
                    });
            }, () => {
            });
        },

        getDomains() {
            this.domains_loading = true;

            let params = {
                with_system: 0,
                with: ['flow', 'paths', 'replacements'],
                entity_types: ['flow'],
            };

            api.get('/domain.getList', {params: params}).then(response => {
                this.domains = response.data.response;

                showMessage('success', response.data.message);
                this.domains_loading = false;
            }, error => {
                showMessage('error', error.message);
                this.domains_loading = false;
            });
        },

        getFlowsForModal() {
            this.flows_loading = true;

            api.get('/flow.getList', {params: {with: ['offer']}}).then(response => {
                this.flows = response.data.response;
                this.flows_loading = false;
            });
        },

        openReplacementsModal(domain) {
            if (this.pending_refresh_replacements) {
                return;
            }

            this.replacements_info.domain_hash = domain.hash;
            let params = {
                domain_hash: this.replacements_info.domain_hash
            };

            this.replacements_info.replacements = domain.replacements.map(replacement => {
                return {
                    from: replacement.from,
                    to: replacement.to
                }
            });

            this.original_replacements = _.clone(this.replacements_info.replacements);

            this.replace_modal.modal();
        },

        onCloseReplacementsModal(e, modal) {
            if (!this.replacements_changed) {
                return;
            }

            e.preventDefault();
            e.stopImmediatePropagation();

            Swal.showSuccess(LANG_MESSAGES.on_unsaved_changes, LANG_MESSAGES.save).then(() => {
                modal.modal('hide');

                this.saveReplacements();

            }, () => {

            });
        },

        saveReplacements() {
            let ladda = LaddaPreloader.start('#replacements-save');

            this.replacements_info.replacements = this.rejectEmptyReplacements(this.replacements_info.replacements);

            api.post('/domain_replacements.sync', this.replacements_info).then(response => {

                this.replacements_changed = false;

                this.refreshDomainReplacements(this.replacements_info.domain_hash);

                this.replace_modal.modal('hide');
                showMessage('success', response.data.message);

                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        refreshDomainReplacements(domain_hash) {
            this.pending_refresh_replacements = true;

            this.getReplacements(domain_hash).then(replacements => {
                let domain = _.find(this.domains, {hash: domain_hash});
                domain.replacements.splice(0);
                replacements.forEach(replacement => {
                    domain.replacements.push(replacement);
                })
                this.pending_refresh_replacements = false;
            });
        },

        getReplacements(domain_hash) {
            return new Promise((resolve, reject) => {
                api
                    .get('/domain_replacements.getList', {params: {domain_hash: domain_hash}})
                    .then(response => resolve(response.data.response))
            });
        },

        rejectEmptyReplacements(replacements) {
            return replacements.filter(replacement => replacement.from.length);
        },

        addReplacement() {
            this.replacements_info.replacements.push({from: '', to: ''});
        },

        deleteReplacementItem(index) {
            this.replacements_info.replacements.splice(index, 1);
        },

        clearCache(domain) {
            api.post('/domain.clearCache', {hash: domain.hash}).then(response => {
                showMessage('success', response.data.message);
            });
        }
    },
});