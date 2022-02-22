Vue.component('advertisers-filter', {
    data() {
        return {
            name: 'advertiser_hashes',
            LANG_FILTERS: LANG_FILTERS,
            LANG_MESSAGES: LANG_MESSAGES,
            advertiser_hashes: null,
            loading: false,
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.advertiser_hashes = getVarsFromUrl(this.name) || [];
        filters_bus.$emit(this.name + '-init', this.advertiser_hashes);
    },

    watch: {
        'advertiser_hashes'() {
            filters_bus.$emit(this.name + '-updated', this.advertiser_hashes)

        }
    },

    methods: {
        onAdvertiserUpdated(advertiser_hashes) {
            if (advertiser_hashes === undefined || is_null(advertiser_hashes)) {
                return;
            }
            this.advertiser_hashes = advertiser_hashes;
        }
    },

    template: `
    <div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
           {{ LANG_FILTERS.advertiser_filter }}
           <b v-if="advertiser_hashes !== null && advertiser_hashes.length"
              @click.stop="is_open = !is_open">{{ advertiser_hashes.length }}</b>
        </button>
        <div v-show="is_open" class="filter_wrap_new">
            <advertisers-select v-if="advertiser_hashes !== null"
                                :multiple="true"
                                :value="advertiser_hashes"
                                :allow_empty="true"
                                @updated="onAdvertiserUpdated"
            ></advertisers-select>
        </div>
    </div>`
});
