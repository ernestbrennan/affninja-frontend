Vue.component('browsers-filter', {
    data() {
        return {
            name: 'browser_ids',
            FILTER_TITLE: LANG_FILTERS.browser_filter,
            SEARCH_MSG: LANG_MESSAGES.search,
            selected: [],
            browsers: [],
            url_values: [],
            loading: false,

            default_option: {
                id: 'empty',
                title: LANG_MESSAGES.undefined,
            },
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.url_values = getVarsFromUrl(this.name) || [];

        if (this.url_values.length === 1 && this.url_values[0] === 'empty') {
            this.browsers.push(this.default_option);
            this.selected.push(this.default_option);
            return filters_bus.$emit(this.name + '-init', this.url_values);
        }

        filters_bus.$emit(this.name + '-init', this.url_values);

        this.getBrowsers('', this.url_values);
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'id'))
        }
    },

    methods: {
        getBrowsers(search = '', browser_ids = []) {
            if (search.length < 2 && !browser_ids.length) {
                return;
            }

            this.loading = true;

            Browser.getList(search, browser_ids).then(browsers => {

                this.browsers = browsers;

                let index;
                this.browsers.forEach(browser => {

                    index = this.url_values.indexOf(browser.id);

                    if (index !== -1 && _.findIndex(this.selected, {id: browser.id}) === -1) {
                        this.selected.push(browser)
                    }
                });
                
                this.url_values.splice(0);
                this.loading = false;
            })
        },

        onSearch(search) {
            this.browsers.splice(0);

            this.getBrowsers(search);
        }
    },

    template: `
    <div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
            {{ FILTER_TITLE }}<b v-if="selected.length" @click.stop="is_open = !is_open"> {{ selected.length }}</b>
        </button>
        <div v-show="is_open" class="filter_wrap_new">
            <select-item v-model="selected" 
                         :options="browsers" 
                         :multiple="true" 
                         track_by="id" 
                         label="title"
                         :close_on_select="false"
                         :search="true"
                         :loading="loading"
                         :hide_selected="true"
                         :allow_empty="true"
                         :clear_on_select="false"
                         @search-change="onSearch"
                         :placeholder="SEARCH_MSG"
            ></select-item>
        </div>
    </div>`
});
