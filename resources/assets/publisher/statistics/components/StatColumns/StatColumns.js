StatColumnsData = {
    day: {
        traffic: {
            hits: true,
            unique_count: true,
            bot_count: false,
            safepage_count: false,
            traffback_count: true,
        },
        coefficient: {
            cr: false,
            cr_unique: true,
            epc: false,
            epc_unique: true,
            real_approve: true,
            expected_approve: false,
            approve: false
        },
        conversion: {
            total_leads: true,
            approved_count: true,
            held_count: true,
            cancelled_count: true,
            trashed_count: true
        },
        finance: {
            total_payout: false,
            onhold_payout: true,
            oncancel_payout: false,
            ontrash_payout: false,
            leads_payout: true,
        }
    },

    flow: {
        traffic: {
            hits: true,
            unique_count: true,
            bot_count: false,
            safepage_count: false,
            traffback_count: true,
        },
        coefficient: {
            uc: true,
            cr: false,
            cr_unique: true,
            epc: false,
            epc_unique: true,
            real_approve: true,
            expected_approve: false,
            approve: false
        },
        conversion: {
            total_leads: true,
            approved_count: true,
            held_count: true,
            cancelled_count: true,
            trashed_count: true
        },
        finance: {
            total_payout: false,
            onhold_payout: true,
            oncancel_payout: false,
            ontrash_payout: false,
            leads_payout: true,
        }
    },

    offer: {
        traffic: {
            hits: true,
            unique_count: true,
            offer_unique_count: true,
            bot_count: false,
            safepage_count: false,
            traffback_count: true,
        },
        coefficient: {
            cr: false,
            cr_unique: true,
            epc: false,
            epc_unique: true,
            real_approve: true,
            expected_approve: false,
            approve: false
        },
        conversion: {
            total_leads: true,
            approved_count: true,
            held_count: true,
            cancelled_count: true,
            trashed_count: true
        },
        finance: {
            total_payout: false,
            onhold_payout: true,
            oncancel_payout: false,
            ontrash_payout: false,
            leads_payout: true,
        }
    },

    geo_ip: {
        traffic: {
            hits: true,
            unique_count: true,
            bot_count: false,
            safepage_count: false,
            traffback_count: true,
        },
        coefficient: {
            cr: false,
            cr_unique: true,
            epc: false,
            epc_unique: true,
            real_approve: true,
            expected_approve: false,
            approve: false
        },
        conversion: {
            total_leads: true,
            approved_count: true,
            held_count: true,
            cancelled_count: true,
            trashed_count: true
        },
        finance: {
            total_payout: false,
            onhold_payout: true,
            oncancel_payout: false,
            ontrash_payout: false,
            leads_payout: true,
        }
    },

    target_geo: {
        traffic: {
            hits: true,
            unique_count: true,
            bot_count: false,
            safepage_count: false,
            traffback_count: true,
        },
        coefficient: {
            cr: false,
            cr_unique: true,
            epc: false,
            epc_unique: true,
            real_approve: true,
            expected_approve: false,
            approve: false
        },
        conversion: {
            total_leads: true,
            approved_count: true,
            held_count: true,
            cancelled_count: true,
            trashed_count: true
        },
        finance: {
            total_payout: false,
            onhold_payout: true,
            oncancel_payout: false,
            ontrash_payout: false,
            leads_payout: true,
        }
    },

    landing: {
        traffic: {
            unique_count: true,
            transit_landing_hosts: true,
            direct_landing_hosts: true,
            additional_hosts: true,
        },
        coefficient: {
            cr_unique: true,
            epc_unique: true,
            real_approve: true,
            expected_approve: false,
            approve: false
        },
        conversion: {
            total_leads: true,
            approved_count: true,
            held_count: true,
            cancelled_count: true,
            trashed_count: true
        },
        finance: {
            total_payout: false,
            onhold_payout: true,
            oncancel_payout: false,
            ontrash_payout: false,
            leads_payout: true,
        }
    },

    transit: {
        traffic: {
            unique_count: true,
        },
        coefficient: {
            ctr: true,
            cr_unique: true,
            epc_unique: true,
            real_approve: true,
            expected_approve: false,
            approve: false
        },
        conversion: {
            total_leads: true,
            approved_count: true,
            held_count: true,
            cancelled_count: true,
            trashed_count: true
        },
        finance: {
            total_payout: false,
            onhold_payout: true,
            oncancel_payout: false,
            ontrash_payout: false,
            leads_payout: true,
        }
    },

    report: {
        traffic: {
            hits: true,
            unique_count: true,
            bot_count: false,
            safepage_count: false,
            traffback_count: true,
        },
        coefficient: {
            cr: false,
            cr_unique: true,
            epc: false,
            epc_unique: true,
            real_approve: true,
            expected_approve: false,
            approve: false
        },
        conversion: {
            total_leads: true,
            approved_count: true,
            held_count: true,
            cancelled_count: true,
            trashed_count: true
        },
        finance: {
            total_payout: false,
            onhold_payout: true,
            oncancel_payout: false,
            ontrash_payout: false,
            leads_payout: true,
        }
    },

    device: {
        traffic: {
            hits: true,
            unique_count: true,
            bot_count: false,
            safepage_count: false,
            traffback_count: true,
        },
        coefficient: {
            cr: false,
            cr_unique: true,
            epc: false,
            epc_unique: true,
            real_approve: true,
            expected_approve: false,
            approve: false
        },
        conversion: {
            total_leads: true,
            approved_count: true,
            held_count: true,
            cancelled_count: true,
            trashed_count: true
        },
        finance: {
            total_payout: false,
            onhold_payout: true,
            oncancel_payout: false,
            ontrash_payout: false,
            leads_payout: true,
        }
    },
};

let StatColumns = {
    TEMPLATES_PATH: '/publisher/statistics/components/StatColumns/templates/',

    init() {
        this.initMarkRoi();
        this.addColumnsEvents();
        this.addOnCloseColumnsModalEvent();

        // Инициализируем сохраненные колонки
        let stat_type, column, column_group;

        for (stat_type in this.columns) {
            for (column_group in this.columns[stat_type]) {
                for (column in this.columns[stat_type][column_group]) {
                    let value = _.get(STAT_SETTINGS.columns, '[' + stat_type + '][' + column_group + '][' + column + ']', null);

                    if (is_null(value)) {
                        return;
                    }

                    this.columns[stat_type][column_group][column] = value;
                }
            }
        }
    },

    columns: StatColumnsData,

    mark_roi: false,

    initMarkRoi() {

        let _this = this,
            mark_roi_el = $('#is_mark_roi_rows');

        if (this.mark_roi) {
            mark_roi_el.prop('checked', true);
        }

        mark_roi_el.on('change', function () {
            _this.updateMarkRoi($(this).prop('checked'));
        });
    },

    addColumnsEvents: function () {
        let _this = this;
        $('#stat_output_columns_btn').on('click', function () {
            _this.openColumnsModal();
        });

        // Событие сохранения выбранных колонок
        $(document).on('click', '#stat_columns_modal_submit', function () {
            _this.updateColumns();
        });
    },

    addOnCloseColumnsModalEvent: function () {

        // Удаляем модалку при ее скрытии
        $(document).on('hidden.bs.modal', '#stat_columns_modal', function () {
            $(this).modal('hide').remove();
        });
    },

    updateMarkRoi(mark_roi) {
        // Обновление параметра mark_roi и отправка запроса API для сохранения параметров

        this.mark_roi = mark_roi;

        this.save();
    },


    openColumnsModal() {
        this.renderColumnsModalIn();

        // Скрываем окно настроек статистики
        $('.hl_box_stat_settings_wrap').addClass('hidden');
    },

    renderColumnsModalIn() {
        let stat_type = getSecondLocationPath(),
            tpl_data = {
                LANG_STATISTICS: LANG_STATISTICS,
                LANG_MESSAGES: LANG_MESSAGES,
                columns: this.columns[stat_type],
                stat_type: stat_type,
                CLOAKING: in_array('CLOAKING', USER_PERMISSIONS),
                modal_title: LANG_STATISTICS.configure_columns_modal_title +
                ' ' + LANG_STATISTICS['configure_columns_modal_title_by_' + stat_type]
            };

        renderTemplate(this.TEMPLATES_PATH + 'columns_modal.hbs', tpl_data, 'body', {}, function () {

            $('#stat_columns_modal').modal();

        }, 'append');
    },

    /**
     * Обновление значений полей обьекта StatColumns.columns нужной статистики
     */
    updateColumns() {

        var columns_modal = $('#stat_columns_modal'),
            columns_modal_form = columns_modal.find('#stat_columns_modal_form'),
            stat_type = columns_modal_form.find('[name=stat_type]').val(),
            columns = columns_modal_form.find('.column'),
            _this = this,
            name, group;

        // Перебираем все колонки в модалке и записуем значения в поля обьекта StatColumns.columns нужной статистики
        columns.each(function () {
            name = $(this).attr('name'); //Название поля
            group = $(this).data('group'); //Название поля

            _this.columns[stat_type][group][name] = $(this).prop('checked');
        });

        // Скрываем модалку выбора колонок
        columns_modal.modal('hide');

        // Сохраняем параметры статистики
        this.save();
    },

    save() {
        let stat_type = getSecondLocationPath(),
            params = {
                mark_roi: 0,
                columns: this.columns
            };

        api.post('/user.updateStatisticSettings', params).then(() => {
            bus.$emit('stat-settings-updated', this.columns);

            if (stat_type === 'report' || stat_type === 'device') {
                return;
            }
            filters_bus.$emit('filters-applies');
        });
    },
    
    refreshState() {
        $('#handlebars_stat_tpl_wrap').empty();
        bus.$emit('clear-stat-by-lead');
        StatParameter.stat_page = 1;
        StatParameter.stat_finished = false;
    },
    
    getCountEnabledColumns(enabled_columns) {
        let column, count = 0;
        
        for (column in enabled_columns) {
            if (enabled_columns[column]) {
                count++;
            }
        }
        
        return count;
    }
};