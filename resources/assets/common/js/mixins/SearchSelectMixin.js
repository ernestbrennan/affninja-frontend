let search_select_mixin = {
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_FILTERS: LANG_FILTERS,

            loading: false,
            search_value: '',
            debounced_onsearch_event: null,
        }
    },

    components: {
        'multiselect': window.VueMultiselect.default,
    },

    props: {
        value: {},
    },

    created() {
        let self = this;

        this.debounced_onsearch_event = _.debounce(function (search) {
            self.onSearch(search);
        }, 500);
    },

    methods: {
        updateSelected(value) {
            this.$emit('input', value)
        },

        onSearchChange(search) {
            this.debounced_onsearch_event(search);
        },
    },
};