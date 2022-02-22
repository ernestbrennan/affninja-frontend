new Vue({
    el: '#api-logs',
    mixins: [filters_manager],
    data() {
        return {
            api_logs: [],
            filters: ['date_to', 'date_from', 'user_hashes', 'api_methods'],
            loading: false,
            pagination: {
                loading: false,
                page: 1,
                per_page: 50,
                finished: false,
                active_ajax: false,
            },
        }
    },

    created() {
        filters_bus.$on('filters-applies', () => {
            this.api_logs.splice(0);

            this.refreshPagination();
            this.getApiLogs();
        });
    },

    mounted() {
        this.getApiLogs();

        scrollHandler(() => {
            if (this.pagination.finished || this.pagination.active_ajax) {
                return false;
            }

            this.pagination.page++;
            this.getApiLogs();
        });
    },

    watch: {
        'pagination.loading'() {
            if (this.pagination.loading && !this.api_logs.length) {
                return filters_bus.$emit('apply-filter-start');
            }

            filters_bus.$emit('apply-filter-stop');

            this.$nextTick(() => {
                runPopover();
            });
        },
    },

    methods: {
        getApiLogs() {
            this.pagination.loading = true;
            this.pagination.active_ajax = true;

            let params = this.getFiltersData(this.filters);
            params.page = this.pagination.page;
            params.per_page = this.pagination.per_page;

            api.get('/api_log.getList', {params: params}).then(response => {

                this.pagination.finished = response.data.response.all_loaded;

                response.data.response.data.forEach(api_log => {
                    this.api_logs.push(api_log);
                });

                this.pagination.loading = false;
                this.pagination.active_ajax = false;
            }, () => {
                this.pagination.loading = false;
                this.pagination.active_ajax = false;
            });
        },

        refreshPagination() {
            this.pagination.page = 1;
            this.pagination.finished = false;
        },
    },
});