Vue.component('lead-statuses-filter', {
    data() {
        return {
            name: 'lead_statuses',
            LANG_MESSAGES: LANG_MESSAGES,
            selected: [],
            statuses: [{
                value: 'new',
                title: LANG_STATISTICS.lead_new_status,
            }, {
                value: 'approved',
                title: LANG_STATISTICS.lead_approved_status,
            }, {
                value: 'cancelled',
                title: LANG_STATISTICS.lead_cancelled_status,
            }, {
                value: 'trashed',
                title: LANG_STATISTICS.lead_trashed_status,
            }],
            can_apply_filters: false,
        };
    },
    mixins: [filters_mixin],

    created() {
        filters_bus.$on('lead_statuses-refresh', (statuses, can_apply_filters) => {
            this.selected.splice(0);
            this.setSelectedByStatuses(statuses);

            this.can_apply_filters = can_apply_filters;
        });
    },

    mounted() {
        let lead_statuses = getVarsFromUrl(this.name) || [], index;
        filters_bus.$emit(this.name + '-init', lead_statuses);

        this.setSelectedByStatuses(lead_statuses);
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'value'));

            if (this.can_apply_filters) {
                filters_bus.$emit('filters-applies');

                this.can_apply_filters = false;
            }
        }
    },

    methods: {
        setSelectedByStatuses(statuses) {
            let index;
            this.statuses.forEach(item => {
                index = statuses.indexOf(item.value);
                if (index !== -1) {
                    this.selected.push(item)
                }
            });
        }
    },
    template: `
    <div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
            {{ LANG_MESSAGES.status }}<b v-if="selected.length" @click.stop="is_open = !is_open"> 
            {{ selected.length }}</b></button>
        <div v-show="is_open" class="filter_wrap_new">
            <select-item v-model="selected" 
                         :options="statuses" 
                         :multiple="true" 
                         :close_on_select="false" 
                         :allow_empty="true"
                         :hide_selected="true">
            </select-item>
        </div>
    </div>`
});
