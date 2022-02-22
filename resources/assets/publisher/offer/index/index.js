const bus = new Vue();

let vm = new Vue({
    el: '#offers_list',
    mixins: [filters_manager],
    data: {
        categories: CATEGORY_LIST || [],
        labels: OFFER_LABELS_LIST || [],
        category_id: null,
        label_id: 0,
        filters: ['search', 'country_ids'],
    },

    created() {
        filters_bus.$on('filters-applies', () => {
            this.$nextTick(() => {
                this.updatedOffers();
            });
        });

        filters_bus.$on('filters-ready', () => {
            this.$nextTick(() => {
                this.updatedOffers();
            });
        });
    },

    mounted() {
        scrollHandler(() => {
            let params = this.getParams();
            this.$refs['all_offers'].getNextPage(params);
        });
    },

    methods: {
        categoryUpdated(category_id) {
            this.category_id = category_id;
            this.updatedOffers();
        },

        labelUpdated(label_id) {
            this.label_id = label_id;
            this.$refs['all_offers'].reloadOffers(this.getParams());
        },

        updatedOffers() {
            let params = this.getParams();
            this.$refs['all_offers'].reloadOffers(params);
        },

        getParams() {
            let params = this.getFiltersData(this.filters);

            params.for = 'offer_list';
            params.with_already_added = 1;

            if (this.category_id !== null) {
                params.category_ids = [this.category_id];
            }

            if (this.label_id) {
                params.labels = [this.label_id];
            }

            return params;
        },
    }
});