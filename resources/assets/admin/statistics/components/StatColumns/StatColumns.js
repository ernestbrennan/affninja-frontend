let StatColumns = {
    columns_btn: null, // Кнопка открытия модалки настроек колонок
    
    TEMPLATES_PATH: '/admin/statistics/components/StatColumns/templates/',
    
    init() {
        this.columns_btn = $('#stat_output_columns_btn');
        this.addColumnsEvents();
        this.addOnCloseColumnsModalEvent();
        
        // Если нету сохраненных параметров статистики
        if (!Object.size(STAT_SETTINGS) || !isset(STAT_SETTINGS.columns)) {
            return;
        }
        
        // Инициализируем сохраненные колонки
        let stat_type, column, column_group;
        for (stat_type in STAT_SETTINGS.columns) {
            for (column_group in STAT_SETTINGS.columns[stat_type]) {
                for (column in STAT_SETTINGS.columns[stat_type][column_group]) {
                    this.columns[stat_type][column_group][column] =
                        STAT_SETTINGS.columns[stat_type][column_group][column];
                }
            }
        }
    },
    
    columns: {
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
                profit: true,
            }
        },
        
        hour: {
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
                profit: true,
            }
        },

        publisher: {
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
                profit: true,
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
                profit: true,
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
                profit: true,
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
                profit: true,
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
                profit: true,
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
                profit: true,
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
                profit: true,
            }
        },
    },
    
    addColumnsEvents: function () {
        
        let _this = this;
        
        // Событие открытие модалки на нажатие кнопки выбора колонок
        this.columns_btn.on('click', function () {
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
    
    updateMarkRoi: function (mark_roi) {
        // Обновление параметра mark_roi и отправка запроса API для сохранения параметров
        
        this.mark_roi = mark_roi;
        
        this.save();
    },
    
    
    openColumnsModal: function () {
        
        this.renderColumnsModalIn();
        
        // Скрываем окно настроек статистики
        $('.hl_box_stat_settings_wrap').addClass('hidden');
    },
    
    renderColumnsModalIn: function () {
        let stat_type = this.getTabNameByStatType(getSecondLocationPath()),
            tpl_data = {
                LANG_STATISTICS: LANG_STATISTICS,
                LANG_MESSAGES: LANG_MESSAGES,
                columns: this.columns[stat_type],
                stat_type: stat_type,
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
    updateColumns: function () {
        
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
    
    /**
     * Получение реального названия статистики
     *
     * @param stat_type
     * @returns {*}
     */
    getTabNameByStatType: function (stat_type) {
        return stat_type;
    },
    
    save: function () {

        var params = {
            mark_roi: 0,
            columns: this.columns
        };
        
        apiRequest('user.updateStatisticSettings', 'POST', params, function () {
            vm.getStat(getSecondLocationPath());
        });
    },
    
    getCountEnabledColumns(enabled_columns) {
        
        var column, count = 0;
        
        for (column in enabled_columns) {
            if (enabled_columns[column]) {
                count++;
            }
        }
        
        return count;
    }
};

