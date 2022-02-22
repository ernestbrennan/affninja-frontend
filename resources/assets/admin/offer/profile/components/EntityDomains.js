Vue.component('entity-domains', {
    template: '#entity_domains_modal_tpl',
    data: function () {
        return {
            action: 'create',
            entity_info: false,
            domain_info: {
                domain: '',
                is_subdomain: '',
            },
            domains_modal: null,
        }
    },

    mounted: function () {
        this.entity_domains_modal = $('#entity_domains_modal');
    },

    watch: {
        'entity_info.domains': function () {
            Vue.nextTick(function () {
                runTooltip();
            });
        },
    },

    methods: {

        openModal: function (entity, entity_type) {

            // Reject user parked domains
            entity.domains = _.reject(entity.domains, function(o) { return o.user_id > 0; });

            this.entity_info = entity;
            this.entity_type = entity_type;

            this.domain_info = {
                domain: '',
                is_subdomain: 0,
            };
            this.entity_domains_modal.modal();
        },

        createDomain: function () {
            let self = this,
                params = this.domain_info,
                ladda_handler = LaddaPreloader.start('#create_domain_btn');

            params.type = 'custom';
            params.entity_type = this.entity_type;
            params.entity_hash = this.entity_info.hash;

            api.post('/domain.create', params).then(response => {

                self.domain_info.domain = '';
                self.domain_info.is_subdomain = 0;

                switch (self.entity_type) {
                    case 'transit':
                        vm.transitDomainCreated(response.data.response);
                        break;
                    case 'landing':
                        vm.landingDomainCreated(response.data.response);
                        break;
                }

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda_handler);

            }, error => {
                LaddaPreloader.stop(ladda_handler);
            });
        },

        prepareEditDomain(domain) {
            this.action = 'edit';
            this.domain_info = {
                domain_hash: domain.hash,
                domain: domain.domain,
                is_subdomain: domain.is_subdomain,
                type: 'custom',
                entity_type: this.entity_type,
                entity_hash: this.entity_info.hash
            };
        },

        editDomain: function () {
            let self = this,
                params = this.domain_info,
                ladda_handler = LaddaPreloader.start('#edit_domain_btn');

            api.post('/domain.edit', params).then(response => {

                self.domain_info.domain = '';
                self.domain_info.is_subdomain = 0;
                this.action = 'create';

                switch (self.entity_type) {
                    case 'transit':
                        vm.transitDomainEdited(response.data.response);
                        break;
                    case 'landing':
                        vm.landingDomainEdited(response.data.response);
                        break;
                }

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda_handler);

            }, error => {
                LaddaPreloader.stop(ladda_handler);
            });
        },

        deleteDomain: function (domain) {
            var self = this,
                params = {domain_hash: domain.hash};

            Swal.show(LANG_DOMAINS.on_delete_msg).then(() => {
                api.post('/domain.delete', params).then(response => {

                    switch (self.entity_type) {
                        case 'transit':
                            vm.transitDomainDeleted(domain.entity_id, domain.hash);
                            break;
                        case 'landing':
                            vm.landingDomainDeleted(domain.entity_id, domain.hash);
                            break;
                    }

                    showMessage('success', response.data.message);

                });
            }, () => {

            });
        },
    }
});
