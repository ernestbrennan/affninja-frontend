Vue.component('by-device', {
    template: '#stat_by_device_tpl',
    props: ['currency_id'],
    mixins: [reports_mixin],
    data: () => {
        return {
            traffic: StatColumns.columns.device.traffic,
            coefficient: StatColumns.columns.device.coefficient,
            conversion: StatColumns.columns.device.conversion,
            finance: StatColumns.columns.device.finance,
            table_id: 'device-tables table',
        }
    },

    created() {
        bus.$on('stat-settings-updated', stat_settings => {
            this.traffic = stat_settings.device.traffic;
            this.coefficient = stat_settings.device.coefficient;
            this.conversion = stat_settings.device.conversion;
            this.finance = stat_settings.device.finance;
        });

        filters_bus.$on('group-device-fields-init', params => {
            this.level_1_group_by = params.level_1_group_by;
            this.level_2_group_by = params.level_2_group_by;
            this.level_3_group_by = params.level_3_group_by;
            this.level_4_group_by = params.level_4_group_by;
        });

        filters_bus.$on('group-device-fields-applies', params => {
            this.level_1_group_by = params.level_1_group_by;
            this.level_2_group_by = params.level_2_group_by;
            this.level_3_group_by = params.level_3_group_by;
            this.level_4_group_by = params.level_4_group_by;
        });
    },

    methods: {
        getStat() {
            if (this.rows_loading) {
                return;
            }

            this.rows_loading = true;

            let params = this.$parent.getFiltersData(this.filters);

            params.level = 1;
            params.group_field = this.level_1_group_by;
            params.currency_id = getCurrencyIdByCode(UserAccount.getAccountCurrency());

            this.rows.splice(0);

            api.get('/stat.getDeviceReport', {params: params}).then(response => {

                _.assign(this.total, response.data.response.total);

                let row;
                for (row of response.data.response.stats) {
                    row.show_children = false;
                    row.children = [];
                    this.rows.push(row);
                }

                this.rows_loading = false;
            }, () => {
                this.rows_loading = false;
            });
        },

        getSecondLevelReport(first, first_index, event) {
            if (this.reports_loading) {
                return;
            }

            if (is_null(this.level_2_group_by) || this.level_2_group_by === undefined) {
                return;
            }

            this.toggleVisibility(first);

            if (first.children.length) {
                return;
            }

            this.reports_loading = true;

            let preloader = SmallPreloader.show(event.target),
                params = this.$parent.getFiltersData(this.filters);

            params.level = 2;
            params.group_field = this.level_2_group_by;
            params.currency_id = getCurrencyIdByCode(UserAccount.getAccountCurrency());

            params.level_1_field = this.level_1_group_by;
            params.level_1_value = first.id;

            api.get('/stat.getDeviceReport', {params: params}).then(response => {
                let row;
                for (row of response.data.response.stats) {
                    row.show_children = false;
                    row.children = [];
                    this.rows[first_index].children.push(row);
                }

                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            }, () => {
                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            });
        },

        getThirdLevelReport(first, first_index, second, second_index, event) {
            if (this.reports_loading) {
                return;
            }

            if (is_null(this.level_3_group_by) || this.level_3_group_by === undefined) {
                return;
            }

            this.toggleVisibility(second);

            if (second.children.length) {
                return;
            }

            this.reports_loading = true;

            let preloader = SmallPreloader.show(event.target),
                params = this.$parent.getFiltersData(this.filters);

            params.level = 3;
            params.group_field = this.level_3_group_by;
            params.currency_id = getCurrencyIdByCode(UserAccount.getAccountCurrency());

            params.level_1_field = this.level_1_group_by;
            params.level_1_value = first.id;
            params.level_2_field = this.level_2_group_by;
            params.level_2_value = second.id;

            api.get('/stat.getDeviceReport', {params: params}).then(response => {

                let row;
                for (row of response.data.response.stats) {
                    row.show_children = false;
                    row.children = [];
                    this.rows[first_index].children[second_index].children.push(row);
                }
                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            }, () => {
                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            });
        },

        getFourthLevelReport(first, first_index, second, second_index, third, third_index, event) {
            if (this.reports_loading) {
                return;
            }

            if (is_null(this.level_4_group_by) || this.level_4_group_by === undefined) {
                return;
            }

            this.toggleVisibility(third);

            if (third.children.length) {
                return;
            }

            this.reports_loading = true;

            let preloader = SmallPreloader.show(event.target),
                params = this.$parent.getFiltersData(this.filters);

            params.currency_id = getCurrencyIdByCode(UserAccount.getAccountCurrency());

            params.level = 4;
            params.group_field = this.level_4_group_by;

            params.level_1_field = this.level_1_group_by;
            params.level_1_value = first.id;
            params.level_2_field = this.level_2_group_by;
            params.level_2_value = second.id;
            params.level_3_field = this.level_3_group_by;
            params.level_3_value = third.id;

            api.get('/stat.getDeviceReport', {params: params}).then(response => {

                let row;
                for (row of response.data.response.stats) {
                    row.show_children = false;
                    row.children = [];
                    this.rows[first_index].children[second_index].children[third_index].children.push(row);
                }
                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            }, () => {
                SmallPreloader.hide(preloader);
                this.reports_loading = false;
            });
        },
    },
});