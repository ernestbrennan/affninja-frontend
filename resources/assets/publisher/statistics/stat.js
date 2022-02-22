let bus = new Vue();

const Tab = {
    prev_stat_type: null,

    init() {
        let self = this;
        this.prev_stat_type = getSecondLocationPath();

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            if (StatParameter.active_ajax_for_stat) {
                return e.stopPropagation();
            }

            StatParameter.setPrevStatType(self.prev_stat_type);
            checkStatTypeParam();

            self.prev_stat_type = getSecondLocationPath();

            vm.current_tab = self.prev_stat_type;
            vm.getStat();
        });
    },
};


$(document).ready(function () {

    StatColumns.init();
    Tab.init();

    initCurrencyParam();
    checkStatTypeParam();

    HlBox.addEvent();
    runPopover();
    extendDatatable();

    TableHighlighter.init();

    // Удаление внутренних tr при нажатии на заголовки колонок таблиц
    $(document).on('click', '.dataTable:not(.dataTableCustom) thead th', function () {
        removeInsideTr();
    });

    // Scroll to top of statistic's table when paginate buttons are pressed
    $(document).on('page.dt', '.table.dataTable', function () {
        scrollToElement('#statistics_table_wrap', 0);
    });

    //fixed thead on change page
    $(document).on('click', '.paginate_button', function () {
        fixStatFixedHeaderOnChangeCurrency();
    });
});

const vm = new Vue({
    el: '#statistics',
    mixins: [filters_manager],
    data: {
        currency_id: getCurrencyIdByCode(UserAccount.getAccountCurrency()),
        current_tab: null,
        offer_hashes: [],
        landing_hashes: [],
        transit_hashes: [],
        additional_url_params: {
            sort_by: UrlParameter.getSortBy() || 'title',
            sorting: UrlParameter.getSortingOrNull() || 'desc',
            sorting_column: UrlParameter.getSortingColumnOrNull() || 'initialized_at',
            grouping: null,
            level_1_group_by: UrlParameter.getGroupByForLevel(1),
            level_2_group_by: UrlParameter.getGroupByForLevel(2),
            level_3_group_by: UrlParameter.getGroupByForLevel(3),
            level_4_group_by: UrlParameter.getGroupByForLevel(4),
        },

        filters: [
            'flow_hashes', 'date_to', 'date_from', 'country_ids', 'target_geo_country_ids', 'offer_hashes',
            'landing_hashes', 'transit_hashes', 'data1', 'data2', 'data3', 'data4', 'currency_id', 'lead_statuses',
            'device_type_ids', 'browser_ids', 'os_platform_ids'
        ],

        search_fields: [{
            title: LANG_MESSAGES.hash,
            value: 'hash',
        }, {
            title: LANG_MESSAGES.phone,
            value: 'phone',
        }, {
            title: LANG_MESSAGES.name,
            value: 'name',
        }, {
            title: LANG_MESSAGES.id,
            value: 'id',
        }],

        groupings: [{
            title: LANG_STATISTICS.effectiveness,
            value: 'effectiveness',
            group_by_fields: ['datetime', 'offer_country', 'flow'],
        }, {
            title: LANG_FILTERS.flow_filter,
            value: 'flows',
            group_by_fields: ['offer_country', 'flow'],
        }, {
            title: LANG_STATISTICS.transit_efficiency,
            value: 'transit_efficiency',
            group_by_fields: ['offer_country', 'transit', 'landing'],
        }, {
            title: LANG_STATISTICS.landing_efficiency,
            value: 'landing_efficiency',
            group_by_fields: ['offer_country', 'landing'],
        }, {
            title: LANG_STATISTICS.reports_by_device,
            value: 'reports_by_device',
            group_by_fields: ['device_type', 'os_platform', 'browser'],
        }, {
            title: LANG_STATISTICS.reports_by_geo,
            value: 'reports_by_geo',
            group_by_fields: ['country', 'region', 'city'],
        }, {
            title: LANG_STATISTICS.effective_weekdays,
            value: 'effective_weekdays',
            group_by_fields: ['offer_country', 'week_day'],
        }, {
            title: LANG_STATISTICS.effective_hours,
            value: 'effective_hours',
            group_by_fields: ['offer_country', 'hour'],
        }, {
            title: LANG_STATISTICS.user_settings,
            value: 'user_settings',
            group_by_fields: [],
        }],

        group_by_report_fields: [{
            title: LANG_NAVBAR.tab_day,
            value: 'datetime'
        }, {
            title: LANG_STATISTICS.week_day,
            value: 'week_day'
        }, {
            title: LANG_STATISTICS.day_hour,
            value: 'hour'
        }, {
            title: LANG_STATISTICS.group_by_offer_id,
            value: 'offer'
        }, {
            title: LANG_STATISTICS.target_geo,
            value: 'target_geo_country'
        }, {
            title: LANG_STATISTICS.offer_target_geo,
            value: 'offer_country'
        }, {
            title: LANG_STATISTICS.th_flow,
            value: 'flow'
        }, {
            title: LANG_STATISTICS.th_landing,
            value: 'landing'
        }, {
            title: LANG_STATISTICS.th_transit,
            value: 'transit'
        }, {
            title: LANG_STATISTICS.th_device_type,
            value: 'device_type'
        }, {
            title: LANG_STATISTICS.th_os_platform,
            value: 'os_platform'
        }, {
            title: LANG_STATISTICS.th_browser,
            value: 'browser'
        }, {
            title: LANG_STATISTICS.country_ip,
            value: 'country'
        }, {
            title: LANG_STATISTICS.region_ip,
            value: 'region'
        }, {
            title: LANG_STATISTICS.city_ip,
            value: 'city'
        }, {
            title: LANG_STATISTICS.group_by_data1,
            value: 'data1'
        }, {
            title: LANG_STATISTICS.group_by_data2,
            value: 'data2'
        }, {
            title: LANG_STATISTICS.group_by_data3,
            value: 'data3'
        }, {
            title: LANG_STATISTICS.group_by_data4,
            value: 'data4'
        }],

        unmatched_fields_1: ['device_type', 'os_platform', 'browser'],
        unmatched_fields_2: ['country', 'region', 'city'],

        group_by_device_fields: [{
            title: LANG_NAVBAR.tab_day,
            value: 'datetime'
        }, {
            title: LANG_STATISTICS.group_by_offer_id,
            value: 'offer'
        }, {
            title: LANG_STATISTICS.target_geo,
            value: 'target_geo_country'
        }, {
            title: LANG_STATISTICS.th_device_type,
            value: 'device_type'
        }, {
            title: LANG_STATISTICS.th_os_platform,
            value: 'os_platform'
        }, {
            title: LANG_STATISTICS.th_browser,
            value: 'browser'
        }, {
            title: LANG_STATISTICS.th_landing,
            value: 'landing'
        }, {
            title: LANG_STATISTICS.th_transit,
            value: 'transit'
        }, {
            title: LANG_STATISTICS.group_by_data1,
            value: 'data1'
        }, {
            title: LANG_STATISTICS.group_by_data2,
            value: 'data2'
        }, {
            title: LANG_STATISTICS.group_by_data3,
            value: 'data3'
        }, {
            title: LANG_STATISTICS.group_by_data4,
            value: 'data4'
        }],

    },

    created() {
        this.current_tab = getSecondLocationPath();

        filters_bus.$on('landing_hashes-init', landing_hashes => {
            this.landing_hashes = landing_hashes
        });

        filters_bus.$on('landing_hashes-updated', landing_hashes => {
            this.landing_hashes = landing_hashes
        });

        filters_bus.$on('transit_hashes-init', transit_hashes => {
            this.transit_hashes = transit_hashes
        });

        filters_bus.$on('transit_hashes-updated', transit_hashes => {
            this.transit_hashes = transit_hashes
        });

        let debouncedEmitRefreshEvent = _.debounce(function () {
            filters_bus.$emit('transit_hashes-refresh');
            filters_bus.$emit('landing_hashes-refresh');
        }, 1000);

        filters_bus.$on('offer_hashes-init', offer_hashes => {
            this.offer_hashes = offer_hashes
        });

        filters_bus.$on('offer_hashes-updated', offer_hashes => {
            this.offer_hashes = offer_hashes;

            if (this.current_tab === 'report') {
                return;
            }

            debouncedEmitRefreshEvent();
        });

        bus.$on('report-built', () => {
            activeAjax = false;
            StatParameter.active_ajax_for_stat = false;

            filters_bus.$emit('apply-filter-stop');

            ContentPreloader.hide();

            navbar.ready = true;
        });

        filters_bus.$on('filters-ready', () => {
            this.getStat();
        });

        filters_bus.$on('filters-applies', () => {
            this.getStat();
        });

        filters_bus.$on('currency_id-init', currency_id => {
            this.currency_id = currency_id;
        });

        filters_bus.$on('currency_id-updated', currency_id => {
            this.currency_id = currency_id;
            this.getStat();
        });

        filters_bus.$on('sort_by-changed', sort_by => {
            this.additional_url_params.sort_by = sort_by;
        });

        filters_bus.$on('sorting-changed', sorting => {
            this.additional_url_params.sorting = sorting;
        });

        filters_bus.$on('grouping-updated', value => {
            this.additional_url_params.grouping = value;
        });

        filters_bus.$on('grouping-fields-updated', params => {
            let is_user_settings = this.additional_url_params.grouping === 'user_settings';

            this.additional_url_params.level_1_group_by = is_user_settings ? params.level_1_group_by : null;
            this.additional_url_params.level_2_group_by = is_user_settings ? params.level_2_group_by : null;
            this.additional_url_params.level_3_group_by = is_user_settings ? params.level_3_group_by : null;
            this.additional_url_params.level_4_group_by = is_user_settings ? params.level_4_group_by : null;
        });
    },

    watch: {
        'offer_hashes'() {
            fixStatFixedHeaderOnChangeCurrency();
        },
    },

    methods: {
        refreshState() {
            $('#handlebars_stat_tpl_wrap').empty();
            StatParameter.stat_page = 1;
            StatParameter.stat_finished = false;
        },

        getStat() {
            navbar.ready = false;

            this.refreshState();

            activeAjax = true;
            StatParameter.active_ajax_for_stat = true;

            filters_bus.$emit('apply-filter-start');
            ContentPreloader.show('#statistics_table_wrap');

            $('#handlebars_stat_tpl_wrap').html('&nbsp;');

            switch (getSecondLocationPath()) {
                case 'day':
                    return this.$refs.by_days.getStat();

                case 'hour':
                    return this.$refs.by_hours.getStat();

                case 'flow':
                    return this.$refs.by_flows.getStat();

                case 'offer':
                    return this.$refs.by_offers.getStat();

                case 'target_geo':
                    return this.$refs.by_target_geo.getStat();

                case 'geo_ip':
                    return this.$refs.by_geo_ip.getStat();

                case 'landing':
                    return this.$refs.by_landings.getStat();

                case 'transit':
                    return this.$refs.by_transits.getStat();

                case 'report':
                    return this.$refs.by_report.getStat();

                case 'device':
                    return this.$refs.by_device.getStat();

                case 'leads':
                    this.$refs.by_leads.refreshLeads();
                    this.$refs.by_leads.clearLeads();
                    return this.$refs.by_leads.getStat();

                default:
                    throw "Incorrect type of statistic";
            }
        },
    }
});

/**
 * Получение статистики для конкретного значения сущности (дня, браузера, ОС)
 *
 * @param _this
 * @param identifier
 * @param callback
 */
function openInnerStat(_this, identifier, callback) {

    // Получаем значениче идентификатора сущности с data параметра
    let identifier_value = _this.data(identifier);
    let its_open = _this.hasClass('open');

    if (!its_open && !StatParameter.active_ajax_for_inside_tr_stat) {

        _this.addClass('open');

        callback(identifier_value);

    } else {

        if (its_open && !StatParameter.active_ajax_for_inside_tr_stat) {
            _this.closest('tr').nextAll('.tr_stat_inside.group-' + identifier + '-' + identifier_value).remove();

            _this.removeClass('open');
        }
    }
}

/**
 * Действия на странице в зависимости от типа статистики
 *
 * @returns {void}
 */
function checkStatTypeParam() {

    switch (getSecondLocationPath()) {

        case 'day':
            documentTitleSet(LANG_NAVBAR.stat_by_day + ' - ' + LANG_GLOBAL_APP.name);
            break;

        case 'hour':
            documentTitleSet(LANG_NAVBAR.stat_by_hour + ' - ' + LANG_GLOBAL_APP.name);
            break;

        case 'flow':
            documentTitleSet(LANG_NAVBAR.stat_by_flow + ' - ' + LANG_GLOBAL_APP.name);
            break;

        case 'offer':
            documentTitleSet(LANG_NAVBAR.stat_by_offer + ' - ' + LANG_GLOBAL_APP.name);
            break;

        case 'target_geo':
            documentTitleSet(LANG_NAVBAR.stat_by_geo + ' - ' + LANG_GLOBAL_APP.name);
            break;

        case 'geo_ip':
            documentTitleSet(LANG_NAVBAR.stat_by_geo_ip + ' - ' + LANG_GLOBAL_APP.name);
            break;

        case 'landing':
            documentTitleSet(LANG_NAVBAR.stat_by_landing + ' - ' + LANG_GLOBAL_APP.name);
            break;

        case 'transit':
            documentTitleSet(LANG_NAVBAR.stat_by_transit + ' - ' + LANG_GLOBAL_APP.name);
            break;

        case 'report':
            documentTitleSet(LANG_NAVBAR.reports + ' - ' + LANG_GLOBAL_APP.name);
            break;

        case 'device':
            documentTitleSet(LANG_NAVBAR.devices + ' - ' + LANG_GLOBAL_APP.name);
            break;

        case 'leads':
            documentTitleSet(LANG_NAVBAR.leads + ' - ' + LANG_GLOBAL_APP.name);
            break;

        default:
            throw "Incorrect type of statistic";
    }
}

function validateStatDates(date_from, date_to) {

    //Проверка, что дата начала меньше чем дата окончания статистики
    if (validateTwoDate(new Date(date_from), new Date(date_to), '1_less_than_2') === false) {
        showMessage('error', LANG_STATISTICS.incorrect_date);
        return false;
    }

    return true;
}

/**
 * Инициализация параметра валюты
 */
function initCurrencyParam() {
    let currency = UrlParameter.getCurrency();

    if (currency === 'null') {
        currency = UserAccount.getAccountCurrency().toLowerCase();
    }

    if (currency !== UserAccount.getAccountCurrency()) {
        UserAccount.setAccountCurrency(currency);
    }
}