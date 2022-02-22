Vue.component('by-landings', {
    template: '#by_landings_tpl',
    props: ['currency_id'],
    data: function () {
        return {
            rows: [],
            total: {},
            datatable: null,
            filters: [
                'date_to', 'date_from', 'publisher_hashes', 'country_ids', 'offer_hashes', 'landing_hashes',
                'transit_hashes', 'currency_id',
            ],
            filter_values: {},
        };
    },
    methods: {
        getStat() {
            this.filter_values = this.$parent.getFiltersData(this.filters);

            // Prevent change in apiRequest
            let params = {};
            _.assign(params, this.filter_values);

            params.with = ['locale'];

            apiRequest('stat.getByLanding', 'GET', params, response => {

                let tpl_data = {
                    LANG_STATISTICS: LANG_STATISTICS,
                    CDN_HOST: CDN_HOST,
                    enabled_columns: StatColumns.columns.landing,
                    mark_roi: StatColumns.mark_roi,
                    count_traffic_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.landing.traffic),
                    count_coefficient_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.landing.coefficient),
                    count_conversion_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.landing.conversion),
                    count_finance_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.landing.finance),
                    is_striped_table: !StatColumns.mark_roi,
                    items: []
                };

                if (response.response.length > 0) {

                    tpl_data.total_hits = 0;
                    tpl_data.total_unique_count = 0;
                    tpl_data.total_transit_landing_hosts = 0;
                    tpl_data.total_direct_landing_hosts = 0;
                    tpl_data.total_additional_hosts = 0;
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
                    tpl_data.total_offer_hosts = 0;
                    tpl_data.total_flow_hosts = 0;
                    tpl_data.total_profit = 0;

                    let row;
                    for (row of response.response) {

                        if (!isset(row.landing.locale)) {
                            row.landing.locale = {};
                        }

                        row.leads_link = this.getLeadLink(row.landing.hash);

                        row.landing_title = (is_null(row.landing.title) ? LANG_STATISTICS.landing_is_undefined : row.landing.title);
                        row.landing_locale = row.landing.locale;

                        row.unique_count = parseInt(row.landing_unique_count);

                        row.additional_hosts = parseInt(row.noback_landing_hosts) + parseInt(row.comeback_landing_hosts);

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

                        row.cr_unique = Stat.calculateCrUnique(row.approved_count, row.unique_count);
                        row.epc_unique = Stat.calculateEpcUnique(row.leads_payout, row.unique_count);
                        row.real_approve = Stat.calculateRealApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.expected_approve = Stat.calculateExpectedApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.approve = Stat.calculateApprove(row.approved_count, row.cancelled_count, row.held_count, row.trashed_count);
                        row.profit = parseFloat(row.profit);
                        tpl_data.items.push(row);

                        tpl_data.total_hits += parseInt(row.hits);
                        tpl_data.total_unique_count += row.unique_count;
                        tpl_data.total_transit_landing_hosts += parseInt(row.transit_landing_hosts);
                        tpl_data.total_direct_landing_hosts += parseInt(row.direct_landing_hosts);
                        tpl_data.total_additional_hosts += row.additional_hosts;
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
                        tpl_data.total_offer_hosts += parseInt(row.offer_hosts);
                        tpl_data.total_flow_hosts += parseInt(row.flow_hosts);
                        tpl_data.total_profit += parseFloat(row.profit);
                    }

                    tpl_data.total_cr_unique = Stat.calculateCrUnique(tpl_data.total_approved_count, tpl_data.total_unique_count);
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

                renderTemplate(StatParameter.template_path + 'by_landing.hbs', tpl_data, '#handlebars_stat_tpl_wrap', {},
                    () => {

                        if (response.response.length > 0) {
                            this.initDatatable();
                        }

                        runTooltip();

                        bus.$emit('report-built');
                    }
                );
            });
        },

        getLeadLink(landing_hash = null, status = null) {

            let landing_hashes = is_null(landing_hash) ?
                _.get(this.filter_values, 'landing_hashes', [])
                : [landing_hash];


            let params = {
                landing_hashes: landing_hashes,
            };

            _.merge(params, _.omit(this.filter_values, [
                'landing_hashes', 'lead_statuses', 'currency_id'
            ]));

            return '/leads?' + http_build_query(params);
        },

        initDatatable() {
            if (is_null(this.datatable)) {
                this.datatable = Datatable.getInstance();
            }

            this.datatable.init('landing_stat_table', {
                aaSorting: [[1, "desc"]],
            });
        }
    }
});