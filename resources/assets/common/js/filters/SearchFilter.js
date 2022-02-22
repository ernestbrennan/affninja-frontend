Vue.component('search-filter', {
    data() {
        return {
            name: 'search',
            LANG_MESSAGES: LANG_MESSAGES,
            search: null
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.search = getUrlVars()['search'] || '';
        filters_bus.$emit(this.name + '-init', this.search);
    },

    watch: {
        'search'() {
            filters_bus.$emit(this.name + '-updated', this.search);
        }
    },

    methods: {
        applyFilters() {
            filters_bus.$emit('filters-applies');
        },
    },

    template: `
    <div class="filter long-search">
        <input v-model="search" @keydown.enter.prevent="applyFilters" type="text" class="form-control filter_search btn-filter"
               :placeholder="LANG_MESSAGES.search">
    </div>`
});


