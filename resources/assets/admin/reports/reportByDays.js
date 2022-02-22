Vue.component('by-days', {
    template: '#by_days_tpl',
    mixins: [filters_manager],
    data() {
        return {
            rows: [],
            total: {},
            level_1_group_by: null,
            level_2_group_by: null,
            level_3_group_by: null,
            level_4_group_by: null,
            additional_url_params: {
                sort_by: UrlParameter.getSortBy() || 'title',
                sorting: UrlParameter.getSortingOrNull() || 'desc',
            },
            filters: [
                'date_to', 'date_from', 'currency_ids', 'publisher_hashes', 'advertiser_hashes', 'offer_hashes',
                'target_geo_country_ids',
            ],
            rows_loading: false,
            reports_loading: false,
        };
    },
    created() {
        filters_bus.$on('group-fields-init', params => {
            this.level_1_group_by = params.level_1_group_by;
            this.level_2_group_by = params.level_2_group_by;
            this.level_3_group_by = params.level_3_group_by;
            this.level_4_group_by = params.level_4_group_by;
        });

        filters_bus.$on('group-fields-applies', params => {
            this.level_1_group_by = params.level_1_group_by;
            this.level_2_group_by = params.level_2_group_by;
            this.level_3_group_by = params.level_3_group_by;
            this.level_4_group_by = params.level_4_group_by;
        });
    },

    mounted() {
        this.initDatatable();
        TableHighlighter.init();
    },

    watch: {
        'rows_loading'() {
            if (this.rows_loading) {
                filters_bus.$emit('apply-filter-start');

            } else {

                filters_bus.$emit('apply-filter-stop');

                this.$nextTick(() => {

                    this.initDatatable();

                    runTooltip();

                    this.$emit('report-built');
                });
            }
        },
    },
    methods: {

        getReport() {
            this.rows_loading = true;

            let params = this.getFiltersData(this.filters);

            params.level = 1;
            params.group_field = this.level_1_group_by;
            params.sort_by = this.additional_url_params.sort_by;
            params.sorting = this.additional_url_params.sorting;

            this.rows.splice(0);

            api.get('/lead.buildReport', {params: params}).then(response => {

                _.assign(this.total, response.data.response.total);

                let row;
                for (row of response.data.response.stats) {
                    row.show_children = false;
                    row.children = [];
                    this.rows.push(row);
                }

                this.rows_loading = false;
            }, () => {
                this.rows_loading = false;
            });
        },

        getSecondLevelReport(first, first_index, event) {
            if (this.reports_loading) {
                return;
            }

            if (is_null(this.level_2_group_by) || this.level_2_group_by === undefined) {
                return;
            }

            this.toggleVisibility(first);

            if (first.children.length) {
                return;
            }

            this.reports_loading = true;

            let preloader = SmallPreloader.show(event.target);

            let params = this.getFiltersData(this.filters);
            params.level = 2;
            params.group_field = this.level_2_group_by;
            params.sort_by = this.additional_url_params.sort_by;
            params.sorting = this.additional_url_params.sorting;

            params.level_1_field = this.level_1_group_by;
            params.level_1_value = first.id;

            api.get('/lead.buildReport', {params: params}).then(response => {

                let row;
                for (row of response.data.response.stats) {
                    row.show_children = false;
                    row.children = [];
                    this.rows[first_index].children.push(row);
                }

                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            }, () => {
                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            });
        },

        getThirdLevelReport(first, first_index, second, second_index, event) {
            if (this.reports_loading) {
                return;
            }

            if (is_null(this.level_3_group_by) || this.level_3_group_by === undefined) {
                return;
            }

            this.toggleVisibility(second);

            if (second.children.length) {
                return;
            }

            this.reports_loading = true;

            let preloader = SmallPreloader.show(event.target);

            let params = this.getFiltersData(this.filters);
            params.level = 3;
            params.group_field = this.level_3_group_by;
            params.sort_by = this.additional_url_params.sort_by;
            params.sorting = this.additional_url_params.sorting;

            params.level_1_field = this.level_1_group_by;
            params.level_1_value = first.id;
            params.level_2_field = this.level_2_group_by;
            params.level_2_value = second.id;

            api.get('/lead.buildReport', {params: params}).then(response => {

                let row;
                for (row of response.data.response.stats) {
                    row.show_children = false;
                    row.children = [];
                    this.rows[first_index].children[second_index].children.push(row);
                }
                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            }, () => {
                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            });
        },

        getFourthLevelReport(first, first_index, second, second_index, third, third_index, event) {
            if (this.reports_loading) {
                return;
            }

            if (is_null(this.level_4_group_by) || this.level_4_group_by === undefined) {
                return;
            }

            this.toggleVisibility(third);

            if (third.children.length) {
                return;
            }

            this.reports_loading = true;

            let preloader = SmallPreloader.show(event.target);

            let params = this.getFiltersData(this.filters);

            params.sort_by = this.additional_url_params.sort_by;
            params.sorting = this.additional_url_params.sorting;

            params.level = 4;
            params.group_field = this.level_4_group_by;

            params.level_1_field = this.level_1_group_by;
            params.level_1_value = first.id;
            params.level_2_field = this.level_2_group_by;
            params.level_2_value = second.id;
            params.level_3_field = this.level_3_group_by;
            params.level_3_value = third.id;

            api.get('/lead.buildReport', {params: params}).then(response => {

                let row;
                for (row of response.data.response.stats) {
                    row.show_children = false;
                    row.children = [];
                    this.rows[first_index].children[second_index].children[third_index].children.push(row);
                }
                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            }, () => {
                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            });
        },

        toggleVisibility(row) {
            row.show_children = !row.show_children;

            if (!row.show_children) {
                row.children.forEach((index, target) => {
                    row.show_children = false;
                });
            }
        },

        getLeadLink(current = null, status = null, first = null, second = null, third = null) {
            let params = this.getFiltersData(this.filters);

            params.lead_statuses = [status];

            if (!is_null(first)) {
                params = this.getQueryParamsByRaw(first, params);
            }
            if (!is_null(second)) {
                params = this.getQueryParamsByRaw(second, params);
            }
            if (!is_null(third)) {
                params = this.getQueryParamsByRaw(third, params);
            }
            if (!is_null(current)) {
                params = this.getQueryParamsByRaw(current, params);
            }

            return '/leads?' + http_build_query(params);
        },

        getQueryParamsByRaw(row, params) {
            switch (_.get(row, 'group_field')) {
                case 'created_at':
                    params.date_from = row.id;
                    params.date_to = params.date_from;
                    break;

                case 'processed_at':
                    params.processed_date_from = row.id;
                    params.processed_date_to = params.processed_date_from;
                    break;

                case 'publisher_hash':
                    params.publisher_hashes = [row.id];
                    break;

                case 'advertiser_hash':
                    params.advertiser_hashes = [row.id];
                    break;

                case 'offer_hash':
                    params.offer_hashes = [row.id];
                    break;

                case 'country_id':
                    params.target_geo_country_ids = [row.id];
                    break;

                case 'target_geo':
                    params.target_geo_country_ids = [row.id];
                    break;

                case 'processed_at_held':
                    params.date_from = row.id;
                    params.date_to = row.id;
                    break;
            }

            return params;
        },

        initDatatable() {
            this.$refs.datatable.init(
                'by_days_table',
                this.additional_url_params.sort_by,
                this.additional_url_params.sorting
            )
        },

        onDatatableChangeSort(params) {
            this.additional_url_params.sort_by = params.sort_by;
            this.additional_url_params.sorting = params.sorting;

            vm.getReport('days');
        }
    }
});
