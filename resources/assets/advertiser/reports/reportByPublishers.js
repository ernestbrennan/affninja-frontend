Vue.component('by-publishers', {
    template: '#by_publishers_tpl',
    mixins: [currency_mixin],
    data() {
        return {
            publishers: [],
            total: {},
            custom_sort: null,
            existing_currencies: [],
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
        'publishers'() {
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

            api.get('/stat.getByPublisher', {params: params}).then(response => {
                    this.publishers = response.data.response.stats;
                    this.total = response.data.response.total;
                    this.existing_currencies = response.data.response.existing_currencies;
                }
            );
        },

        getLeadLink(publisher_hash = null, status = null) {
            let params = Filters.getData();

            if (!is_null(publisher_hash)) {
                params.search_field = 'publisher_hash';
                params.search = publisher_hash;
            }

            return '/leads?' + 'lead_statuses[]=' + status + '&' + http_build_query(params);
        },

        initDatatable() {
            this.custom_sort.initTable({
                table_id: 'by_publishers_table',
                onsort_callback: function () {
                    vm.getReport('publishers');
                }
            });
        }
    }
});
