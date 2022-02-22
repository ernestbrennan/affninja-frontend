Vue.component('domains', {
    template: '#domains_tpl',
    data() {
        return {
            domains: [],
            domain_info: {
                domain: null,
                entity_type: {title: 'Трафик', value: 'tds'},
                is_active: 0
            },
            domains_loading: false,
            domain_create_loading: false,
            domains_create_modal: null,
            entity_types: [
                {
                    title: 'Трафик',
                    value: 'tds'
                },
                {
                    title: 'Редирект',
                    value: 'redirect'
                },
            ]
        }
    },
    mounted() {
        this.getDomains();
        this.domains_create_modal = $('#domains-create-modal')
    },
    methods: {

        getDomains() {
            this.domains_loading = true;

            let params = {
                entity_types: ['tds', 'redirect'],
            }
            api.get('/domain.getList', {params}).then((response) => {
                this.domains = response.data.response;
                this.domains_loading = false;
            })
        },

        openCreateModal() {
            this.domains_create_modal.modal();
        },

        activateDomain(domain_id) {
            let params = {
                id: domain_id
            }
            api.post('/domain.activate', params).then((response) => {
                showMessage('success', response.data.message);

                let domain = _.find(this.domains, {id: domain_id});
                domain.is_active = 1;
            })
        },

        deactivateDomain(domain_id) {
            let params = {
                id: domain_id
            }
            api.post('/domain.deactivate', params).then((response) => {
                showMessage('success', response.data.message);

                let domain = _.find(this.domains, {id: domain_id});
                domain.is_active = 0;
            })
        },

        createDomain() {
            this.domain_create_loading = true;
            let params = {
                domain: this.domain_info.domain,
                entity_type: this.domain_info.entity_type.value,
                is_active: this.domain_info.is_active,
                type: 'system'
            }

            api.post('/domain.create', params).then(response => {
                this.domains.unshift(response.data.response);
                this.domains_create_modal.modal('hide');
                this.domain_create_loading = false;
                this.refreshDomainInfo();

                showMessage('success', response.data.message);

            }, () => {
                this.domain_create_loading = false;
            })
        },

        parseEntityType(entity_type) {
            let entity_type_title = _.find(this.entity_types, {value: entity_type});
            return entity_type_title.title;
        },

        refreshDomainInfo() {
            this.domain_info.domain = null;
            this.domain_info.entity_type = {title: 'Трафик', value: 'tds'};
            this.domain_info.is_active = 0;
        }
    }
});
