Vue.component('cc_integrations', {
    template: '#cc_integrations_component_template',
    data() {
        return {
            integrations: [],
            integration_info: {},
            action: null,
            integration_settings_modal: null
        }
    },

    mounted() {
        this.integration_settings_modal = $('#integration_settings_modal');
        this.getIntegrations();
        this.init();
    },

    methods: {
        init() {
            let self = this;

            $(document)
                .on('click', '.week-day-hour', function () {
                    $(this).toggleClass('selected');
                })
                .on('mouseover', '.week-day-hour', function () {
                    $(this).find('.day-tooltip').css('display', 'block');
                })
                .on('mouseout', '.week-day-hour', function () {
                    $('.day-tooltip').css('display', 'none');
                });

            //Выбор дня в datepicker
            $(document).on('click', '.week-day-title', function () {
                self.campaignSelectDay(this);
            });

            //Выбор часа в datepicker
            $(document).on('click', '.week-day-hour-title', function () {
                self.campaignSelectHour(this);
            });
            //Хэндлер на выбор диапазона часов показа по дням недели (напр. раб. дни, выходные, не раб ...)
            $(document).on('click', '.periods a', function (e) {
                e.preventDefault();
                switch (e.target.id) {
                    case 'all':
                        $('.week-table td').addClass('selected');
                        break;
                    case 'notWorkDay':
                        var dayid, hour;
                        $('.week-table td').removeClass('selected');
                        $('.week-day-hour').each(function () {
                            dayid = $(this).data('dayid');
                            hour = $(this).data('hour');
                            if (dayid >= 0 && dayid < 5 && (hour < 8 || hour > 17)) {
                                $(this).addClass('selected');
                            }
                        });
                        break;
                    case 'workDay':
                        var dayid, hour;
                        $('.week-table td').removeClass('selected');
                        $('.week-day-hour').each(function () {
                            dayid = $(this).data('dayid');
                            hour = $(this).data('hour');
                            if (dayid >= 0 && dayid < 5 && hour > 7 && hour < 18) {
                                $(this).addClass('selected');
                            }
                        });
                        break;
                    case 'weekend':
                        $('.week-table td').removeClass('selected');
                        $('.week-day-row-5 td, .week-day-row-6 td').addClass('selected');
                        break;
                    default:
                        break;
                }
            });

            //Очистка выбраных часов по дням недели
            $(document).on('click', '#campaignCleanDatetime', function () {
                $('.week-day-hour').removeClass('selected');
            });
        },

        getIntegrations() {
            ContentPreloader.show('#cc_integrations_wrap');
    
            api.get('/integration.getList').then(response => {
                this.integrations = response.data.response;
        
                Vue.nextTick(function () {
                    ContentPreloader.hide();
                });
            });
        },

        openCreateModal() {
            this.action = 'create';
            this.refreshIntegrationInfo();
            this.integration_settings_modal.modal();
        },

        createIntegration() {
            var self = this,
                params = this.integration_info;

            ladda_handler = LaddaPreloader.start('#create_integration_submit');

            params.worktime = {};
            if (!params.is_works_all_time) {
                params.worktime = this.getSchedule();
                if (params.worktime.length === 0 || this.selectedAllWorkHours(params.worktime)) {
                    params.is_works_all_time = 1;
                    params.worktime = [];
                }
            }

            api.post('/integration.create', params).then(response => {
                self.integrations.unshift(response.data.response);
                self.integration_settings_modal.modal('hide');
                self.integration_info = {};

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda_handler);

            }, () => {
                LaddaPreloader.stop(ladda_handler);
            });
        },

        openEditModal(index) {
            this.action = 'edit';
            this.integration_info = _.pick(this.integrations[index], _.keys(this.integrations[index]));
            this.setSelectedWorkTime();
            this.integration_settings_modal.modal();
        },

        editIntegration() {
            var self = this,
                params = this.integration_info,
                ladda_handler = LaddaPreloader.start('#edit_integration_submit');

            params.worktime = [];
            if (!params.is_works_all_time) {
                params.worktime = this.getSchedule();
                if (params.worktime.length === 0 || this.selectedAllWorkHours(params.worktime)) {
                    params.is_works_all_time = 1;
                    params.worktime = [];
                }
            }

            api.post('/integration.edit', params).then(response => {

                self.integration_settings_modal.modal('hide');
                self.integration_info = {};
                var index = _.findIndex(self.integrations, function (o) {
                    return o.id === params.id;
                });
                _.assign(self.integrations[index], response.data.response);

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda_handler);

            }, () => {
                LaddaPreloader.stop(ladda_handler);
            });
        },

        deleteIntegration(id, index) {
            Swal.show(LANG_INTEGRATIONS.on_delete_msg).then(() => {
                api.post('/integration.delete', {id: id}).then(response => {
                    this.integrations.splice(index, 1);
                    this.integration_settings_modal.modal('hide');

                    showMessage('success', response.data.message);
                });
            }, () => {});
        },

        refreshIntegrationInfo() {
            this.integration_info = {
                is_active: 1,
                is_works_all_time: 1,
                integration_data: '{}',
                schema: '{}',
                info: '',
            };
        },

        getSchedule() {
            var dayWithHourArr = {}, day = '', hour = '', dayIdInHtml, noSelectedDay = true;
            for (var dayId = 1; dayId < 8; dayId++) {
                dayWithHourArr[dayId] = [];
                dayIdInHtml = dayId - 1;
                $('.week-day-row-' + dayIdInHtml + ' > td.week-day-hour.selected').each(function () {
                    day = $(this).data('dayid');
                    hour = $(this).data('hour');
                    dayWithHourArr[dayId].push(hour);
                });
                if (dayWithHourArr[dayId].length > 0) {
                    noSelectedDay = false;
                }
            }

            return (noSelectedDay ? [] : dayWithHourArr);
        },

        setSelectedWorkTime() {
            $('.week-day-hour').removeClass('selected');

            if (this.integration_info.is_works_all_time === 1) {
                return false;
            }

            var item;
            for (item of this.integration_info.worktime) {
                $('.week-day-hour[data-dayid=' + (item.day - 1) + '][data-hour=' + item.hour + ']').addClass('selected')
            }
        },
        campaignSelectHour(_this) {
            var hour = $(_this).text().trim();
            if ($(_this).hasClass('cleared')) {
                $('[data-hour=' + hour + ']').each(function () {
                    $(this).addClass('selected');
                });
                $(_this).removeClass('cleared');
            } else {
                $('[data-hour=' + hour + ']').each(function () {
                    $(this).removeClass('selected');
                });
                $(_this).addClass('cleared');
            }
        },
        campaignSelectDay(_this) {
            if ($(_this).hasClass('cleared')) {
                $(_this).parent().find('.week-day-hour').addClass('selected');
                $(_this).removeClass('cleared');
            } else {
                $(_this).parent().find('.week-day-hour').removeClass('selected');
                $(_this).addClass('cleared');
            }

        },
        selectedAllWorkHours(worktime) {
            var count_all_workhours = 168, count_selected_workhours = 0;
            for (var day_index in worktime) {
                for (var hour of worktime[day_index]) {
                    count_selected_workhours++;
                }
            }
            return count_selected_workhours === count_all_workhours;
        }

    }
});
