Vue.component('target-geo-rules', {
    template: '#target-geo-rules-component-template',
    props: ['integrations'],
    data: function () {
        return {
            target_index: null,
            target_geo_index: null,
            target_geo_id: null,
            target_geo_rules: [],
            target_geo_rule_info: {},
            target_geo_rule_index: null,
            action: null,
            target_geo_rules_modal: null,
            settings_form_is_active: false,
            target_geo_rule_sort_type: null,
            rule_sort_type: null,
            use_limit: false,
            use_weight: false,
            currencies: [],
            selected_currency: {},
            selected_integration: {},
            currencies_loading: false,
            advertiser_hash: null,
            formatted_integrations: [],
        }
    },

    mounted() {
        this.target_geo_rules_modal = $('#target_geo_rules_modal');
    },

    watch: {
        'rule_sort_type'() {
            if (this.rule_sort_type !== this.target_geo_rule_sort_type) {
                vm.targetGeoSortTypeUpdated(this.target_index, this.target_geo_index, this.rule_sort_type);
                this.target_geo_rule_sort_type = this.rule_sort_type;
            }
        },
        'use_limit'() {
            if (!this.use_limit) {
                this.target_geo_rule_info.limit = 0;
            }
        },
        'use_weight'() {
            if (!this.use_weight) {
                this.target_geo_rule_info.weight = 0;
            }
        },
        'target_geo_rule_info.integration_id'() {
            if (this.action === 'edit' || !this.target_geo_rule_info.integration_id) {
                return;
            }
            let index = _.findIndex(this.integrations, {id: this.target_geo_rule_info.integration_id});
            this.target_geo_rule_info.integration_data = this.integrations[index].schema;
        },
        'target_geo_rule_info.advertiser_id'(advertiser_id) {
            if (advertiser_id === undefined || empty(advertiser_id)) {
                return;
            }
            this.getAdvertiserAccounts(advertiser_id);
        },
        'currencies'() {
            if (is_null(this.target_geo_rule_info.currency_id)) {
                return this.selected_currency = this.currencies[0];
            }

            let selected_currency = _.find(this.currencies, {id: this.target_geo_rule_info.currency_id});

            if (selected_currency === undefined) {
                return this.selected_currency = this.currencies[0];
            }

            return this.selected_currency = selected_currency;
        },
        'selected_currency'(selected_currency) {
            if (selected_currency === undefined) {
                return;
            }
            this.target_geo_rule_info.currency_id = selected_currency.id;
        },
        'selected_integration'(selected_integration) {
            let integration_id = 0;
            if (selected_integration !== undefined) {
                integration_id = selected_integration.value;
            }

            this.target_geo_rule_info.integration_id = integration_id;
        },
        'integrations': {
            immediate: true,
            handler() {

                this.formatted_integrations.splice(0);

                this.integrations.forEach(integration => {
                    this.formatted_integrations.push({
                        value: integration.id,
                        title: `${integration.title} [${integration.info}]`,
                        schema: integration.schema,
                    });
                })
            }
        },
    },

    methods: {
        /**
         * Открытие модалки правил гео цели
         */
        openModal(target_index, target_geo_index, target_geo_id, target_geo_rules, target_geo_rule_sort_type) {
            if (target_index === undefined) {
                throw "target_index is undefined"
            }
            if (target_geo_index === undefined) {
                throw "target_geo_index is undefined"
            }
            if (target_geo_id === undefined) {
                throw "target_geo_id is undefined"
            }
            if (target_geo_rules === undefined) {
                throw "target_geo_rules is undefined"
            }
            if (target_geo_rule_sort_type === undefined) {
                throw "target_geo_rule_sort_type is undefined"
            }

            this.target_index = target_index;
            this.target_geo_index = target_geo_index;
            this.target_geo_id = target_geo_id;
            this.target_geo_rules = _.assignIn(target_geo_rules);
            this.settings_form_is_active = false;
            this.rule_sort_type = target_geo_rule_sort_type;
            this.target_geo_rule_sort_type = target_geo_rule_sort_type;
            this.target_geo_rules_modal.modal();

            this.$nextTick(() => {
                runTooltip();
            });
        },

        openCreateForm() {
            if (!this.integrations.length) {
                showMessage('error', 'Нету добавленных интеграций');
                return false;
            }

            this.action = 'create';
            this.currencies.splice(0);
            this.selected_currency = {};
            this.advertiser_hash = null;
            this.selected_integration = this.formatted_integrations[0];

            this.target_geo_rule_info = {
                integration_id: this.formatted_integrations[0].id,
                advertiser_id: 0,
                is_fallback: 0,
                limit: 0,
                weight: 0,
                charge: 0,
                currency_id: null,
                integration_data: this.formatted_integrations[0].schema
            };
            this.settings_form_is_active = true;
        },

        openEditForm(index) {
            this.action = 'edit';
            this.target_geo_rule_index = index;
            this.target_geo_rule_info = _.assignIn({}, this.target_geo_rules[index]);
            this.use_limit = this.target_geo_rule_info.limit > 0;
            this.use_weight = this.target_geo_rule_info.weight > 0;
            this.settings_form_is_active = true;
            this.selected_integration = _.find(this.formatted_integrations, {value: this.target_geo_rule_info.integration_id});

            this.advertiser_hash = _.get(this.target_geo_rule_info.advertiser, 'hash');
        },

        /**
         * Скрытие формы доб/ред правила
         */
        clearSettingsForm() {
            this.settings_form_is_active = false;
            this.target_geo_rule_info = {};
        },

        /**
         * Получение массива правил и их приоритетов.
         * Массив с правилами перебирается с начала, но приоритет проставляется в обратном порядке
         * (первому наибольший приоритет и т.д.)
         */
        getPriorities() {
            let rules = [], quantity = this.target_geo_rules.length + 1;
            _.forEach(this.target_geo_rules, function (item) {
                rules.push({id: item.id, priority: --quantity});
            });

            return rules;
        },

        /**
         * Обновление приоритетов правил
         */
        updatePriorities() {
            let rules = this.getPriorities();
            if (!rules.length) {
                return;
            }

            ContentPreloader.show('#target_geo_rule_list_wrap');

            api.post('/target_geo_rule.editPriority', {rules: rules}).then(response => {

                vm.targetGeoRuleEditedPriorityEvent(this.target_index, this.target_geo_index, this.target_geo_rules);

                showMessage('success', response.data.message);
                ContentPreloader.hide();

            }, () => {
                ContentPreloader.hide();
            });
        },

        createRule() {
            let ladda = LaddaPreloader.start('#rule_create_btn'),
                params = this.target_geo_rule_info;

            params.target_geo_id = this.target_geo_id;

            api.post('/target_geo_rule.create', params).then(response => {

                vm.targetGeoRuleCreatedEvent(this.target_index, this.target_geo_index, response.data.response);

                // После обновления списка правил в DOM обновляем их приоритеты
                this.$nextTick(() => {
                    this.updatePriorities();
                });
                this.clearSettingsForm();

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        editRule() {
            let ladda = LaddaPreloader.start('#target_geo_rule_edit_submit'),
                params = _.pick(this.target_geo_rule_info, [
                    'id', 'target_geo_id', 'integration_id', 'advertiser_id', 'charge', 'currency_id', 'is_fallback',
                    'limit', 'weight', 'priority', 'integration_data'
                ]);

            api.post('/target_geo_rule.edit', params).then(response => {

                vm.targetGeoRuleEditedEvent(
                    this.target_index,
                    this.target_geo_index,
                    this.target_geo_rule_index,
                    response.data.response
                );
                this.clearSettingsForm();

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);

            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        resetStat() {
            Swal.show(LANG_TARGET_GEO_RULES.on_reset_stat_msg, LANG_MESSAGES.reset).then(() => {
                let ladda = LaddaPreloader.start('#rule_reset_stat');

                api.post('/target_geo_rule_stat.reset', {target_geo_id: this.target_geo_id})
                    .then(response => {

                        vm.targetGeoRuleStatReseted(
                            this.target_index,
                            this.target_geo_index
                        );

                        showMessage('success', response.data.message);
                        LaddaPreloader.stop(ladda);

                    }, () => {
                        LaddaPreloader.stop(ladda);
                    });
            }, () => {
            });
        },

        deleteRule() {
            Swal.show(LANG_TARGET_GEO_RULES.on_delete_msg).then(() => {
                let params = {id: this.target_geo_rule_info.id},
                    ladda = LaddaPreloader.start('#rule_delete_btn');

                api.post('/target_geo_rule.delete', params).then(response => {

                    vm.targetGeoRuleDeletedEvent(
                        this.target_index,
                        this.target_geo_index,
                        this.target_geo_rule_index
                    );

                    // После обновления списка правил в DOM обновляем их приоритеты
                    this.$nextTick(() => {
                        this.updatePriorities();
                    });
                    this.clearSettingsForm();

                    showMessage('success', response.data.message);
                    LaddaPreloader.stop(ladda);
                }, () => {
                    LaddaPreloader.stop(ladda);
                });
            }, () => {
            });
        },

        getAdvertiserAccounts(advertiser_id) {
            this.currencies_loading = true;

            Account.getList(advertiser_id, ['currency']).then(accounts => {
                this.currencies = _.uniq(_.map(accounts, 'currency'));
                this.currencies_loading = false;
            })
        },

        onAdvertiserUpdated(advertiser) {
            if (advertiser === undefined || is_null(advertiser)) {
                return;
            }

            this.target_geo_rule_info.advertiser_id = advertiser.id;
        }
    }
});
