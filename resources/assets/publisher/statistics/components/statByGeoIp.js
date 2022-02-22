Vue.component('by-geo-ip', {
    template: '#by_geo_ip_tpl',
    props: ['currency_id'],
    data: function () {
        return {
            rows: [],
            total: {},
            datatable: null,
            filters: [
                'date_from', 'date_to', 'flow_hashes', 'country_ids', 'offer_hashes', 'landing_hashes',
                'transit_hashes', 'data1', 'data2', 'data3', 'data4', 'currency_id',
            ],
            filter_values: {},
        };
    },
    mounted() {
        let self = this;

        $(document).on('click', '.stat_by_region_link', function () {
            openInnerStat($(this), 'country_id', self.getStatByRegion);
        });
        $(document).on('click', '.stat_by_city_link', function () {
            openInnerStat($(this), 'region_id', self.getStatByCity);
        });
    },
    methods: {
        getStat() {
            this.filter_values = this.$parent.getFiltersData(this.filters);

            // Prevent change in apiRequest
            let params = {};
            _.assign(params, this.filter_values);

            params.group_by = 'country_id';
            params.with = ['country'];

            apiRequest('stat.getByGeo', 'GET', params, response => {

                let tpl_data = {
                    LANG_STATISTICS: LANG_STATISTICS,
                    enabled_columns: StatColumns.columns.geo_ip,
                    mark_roi: StatColumns.mark_roi,
                    count_traffic_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.geo_ip.traffic),
                    count_coefficient_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.geo_ip.coefficient),
                    count_conversion_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.geo_ip.conversion),
                    count_finance_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.geo_ip.finance),
                    items: []
                };

                if (response.response.length > 0) {

                    tpl_data.total_hits = 0;
                    tpl_data.total_unique_count = 0;
                    tpl_data.total_bot_count = 0;
                    tpl_data.total_safepage_count = 0;
                    tpl_data.total_traffback_count = 0;
                    tpl_data.total_total_leads = 0;
                    tpl_data.total_held_count = 0;
                    tpl_data.total_approved_count = 0;
                    tpl_data.total_cancelled_count = 0;
                    tpl_data.total_trashed_count = 0;
                    tpl_data.total_total_payout = 0;
                    tpl_data.total_onhold_payout = 0;
                    tpl_data.total_oncancel_payout = 0;
                    tpl_data.total_ontrash_payout = 0;
                    tpl_data.total_leads_payout = 0;

                    let row;
                    for (row of response.response) {

                        if (!isset(row.country)) {
                            row.country = {
                                title: LANG_MESSAGES.undefined
                            };
                        }

                        row.leads_link = this.getLeadLink(row.country_id);

                        row.unique_count = parseInt(row.flow_hosts);
                        row.held_count = parseInt(row.held_count);
                        row.approved_count = parseInt(row.approved_count);
                        row.cancelled_count = parseInt(row.cancelled_count);
                        row.trashed_count = parseInt(row.trashed_count);
                        row.total_leads = row.approved_count + row.held_count + row.cancelled_count + row.trashed_count;

                        row.onhold_payout = parseFloat(row.onhold_payout);
                        row.oncancel_payout = parseFloat(row.oncancel_payout);
                        row.ontrash_payout = parseFloat(row.ontrash_payout);
                        row.leads_payout = parseFloat(row.leads_payout);
                        row.total_payout = row.onhold_payout + row.oncancel_payout + row.ontrash_payout + row.leads_payout;

                        row.cr = Stat.calculateCr(row.approved_count, row.hits);
                        row.cr_unique = Stat.calculateCrUnique(row.approved_count, row.unique_count);
                        row.epc = Stat.calculateEpc(row.leads_payout, row.hits);
                        row.epc_unique = Stat.calculateEpcUnique(row.leads_payout, row.unique_count);
                        row.real_approve = Stat.calculateRealApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.expected_approve = Stat.calculateExpectedApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.approve = Stat.calculateApprove(row.approved_count, row.cancelled_count, row.held_count, row.trashed_count);

                        tpl_data.items.push(row);

                        tpl_data.total_hits += parseInt(row.hits);
                        tpl_data.total_unique_count += row.unique_count;
                        tpl_data.total_bot_count += parseInt(row.bot_count);
                        tpl_data.total_safepage_count += parseInt(row.safepage_count);
                        tpl_data.total_traffback_count += parseInt(row.traffback_count);
                        tpl_data.total_total_leads += row.total_leads;
                        tpl_data.total_approved_count += row.approved_count;
                        tpl_data.total_held_count += row.held_count;
                        tpl_data.total_cancelled_count += row.cancelled_count;
                        tpl_data.total_trashed_count += row.trashed_count;
                        tpl_data.total_onhold_payout += parseFloat(row.onhold_payout);
                        tpl_data.total_oncancel_payout += parseFloat(row.oncancel_payout);
                        tpl_data.total_ontrash_payout += parseFloat(row.ontrash_payout);
                        tpl_data.total_leads_payout += parseFloat(row.leads_payout);
                        tpl_data.total_total_payout += row.total_payout;
                    }

                    tpl_data.total_cr = Stat.calculateCr(tpl_data.total_approved_count, tpl_data.total_hits);
                    tpl_data.total_cr_unique = Stat.calculateCrUnique(tpl_data.total_approved_count, tpl_data.total_unique_count);
                    tpl_data.total_epc = Stat.calculateEpc(tpl_data.total_leads_payout, tpl_data.total_hits);
                    tpl_data.total_epc_unique = Stat.calculateEpc(tpl_data.total_leads_payout, tpl_data.total_unique_count);
                    tpl_data.total_real_approve = Stat.calculateRealApprove(
                        tpl_data.total_approved_count,
                        tpl_data.total_cancelled_count,
                        tpl_data.total_held_count
                    );
                    tpl_data.total_expected_approve = Stat.calculateExpectedApprove(
                        tpl_data.total_approved_count,
                        tpl_data.total_cancelled_count,
                        tpl_data.total_held_count
                    );
                    tpl_data.total_approve = Stat.calculateApprove(
                        tpl_data.total_approved_count,
                        tpl_data.total_cancelled_count,
                        tpl_data.total_held_count,
                        tpl_data.total_trashed_count
                    );

                    tpl_data.total_leads_link = this.getLeadLink();
                }

                tpl_data.th_finance = getFinanceThTitle(this.currency_id);

                renderTemplate(StatParameter.template_path + 'by_geo_ip.hbs', tpl_data, '#handlebars_stat_tpl_wrap', {},
                    () => {

                        if (tpl_data.items.length > 0) {
                            this.initDatatable();
                        }

                        bus.$emit('report-built');

                    }
                );
            });
        },

        initDatatable() {
            if (is_null(this.datatable)) {
                this.datatable = Datatable.getInstance();
            }

            this.datatable.init('geo_ip_stat_table', {
                aaSorting: [[1, "desc"]],
            });
        },

        getStatByRegion(country_id) {
            this.filter_values = this.$parent.getFiltersData(this.filters);

            // Prevent change in apiRequest
            let params = {};
            _.assign(params, this.filter_values);

            params.with = ['region'];
            params.country_ids = [country_id];

            StatParameter.active_ajax_for_inside_tr_stat = true;
            ContentPreloader.show('#statistics_table_wrap');
            filters_bus.$emit('appy-filter-start');

            apiRequest('stat.getByRegion', 'GET', params, result => {

                let tpl_data = {
                    LANG_STATISTICS: LANG_STATISTICS,
                    enabled_columns: StatColumns.columns.geo_ip,
                    mark_roi: StatColumns.mark_roi,
                    items: []
                };

                if (result.response.length > 0) {
                    let row;
                    for (row of result.response) {

                        if (is_null(row.region)) {
                            row.region = {};
                            row.region_title_small = LANG_MESSAGES.undefined;
                        } else {
                            row.region_title_small = truncateStr(row.region.title, 20, false, true);
                        }

                        row.leads_link = this.getLeadLink(row.region.country_id, row.region.id);

                        row.unique_count = parseInt(row.flow_hosts);
                        row.held_count = parseInt(row.held_count);
                        row.approved_count = parseInt(row.approved_count);
                        row.cancelled_count = parseInt(row.cancelled_count);
                        row.trashed_count = parseInt(row.trashed_count);
                        row.total_leads = row.approved_count + row.held_count + row.cancelled_count + row.trashed_count;

                        row.onhold_payout = parseFloat(row.onhold_payout);
                        row.oncancel_payout = parseFloat(row.oncancel_payout);
                        row.ontrash_payout = parseFloat(row.ontrash_payout);
                        row.leads_payout = parseFloat(row.leads_payout);
                        row.total_payout = row.onhold_payout + row.oncancel_payout + row.ontrash_payout + row.leads_payout;

                        row.cr = Stat.calculateCr(row.approved_count, row.hits);
                        row.cr_unique = Stat.calculateCrUnique(row.approved_count, row.unique_count);
                        row.epc = Stat.calculateEpc(row.leads_payout, row.hits);
                        row.epc_unique = Stat.calculateEpcUnique(row.leads_payout, row.unique_count);
                        row.real_approve = Stat.calculateRealApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.expected_approve = Stat.calculateExpectedApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.approve = Stat.calculateApprove(row.approved_count, row.cancelled_count, row.held_count, row.trashed_count);

                        tpl_data.items.push(row);
                    }
                }

                renderTemplate(StatParameter.template_path + 'by_region.hbs', tpl_data,
                    '#stat_tr_country-' + result.request.country_ids[0], {}, () => {
                        fixStatFixedHeaderOnChangeCurrency();
                        runTooltip();

                        StatParameter.active_ajax_for_inside_tr_stat = false;
                        ContentPreloader.hide();
                        filters_bus.$emit('apply-filter-stop');
                    }, 'after'
                );
            });
        },

        getStatByCity(region_id) {
            this.filter_values = this.$parent.getFiltersData(this.filters);

            // Prevent change in apiRequest
            let params = {};
            _.assign(params, this.filter_values);

            params.with = ['city'];
            params.region_ids = [region_id];

            StatParameter.active_ajax_for_inside_tr_stat = true;
            ContentPreloader.show('#statistics_table_wrap');
            filters_bus.$emit('appy-filter-start');

            apiRequest('stat.getByCity', 'GET', params, result => {

                let tpl_data = {
                    LANG_STATISTICS: LANG_STATISTICS,
                    enabled_columns: StatColumns.columns.geo_ip,
                    mark_roi: StatColumns.mark_roi,
                    items: []
                };

                if (result.response.length > 0) {
                    let row;
                    for (row of result.response) {

                        if (is_null(row.city)) {
                            row.city = {};
                            row.city_title_small = LANG_MESSAGES.undefined;
                        } else {
                            row.city_title_small = truncateStr(row.city.title, 20, false, true);
                        }

                        row.leads_link = this.getLeadLink(row.city.country_id, row.city.region_id, row.city.id);

                        row.city_id = row.city.id;

                        row.unique_count = parseInt(row.flow_hosts);
                        row.held_count = parseInt(row.held_count);
                        row.approved_count = parseInt(row.approved_count);
                        row.cancelled_count = parseInt(row.cancelled_count);
                        row.trashed_count = parseInt(row.trashed_count);
                        row.total_leads = row.approved_count + row.held_count + row.cancelled_count + row.trashed_count;

                        row.onhold_payout = parseFloat(row.onhold_payout);
                        row.oncancel_payout = parseFloat(row.oncancel_payout);
                        row.ontrash_payout = parseFloat(row.ontrash_payout);
                        row.leads_payout = parseFloat(row.leads_payout);
                        row.total_payout = row.onhold_payout + row.oncancel_payout + row.ontrash_payout + row.leads_payout;

                        row.cr = Stat.calculateCr(row.approved_count, row.hits);
                        row.cr_unique = Stat.calculateCrUnique(row.approved_count, row.unique_count);
                        row.epc = Stat.calculateEpc(row.leads_payout, row.hits);
                        row.epc_unique = Stat.calculateEpcUnique(row.leads_payout, row.unique_count);
                        row.real_approve = Stat.calculateRealApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.expected_approve = Stat.calculateExpectedApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.approve = Stat.calculateApprove(row.approved_count, row.cancelled_count, row.held_count, row.trashed_count);

                        tpl_data.items.push(row);
                    }
                }

                renderTemplate(StatParameter.template_path + 'by_city.hbs', tpl_data,
                    '#stat_tr_region-' + result.request.region_ids[0], {}, () => {
                        fixStatFixedHeaderOnChangeCurrency();
                        runTooltip();

                        StatParameter.active_ajax_for_inside_tr_stat = false;
                        ContentPreloader.hide();
                        filters_bus.$emit('apply-filter-stop');
                    }, 'after'
                );
            });
        },

        getLeadLink(country_id = null, region_id = null, city_id = null) {
            let country_ids = is_null(country_id) ? null : [country_id],
                params = {
                    country_ids: country_ids,
                    region_id: region_id,
                    city_id: city_id,
                };

            _.merge(params, _.omit(this.filter_values, [
                'country_ids', 'lead_statuses', 'currency_id'
            ]));

            return '/statistics/leads?' + http_build_query(params);
        },
    }
});