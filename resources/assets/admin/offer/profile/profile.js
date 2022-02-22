const bus = new Vue({});

const vm = new Vue({
    el: '#offer_profile',
    mixins: [toggle_target_geo_visibility],
    data: {
        offer_info: {},
        offer_offer_sources: {},
        offer_sources: [],
        offer_offer_categories: {},
        offer_categories: [],
        offer_publishers: [],
        offer_user_groups: [],
        offer_requisites: [],
        locales: [],
        select2_locales: [],
        countries: [],
        currencies: [],
        publishers: [],
        advertisers: [],
        landings: [],
        transits: [],
        targets: [],
        integrations: [],
        offer_email_integration: {},
        offer_sms_integration: {},
        selected_target: {},
        user_groups: [],
    },

    watch: {
        'locales'() {
            let self = this;
            _.forEach(this.locales, function (item) {
                self.select2_locales.push({
                    id: item.id,
                    text: item.title_ru
                });
            });
        },

        'selected_target'() {
            if (!Object.size(this.selected_target)) {
                return;
            }

            this.landings = this.selected_target.landings;
            this.transits = this.selected_target.transits;
        },
    },

    methods: {
        openPermissionsModal() {
            this.$refs['offer-permissions-modal'].openModal();
        },

        openTargetPermissionsModal() {
            this.$refs['target-permissions-modal'].openModal();
        },

        onSelectedTargetUpdated(target) {
            this.selected_target = target;
        },

        openTargetCreateModal() {
            bus.$emit('open-target-create-modal');
        },

        openEntityDomainModal(entity, entity_type) {
            this.$refs.entity_domains.openModal(entity, entity_type);
        },

        landingDomainCreated(domain) {
            let index = _.findIndex(this.landings, {id: domain.entity_id});
            this.landings[index].domains.push(domain);
        },

        landingDomainEdited(domain) {
            let landing_index = _.findIndex(this.landings, {id: domain.entity_id});
            let domain_index = _.findIndex(this.landings[landing_index].domains, {hash: domain.hash});

            this.landings[landing_index].domains[domain_index] = domain;
        },

        landingDomainDeleted(entity_id, domain_hash) {
            let landing_index = _.findIndex(this.landings, {id: entity_id});
            let domain_index = _.findIndex(this.landings[landing_index].domains, {hash: domain_hash});

            this.landings[landing_index].domains.splice(domain_index, 1)
        },

        transitDomainCreated(domain) {
            let index = _.findIndex(this.transits, {id: domain.entity_id});
            this.transits[index].domains.push(domain);
        },

        transitDomainEdited(domain) {
            let transit_index = _.findIndex(this.transits, {id: domain.entity_id});
            let domain_index = _.findIndex(this.transits[transit_index].domains, {hash: domain.hash});

            this.transits[transit_index].domains[domain_index] = domain;
        },

        transitDomainDeleted(entity_id, domain_hash) {
            let transit_index = _.findIndex(this.transits, {id: entity_id});
            let domain_index = _.findIndex(this.transits[transit_index].domains, {hash: domain_hash});

            this.transits[transit_index].domains.splice(domain_index, 1)
        },

        onOfferRequisiteCreated(new_offer_requisite) {
            this.offer_requisites.unshift(new_offer_requisite);
        },

        onOfferRequisiteEdited(edited_requisite) {
            let index = _.findIndex(this.offer_requisites, ['id', edited_requisite.id]);
            this.offer_requisites.splice(index, 1, edited_requisite);
        },

        onOfferRequisiteDeleted(id) {
            let offer_requisite_index = _.findIndex(this.offer_requisites, ['id', id]);
            this.offer_requisites.splice(offer_requisite_index, 1);
        },

        openTargetGeoRulesModalEvent(target_index, target_geo_index, target_geo_id, target_geo_rules, target_geo_rule_sort_type) {
            this.$refs.target_geo_rules.openModal(
                target_index,
                target_geo_index,
                target_geo_id,
                target_geo_rules,
                target_geo_rule_sort_type
            );
        },

        targetGeoSortTypeUpdated(target_index, target_geo_index, sort_type) {

            let params = _.pick(this.targets[target_index].target_geo[target_geo_index], [
                'id', 'offer_id', 'target_id', 'country_id', 'payout_currency_id', 'price_currency_id', 'payout',
                'profit', 'price', 'old_price', 'hold_time', 'is_default', 'is_active',
                'target_geo_rule_sort_type'
            ]);

            params.target_geo_rule_sort_type = sort_type;

            api.post('/target_geo.edit', params).then(response => {
                showMessage('success', response.data.message);
            });
        },

        targetGeoRuleCreatedEvent(target_index, target_geo_index, new_target_geo_rule) {
            // If this rule is getting as is_fallback - do another rules as is not fallback
            if (new_target_geo_rule.is_fallback == 1) {
                this.setAllTargetGeoRulesInTargetGeoAsIsNotFallback(
                    this.targets[target_index].target_geo[target_geo_index].target_geo_rules
                );
            }
            this.targets[target_index].target_geo[target_geo_index].target_geo_rules.push(new_target_geo_rule);
        },

        targetGeoRuleEditedEvent(target_index, target_geo_index, rule_index, edited_rule) {
            // If this rule is getting as is_fallback - do another rules as is not fallback
            if (parseInt(edited_rule.is_fallback) === 1) {
                this.setAllTargetGeoRulesInTargetGeoAsIsNotFallback(
                    this.targets[target_index].target_geo[target_geo_index].target_geo_rules
                );
            }
            this.targets[target_index].target_geo[target_geo_index].target_geo_rules.splice(rule_index, 1, edited_rule);
        },

        targetGeoRuleStatReseted(target_index, target_geo_index) {
            _.each(this.targets[target_index].target_geo[target_geo_index].target_geo_rules, function (target_geo_rule) {
                target_geo_rule.today_leads_count = 0;
            });
        },

        paymentMethodCreatedEvent(target_index, target_geo_index, payment_method) {
            this.targets[target_index].target_geo[target_geo_index].payment_methods.unshift(payment_method);
        },

        paymentMethodEditedEvent(target_index, target_geo_index, payment_method_index, payment_method) {
            this.targets[target_index].target_geo[target_geo_index].payment_methods.splice(payment_method_index, 1, payment_method);
        },

        paymentMethodDeletedEvent(target_index, target_geo_index, payment_method_index) {
            this.targets[target_index].target_geo[target_geo_index].payment_methods.splice(payment_method_index, 1);
        },

        targetGeoRuleDeletedEvent(target_index, target_geo_index, target_geo_rule_index) {
            this.targets[target_index].target_geo[target_geo_index].target_geo_rules.splice(target_geo_rule_index, 1);
        },

        targetGeoRuleEditedPriorityEvent(target_index, target_geo_index, target_geo_rules) {
            this.targets[target_index].target_geo[target_geo_index].target_geo_rules = target_geo_rules;
        },

        targetCreatedEvent(new_target) {
            this.targets.push(new_target);
        },

        targetEditedEvent(index, edited_target) {
            if (edited_target.is_default) {
                _.each(this.targets, function (item) {
                    item.is_default = 0;
                });
            }

            this.targets.splice(index, 1, edited_target);
        },

        targetDeletedEvent(index) {
            this.targets.splice(index, 1);
        },

        openTargetGeoCreateModal(target_id, target_index) {
            this.$refs.target_geo_settings.openCreateModal(this.offer_info, target_id, target_index);
        },

        openTargetGeoEditModal(target_index, target_geo_index) {
            this.$refs.target_geo_settings.openEditModal(
                target_index,
                target_geo_index,
                this.targets[target_index].target_geo[target_geo_index]
            );
        },

        openTargetGeoCloneModal(target_index, target_geo_index) {
            this.$refs.target_geo_clone_modal.openCloneModal(
                target_index,
                target_geo_index,
                this.targets[target_index].target_geo[target_geo_index]
            );
        },

        openTargetGeoStakesModal(target_index, target_geo_index) {
            this.$refs.target_geo_stakes_modal.openModal(
                target_index,
                target_geo_index,
                this.targets[target_index].target_geo[target_geo_index]
            );
        },

        targetGeoCreatedEvent(target_index, new_target_geo) {
            // If this target geo is getting as is_default - do other target geo as is not fallback
            if (new_target_geo.is_default === 1) {
                this.setAllTargetGeoInTargetAsIsNotDefault(
                    this.targets[target_index].target_geo
                );
            }

            this.targets[target_index].target_geo.push(new_target_geo);
        },

        targetGeoEditedEvent(target_index, target_geo_index, edited_target_geo) {
            // If this target geo is getting as is_default - do other target geo as is not fallback
            if (edited_target_geo.is_default == 1) {
                this.setAllTargetGeoInTargetAsIsNotDefault(
                    this.targets[target_index].target_geo
                );
            }

            this.targets[target_index].target_geo.splice(target_geo_index, 1, edited_target_geo)
        },

        targetGeoDeletedEvent(target_index, target_geo_index) {
            this.targets[target_index].target_geo.splice(target_geo_index, 1);
        },

        offerSourcesEditedEvent(offer_sources) {
            this.offer_offer_sources = offer_sources;
        },

        onOfferCategoriesEdited(offer_offer_categories) {
            this.offer_offer_categories = offer_offer_categories;
        },

        onOfferLabelsEdited(offer_labels) {
            this.offer_info.labels = offer_labels;
        },

        // Обработка ивента изменения приватности сущности и отправка данных нужному компоненту
        onMultiselectEdited(params) {
            switch (params.entity_type) {
                case 'offer_categories':
                    this.$refs.offer_settings.editOfferCategories(params.entities);
                    break;
            }
        },

        landingCreatedEvent(landing) {
            this.landings.unshift(landing);
        },

        landingEditedEvent(index, edited_landing) {
            this.landings.splice(index, 1, edited_landing);
        },

        landingDeletedEvent(index) {
            this.landings.splice(index, 1);
        },

        transitCreatedEvent(new_transit) {
            this.transits.unshift(new_transit);
        },

        transitEditedEvent(index, edited_transit) {
            this.transits.splice(index, 1, edited_transit);
        },

        transitDeletedEvent(index) {
            this.transits.splice(index, 1);
        },

        offerEditedEvent(offer_info) {
            this.offer_info = offer_info;
            setPageTitle(offer_info.title);

            if (parseInt(offer_info.is_private) === 0) {
                this.offer_user_groups = [];
                this.offer_publishers = [];
            }
        },

        openOfferCategoriesSettings() {
            // Получаем идентификаторы паблишеров, которым открыта транзитка
            let offer_offer_category_ids = getIds(this.offer_offer_categories);
            // Добавляем свойсво text, нужное для компонента
            let processed_offer_categories = _.forEach(this.offer_categories, function (item, key) {
                item.text = item.title;
            });
            this.$refs.multiselect.openModal(
                this.offer_info.id,
                'offer_categories',
                offer_offer_category_ids,
                processed_offer_categories,
                LANG_MESSAGES.categories
            );
        },

        openLabelsModal() {
            this.$refs.labels_modal.openModal();
        },

        openOfferEditModal() {
            this.$refs.offer_settings.openOfferEditModal();
        },

        setAllTargetGeoRulesInTargetGeoAsIsNotFallback(target_geo_rules) {
            _.each(target_geo_rules, function (item) {
                item.is_fallback = 0;
            })
        },

        setAllTargetGeoInTargetAsIsNotDefault(target_geo_list) {
            _.each(target_geo_list, function (item) {
                item.is_default = 0;
            })
        },

        onDefaultUserGroupPayoutChange(target_index, target_geo_index, new_fields) {
            _.merge(this.targets[target_index].target_geo[target_geo_index], new_fields);
        },

        openOfferSourcesModal() {
            bus.$emit('open-offer-sources-modal');
        },

        onTargetGeoIntegrationUpdated(integration) {
            let target_geo;
            this.targets.some(target => {

                target_geo = _.find(target.target_geo, {id: integration.target_geo_id});
                if (target_geo !== undefined) {
                    target_geo.integration = integration;
                    return true;
                }
            });
        },
    }
});