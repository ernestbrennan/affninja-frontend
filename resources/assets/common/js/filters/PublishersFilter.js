Vue.component('publishers-filter', {
    data() {
        return {
            name: 'publisher_hashes',
            LANG_FILTERS: LANG_FILTERS,
            LANG_MESSAGES: LANG_MESSAGES,
            selected: [],
            publishers: [],
            url_values: [],
            loading: false,
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.url_values = getVarsFromUrl(this.name) || [];
        filters_bus.$emit(this.name + '-init', this.url_values);

        this.getPublishers(this.url_values);
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'hash'))
        }
    },

    methods: {
        getPublishers(hashes = [], search = '') {
            if (!hashes.length && search.length < 2) {
                return;
            }

            this.loading = true;

            User.getPublishers([], 'email', search, hashes).then(publishers => {

                this.publishers = publishers.data;

                let index;
                this.publishers.forEach(publisher => {

                    index = this.url_values.indexOf(publisher.hash);

                    if (index !== -1 && _.findIndex(this.selected, {value: publisher.hash}) === -1) {
                        this.selected.push(publisher)
                    }
                });
                this.url_values.splice(0);
                this.loading = false;
            })
        },

        onSearch(search) {
            this.publishers.splice(0);

            this.getPublishers([], search);
        }
    },

    template: `<div class="filter">
      <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button"
      >{{ LANG_FILTERS.publisher_filter }}<b v-if="selected.length"> {{ selected.length }}</b></b></button>
      <div v-show="is_open" class="filter_wrap_new">
        <select-item v-model="selected" :options="publishers" :multiple="true" track_by="hash" label="email"
            :close_on_select="false"
            :search="true"
            :loading="loading"
            :hide_selected="true"
            :allow_empty="true"
            :clear_on_select="false"
            v-on:search-change="onSearch"
            :placeholder="LANG_MESSAGES.search">
        </select-item>
        </div>
      </div>
    </div>`
});
