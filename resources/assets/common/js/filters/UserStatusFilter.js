Vue.component('user-statuses-filter', {
    data() {
        return {
            name: 'status',
            LANG_MESSAGES: LANG_MESSAGES,
            selected: {},
            statuses: [
                {title: LANG_MESSAGES.not_selected, value: null},
                {title: LANG_USERS.status_active, value: 'active'},
                {title: LANG_USERS.status_blocked, value: 'locked'},
            ],
        };
    },
    mixins: [filters_mixin],

    created() {
        let statuses = getVarsFromUrl(this.name);

        if (!statuses.length) {
            this.selected = this.statuses[0];
        } else {
            this.selected = _.find(this.statuses, {value: statuses[0]});
        }

        filters_bus.$emit(this.name + '-init', this.selected.value);
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', this.selected.value)
        }
    },

    template: `
    <div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
            <template v-if="selected.value !== null">{{ selected.title }}</template>
            <template v-else>{{ LANG_MESSAGES.status }}</template>
        </button>
        <div v-show="is_open" class="filter_wrap_new">
            <select-item v-model="selected" 
                         :options="statuses" 
                         :multiple="false" 
                         :allow_empty="true"
                         :hide_selected="true">
            </select-item>
        </div>
    </div>`
});
