Vue.component('offer-search', {
    mixins: [search_select_mixin],
    data() {
        return {
            name: 'offer_id',
            offers: [],
            default_option: {title: LANG_NEWS.without_offer, id: null},
            init: false,
        }
    },

    created() {
        if (is_null(this.value)) {
            this.updateSelected(this.default_option);
        }
    },

    watch: {
        'value': {
            immediate: true,
            handler() {
                if (!Object.size(this.value) || this.init) {
                    return;
                }

                this.init = true;
                this.offers.splice(0);

                if (this.value.id) {
                    this.offers.push(this.value);
                }

                this.offers.push(this.default_option);
            },
        },
    },

    methods: {
        onSearch(search) {
            if (search.length < 2) {
                return;
            }

            this.loading = true;

            Offer.getList([], search).then(offers => {
                this.offers.splice(0);

                offers.push(this.default_option);
                Vue.set(this, 'offers', offers);

                this.$nextTick(() => {
                    this.loading = false;
                });
            });
        },
    },

    template: `
        <multiselect :value="value"
                     track-by="id"
                     :options="offers"
                     label="title"
                     :searchable="true"
                     :close-on-select="true"
                     :show-labels="false"
                     :placeholder="LANG_MESSAGES.search"
                     :allow-empty="false"
                     @input="updateSelected"
                     :multiple="false"
                     open-direction="bottom"
                     :loading="loading"
                     :disabled="false"
                     @search-change="onSearchChange">
            <span slot="noResult">{{ LANG_FILTERS.nothing_found }}</span>
        </multiselect>`,
});
