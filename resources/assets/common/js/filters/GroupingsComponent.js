Vue.component('groupings-component', {
    mixins: [filters_mixin],
    props: {
        groupings: {
            type: Array,
            required: true,
        },
        unmatched_fields_1: {
            type: Array,
            required: true,
        },
        unmatched_fields_2: {
            type: Array,
            required: true,
        },
        level_1_fields: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            levels_count: 4,

            selected_grouping: {},

            level_1_group_by: null,

            level_2_fields: [],
            level_2_group_by: null,

            level_3_fields: [],
            level_3_group_by: null,

            level_4_fields: [],
            level_4_group_by: null,

            selected_group_by_count: 0,
            empty_group_by: {
                value: null,
                title: LANG_MESSAGES.not_selected
            },
        };
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {
            this.selected_grouping = this.getGrouping();

            if (this.selected_grouping.value === 'user_settings') {
                this.setUserLevels();
            } else {
                this.setPredefinedLevels(this.selected_grouping);
            }

            filters_bus.$emit('grouping-updated', this.selected_grouping.value);
            this.emit('grouping-fields-updated');
        },

        getGrouping() {
            let grouping = UrlParameter.getGrouping(), selected_grouping;

            if (is_null(grouping)) {
                grouping = localStorage.getItem('grouping') === 'null' ? null : grouping;
            }

            selected_grouping = _.find(this.groupings, {value: grouping});

            if (_.isUndefined(selected_grouping)) {
                selected_grouping = this.groupings[0];
            }

            return selected_grouping;
        },

        onGroupingChange(grouping) {
            if (!grouping.value) {
                return;
            }

            if (grouping.value !== 'user_settings') {
                this.setPredefinedLevels(grouping);
                this.updateSelectedGroupByCount();
            } else {
                this.setUserLevels();
            }

            localStorage.setItem('grouping', grouping);
        },

        setPredefinedLevels(grouping) {
            for (let level = 1; level <= this.levels_count + 1; level++) {
                let field_value = grouping.group_by_fields[level - 1],
                    level_group_by = _.find(this.level_1_fields, {value: field_value}) || this.empty_group_by;

                this.onLevelChanged(level_group_by, level);
            }
        },

        setUserLevels() {
            for (let level = 1; level <= this.levels_count; level++) {
                let group_by_value = UrlParameter.getGroupByForLevel(level);

                if (is_null(group_by_value)) {
                    let local_level_group_by = localStorage.getItem('level_' + level + '_group_by') || null;

                    group_by_value = local_level_group_by === 'null' ? null : local_level_group_by;
                }

                let level_group_by = _.find(this.level_1_fields, {value: group_by_value});

                if (_.isUndefined(level_group_by)) {
                    level_group_by = this.refreshLocalStorage(level);
                }

                this.onLevelChanged(level_group_by, level);
            }
        },

        refreshLocalStorage(level) {
            if (level === 1) {
                return this.level_1_fields[0];
            }

            let levels_count = 4;

            for (level; level <= levels_count; level++) {
                localStorage.setItem('level_' + level + '_group_by', '');
            }

            return this.empty_group_by;
        },

        onLevelChanged(group_by, level) {
            this.setGroupByAngFields(group_by, level);

            this.refreshGroupByWithAvailableFields();
            this.checkAndSaveGroupBy(group_by, level);

            this.updateSelectedGroupByCount();
        },

        setGroupByAngFields(group_by, level) {
            let next_level = level + 1;

            this['level_' + level + '_group_by'] = group_by;

            if (next_level > this.levels_count) {
                return;
            }

            for (level; level <= this.levels_count; level++, next_level++) {
                this['level_' + next_level + '_fields'] = this.getGroupingsList(
                    this['level_' + level + '_fields'],
                    this['level_' + level + '_group_by']
                );
            }
        },

        refreshGroupByWithAvailableFields() {
            for (let level = 1; level <= this.levels_count + 1; level++) {
                let fields = this['level_' + level + '_fields'],
                    group_by = this['level_' + level + '_group_by'];

                let is_set = isset(group_by),
                    is_equal_with_empty = _.isEqual(group_by, this.empty_group_by),
                    is_can_be_choosed = is_set && _.findIndex(fields, {value: group_by.value}) !== -1,
                    previous_group_by = this['level_' + (level - 1) + '_group_by'],
                    is_prev_equal_with_empty = isset(previous_group_by) && _.isEqual(previous_group_by, this.empty_group_by);

                if (!is_set || is_equal_with_empty || !is_can_be_choosed || is_prev_equal_with_empty) {
                    this['level_' + level + '_group_by'] = this.empty_group_by;
                }
            }
        },

        checkAndSaveGroupBy(group_by, level) {
            if (this.selected_grouping.value !== 'user_settings') {
                return;
            }

            localStorage.setItem('level_' + level + '_group_by', group_by.value);
        },

        updateSelectedGroupByCount() {
            this.selected_group_by_count = 0;

            if (isset(this.level_1_group_by)) {
                this.selected_group_by_count++;
            }

            if (isset(this.level_2_group_by) && !is_null(this.level_2_group_by.value)) {
                this.selected_group_by_count++;
            }

            if (isset(this.level_3_group_by) && !is_null(this.level_3_group_by.value)) {
                this.selected_group_by_count++;
            }

            if (isset(this.level_4_group_by) && !is_null(this.level_4_group_by.value)) {
                this.selected_group_by_count++;
            }
        },

        getGroupingsList(groupings, current_grouping, level) {
            if (!isset(current_grouping)) {
                return;
            }

            let filtered_groupings = groupings.filter(grouping => {
                if (this.unmatched_fields_1.includes(current_grouping.value) && this.unmatched_fields_2.includes(grouping.value)) {
                    return false;
                }

                if (this.unmatched_fields_2.includes(current_grouping.value) && this.unmatched_fields_1.includes(grouping.value)) {
                    return false;
                }

                if (grouping.value !== current_grouping.value) {
                    return true;
                }

                return false;
            });

            if (level === 2) {
                filtered_groupings.unshift(this.empty_group_by);
            }

            return filtered_groupings;

        },

        onApplyClick() {
            this.is_open = !this.is_open;

            filters_bus.$emit('grouping-updated', this.selected_grouping.value);
            this.emit('grouping-fields-updated');
            filters_bus.$emit('filters-applies');
        },

        emit(event) {
            filters_bus.$emit(event, {
                level_1_group_by: _.get(this.level_1_group_by, 'value', null),
                level_2_group_by: _.get(this.level_2_group_by, 'value', null),
                level_3_group_by: _.get(this.level_3_group_by, 'value', null),
                level_4_group_by: _.get(this.level_4_group_by, 'value', null),
            });
        },

        getDisabled(level_group_by) {
            return isset(level_group_by) && level_group_by.value === null;
        },
    },

    template: `
        <div class="filter group_filter">
            <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
                {{ LANG_MESSAGES.to_group }} <b @click.stop="is_open = !is_open">{{ selected_group_by_count }}</b>
            </button>
            <div v-show="is_open" class="filter_overlay in-shadow"></div>
            <div v-show="is_open" 
                class="filter_wrap_new no-in-shadow"
                :style="{ width: 'auto', maxWidth: 'initial' }">
                <div class="clearfix">
                    <div class="filter" style="width: 235px; margin-bottom: 0">
                        <select-item v-model="selected_grouping" 
                                     :options="groupings" 
                                     @input="onGroupingChange"
                                     class="multiselect-sm"
                        ></select-item>
                    </div>
                    <div class="filter" style="width: 148px; margin-bottom: 0">
                        <select-item v-model="level_1_group_by" 
                                     :options="level_1_fields" 
                                     class="multiselect-sm"
                                     @input="onLevelChanged($event, 1)"
                        ></select-item>
                    </div>
                    <div class="filter" style="width: 148px; margin-bottom: 0">
                        <select-item v-model="level_2_group_by" 
                                     :options="level_2_fields" 
                                     class="multiselect-sm"
                                     @input="onLevelChanged($event, 2)"
                        ></select-item>
                    </div>
                    <div class="filter" style="width: 148px; margin-bottom: 0">
                        <select-item v-model="level_3_group_by" 
                                     :options="level_3_fields"
                                     :disabled="getDisabled(level_2_group_by)"
                                     class="multiselect-sm"
                                     @input="onLevelChanged($event, 3)"
                        ></select-item>
                    </div>
                    <div class="filter" style="width: 148px; margin-bottom: 0">
                        <select-item v-model="level_4_group_by" 
                                     :options="level_4_fields"
                                     :disabled="getDisabled(level_3_group_by)"
                                     class="multiselect-sm"
                                     @input="onLevelChanged($event, 4)"
                        ></select-item>
                    </div>
                    <div class="filter" style="margin-bottom: 0">
                        <button @click="onApplyClick" 
                                class="btn btn-success btn-outline btn-sm ladda-button btn-filter"
                                type="button">
                            {{ LANG_MESSAGES.apply }}
                        </button>
                    </div>
                </div>
            </div>
        </div>`
});
