Vue.component('by-transits', {
    template: '#by_transits_tpl',
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
    methods: {
        getStat() {
            this.filter_values = this.$parent.getFiltersData(this.filters);

            // Prevent change in apiRequest
            let params = {};
            _.assign(params, this.filter_values);
            params.with = ['locale'];

            apiRequest('stat.getByTransit', 'GET', params, response => {
                let count_traffic_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.transit.traffic),
                    count_coefficient_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.transit.coefficient),
                    count_conversion_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.transit.conversion),
                    count_finance_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.transit.finance),
                    tpl_data = {
                        LANG_STATISTICS: LANG_STATISTICS,
                        CDN_HOST: CDN_HOST,
                        enabled_columns: StatColumns.columns.transit,
                        mark_roi: StatColumns.mark_roi,
                        count_traffic_columns: count_traffic_columns,
                        count_coefficient_columns: count_coefficient_columns,
                        count_conversion_columns: count_conversion_columns,
                        count_finance_columns: count_finance_columns,
                        is_striped_table: !StatColumns.mark_roi,
                        items: []
                    };

                if (response.response.length > 0) {

                    tpl_data.total_hits = 0;
                    tpl_data.total_unique_count = 0;
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

                        if (is_null(row.transit)) {
                            row.transit = {};
                        }

                        if (!isset(row.transit.locale)) {
                            row.transit.locale = [];
                        }

                        row.leads_link = this.getLeadLink(_.get(row, 'transit.hash', '0'));

                        row.transit_title = (!isset(row.transit.title) ? LANG_STATISTICS.transit_is_undefined : row.transit.title);
                        row.transit_locale = row.transit.locale;

                        row.unique_count = parseInt(row.transit_hosts);
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

                        row.ctr = Stat.calculateCtr(row.transit_landing_count, row.unique_count);
                        row.cr_unique = Stat.calculateCrUnique(row.approved_count, row.unique_count);
                        row.epc_unique = Stat.calculateEpcUnique(row.leads_payout, row.unique_count);
                        row.real_approve = Stat.calculateRealApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.expected_approve = Stat.calculateExpectedApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.approve = Stat.calculateApprove(row.approved_count, row.cancelled_count, row.held_count, row.trashed_count);

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
                        tpl_data.total_transit_landing_count += parseInt(row.flow_hosts);
                    }

                    tpl_data.total_ctr = Stat.calculateCtr(tpl_data.total_transit_landing_count, tpl_data.total_unique_count);
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

                renderTemplate(StatParameter.template_path + 'by_transit.hbs', tpl_data,
                    '#handlebars_stat_tpl_wrap', {}, () => {

                        runTooltip();

                        if (response.response.length > 0) {
                            this.initDatatable();
                        }

                        bus.$emit('report-built');
                    });
            });
        },

        getLeadLink(transit_hash = null) {
            let transit_hashes = is_null(transit_hash) ? _.get(this.filter_values, 'transit_hashes', []) : [transit_hash],
                params = {
                    transit_hashes: transit_hashes,
                };

            _.merge(params, _.omit(this.filter_values, [
                'transit_hashes', 'lead_statuses', 'currency_id'
            ]));

            return '/statistics/leads?' + http_build_query(params);
        },

        initDatatable() {
            if (is_null(this.datatable)) {
                this.datatable = Datatable.getInstance();
            }

            this.datatable.init('transit_stat_table', {
                aaSorting: [[1, "desc"]],
            });
        }
    }
});