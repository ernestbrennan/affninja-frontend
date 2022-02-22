Vue.component('by-days', {
    template: '#by_days_tpl',
    props: ['currency_id'],
    data() {
        return {
            rows: [],
            total: {},
            datatable: null,
            filters: [
                'date_from', 'date_to', 'flow_hashes', 'country_ids', 'offer_hashes', 'landing_hashes',
                'transit_hashes', 'currency_id', 'data1', 'data2', 'data3', 'data4', 'lead_statuses'
            ],
            filter_values: {},
        };
    },

    created() {
        let self = this;
        // Получаем статистику по часам при нажатии на заголовок даты
        $(document).on('click', '.stat_by_hour_link', function () {
            openInnerStat($(this), 'date', self.getStatByDayHours);
            fixStatFixedHeaderOnChangeCurrency();
        });
    },

    methods: {
        getStat() {
            this.filter_values = this.$parent.getFiltersData(this.filters);

            // Prevent change in apiRequest
            let params = {};
            _.assign(params, this.filter_values);

            apiRequest('stat.getByDay', 'GET', params, response => {

                let count_traffic_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.day.traffic),
                    count_coefficient_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.day.coefficient),
                    count_conversion_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.day.conversion),
                    count_finance_columns = StatColumns.getCountEnabledColumns(StatColumns.columns.day.finance),
                    unique_count;

                let tpl_data = {
                    LANG_STATISTICS: LANG_STATISTICS,
                    enabled_columns: StatColumns.columns.day,
                    count_traffic_columns: count_traffic_columns,
                    count_coefficient_columns: count_coefficient_columns,
                    count_conversion_columns: count_conversion_columns,
                    count_finance_columns: count_finance_columns,
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

                        row.leads_link = this.getLeadLink(row.date);

                        unique_count = parseInt(row.flow_hosts);

                        row.date_origin = row.date;
                        row.date = date('d.m.Y', strtotime(row.date));
                        row.date_timestamp = strtotime(row.date);
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


                renderTemplate(StatParameter.template_path + 'by_day.hbs', tpl_data, '#handlebars_stat_tpl_wrap', {},
                    () => {
                        if (response.response.length > 0) {
                            this.initDatatable();
                        }

                        runTooltip();
                        bus.$emit('report-built');
                    });
            });
        },

        getLeadLink(date = null) {
            let params = {
                date_from: date || this.filter_values.date_from,
                date_to: date || this.filter_values.date_to,
            };

            _.merge(params, _.omit(this.filter_values, [
                'date_from', 'date_to', 'lead_statuses', 'currency_id'
            ]));

            return '/statistics/leads'
                + '?' + http_build_query(params);
        },

        initDatatable() {
            if (is_null(this.datatable)) {
                this.datatable = Datatable.getInstance();
            }

            return this.datatable.init('day_stat_table', {
                columnDefs: [{targets: 0, type: 'title_de_date'}],
                aaSorting: [[0, "desc"]]
            });
        },

        getStatByDayHours(date) {

            let params = this.$parent.getFiltersData(this.filters);

            params.date_from = date;

            StatParameter.active_ajax_for_inside_tr_stat = true;

            ContentPreloader.show('#handlebars_stat_tpl_wrap');

            apiRequest('stat.getByDayHour', 'GET', params, result => {

                let tpl_data = {
                    LANG_STATISTICS: LANG_STATISTICS,
                    enabled_columns: StatColumns.columns.day,
                    items: []
                };


                if (Object.size(result.response) > 0) {

                    let row;
                    for (row of result.response) {

                        row.date = result.request.date_from;

                        row.leads_link = this.getLeadLink(row.date) + '&hour=' + row.hour;

                        row.time = row.hour + ':00';

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
                        row.cr_unique = Stat.calculateCrUnique(row.approved_count, row.flow_hosts);
                        row.epc = Stat.calculateEpc(row.leads_payout, row.hits);
                        row.epc_unique = Stat.calculateEpcUnique(row.leads_payout, row.flow_hosts);
                        row.real_approve = Stat.calculateRealApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.expected_approve = Stat.calculateExpectedApprove(row.approved_count, row.cancelled_count, row.held_count);
                        row.approve = Stat.calculateApprove(row.approved_count, row.cancelled_count, row.held_count, row.trashed_count);

                        tpl_data.items.push(row);
                    }
                }

                renderTemplate(StatParameter.template_path + 'by_day_hours.hbs',
                    tpl_data,
                    '#stat_tr_date-' + result.request.date_from,
                    {},
                    function () {
                        fixStatFixedHeaderOnChangeCurrency();
                        StatParameter.active_ajax_for_inside_tr_stat = false;
                        ContentPreloader.hide();
                        filters_bus.$emit('apply-filter-stop');
                        runTooltip();
                    }, 'after');
            });
        }
    }
});