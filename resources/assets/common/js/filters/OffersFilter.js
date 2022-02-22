Vue.component('offers-filter', {
    props: {
        add_empty_offer_item: {
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            name: 'offer_hashes',
            LANG_FILTERS: LANG_FILTERS,
            selected: [],
            offers: [],
            url_values: [],
            loading: false,
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.url_values = getVarsFromUrl(this.name) || [];
        filters_bus.$emit(this.name + '-init', this.url_values);

        this.getOffers();
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'hash'))
        }
    },

    methods: {
        getOffers() {
            this.loading = true;

            Offer.getList().then(offers => {
                if (this.add_empty_offer_item) {
                    this.offers.push({title: LANG_FILTERS.without_offer, hash: 0});
                }

                offers.forEach(offer => {
                    this.offers.push(offer);
                });

                let index;
                this.offers.forEach(item => {
                    index = this.url_values.indexOf(item.hash);
                    if (index !== -1) {
                        this.selected.push(item)
                    }
                });
                this.loading = false;
            })

        },
    },
    template: `<div class="filter">
      <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button"
      >{{ LANG_FILTERS.offers }}<b v-if="selected.length"> {{ selected.length }}</b></b></button>
      <div v-show="is_open" class="filter_wrap_new">
        <select-item v-model="selected" :options="offers" :multiple="true" track_by="hash"
            :close_on_select="false" 
            :search="true" 
            :allow_empty="true"
            :loading="loading"
            :hide_selected="true">
        </select-item>
        </div>
      </div>
    </div>`
});
