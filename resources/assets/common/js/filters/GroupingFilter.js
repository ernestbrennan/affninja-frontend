Vue.component('grouping-by-filter', {
    props: {
        grouping_options: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            name: 'grouping_by',
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_FILTERS: LANG_FILTERS,
            selected: {},
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.init();
    },

    watch: {
        'grouping_options'() {
            this.init();
        },
        'selected'() {
            if (this.selected === undefined || is_null(this.selected)) {
                return filters_bus.$emit(this.name + '-updated', null);
            }

            filters_bus.$emit(this.name + '-updated', this.selected)
        }
    },

    methods: {
        init() {
            let grouping_by = UrlParameter.getGroupingOption(this.name);
            grouping_by = grouping_by === 'null' ? null : grouping_by;

            if (!this.grouping_options.length) {
                return filters_bus.$emit(this.name + '-init', null);
            }

            this.selected = _.find(this.grouping_options, {value: grouping_by});

            if (this.selected === undefined || is_null(this.selected)) {
                return filters_bus.$emit(this.name + '-init', null);
            }

            filters_bus.$emit(this.name + '-init', this.selected)
        },
    },

    template: `
        <div class="filter">
            <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button"
            >{{ LANG_MESSAGES.to_group }} <b v-show="selected.value !== null">1</b></button>
            <div v-show="is_open" class="filter_wrap_new">
                <select-item 
                    v-model="selected" 
                    :options="grouping_options" 
                    :multiple="false"
                    track_by="value"
                    label="title">
                </select-item>
            </div>
        </div>`
});
