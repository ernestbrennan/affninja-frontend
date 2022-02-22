Vue.component('transits-filter', {
    data() {
        return {
            name: 'transit_hashes',
            FILTER_TITLE: LANG_FILTERS.transits,
            selected: [],
            transits: [],
            url_values: [],
            offer_hashes: [],
            loading: false,

            default_option: {
                hash: 'empty',
                title: LANG_STATISTICS.transit_is_undefined,
            },
        };
    },
    mixins: [filters_mixin],

    created() {
        filters_bus.$on('offer_hashes-init', offer_hashes => {
            this.offer_hashes = offer_hashes
        });

        filters_bus.$on('offer_hashes-updated', offer_hashes => {
            this.offer_hashes = offer_hashes
        });

        filters_bus.$on('transit_hashes-refresh', () => {
            this.getTransits();
        });
    },

    mounted() {
        this.url_values = getVarsFromUrl(this.name) || [];

        if (this.url_values.length === 1 && this.url_values[0] === 'empty') {
            this.transits.push(this.default_option);
            this.selected.push(this.default_option);
            return filters_bus.$emit(this.name + '-init', this.url_values);
        }

        filters_bus.$emit(this.name + '-init', this.url_values);

        this.getTransits();
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'hash'))
        }
    },

    methods: {
        getTransits() {
            if (!this.offer_hashes.length && !this.url_values.length) {
                return;
            }

            this.loading = true;

            if (this.offer_hashes.length) {
                Transit.getList(this.offer_hashes, ['locale']).then(transits => {
                    this.getTransitsCallback(transits);
                }, () => {
                    this.selected.splice(0);
                });
            } else if (this.url_values.length) {
                Transit.getList([], ['locale'], this.url_values).then(transits => {
                    this.getTransitsCallback(transits);

                    this.url_values.splice(0);
                }, () => {
                    this.selected.splice(0);
                });
            }
        },

        getTransitsCallback(transits) {
            this.selected.splice(0);
            this.transits = transits;

            let index;
            this.transits.forEach(item => {
                index = this.url_values.indexOf(item.hash);
                if (index !== -1) {
                    this.selected.push(item)
                }
            });
            this.loading = false;
        },
    },
    template: `
    <div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
            {{ FILTER_TITLE }}<b v-if="selected.length" @click.stop="is_open = !is_open"> {{ selected.length }}</b></button>
        <div v-show="is_open" class="filter_wrap_new">
            <select-item v-model="selected" :options="transits" :multiple="true" track_by="hash"
                :close_on_select="false" 
                :search="true" 
                :allow_empty="true"
                :loading="loading"
                :hide_selected="true">
            </select-item>
        </div>
    </div>`
});
