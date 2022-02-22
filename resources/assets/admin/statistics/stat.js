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

    //fixed thead on chage page
    $(document).on('click', '.paginate_button', function () {
        fixStatFixedHeaderOnChangeCurrency();
    });

});

const vm = new Vue({
    el: '#statistics',
    mixins: [filters_manager],

    data: {
        currency_id: null,
        current_tab: null,
        offer_hashes: [],
        landing_hashes: [],
        transit_hashes: [],
        additional_url_params: {
            sort_by: UrlParameter.getSortingColumnOrNull() || 'date',
            sorting: UrlParameter.getSortingOrNull() || 'desc',
        },
        filters: [
            'date_to', 'date_from', 'publisher_hashes', 'target_geo_country_ids', 'country_ids', 'offer_hashes',
            'landing_hashes', 'transit_hashes', 'currency_id',
        ],
        search_fields: [{
            value: 'hash',
            title: LANG_MESSAGES.hash,
        }, {
            value: 'phone',
            title: LANG_MESSAGES.phone,
        }, {
            value: 'name',
            title: LANG_MESSAGES.name,
        }, {
            value: 'id',
            title: LANG_MESSAGES.id,
        }]
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

            debouncedEmitRefreshEvent();
        });

        bus.$on('report-built', () => {
            activeAjax = false;
            StatParameter.active_ajax_for_stat = false;

            filters_bus.$emit('apply-filter-stop');

            ContentPreloader.hide();

            navbar.ready = true;
        });

        filters_bus.$on('filters-applies', () => {
            this.getStat();
        });

        filters_bus.$on('currency_id-init', currency_id => {
            this.currency_id = currency_id;
        });

        filters_bus.$on('currency_id-updated', currency_id => {
            vm.getStat();
        });
    },

    mounted() {
        this.getStat();
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
                    this.$refs.by_days.getStat();
                    break;

                case 'hour':
                    this.$refs.by_hours.getStat();
                    break;

                case 'publisher':
                    this.$refs.by_publishers.getStat();
                    break;

                case 'offer':
                    this.$refs.by_offers.getStat();
                    break;

                case 'geo_ip':
                    this.$refs.by_geo_ip.getStat();
                    break;

                case 'target_geo':
                    this.$refs.by_target_geo.getStat();
                    break;

                case 'landing':
                    this.$refs.by_landings.getStat();
                    break;

                case 'transit':
                    this.$refs.by_transits.getStat();
                    break;

                default:
                    return false;
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
    var identifier_value = _this.data(identifier);
    var its_open = _this.hasClass('open');

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

        case 'publisher':
            documentTitleSet(LANG_NAVBAR.stat_by_publisher + ' - ' + LANG_GLOBAL_APP.name);
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

        default:
            throw "Incorrect type of statistic";
    }
}

/**
 * Инициализация параметра валюты
 */
function initCurrencyParam() {

    //Валюта
    var currency = UrlParameter.getCurrency();
    if (currency === 'null') {
        currency = UserAccount.getAccountCurrency().toLowerCase();
    }

    toggleCurrency(currency);

    if (currency !== UserAccount.getAccountCurrency()) {
        // Установка валюты аккаунта
        UserAccount.setAccountCurrency(currency);
    }
}