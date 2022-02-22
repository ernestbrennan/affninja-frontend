const reports_mixin = {
    data: () => {
        return {
            LANG_STATISTICS: LANG_STATISTICS,
            rows: [],
            total: {},
            level_1_group_by: null,
            level_2_group_by: null,
            level_3_group_by: null,
            level_4_group_by: null,
            filters: [
                'date_from', 'date_to', 'currency_ids', 'offer_hashes', 'target_geo_country_ids', 'sort_by', 'sorting',
                'flow_hashes'
            ],
            reports_loading: false,
            rows_loading: false,
        }
    },

    mounted() {
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
                    bus.$emit('report-built');
                });
            }
        },
    },

    methods: {
        getTitle(group_by, title) {
            if (title !== '') {
                return title;
            }

            switch (group_by) {
                case 'data1':
                case 'data2':
                case 'data3':
                case 'data4':
                    return LANG_MESSAGES.not_specified;

                case 'landing':
                    return LANG_STATISTICS.landing_is_undefined;

                case 'transit':
                    return LANG_STATISTICS.transit_is_undefined;

                case 'browser':
                case 'os_platform':
                    return LANG_STATISTICS.undefined;

                default:
                    return title;
            }
        },

        getDataColumnTitle(str) {

            switch (this.currency_id) {
                case CURRENCY_RUB_ID:
                    return 'rub_' + str;

                case CURRENCY_USD_ID:
                    return 'usd_' + str;

                case CURRENCY_EUR_ID:
                    return 'eur_' + str;

                default:
                    throw 'Unknown currency id';
            }
        },

        getLeadLink(current = null, status = null, first = null, second = null, third = null) {
            let params = this.$parent.getFiltersData(this.filters);

            params.lead_statuses = [status];

            if (!is_null(first)) {
                this.getQueryParamsByRaw(first, params);
            }
            if (!is_null(second)) {
                this.getQueryParamsByRaw(second, params);
            }
            if (!is_null(third)) {
                this.getQueryParamsByRaw(third, params);
            }
            if (!is_null(current)) {
                this.getQueryParamsByRaw(current, params);
            }

            return '/statistics/leads?' + http_build_query(params);
        },

        getQueryParamsByRaw(row, params) {
            switch (_.get(row, 'group_field')) {
                case 'datetime':
                    params.date_from = row.id;
                    params.date_to = params.date_from;
                    break;

                case 'week_day':
                    params.week_day = [row.id];
                    break;

                case 'target_geo_country':
                    params.target_geo_country_ids = [row.id];
                    break;

                case 'hour':
                    params.hour = row.id;
                    break;

                case 'offer_country':
                    let [offer_hash, target_geo_country_id] = row.id.split(',');

                    params.offer_hashes = [offer_hash];
                    params.target_geo_country_ids = [target_geo_country_id];
                    break;

                case 'flow':
                    params.flow_hashes = [row.id];
                    break;

                case 'offer':
                    params.offer_hashes = [row.id];
                    break;

                case 'landing':
                    params.landing_hashes = [row.id];
                    break;

                case 'transit':
                    params.transit_hashes = [row.id];
                    break;

                case 'country':
                    params.country_ids = [row.id];
                    break;

                case 'region':
                    params.region_id = row.id;
                    break;

                case 'city':
                    params.city_id = row.id;
                    break;

                case 'device_type':
                    params.device_type_ids = [row.id];
                    break;

                case 'browser':
                    params.browser_ids = [row.id];
                    break;

                case 'os_platform':
                    params.os_platform_ids = [row.id];
                    break;

                case 'data1':
                    params.data1 = [row.id];
                    break;

                case 'data2':
                    params.data2 = [row.id];
                    break;

                case 'data3':
                    params.data3 = [row.id];
                    break;

                case 'data4':
                    params.data4 = [row.id];
                    break;
            }
        },

        toggleVisibility(row) {
            row.show_children = !row.show_children;

            if (!row.show_children) {
                row.children.forEach((index, target) => {
                    row.show_children = false;
                });
            }
        },

        initDatatable() {
            this.$refs.datatable.init(
                this.table_id,
                UrlParameter.getSortBy() || 'title',
                UrlParameter.getSorting() || 'desc',
            )
        },

        onDatatableChangeSort(params) {
            filters_bus.$emit('sort_by-changed', params.sort_by);
            filters_bus.$emit('sorting-changed', params.sorting);
            filters_bus.$emit('filters-applies');
        },
    },
};
