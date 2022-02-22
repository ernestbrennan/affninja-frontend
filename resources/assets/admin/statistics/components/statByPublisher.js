Vue.component('by-publishers', {
    template: '#by_publishers_tpl',
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
    mounted() {
        let self = this;
        $(document).on('click', '.stat_by_flow_link', function () {
            openInnerStat($(this), 'publisher', self.getStatByFlow);
        });
    },
    methods: {
        getStat() {
            this.filter_values = this.$parent.getFiltersData(this.filters);

            // Prevent change in apiRequest
            let params = {};
            _.assign(params, this.filter_values);

            apiRequest('stat.getByPublisher', 'GET', params, response => {

                let data = response.response,
                    count_traffic_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.publisher.traffic),
                    count_coefficient_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.publisher.coefficient),
                    count_conversion_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.publisher.conversion),
                    count_finance_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.publisher.finance);

                let tpl_data = {
                    LANG_STATISTICS: LANG_STATISTICS,
                    enabled_columns: StatColumns.columns.publisher,
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
                    tpl_data.total_profit = 0;

                    let row;
                    for (row of data) {
                        row.leads_link = this.getLeadLink(row.user_hash);

                        row.unique_count = parseInt(row.flow_hosts);

                        row.approved_count = parseInt(row.approved_count);
                        row.cancelled_count = parseInt(row.cancelled_count);
                        row.trashed_count = parseInt(row.trashed_count);
                        row.leads_payout = parseFloat(row.leads_payout);
                        row.held_count = parseInt(row.held_count);
                        row.epc = Stat.calculateEpc(row.leads_payout, row.hits);
                        row.ontrash_payout = parseFloat(row.ontrash_payout);
                        row.real_approve = Stat.calculateRealApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.expected_approve = Stat.calculateExpectedApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.enrolled_payout = Stat.calculateEnrolled(row.leads_payout, row.revshare_payout);
                        row.epc_unique = Stat.calculateEpcUnique(row.leads_payout, row.unique_count);
                        row.total_payout = row.onhold_payout + row.oncancel_payout + row.ontrash_payout + row.leads_payout;
                        row.approve = Stat.calculateApprove(row.approved_count, row.cancelled_count, row.held_count, row.trashed_count);
                        row.cr = Stat.calculateCr(row.approved_count, row.hits);
                        row.total_leads = row.approved_count + row.held_count + row.cancelled_count + row.trashed_count;
                        row.cr_unique = Stat.calculateCrUnique(row.approved_count, row.unique_count);
                        row.profit = parseFloat(row.profit);


                        tpl_data.items.push(row);

                        tpl_data.total_hits += parseInt(row.hits);
                        tpl_data.total_unique_count += row.unique_count;
                        tpl_data.total_traffback_count += parseInt(row.traffback_count);
                        tpl_data.total_approved_count += parseInt(row.approved_count);
                        tpl_data.total_held_count += parseInt(row.held_count);
                        tpl_data.total_cancelled_count += parseInt(row.cancelled_count);
                        tpl_data.total_trashed_count += parseInt(row.trashed_count);
                        tpl_data.total_onhold_payout += parseFloat(row.onhold_payout);
                        tpl_data.total_leads_payout += parseFloat(row.leads_payout);
                        tpl_data.total_revshare_payout += parseFloat(row.revshare_payout);
                        tpl_data.total_oncancel_payout += parseFloat(row.oncancel_payout) + parseFloat(row.ontrash_payout);
                        tpl_data.total_traffic_cost += parseFloat(row.traffic_cost);
                        tpl_data.total_bot_count += parseFloat(row.bot_count);
                        tpl_data.total_landing_unique_count += parseInt(row.landing_unique_count);
                        tpl_data.total_transit_hosts += parseInt(row.transit_hosts);
                        tpl_data.total_safepage_count += parseInt(row.safepage_count);
                        tpl_data.total_total_leads += row.total_leads;
                        tpl_data.total_total_payout += row.total_payout;
                        tpl_data.total_ontrash_payout += parseFloat(row.ontrash_payout);
                        tpl_data.total_cr_unique = Stat.calculateCrUnique(tpl_data.total_approved_count, tpl_data.total_unique_count);
                        tpl_data.total_profit += parseFloat(row.profit);
                    }

                    tpl_data.total_cr = Stat.calculateCr(tpl_data.total_approved_count, tpl_data.total_hits);
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

                    tpl_data.total_enrolled_payout = Stat.calculateEnrolled(tpl_data.total_leads_payout, tpl_data.total_revshare_payout);
                    tpl_data.total_roi = Stat.calculateRoi(tpl_data.total_enrolled_payout, tpl_data.total_traffic_cost);
                    tpl_data.total_roi_title = Stat.getRoiTitle(
                        tpl_data.total_roi,
                        tpl_data.total_enrolled_payout,
                        tpl_data.total_traffic_cost
                    );

                    tpl_data.total_leads_link = this.getLeadLink();
                }

                renderTemplate(StatParameter.template_path + 'by_publisher.hbs', tpl_data, '#handlebars_stat_tpl_wrap', {},
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

        getLeadLink(publisher_hash = null, flow_hash = null, status = null) {

            let publisher_hashes = is_null(publisher_hash) ?
                _.get(this.filter_values, 'publisher_hashes', [])
                : [publisher_hash];

            let flow_hashes = is_null(flow_hash) ?
                _.get(this.filter_values, 'flow_hashes', [])
                : [flow_hash];


            let params = {
                publisher_hashes: publisher_hashes,
                flow_hashes: flow_hashes,
            };

            _.merge(params, _.omit(this.filter_values, [
                'publisher_hashes', 'flow_hashes', 'lead_statuses', 'currency_id'
            ]));

            return '/leads?' + http_build_query(params);
        },

        initDatatable() {
            if (is_null(this.datatable)) {
                this.datatable = Datatable.getInstance();
            }

            this.datatable.init('publisher_stat_table', {
                aaSorting: [[1, "desc"]],
            });
        },

        getStatByFlow(publisher_hash) {
            let params = this.$parent.getFiltersData(this.filters);

            params.publisher_hashes = [publisher_hash];

            StatParameter.active_ajax_for_inside_tr_stat = true;
            ContentPreloader.show('#statistics_table_wrap');
            filters_bus.$emit('appy-filter-start');

            apiRequest('stat.getByFlow', 'GET', params, response => {

                let count_traffic_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.publisher.traffic),
                    count_coefficient_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.publisher.coefficient),
                    count_conversion_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.publisher.conversion),
                    count_finance_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.publisher.finance);

                let tpl_data = {
                    LANG_STATISTICS: LANG_STATISTICS,
                    enabled_columns: StatColumns.columns.publisher,
                    count_traffic_columns: count_traffic_columns,
                    count_coefficient_columns: count_coefficient_columns,
                    count_conversion_columns: count_conversion_columns,
                    count_finance_columns: count_finance_columns,
                    is_striped_table: !StatColumns.mark_roi,
                    th_finance: getFinanceThTitle(this.currency_id),
                    publisher_hash: response.request.publisher_hashes[0],
                    items: []
                };

                if (response.response.length > 0) {

                    tpl_data.total_hits = 0;
                    tpl_data.total_unique_count = 0;
                    tpl_data.total_traffback_count = 0;
                    tpl_data.total_approved_count = 0;
                    tpl_data.total_held_count = 0;
                    tpl_data.total_cancelled_count = 0;
                    tpl_data.total_trashed_count = 0;
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
                    tpl_data.total_cr_unique = 0;
                    tpl_data.total_ontrash_payout = 0;
                    tpl_data.total_total_leads = 0;
                    tpl_data.total_profit = 0;

                    let row;
                    for (row of response.response) {

                        row.leads_link = this.getLeadLink(tpl_data.publisher_hash, row.flow_hash);

                        row.flow_title_small = truncateStr(row.flow_title, 20, false, true);
                        row.unique_count = parseInt(row.flow_hosts);
                        row.approved_count = parseInt(row.approved_count);
                        row.cancelled_count = parseInt(row.cancelled_count);
                        row.trashed_count = parseInt(row.trashed_count);
                        row.leads_payout = parseFloat(row.leads_payout);
                        row.held_count = parseInt(row.held_count);
                        row.epc = Stat.calculateEpc(row.leads_payout, row.hits);
                        row.ontrash_payout = parseFloat(row.ontrash_payout);
                        row.real_approve = Stat.calculateRealApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.expected_approve = Stat.calculateExpectedApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.enrolled_payout = Stat.calculateEnrolled(row.leads_payout, row.revshare_payout);
                        row.epc_unique = Stat.calculateEpcUnique(row.leads_payout, row.unique_count);
                        row.total_payout = row.onhold_payout + row.oncancel_payout + row.ontrash_payout + row.leads_payout;
                        row.approve = Stat.calculateApprove(row.approved_count, row.cancelled_count, row.held_count, row.trashed_count);
                        row.cr = Stat.calculateCr(row.approved_count, row.hits);
                        row.total_leads = row.approved_count + row.held_count + row.cancelled_count + row.trashed_count;
                        row.cr_unique = Stat.calculateCrUnique(row.approved_count, row.unique_count);
                        row.profit = parseFloat(row.profit);


                        tpl_data.items.push(row);

                        tpl_data.total_hits += parseInt(row.hits);
                        tpl_data.total_unique_count += row.unique_count;
                        tpl_data.total_traffback_count += parseInt(row.traffback_count);
                        tpl_data.total_approved_count += parseInt(row.approved_count);
                        tpl_data.total_held_count += parseInt(row.held_count);
                        tpl_data.total_cancelled_count += parseInt(row.cancelled_count);
                        tpl_data.total_trashed_count += parseInt(row.trashed_count);
                        tpl_data.total_onhold_payout += parseFloat(row.onhold_payout);
                        tpl_data.total_leads_payout += parseFloat(row.leads_payout);
                        tpl_data.total_revshare_payout += parseFloat(row.revshare_payout);
                        tpl_data.total_oncancel_payout += parseFloat(row.oncancel_payout) + parseFloat(row.ontrash_payout);
                        tpl_data.total_traffic_cost += parseFloat(row.traffic_cost);
                        tpl_data.total_bot_count += parseFloat(row.bot_count);
                        tpl_data.total_landing_unique_count += parseInt(row.landing_unique_count);
                        tpl_data.total_transit_hosts += parseInt(row.transit_hosts);
                        tpl_data.total_safepage_count += parseInt(row.safepage_count);
                        tpl_data.total_total_leads += row.total_leads;
                        tpl_data.total_total_payout += row.total_payout;
                        tpl_data.total_ontrash_payout += parseFloat(row.ontrash_payout);
                        tpl_data.total_cr_unique = Stat.calculateCrUnique(tpl_data.total_approved_count, tpl_data.total_unique_count);
                        tpl_data.total_profit += parseFloat(row.profit);
                    }

                    tpl_data.total_cr = Stat.calculateCr(tpl_data.total_approved_count, tpl_data.total_hits);
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

                    tpl_data.total_enrolled_payout = Stat.calculateEnrolled(tpl_data.total_leads_payout, tpl_data.total_revshare_payout);
                    tpl_data.total_roi = Stat.calculateRoi(tpl_data.total_enrolled_payout, tpl_data.total_traffic_cost);
                    tpl_data.total_roi_title = Stat.getRoiTitle(
                        tpl_data.total_roi,
                        tpl_data.total_enrolled_payout,
                        tpl_data.total_traffic_cost
                    );
                }

                renderTemplate(StatParameter.template_path + 'by_publisher_flow.hbs',
                    tpl_data,
                    '#stat_tr_publisher_' + tpl_data.publisher_hash,
                    {},
                    function () {
                        runTooltip();
                        fixStatFixedHeaderOnChangeCurrency();

                        StatParameter.active_ajax_for_inside_tr_stat = false;
                        ContentPreloader.hide();
                        filters_bus.$emit('apply-filter-stop');
                    },
                    'after'
                );
            });

        }
    }
});