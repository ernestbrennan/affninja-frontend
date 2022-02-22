Vue.component('by-hours', {
    template: '#by_hours_tpl',
    props: ['currency_id'],
    data() {
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

            apiRequest('stat.getByHour', 'GET', params, response => {

                let unique_count = 0,
                    tpl_data = {
                        LANG_STATISTICS: LANG_STATISTICS,
                        enabled_columns: StatColumns.columns.hour,
                        mark_roi: StatColumns.mark_roi,
                        count_traffic_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.hour.traffic),
                        count_coefficient_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.hour.coefficient),
                        count_conversion_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.hour.conversion),
                        count_finance_columns: StatColumns.getCountEnabledColumns(StatColumns.columns.hour.finance),
                        is_striped_table: !StatColumns.mark_roi,
                        items: []
                    };

                if (response.response.length > 0) {

                    let row;
                    for (row of response.response) {

                        row.leads_link = this.getLeadLink(row.hour);

                        unique_count = parseInt(row.flow_hosts);

                        row.hour_from = row.hour + ':00';
                        row.hour_to = getNextHour(row.hour);
                        row.time = row.hour + ':00';

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
                    }
                }

                tpl_data.th_finance = getFinanceThTitle(this.currency_id);

                renderTemplate(StatParameter.template_path + 'by_hour.hbs', tpl_data, '#handlebars_stat_tpl_wrap', {},
                    () => {
                        runTooltip();

                        if (response.response.length > 0) {
                            this.initDatatable();
                        }

                        bus.$emit('report-built');
                    });
            });
        },

        getLeadLink(hour) {
            let params = {
                hour: hour,
            };

            _.merge(params, _.omit(this.filter_values, [
                'lead_statuses', 'currency_id'
            ]));

            return '/statistics/leads'
                + '?' + http_build_query(params);
        },

        initDatatable() {
            if (is_null(this.datatable)) {
                this.datatable = Datatable.getInstance();
            }

            this.datatable.init('hour_stat_table', {
                paginate: false,
                columnDefs: [
                    {targets: 0, type: 'title'},
                ],
                aaSorting: [[0, "asc"]],
            });
        }
    }
});