Vue.component('device-type-filter', {
    data() {
        return {
            FILTER_TITLE: LANG_FILTERS.device_type_filter,

            name: 'device_type_ids',
            selected: [],
            devices: [{
                value: 1,
                title: 'Desktop',
            }, {
                value: 2,
                title: 'Mobile/Phone',
            }, {
                value: 3,
                title: 'Tablet',
            }],

            default_option: {
                value: 'empty',
                title: LANG_MESSAGES.undefined,
            },
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.init();
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'value'))
        }
    },

    methods: {
        init() {
            let device_type_ids = getVarsFromUrl(this.name) || [], index;

            if (device_type_ids.length === 1 && device_type_ids[0] === 'empty') {
                this.selected.push(this.default_option);
            }

            filters_bus.$emit(this.name + '-init', device_type_ids);

            this.devices.forEach(item => {
                index = device_type_ids.indexOf(item.value);

                if (index !== -1) {
                    this.selected.push(item)
                }
            });
        },
    },

    template: `
        <div class="filter">
            <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
                {{ FILTER_TITLE }}<b v-if="selected && selected.length" @click.stop="is_open = !is_open"> 
                {{ selected.length }}</b>
            </button>
            <div v-show="is_open" class="filter_wrap_new">
                <select-item 
                    v-model="selected" 
                    :options="devices" 
                    :close_on_select="false" 
                    :allow_empty="true"
                    :multiple="true" 
                    :hide_selected="true"
                ></select-item>
            </div>
        </div>`
});
