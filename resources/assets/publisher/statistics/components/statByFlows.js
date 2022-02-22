Vue.component('by-flows', {
    template: '#by_flows_tpl',
    props: ['currency_id'],
    data() {
        return {
            rows: [],
            total: {},
            datatable: null,
            filters: [
                'date_to', 'date_from', 'flow_hashes', 'country_ids', 'offer_hashes', 'landing_hashes',
                'transit_hashes', 'data1', 'data2', 'data3', 'data4', 'currency_id',
            ],
            filter_values: {},
        };
    },
    mounted() {
        let self = this;
        $(document).on('click', '.stat_by_flow_link', function () {
            openInnerStat($(this), 'flow', self.getStatByFlow);
        });
    },
    methods: {
        getStat() {
            this.filter_values = this.$parent.getFiltersData(this.filters);

            // Prevent change in apiRequest
            let params = {};
            _.assign(params, this.filter_values);

            apiRequest('stat.getByFlow', 'GET', params, response => {

                let data = response.response,
                    count_traffic_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.flow.traffic),
                    count_coefficient_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.flow.coefficient),
                    count_conversion_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.flow.conversion),
                    count_finance_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.flow.finance);

                let tpl_data = {
                    LANG_STATISTICS: LANG_STATISTICS,
                    enabled_columns: StatColumns.columns.flow,
                    count_traffic_columns: count_traffic_columns,
                    count_coefficient_columns: count_coefficient_columns,
                    count_conversion_columns: count_conversion_columns,
                    count_finance_columns: count_finance_columns,
                    is_striped_table: !StatColumns.mark_roi,
                    th_finance: getFinanceThTitle(this.currency_id),
                    items: []
                };

                if (data.length > 0) {

                    tpl_data.total_hits = 0;
                    tpl_data.total_unique_count = 0;
                    tpl_data.total_traffback_count = 0;
                    tpl_data.total_approved_count = 0;
                    tpl_data.total_held_count = 0;
                    tpl_data.total_cancelled_count = 0;
                    tpl_data.total_trashed_count = 0;
                    tpl_data.total_cr_unique = 0;
                    tpl_data.total_onhold_payout = 0;
                    tpl_data.total_leads_payout = 0;
                    tpl_data.total_revshare_payout = 0;
                    tpl_data.total_oncancel_payout = 0;
                    tpl_data.total_traffic_cost = 0;
                    tpl_data.total_bot_count = 0;
                    tpl_data.total_landing_unique_count = 0;
                    tpl_data.total_transit_hosts = 0;
                    tpl_data.total_total_payout = 0;
                    tpl_data.total_safepage_count = 0;
                    tpl_data.total_total_leads = 0;
                    tpl_data.total_ontrash_payout = 0;

                    let row;
                    for (row of data) {
                        row.leads_link = this.getLeadLink(row.flow_hash);

                        unique_count = parseInt(row.flow_hosts);

                        row.flow_title_small = is_null(row.flow_title) ? LANG_STATISTICS.fast_links
                            : truncateStr(row.flow_title, 20, false, true);
                        row.unique_count = unique_count;

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

                        row.uc = Stat.calculateUc(row.offer_hosts, row.flow_hosts);
                        row.cr = Stat.calculateCr(row.approved_count, row.hits);
                        row.cr_unique = Stat.calculateCrUnique(row.approved_count, unique_count);
                        row.epc = Stat.calculateEpc(row.leads_payout, row.hits);
                        row.epc_unique = Stat.calculateEpcUnique(row.leads_payout, unique_count);
                        row.real_approve = Stat.calculateRealApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.expected_approve = Stat.calculateExpectedApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.approve = Stat.calculateApprove(row.approved_count, row.cancelled_count, row.held_count, row.trashed_count);

                        tpl_data.items.push(row);

                        tpl_data.total_hits += parseInt(row.hits);
                        tpl_data.total_unique_count += unique_count;
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
                        tpl_data.total_offer_hosts += parseInt(row.offer_hosts);
                        tpl_data.total_flow_hosts += parseInt(row.flow_hosts);
                    }

                    tpl_data.total_uc = Stat.calculateUc(tpl_data.total_offer_hosts, tpl_data.total_flow_hosts);
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

                renderTemplate(StatParameter.template_path + 'by_flow.hbs', tpl_data, '#handlebars_stat_tpl_wrap', {},
                    () => {

                        runTooltip();

                        if (response.response.length > 0) {
                            this.initDatatable();
                        }

                        bus.$emit('report-built');
                    }
                );
            });
        },

        getLeadLink(flow_hash = null) {
            let flow_hashes = is_null(flow_hash) ?
                _.get(this.filter_values, 'flow_hashes', [])
                : [flow_hash];

            let params = {
                flow_hashes: flow_hashes,
            };

            _.merge(params, _.omit(this.filter_values, [
                'flow_hashes', 'lead_statuses', 'currency_id'
            ]));

            return '/statistics/leads?' + http_build_query(params);
        },

        initDatatable() {
            if (is_null(this.datatable)) {
                this.datatable = Datatable.getInstance();
            }

            this.datatable.init('flow_stat_table', {
                aaSorting: [[1, "desc"]],
            });
        },
    }
});