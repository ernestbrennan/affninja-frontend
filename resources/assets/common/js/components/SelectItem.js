Vue.component('select-item', {
    data() {
        return {
            LANG_FILTERS: LANG_FILTERS,
            search_value: '',
            debounced_onsearch_event: null,
        }
    },

    components: {
        'multiselect': window.VueMultiselect.default,
    },

    props: {
        value: {},
        options: {
            default: function () {
                return []
            }
        },
        search: {
            type: Boolean,
            default: false,
        },
        track_by: {
            type: String,
            default: 'value',
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        close_on_select: {
            type: Boolean,
            default: true,
        },
        allow_empty: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: 'title',
        },
        loading: {
            type: Boolean,
            default: false
        },
        hide_selected: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clear_on_select: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: ''
        },
        limit: {
            type: Number,
            default: 9999
        },
        preserve_search: {
            type: Boolean,
            default: false
        },
    },

    created() {
        let self = this;
        this.debounced_onsearch_event = _.debounce(function (search) {
            if (self.search_value === search) {
                return;
            }

            self.search_value = search;
            self.$emit('search-change', search)
        }, 500);
    },

    methods: {
        updateSelected(value) {
            this.$emit('input', value)
        },

        onSearchChange(search) {
            this.debounced_onsearch_event(search);
        }
    },

    template: `<multiselect
            :value="value"
            :track-by="track_by"
            :options="options"
            :label="label"
            :searchable="search"
            :close-on-select="close_on_select"
            :show-labels="false"
            :placeholder="placeholder"
            :allow-empty="allow_empty"
            @input="updateSelected"
            :multiple="multiple"
            :preserve-search="preserve_search"
            open-direction="bottom"
            :hide-selected="hide_selected"
            :loading="loading"
            :disabled="disabled"
            :clearOnSelect="clear_on_select"
            @search-change="onSearchChange"
            :limit="limit"
            >
            <span slot="noResult">{{ LANG_FILTERS.nothing_found }}</span></multiselect>`,
});