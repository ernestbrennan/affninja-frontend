Vue.component('search-field-filter', {
    data() {
        return {
            name: 'search',
            name2: 'search_field',
            LANG_MESSAGES: LANG_MESSAGES,
            search_field: null,
            search: null,
        };
    },
    props: {
        search_fields: {
            type: Array,
        },
        search_fields_width: {
            type: String,
            default: 'auto'
        },
        allow_empty: {
            type: Boolean,
            default: true,
        },
    },
    mixins: [filters_mixin],

    mounted() {
        this.search = getUrlVars()['search'] || '';

        let url_value = UrlParameter.getSearchField(),
            search_field = _.find(this.search_fields, {value: url_value});

        if (search_field === undefined) {
            this.search_field = this.search_fields[0];
        } else {
            this.search_field = search_field;
        }

        filters_bus.$emit('search-init', this.search);
        filters_bus.$emit('search_field-init', this.search_field.value);
    },

    watch: {
        'search'(value, old_value) {
            if (is_null(old_value)) {
                return;
            }
            filters_bus.$emit(this.name + '-updated', value);
        },

        'search_field'(value, old_value) {
            if (is_null(value)) {
                return filters_bus.$emit(this.name2 + '-updated', null);
            }

            filters_bus.$emit(this.name2 + '-updated', value.value);
        },
    },
    methods: {
        onEnter() {
            filters_bus.$emit('apply-filter-start');
            filters_bus.$emit('filters-applies');
        }
    },

    template: `
    <div class="select">
        <div class="input-group">
            <div class="input-group-btn">
                <select-item v-model="search_field"
                    :options="search_fields"
                    :allow_empty="allow_empty"
                    :style="{width: search_fields_width}"
                ></select-item>
            </div>
            <input v-model="search" class="form-control filter_search btn-filter" id="search"
                   :placeholder="LANG_MESSAGES.search"
                   style="margin-left: -5px; width: calc(100% + 5px)"
                   @keydown.enter.prevent="onEnter">
        </div>
    </div>`
});


