Vue.component('user-group-filter', {
    props: {
        groups: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            name: 'group_ids',
            LANG_FILTERS: LANG_FILTERS,
            selected: [],
        };
    },
    mixins: [filters_mixin],

    created() {
        let group_ids = getVarsFromUrl(this.name);
        filters_bus.$emit(this.name + '-init', group_ids);
    },

    watch: {
        'groups'() {
            this.init();
        },

        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'id'));
        }
    },

    methods: {
        init() {
            let group_ids = getVarsFromUrl(this.name);

            if (!group_ids.length) {
                return filters_bus.$emit(this.name + '-init', []);
            }

            let selected = [];

            group_ids.forEach((group_id) => {
                this.groups.forEach((group) => {
                    if (group_id === group.id) {
                        selected.push(group);
                    }
                });
            });

            this.selected = selected;
        },

        toggleVisibility() {
            this.is_open = !this.is_open;
        },
    },

    template: `
    <div class="filter">
        <button @click="toggleVisibility" class="btn btn-sm btn-select" type="button">
            {{ LANG_FILTERS.group }}
            <b v-show="selected.length" @click.stop="toggleVisibility">{{ selected.length }}</b>
        </button>
        <div v-show="is_open" class="filter_wrap_new">
            <select-item v-model="selected" 
                         :options="groups" 
                         :multiple="true"
                         track_by="id"
                         label="title" 
                         :allow_empty="true"
                         :hide_selected="true">
            </select-item>
        </div>
    </div>`
});
