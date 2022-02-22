Vue.component('flows-filter', {
    data() {
        return {
            name: 'flow_hashes',
            LANG_FILTERS: LANG_FILTERS,
            selected: [],
            flows: [],
            url_values: [],
            loading: false,
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.url_values = getVarsFromUrl(this.name) || [];
        filters_bus.$emit(this.name + '-init', this.url_values);

        this.getFlows();
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'hash'))
        }
    },

    methods: {
        getFlows() {
            this.loading = true;

            Flow.getList().then(offers => {
                this.flows = offers;

                let index;
                this.flows.forEach(item => {
                    index = this.url_values.indexOf(item.hash);
                    if (index !== -1) {
                        this.selected.push(item)
                    }
                });

                this.loading = false;
            }, () => {
                this.loading = false;
            });
        },
    },
    template: `
    <div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
            {{ LANG_FILTERS.flow_filter }}<b v-if="selected.length"> {{ selected.length }}</b>
        </button>
        <div v-show="is_open" class="filter_wrap_new">
            <select-item 
                v-model="selected" 
                :options="flows" 
                :multiple="true" 
                track_by="hash"
                :close_on_select="false" 
                :search="true" 
                :allow_empty="true"
                :loading="loading"
                :hide_selected="true">
            </select-item>
        </div>
    </div>`
});
