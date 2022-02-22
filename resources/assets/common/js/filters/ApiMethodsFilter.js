Vue.component('api-methods-filter', {
    data() {
        return {
            name: 'api_methods',
            FILTER_TITLE: LANG_FILTERS.api_methods,
            SEARCH_MSG: LANG_MESSAGES.search,
            selected: [],
            api_methods: [],
            url_values: [],
            loading: false,
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.url_values = getVarsFromUrl(this.name) || [];
        filters_bus.$emit(this.name + '-init', this.url_values);

        this.selected = this.url_values.map(item => {
            return {title: item};
        });
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'title'))
        }
    },

    methods: {
        onSearch(search) {
            this.api_methods.splice(0);

            this.getApiMethods(search);
        },

        getApiMethods(search = '') {
            if (search.length < 2) {
                return;
            }

            this.loading = true;

            ApiMethods.getList(search).then(api_methods => {

                this.api_methods = api_methods;

                let index;
                this.api_methods.forEach(api_method => {

                    index = this.url_values.indexOf(api_method);

                    if (index !== -1 && _.findIndex(this.selected, {value: api_method}) === -1) {
                        this.selected.push(api_method)
                    }
                });
                this.url_values.splice(0);
                this.loading = false;
            })
        },
    },

    template: `
    <div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
            {{ FILTER_TITLE }}
            <b v-if="selected.length" @click.stop="is_open = !is_open"> {{ selected.length }}</b>
        </button>
        <div v-show="is_open" class="filter_wrap_new">
            <select-item v-model="selected" 
                         :options="api_methods" 
                         :multiple="true" 
                         track_by="title" 
                         label="title"
                         :close_on_select="false"
                         :search="true"
                         :loading="loading"
                         :hide_selected="true"
                         :allow_empty="true"
                         :clear_on_select="false"
                         @search-change="onSearch"
                         :placeholder="SEARCH_MSG">
            </select-item>
        </div>
    </div>`
});
