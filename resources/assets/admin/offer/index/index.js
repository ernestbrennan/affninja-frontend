const bus = new Vue();

let vm = new Vue({
    el: '#offers',
    mixins: [filters_manager],
    data: {
        LANG_MESSAGES: LANG_MESSAGES,
        categories: CATEGORY_LIST || [],
        labels: OFFER_LABELS_LIST || [],
        category_id: 0,
        label_id: 0,
        filters: [
            'search', 'source_ids', 'currency_ids', 'country_ids',
        ],
    },

    created() {
        filters_bus.$on('filters-applies', () => {
            this.updatedOffers();
        });

        filters_bus.$on('filters-ready', () => {
            this.updatedOffers();
        });
    },

    mounted() {
        scrollHandler(() => {
            this.$refs.all_offers.getNextPage(this.getParams());
        });
    },

    methods: {
        openCreateOfferModal() {
            bus.$emit('open-create-offer-modal');
        },

        categoryUpdated(category_id) {
            this.category_id = category_id;
            this.$refs['all_offers'].reloadOffers(this.getParams());
        },

        labelUpdated(label_id) {
            this.label_id = label_id;
            this.$refs['all_offers'].reloadOffers(this.getParams());
        },

        updatedOffers() {
            this.$refs['all_offers'].reloadOffers(this.getParams());
        },

        getParams() {
            let params = this.getFiltersData(this.filters);

            params.for = 'offer_list';

            if (this.category_id) {
                params.category_ids = [this.category_id];
            }

            if (this.label_id) {
                params.labels = [this.label_id];
            }

            return params;
        },
    }
});