Vue.component('payment-systems-filter', {
    data() {
        return {
            name: 'payment_systems',
            LANG_FILTERS: LANG_FILTERS,
            selected: [],
            payment_systems: [{
                value: 'webmoney',
                title: 'Webmoney',
            }, {
                value: 'paxum',
                title: 'Paxum',
            }, {
                value: 'epayments',
                title: 'Epayments',
            }],
        };
    },
    mixins: [filters_mixin],

    mounted() {
        let payment_systems_values = getVarsFromUrl(this.name) || [], index;

        filters_bus.$emit(this.name + '-init', payment_systems_values);

        this.payment_systems.forEach(item => {
            index = payment_systems_values.indexOf(item.value);

            if (index !== -1) {
                this.selected.push(item)
            }
        });
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'value'))
        }
    },

    methods: {
        toggleVisibility() {
            this.is_open = !this.is_open;
        },
    },

    template: `
        <div class="filter">
            <button @click="toggleVisibility" class="btn btn-sm btn-select" type="button">
                {{ LANG_FILTERS.payment_systems }}
                <b v-if="selected && selected.length" @click.stop="toggleVisibility">{{ selected.length }}</b>
            </button>
            <div v-show="is_open" class="filter_wrap_new">
                <select-item 
                    v-model="selected"
                    :options="payment_systems"
                    :close_on_select="false"
                    :allow_empty="true"
                    :multiple="true"
                    :hide_selected="true">
                </select-item>
            </div>
        </div>`
});
