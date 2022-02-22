Vue.component('sources-for-offer-filter', {
    data() {
        return {
            name: 'source_ids',
            LANG_FILTERS: LANG_FILTERS,
            selected: [],
            sources: [],
            url_values: [],
            loading: false,
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.url_values = getVarsFromUrl(this.name) || [];
        filters_bus.$emit(this.name + '-init', this.url_values);

        this.getSources();
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'id'))
        }
    },

    methods: {
        getSources() {
            this.loading = true;

            api.get('/offer_source.getListForOfferFilter').then(response => {

                this.sources = response.data.response;

                let index;
                this.sources.forEach(item => {
                    index = this.url_values.indexOf(item.id);
                    if (index !== -1) {
                        this.selected.push(item)
                    }
                });
                this.loading = false;
            })
        },
    },
    template: `
    <div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
            {{ LANG_FILTERS.offer_sources }}<b v-if="selected.length"> {{ selected.length }}</b>
        </button>
        <div v-show="is_open" class="filter_wrap_new" style="min-width: 260px;">
            <select-item v-model="selected" 
                         :options="sources" 
                         :multiple="true" 
                         track_by="id" 
                         label="title"
                         :close_on_select="false" 
                         :search="true" 
                         :loading="loading" 
                         :hide_selected="true"
                         :allow_empty="true">
            </select-item>
        </div>
    </div>`
});
