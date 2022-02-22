Vue.component('by-days', {
    template: '#by_days_tpl',
    mixins: [currency_mixin],
    data: () => {
        return {
            days: [],
            total: {},
            existing_currencies: [],
            custom_sort: null
        };
    },

    created() {
        CustomSort.initDefaultSorting('id', 'desc');
        this.custom_sort = CustomSort.getInstance();
    },

    mounted() {
        this.initDatatable();
    },

    watch: {
        'days'() {
            this.$nextTick(() => {
                this.$emit('report-built');

                this.initDatatable();

                runTooltip();
            });
        }
    },

    methods: {

        getReport() {
            this.custom_sort.validateSortingColumn();

            let params = Filters.getData();

            api.get('/stat.getByDay', {params: params}).then(response => {
                    this.days = response.data.response.stats;
                    this.total = response.data.response.total;
                    this.existing_currencies = response.data.response.existing_currencies;
                }
            );
        },

        getLeadLink(day, status = null) {
            return '/leads'
                + '?date_from=' + _.get(day, 'id', UrlParameter.getDateFrom())
                + '&date_to=' + _.get(day, 'id', UrlParameter.getDateTo())
                + '&lead_statuses[]=' + status
                + '&' + http_build_query(_.omit(Filters.getData(), ['date_from', 'date_to', 'lead_statuses']));
        },

        initDatatable() {
            this.custom_sort.initTable({
                table_id: 'by_days_table',
                onsort_callback() {
                    vm.getReport('days');
                }
            });
        }
    }
});
