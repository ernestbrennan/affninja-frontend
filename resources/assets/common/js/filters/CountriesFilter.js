Vue.component('countries-filter', {
    data() {
        return {
            name: 'country_ids',
            LANG_FILTERS: LANG_FILTERS,
            selected: [],
            countries: [],
            url_values: [],
            loading: false,
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.url_values = getVarsFromUrl(this.name) || [];
        filters_bus.$emit(this.name + '-init', this.url_values);

        this.getCountries();
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'id'))
        }
    },

    methods: {
        getCountries() {
            this.loading = true;

            Country.getList().then(countries => {

                this.countries = countries;

                let index;
                this.countries.forEach(item => {
                    index = this.url_values.indexOf(item.id);
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
      >{{ LANG_FILTERS.countries }}<b v-if="selected.length"> {{ selected.length }}</b></b></button>
      <div v-show="is_open" class="filter_wrap_new">
        <select-item v-model="selected" :options="countries" :multiple="true" track_by="id" label="title"
            :close_on_select="false" 
            :search="true" 
            :loading="loading" 
            :hide_selected="true"
            :allow_empty="true">
        </select-item>
        </div>
      </div>
    </div>`
});
