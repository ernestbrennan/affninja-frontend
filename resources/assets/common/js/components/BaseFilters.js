const BaseFilters = {
    alwaysOpened: !0,
    formatNoMatches: LANG_FILTERS.nothing_found,

    formatResult(a) {
        return a.text;
    },
    init() {
        this.initAllFilters();
        this.initDatepicker();
        this.initEventHandlers();
    },

    initDatepicker() {
        let self = this;

        //Добавление в datepicker RU языка
        addDatepickerRuLocale();

        //Запуск datepicker на фильтрах по дате
        $("#filter_date_from, #filter_date_to").datepicker({
            format: 'dd.mm.yyyy',
            weekStart: 1,
            changeMonth: true,
            language: 'ru'
        });

        //Обработчик на кнопке Закрыть в обертках фильтра date
        $('.filter_button_close').on('click', function () {
            $('.filter_wrap').hide();
        });

        //Задать значение фильтра по дате
        $('#filter_date_submit').click(function () {
            var date_from = getDateFromDatepicker('#filter_date_from');
            var date_to = getDateFromDatepicker('#filter_date_to');
            self.setDatepickerFilterValues(date_from, date_to);
            $('.filter_wrap').hide();
        });

        //Установка периода дат в фильтре по датам
        $('.set_date_filter a').on('click', function (e) {
            e.preventDefault();

            var date_from = $(this).data('date_from');
            var date_to = $(this).data('date_to');

            self.setDatepickerFilterValues(date_from, date_to);

            closeDateFilterOnPeriodSelected();
        });

        this.setDatepickerFilterValues(UrlParameter.getDateFrom(), UrlParameter.getDateTo())
    },

    initAllFilters() {
        let self = this;
        $("select.select2_filter").each(function () {
            self.initSelect2($(this))
        });
    },

    clearFilter(filter) {
        filter.select2Custom("val", "").trigger('change');
    },

    initSelect2(filter) {
        let _this, filtername, choosen_items;

        filter
            .select2Custom({
                alwaysOpened: this.alwaysOpened,
                formatNoMatches: this.formatNoMatches,
                formatResult: this.formatResult,
            })
            .on('change', function () {
                _this = $(this);
                filtername = _this.data('filtername');

                choosen_items = _this.val() ? _this.val().length : 0;

                _this
                    .closest('.filter')
                    .find('.btn-select')
                    .html(filtername + (choosen_items > 0 ? ' <b>' + choosen_items + '</b>' : ''));


                checkDuplicateNoResultFilds();
            }).change();
    },

    initEventHandlers() {
        let self = this;

        // Открытие/скрытие фильтра
        $(document).on('click', '.filter .btn-select', function () {
            $('.filter_wrap').hide();
            $(this).closest('.filter').find('.filter_wrap').toggle();
        });

        $(document).on('click', '.filter .btn-select b', function (e) {
            e.stopPropagation();
            $('.filter_wrap').hide();
            $(this).closest('.filter').find('.filter_wrap').toggle();
        });


        //Обработчик на кнопке очистить в обертке фильтра
        $('.filter_clear').on('click', function (e) {
            e.preventDefault();

            $('.filter_wrap').hide();

            let filter = $(this).closest('.filter_wrap').find('select.select2_filter');

            self.clearFilter(filter);
            self.initSelect2(filter)
        });

        // Hide filter
        $(document).on('click', function (e) {
            let _this = $(e.target);
            // Do not hide if its click on filter btn or inner element of filter wrap
            if (_this.closest(".filter_wrap").length || _this.hasClass('btn-select')) {
                return;
            }
            $('.filter_wrap').hide();
        });

        // Нажатие на кнопке "Применить" внутри фильтров
        $('.apply_filter').on('click', function (e) {
            e.preventDefault();

            $('.filter_wrap').hide();

            self.checkDuplicateNoResultFilds();
        });
    },

    getData() {
        return $('#filters').getFormData();
    },

    setFiltersInUrl(form_selector = '#filters', merge_params = {}) {

        let qs = http_build_query(
            _.merge(merge_params, $(form_selector).getFormData())
        );
        history.pushState("", "", location.pathname + '?' + qs);
    },

    checkDuplicateNoResultFilds() {
        $('.select2-results .select2-no-results').each(function (index, el) {
            let element = $(el),
                ul = element.closest('.select2-results'),
                all_duplicate_in_ul = ul.find('.select2-no-results');
            if (all_duplicate_in_ul.length > 1) {
                all_duplicate_in_ul.remove();
                ul.append(element);
            }
        })
    },

    setDatepickerFilterValues(date_from, date_to) {
        date_from = is_null(date_from) ? DATE_FROM_DEFAULT : date_from;
        date_to = is_null(date_to) ? DATE_TO_DEFAULT : date_to;

        let human_from_format = date('d.m.Y', strtotime(date_from)),
            human_to_format = date('d.m.Y', strtotime(date_to)),
            url_from_format = date('Y-m-d', strtotime(date_from)),
            url_to_format = date('Y-m-d', strtotime(date_to));


        $('#filter_date_from').datepicker('update', human_from_format);
        insertValueInUrl('date_from', url_from_format);


        $('#filter_date_to').datepicker('update', human_to_format);
        insertValueInUrl('date_to', url_to_format);


        $('#filter_date_button').html(human_from_format + ' - ' + human_to_format);
    },
};
