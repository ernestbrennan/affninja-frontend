Vue.component('group-fields', {
    mixins: [filters_mixin],
    props: {
        fields: {
            type: Array
        }
    },

    data() {
        return {
            LANG_FILTERS: LANG_FILTERS,
            LANG_MESSAGES: LANG_MESSAGES,
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
        this.initLevel1();
        this.initLevel2();
        this.initLevel3();
        this.initLevel4();
        this.updateSelectedGroupByCount();

        this.emit('group-fields-init');
    },

    watch: {
        'level_1_group_by'(value, old_value) {
            if (is_null(old_value)) {
                return;
            }

            this.refreshGroup(1);
            this.updateSelectedGroupByCount();

            let level_1_group_by = _.get(value, 'value', null);

            localStorage.setItem('level_1_group_by', level_1_group_by)
        },
        'level_2_group_by'(value, old_value) {
            if (is_null(old_value)) {
                return;
            }

            this.refreshGroup(2);
            this.updateSelectedGroupByCount();

            let level_2_group_by = _.get(value, 'value', null);

            localStorage.setItem('level_2_group_by', level_2_group_by)
        },
        'level_3_group_by'(value, old_value) {
            if (is_null(old_value)) {
                return;
            }

            this.refreshGroup(3);
            this.updateSelectedGroupByCount();

            let level_3_group_by = _.get(value, 'value', null);

            localStorage.setItem('level_3_group_by', level_3_group_by)
        },
        'level_4_group_by'(value, old_value) {
            if (is_null(old_value)) {
                return;
            }

            this.updateSelectedGroupByCount();

            let level_4_group_by = _.get(value, 'value', null);

            localStorage.setItem('level_4_group_by', level_4_group_by)
        }
    },

    methods: {
        refreshGroup(level) {
            if (level <= 1) {
                this.refreshGroup2Fields();
                this.level_2_group_by = this.empty_group_by;
            }

            if (level <= 2) {
                this.refreshGroup3Fields();
                this.level_3_group_by = this.empty_group_by;
            }

            if (level <= 3) {
                this.refreshGroup4Fields();
                this.level_4_group_by = this.empty_group_by;
            }
        },

        initLevel1() {
            let level_1_group_by = UrlParameter.getGroupByForLevel(1);
            if (is_null(level_1_group_by)) {
                let local_level1_group_by = localStorage.getItem('level_1_group_by');
                level_1_group_by = local_level1_group_by === 'null' ? null : local_level1_group_by;
            }
            this.level_1_group_by = _.find(this.fields, {value: level_1_group_by});
            if (this.level_1_group_by === undefined) {
                this.level_1_group_by = this.fields[0];
            }
        },

        initLevel2() {
            let level_2_group_by = UrlParameter.getGroupByForLevel(2);

            if (is_null(level_2_group_by)) {
                let local_level2_group_by = localStorage.getItem('level_2_group_by');
                level_2_group_by = local_level2_group_by === 'null' ? null : local_level2_group_by;
            }
            this.refreshGroup2Fields();
            this.level_2_group_by = _.find(this.level_2_fields, {value: level_2_group_by});
        },

        initLevel3() {
            let level_3_group_by = UrlParameter.getGroupByForLevel(3);
            if (is_null(level_3_group_by)) {
                let local_level_3_group_by= localStorage.getItem('level_3_group_by');
                level_3_group_by = local_level_3_group_by === 'null' ? null : local_level_3_group_by;
            }
            this.refreshGroup3Fields();

            this.level_3_group_by = _.find(this.level_3_fields, {value: level_3_group_by});
        },

        initLevel4() {
            let level_4_group_by = UrlParameter.getGroupByForLevel(4);
            if (is_null(level_4_group_by)) {
                let local_level_4_group_by= localStorage.getItem('level_4_group_by');
                level_4_group_by = local_level_4_group_by === 'null' ? null : local_level_4_group_by;
            }
            this.refreshGroup4Fields();

            this.level_4_group_by = _.find(this.level_4_fields, {value: level_4_group_by});
        },

        updateSelectedGroupByCount() {
            this.selected_group_by_count = 0;

            if (this.level_1_group_by !== undefined) {
                this.selected_group_by_count++;
            }
            if (this.level_2_group_by !== undefined && !is_null(this.level_2_group_by.value)) {
                this.selected_group_by_count++;
            }
            if (this.level_3_group_by !== undefined && !is_null(this.level_3_group_by.value)) {
                this.selected_group_by_count++;
            }
            if (this.level_4_group_by !== undefined && !is_null(this.level_4_group_by.value)) {
                this.selected_group_by_count++;
            }
        },

        /**
         * The second level has all columns, except of the first level
         */
        refreshGroup2Fields() {
            this.level_2_fields = _.reject(this.fields, (group) => {
                return group.value === this.level_1_group_by.value;
            });

            this.level_2_fields.unshift(this.empty_group_by);
        },

        /**
         * The third level has all columns, except of the first and the second level
         */
        refreshGroup3Fields() {
            this.level_3_fields = _.reject(this.fields, (group) => {
                return group.value === this.level_1_group_by.value || group.value === _.get(this.level_2_group_by, 'value');
            });
            this.level_3_fields.unshift(this.empty_group_by);
        },

        /**
         * The fourth level has all columns, except of the first, second and the third level
         */
        refreshGroup4Fields() {
            this.level_4_fields = _.reject(this.fields, (group) => {
                return group.value === this.level_1_group_by.value
                    || group.value === _.get(this.level_2_group_by, 'value')
                    || group.value === _.get(this.level_3_group_by, 'value');

            });

            this.level_4_fields.unshift(this.empty_group_by);
        },

        onApplyClick() {
            this.is_open = !this.is_open;
            this.emit('group-fields-applies');
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
                    <div class="filter" style="width: 155px; margin-bottom: 0">
                      <select-item v-model="level_1_group_by" :options="fields" class="multiselect-sm"
                      ></select-item>
                    </div>
                    <div class="filter" style="width: 155px; margin-bottom: 0">
                      <select-item v-model="level_2_group_by" :options="level_2_fields" class="multiselect-sm"
                      ></select-item>
                    </div>
                    <div class="filter" style="width: 155px; margin-bottom: 0">
                      <select-item v-model="level_3_group_by" :options="level_3_fields"
                       :disabled="level_2_group_by === null || level_2_group_by.value === null"
                       class="multiselect-sm"
                        ></select-item>
                    </div>
                    <div class="filter" style="width: 155px; margin-bottom: 0">
                      <select-item v-model="level_4_group_by" :options="level_4_fields"
                       :disabled="level_3_group_by === null || level_3_group_by.value === null"
                       class="multiselect-sm"
                       ></select-item>
                    </div>
                    <div class="filter" style="margin-bottom: 0">
                        <button @click="onApplyClick" 
                                class="btn btn-success btn-outline btn-sm ladda-button btn-filter"
                                type="button">
                            {{ LANG_FILTERS.apply }}
                        </button>
                    </div>
                </div>
            </div>
        </div>`
});
