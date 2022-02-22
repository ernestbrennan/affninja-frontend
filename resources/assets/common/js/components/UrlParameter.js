/**
 * Методы для работы с URl
 *
 * @type {{}}
 */
var UrlParameter = {
    getStatType() {
        var stat_type = getUrlVars()['stat_type'] || 'null';

        return (stat_type == 'null' ? null : stat_type)
    },
    setStatType(stat_type) {
        insertValueInUrl('stat_type', stat_type);
    },

    getOfferType() {
        return getUrlVars()['offer_type'] || null;
    },
    setOfferType(offer_type) {
        insertValueInUrl('offer_type', offer_type);
    },
    getDateFrom() {
        var date_from = this.helpers.getUrlParam('date_from');
        return (date_from == 'null' ? null : date_from)
    },
    getDateTo() {
        var date_to = this.helpers.getUrlParam('date_to');
        return (date_to == 'null' ? null : date_to)
    },
    getFlowHashes() {
        var flow_hashes = getUrlVars()['flow_hashes'] || 'null';
        if (flow_hashes !== 'null') {
            flow_hashes = flow_hashes.split(',');
        }

        return (flow_hashes == 'null' ? [] : flow_hashes)
    },
    getPublisherHashes() {
        var publisher_hashes = getUrlVars()['publisher_hashes'] || 'null';
        if (publisher_hashes !== 'null') {
            publisher_hashes = publisher_hashes.split(',');
        }

        return (publisher_hashes == 'null' ? [] : publisher_hashes)
    },
    getAdvertiserHashes() {
        var advertiser_hashes = getUrlVars()['advertiser_hashes'] || 'null';
        if (advertiser_hashes !== 'null') {
            advertiser_hashes = advertiser_hashes.split(',');
        }

        return (advertiser_hashes == 'null' ? [] : advertiser_hashes)
    },
    getCountryIds() {
        var country_ids = getUrlVars()['country_ids'] || 'null';
        if (country_ids !== 'null')
            country_ids = country_ids.split(',');

        return (country_ids == 'null' ? null : country_ids)
    },
    getOfferHashes() {
        var offer_hashes = getUrlVars()['offer_hashes'] || 'null';
        if (offer_hashes !== 'null')
            offer_hashes = offer_hashes.split(',');
        return (country_ids == 'null' ? null : country_ids)
    },
    getTargetGeoCountryIds() {
        var country_ids = getUrlVars()['target_geo_country_ids'] || 'null';
        if (country_ids !== 'null')
            country_ids = country_ids.split(',');

        return (country_ids == 'null' ? null : country_ids)
    },
    getOfferHashes() {
        var offer_hashes = getUrlVars()['offer_hashes'] || 'null';
        if (offer_hashes !== 'null')
            offer_hashes = offer_hashes.split(',');

        return (offer_hashes == 'null' ? [] : offer_hashes)
    },
    getLandingHashes() {
        var landing_hashes = getUrlVars()['landing_hashes'] || 'null';
        if (landing_hashes !== 'null')
            landing_hashes = landing_hashes.split(',');

        return (landing_hashes == 'null' ? null : landing_hashes)
    },
    getTransitHashes() {
        var transit_hashes = getUrlVars()['transit_hashes'] || 'null';
        if (transit_hashes !== 'null')
            transit_hashes = transit_hashes.split(',');

        return (transit_hashes == 'null' ? null : transit_hashes)
    },
    getCurrency() {
        return getUrlVars()['currency'] || 'null';
    },
    getCurrencyOrDefault() {
        return getUrlVars()['currency'] || UserAccount.getAccountCurrency().toLowerCase();
    },
    setCurrency(currency) {
        if (!currency) {
            throw "Unknown currency";
        }

        insertValueInUrl('currency', currency.toLowerCase());
    },
    getFlowForGroupBy() {
        return getUrlVars()['flow_for_group_by'] || 'null';
    },
    setFlowForGroupBy(flow_for_group_by) {
        insertValueInUrl('flow_for_group_by', flow_for_group_by);
    },
    getGroupBy() {
        return getUrlVars()['group_by'] || 'created_at';
    },
    getSorting() {
        return getUrlVars()['sorting'] || 'null';
    },
    getSortingOrNull() {
        return getUrlVars()['sorting'] || null;
    },
    setSorting(sorting) {
        insertValueInUrl('sorting', sorting);
    },
    getSortingColumn() {
        return getUrlVars()['sorting_column'] || 'null';
    },
    getSortBy() {
        return getUrlVars()['sort_by'] || null;
    },
    getSortingColumnOrNull() {
        return getUrlVars()['sorting_column'] || null;
    },
    setSortingColumn(sorting_column) {
        insertValueInUrl('sorting_column', sorting_column);
    },
    getLeadStatuses() {
        var lead_statuses = getUrlVars()['lead_statuses'] || 'null';
        if (lead_statuses !== 'null')
            lead_statuses = lead_statuses.split(',');

        return (lead_statuses == 'null' ? [] : lead_statuses)
    },
    getLeadHashes() {
        var lead_hashes = this.helpers.getUrlParam('lead_hashes');

        if (is_null(lead_hashes)) {
            return [];
        }
        return this.helpers.splitByComma(lead_hashes);
    },
    setLeadStatuses(lead_statuses) {
        insertValueInUrl('lead_statuses', lead_statuses);
    },
    getUserIds() {
        var user_ids = getUrlVars()['user_ids'] || 'null';
        if (user_ids !== 'null') {
            user_ids = user_ids.split(',');
        }

        return (user_ids == 'null' ? [] : user_ids)
    },
    setUserIds(user_ids) {
        insertValueInUrl('user_ids', user_ids);
    },
    getTypes() {
        var types = getUrlVars()['types'] || 'null';
        if (types !== 'null')
            types = types.split(',');

        return (types == 'null' ? [] : types)
    },
    setTypes(types) {
        insertValueInUrl('types', types);
    },

    getLeadHour() {
        return getUrlVars()['hour'] || null;
    },

    getPublisherStatus() {
        return getUrlVars()['status'] || null;
    },

    getGrouping() {
        return getUrlVars()['grouping'] || null;
    },

    getGroupingOption() {
        return getUrlVars()['grouping_by'] || null;
    },

    getLeadRegion_id() {
        return getUrlVars()['region_id'] || null;
    },

    getLeadCity_id() {
        return getUrlVars()['city_id'] || null;
    },

    helpers: {
        getUrlParam(param) {
            var vars = [];
            var href = window.location.href;
            var answer_position = href.indexOf('?');
            var hash_position = href.indexOf('#');
            if (answer_position < 0 && hash_position > 0) {
                href = href.replace('#', '?');
                answer_position = hash_position;
            }
            if (answer_position > 0 && hash_position > 0) {
                href = href.replace('#', '&');
            }
            var hashes = href.slice(answer_position + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                var part = hashes[i].split('=');
                vars.push(part[0]);
                vars[part[0]] = part[1];
            }

            return vars[param] || null;
        },
        splitByComma(url_value) {
            if (url_value !== 'null')
                url_value = url_value.split(',');

            return (url_value == 'null' ? [] : url_value)
        }
    },
    setSearchField(search_field) {
        insertValueInUrl('search_field', search_field);
    },
    getSearchField() {
        return getUrlVars()['search_field'] || null;
    },
    setSearch(search) {
        insertValueInUrl('q', search);
    },
    getSearch() {
        return getUrlVars()['q'] || null;
    },
    setSearchVal(search) {
        insertValueInUrl('search', search);
    },
    getSearchVal() {
        return getUrlVars()['search'] || null;
    },
    getCountryId() {
        return getUrlVars()['country_ids'] || null;
    },
    getCurrencyId() {
        return getUrlVars()['currency_id'] || null;
    },
    setCountryIds(country_id) {
        insertValueInUrl('country_ids', country_id);
    },
    getCurrencyIds() {
        var currency_id = getUrlVars()['currency_id'] || 'null';
        if (currency_id !== 'null')
            currency_id = currency_id.split(',');

        return (currency_id == 'null' ? null : currency_id)
    },
    setCurrencyIds(currency_id) {
        insertValueInUrl('currency_id', currency_id);
    },

    getConstraintValue(currency_id) {
        var constraint = getUrlVars()['constraint'] || 'null';

        return (constraint == 'null' ? null : constraint)
    },

    setAutogenerated(value) {
        insertValueInUrl('is_autogenerated', value);
    },

    getAutogenerated() {
        return this.helpers.getUrlParam('is_autogenerated');
    },

    getGroupByForLevel(level) {
        return this.helpers.getUrlParam('level_' + level + '_group_by');
    },

    getGroupByForDeviceLevel(level) {
        return this.helpers.getUrlParam('level_' + level + '_device_group_by');
    },
};