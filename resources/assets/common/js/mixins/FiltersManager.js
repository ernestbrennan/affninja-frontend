let filters_bus = new Vue();

let filters_manager = {
    data() {
        return {
            filter_values: {},
            total_filters: null
        };
    },

    watch: {
        'total_filters'() {
            // @todo Return if (this.total_filters === 0) when remove all prepared stat tabs
            if (this.total_filters < 1) {
                filters_bus.$emit('filters-ready');
            }
        },
    },

    created() {
        if (!isset(this.filters) || !this.filters instanceof Array || !this.filters.length) {
            throw 'Specify filters for this page before using filters mixin.';
        }

        this.total_filters = this.filters.length;

        this.filters.forEach(item => {
            filters_bus.$on(item + '-init', value => {
                Vue.set(this.filter_values, item, value);
                this.total_filters--;
            });

            filters_bus.$on(item + '-updated', value => {
                Vue.set(this.filter_values, item, value);
            });
        });

        filters_bus.$on('filters-applies', () => {
            let qs = '?' + http_build_query(_.merge(this.filter_values, _.get(this, 'additional_url_params', [])));
            if (qs !== location.search) {
                history.pushState("", "", location.pathname + qs);
            }
        });

        // Hide all filters on click outside filters
        $(document).click(function (e) {
            let el = $(e.target);
            if (el.closest(".filter_wrap_new").length || el.hasClass('btn-select')) {
                return;
            }
            filters_bus.$emit('filter-opened', 'close_all_filters');

            e.stopPropagation();
        });
    },

    methods: {
        getFiltersData(filters) {
            return _.pick(_.merge(this.filter_values, _.get(this, 'additional_url_params', [])), filters);
        }
    }
};
