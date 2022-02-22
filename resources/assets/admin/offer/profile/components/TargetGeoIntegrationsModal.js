Vue.component('target-geo-integrations-modal', {
    template: '#target-geo-integration-tpl',
    props: {
        offer_title: {
            required: true,
            type: String,
        },
    },

    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_OFFERS: LANG_OFFERS,

            api_integration_domain: '',
            api_integration: {
                title: 'SPS (Postback)',
                type: 'api',
                code: `{domain}/lead/create?clickid={clickid}`,
            },

            redirect_integrations: [{
                title: 'Image',
                type: 'image',
                code: `<!--Offer Conversion: {offer_title} -->
<img src="{domain}/lead/create" height="1" width="1" alt="" />
<!-- End Offer Conversion -->`,
            }, {
                title: 'Iframe',
                type: 'iframe',
                code: `<!--Offer Conversion: {offer_title} -->
<iframe src="{domain}/lead/create" height="1" width="1" />
<!-- End Offer Conversion -->`,
            }],
            selected_redirect_integration_type: {},
            redirect_integration_domain: '',
            selected_integration: null,

            modal: null,
            action: null,
            target_geo: null,

            currencies: [],
            selected_currency: {},
            currencies_loading: false,

            integration_info: {},
            advertiser_hash: null,

            integration_types: [{
                value: 'api',
                title: 'API',
            }, {
                value: 'redirect',
                title: 'Redirect',
            }],
            selected_integration_type: {},
            integration_saving: false,
        };
    },

    created() {
        this.selected_redirect_integration_type = this.redirect_integrations[0];

        this.getRedirectDomain();
        this.getApiDomain();

        bus.$on('open-integrations-modal', target_geo => {

            this.initComponentState(target_geo);

            if (target_geo.integration !== null) {
                this.updateStateWithSavedIntegration(target_geo.integration);
            }

            this.openModal();
        });
    },

    mounted() {
        initClipboard();
        runPopover(false);
        fixPopoverBehavior();

        this.modal = $('#integrations-modal');
    },

    watch: {
        'currencies'() {
            if (!this.currencies.length) {
                return;
            }

            if (is_null(this.integration_info.currency_id)) {
                return this.selected_currency = this.currencies[0];
            }

            let selected_currency = _.find(this.currencies, {id: this.integration_info.currency_id});

            if (selected_currency === undefined) {
                return this.selected_currency = this.currencies[0];
            }
            return this.selected_currency = selected_currency;
        },

        'selected_currency'(selected) {
            this.integration_info.currency_id = _.get(selected, 'id') || 0;
        },

        'selected_integration_type'(selected) {
            this.integration_info.integration_type = _.get(selected, 'value') || this.integration_types[0].value;
        },

        'integration_info.advertiser_id'(advertiser_id) {
            if (advertiser_id === undefined || empty(advertiser_id)) {
                return;
            }
            this.getAdvertiserAccounts(advertiser_id);
        },
    },

    methods: {
        openModal() {
            this.modal.modal();
        },

        createIntegration() {
            this.integration_saving = true;

            api.post('/target_geo_integrations.create', this.integration_info).then(response => {
                this.integration_saving = false;
                this.$emit('integration-updated', response.data.response);

                this.modal.modal('hide');
                showMessage('success', response.data.message);

            }, () => {
                this.integration_saving = false;
            });
        },

        editIntegration() {
            this.integration_saving = true;

            api.post('/target_geo_integrations.edit', this.integration_info).then(response => {
                this.integration_saving = false;
                this.$emit('integration-updated', response.data.response);

                this.modal.modal('hide');
                showMessage('success', response.data.message);
            }, () => {
                this.integration_saving = false;
            });
        },

        getRedirectDomain() {
            api.get('/domain.getRedirectDomain').then((response) => {
                if (_.get(response.data.response, 'host') === undefined) {
                    throw 'Redirect domains do not exist.';
                }

                let domain = response.data.response.host;

                let image_integration = _.find(this.redirect_integrations, {type: 'image'});
                image_integration.code = this.replaceDomainMacro(image_integration.code, domain);
                image_integration.code = this.replaceOfferTitleMacro(image_integration.code, this.offer_title);

                let iframe_integration = _.find(this.redirect_integrations, {type: 'iframe'});
                iframe_integration.code = this.replaceDomainMacro(iframe_integration.code, domain);
                iframe_integration.code = this.replaceOfferTitleMacro(iframe_integration.code, this.offer_title);
            });
        },

        getApiDomain() {
            api.get('/domain.getList', {params: {entity_types: ['tds']}}).then((response) => {
                if (_.get(response.data.response[0], 'host') === undefined) {
                    throw 'Api domains do not exist.';
                }
                let domain = response.data.response[0].host;

                this.api_integration.code = this.replaceDomainMacro(this.api_integration.code, domain);
            });
        },

        replaceDomainMacro(html, domain) {
            return html.replace('{domain}', domain);
        },

        replaceOfferTitleMacro(html, offer_title) {
            return html.replace('{offer_title}', offer_title);
        },

        onAdvertiserUpdated(advertiser) {
            this.integration_info.advertiser_id = _.get(advertiser, 'id') || 0;
        },

        getAdvertiserAccounts(advertiser_id) {
            this.currencies_loading = true;

            Account.getList(advertiser_id, ['currency']).then(accounts => {
                this.currencies = _.uniq(_.map(accounts, 'currency'));
                this.currencies_loading = false;
            })
        },

        initComponentState(target_geo) {
            this.target_geo = target_geo;
            this.currencies.splice(0);

            this.integration_info = {
                advertiser_id: 0,
                target_geo_id: target_geo.id,
                currency_id: null,
                charge: 0,
                integration_type: 'api',
            };

            this.advertiser_hash = null;
            this.selected_integration_type = this.integration_types[0];
            this.action = 'create';
        },

        updateStateWithSavedIntegration(integration) {

            this.integration_info.id = integration.id;
            this.integration_info.advertiser_id = integration.advertiser_id;
            this.integration_info.target_geo_id = integration.target_geo_id;
            this.integration_info.currency_id = integration.currency_id;
            this.integration_info.charge = integration.charge;
            this.integration_info.integration_type = integration.integration_type;

            this.selected_integration_type = _.find(this.integration_types, {
                value: this.integration_info.integration_type
            });
            this.advertiser_hash = integration.advertiser.hash;
            this.action = 'edit';
        },

        onRedirectIntegrationTypeUpdated(type) {
            this.selected_redirect_integration_type = _.find(this.redirect_integrations, {type: type});
        }
    },
});