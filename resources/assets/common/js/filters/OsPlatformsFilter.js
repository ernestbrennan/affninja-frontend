Vue.component('os-platforms-filter', {
    data() {
        return {
            name: 'os_platform_ids',
            FILTER_TITLE: LANG_FILTERS.os_platform_filter,
            SEARCH_MSG: LANG_MESSAGES.search,
            selected: [],
            os_platforms: [],
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
            this.os_platforms.push(this.default_option);
            this.selected.push(this.default_option);
            return filters_bus.$emit(this.name + '-init', this.url_values);
        }

        filters_bus.$emit(this.name + '-init', this.url_values);

        this.getOsPlatforms('', this.url_values);
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'id'))
        }
    },

    methods: {
        getOsPlatforms(search = '', os_platform_ids = []) {
            if (search.length < 2 && !os_platform_ids.length) {
                return;
            }

            this.loading = true;

            OsPlatform.getList(search, os_platform_ids).then(os_platforms => {

                this.os_platforms = os_platforms;

                let index;
                this.os_platforms.forEach(os_platform => {

                    index = this.url_values.indexOf(os_platform.id);

                    if (index !== -1 && _.findIndex(this.selected, {id: os_platform.id}) === -1) {
                        this.selected.push(os_platform)
                    }
                });
                
                this.url_values.splice(0);
                this.loading = false;
            })
        },

        onSearch(search) {
            this.os_platforms.splice(0);

            this.getOsPlatforms(search);
        }
    },

    template: `
    <div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
            {{ FILTER_TITLE }}<b v-if="selected.length" @click.stop="is_open = !is_open"> {{ selected.length }}</b>
        </button>
        <div v-show="is_open" class="filter_wrap_new">
            <select-item v-model="selected" 
                         :options="os_platforms" 
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
