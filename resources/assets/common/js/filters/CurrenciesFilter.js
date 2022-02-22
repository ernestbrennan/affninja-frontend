Vue.component('currencies-filter', {
    props: {
        fallback_selected_ids: {
            type: Array,
            default: () => [],
        },
        fallback_selected_id: {
            type: Number,
            default: null,
        },
        multiple: {
            type: Boolean,
            default: true,
        },
        show_currency_title: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            multiple_name: 'currency_ids',
            single_name: 'currency_id',
            LANG_FILTERS: LANG_FILTERS,
            selected: [],
            currencies: [{
                value: 1,
                title: LANG_FINANCE.rub,
            }, {
                value: 3,
                title: LANG_FINANCE.usd,
            }, {
                value: 5,
                title: LANG_FINANCE.eur,
            }],
        };
    },
    mixins: [filters_mixin],

    mounted() {
        if (this.multiple) {
            this.multipleInit();
        } else {
            this.singleInit();
        }
    },

    watch: {
        'selected'() {
            if (this.selected instanceof Array) {
                filters_bus.$emit(this.multiple_name + '-updated', _.map(this.selected, 'value'))
            } else {
                filters_bus.$emit(this.single_name + '-updated', _.get(this.selected, 'value'))
            }
        }
    },

    methods: {
        multipleInit() {
            let currency_ids = getVarsFromUrl(this.multiple_name) || [], index;

            if (!currency_ids && this.fallback_selected_ids.length) {
                currency_ids = this.fallback_selected_ids;
            }

            filters_bus.$emit(this.multiple_name + '-init', currency_ids);

            this.currencies.forEach(item => {
                index = currency_ids.indexOf(item.value);
                if (index !== -1) {
                    this.selected.push(item)
                }
            });
        },

        singleInit() {
            let currency_id = UrlParameter.getCurrencyId(), index;

            if (is_null(currency_id) && this.fallback_selected_id) {
                currency_id = this.fallback_selected_id;
            }

            this.selected = _.find(this.currencies, {value: +currency_id});
            filters_bus.$emit(this.single_name + '-init', currency_id);
        },

        toggleVisibility() {
            this.is_open = !this.is_open;
        },
    },

    template: `
        <div class="filter">
            <button @click="toggleVisibility" class="btn btn-sm btn-select" type="button">
                <template v-if="show_currency_title">{{ selected.title }}</template>
                <template v-else>{{ LANG_FILTERS.currency }}</template>
                <b v-if="selected && selected.length" @click.stop="toggleVisibility">{{ selected.length }}</b>
            </button>
            <div v-show="is_open" class="filter_wrap_new">
                <select-item 
                    v-model="selected" 
                    :options="currencies" 
                    :close_on_select="false" 
                    :allow_empty="true"
                    :multiple="multiple"
                    :hide_selected="true">
                </select-item>
            </div>
        </div>`
});
