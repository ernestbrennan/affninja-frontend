var activeAjax = false;
var CURRENCY_RUB_ID = 1;
var CURRENCY_USD_ID = 3;
var CURRENCY_EUR_ID = 5;
var CURRENCY_UAH_ID = 2;
var app_locale_id;

const WEBMONEY_RUB = 1;
const WEBMONEY_USD = 2;
const WEBMONEY_EUR = 3;
const PAXUM_RUB = 4;
const PAXUM_USD = 5;
const PAXUM_EUR = 6;
const EPAYMENTS_RUB = 7;
const EPAYMENTS_USD = 8;
const EPAYMENTS_EUR = 9;
const CASH_RUB = 10;
const CASH_USD = 11;
const CASH_EUR = 12;
const SWIFT_RUB = 13;
const SWIFT_USD = 14;
const SWIFT_EUR = 15;

const EN_LOCALE = 2;

const NEW_LEAD_COLOR = '#FFFFE9';
const APPROVED_LEAD_COLOR = '#e3f7dc';
const PAYOUT_COLOR = '#03A9F4';
const HOSTS_COLOR = '#9E9E9E';

const SERVER_TIME_OFFSET = 3;
const SERVER_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// Цвета заливки различных показателей статистики на графике (дашбоард паблишера)
const APPROVED_LEADS_BACKGROUND = 'rgba(176, 229, 152, 0.5)';
const LEADS_BACKGROUND = 'rgba(255, 231, 30, 0.2)';
const PAYOUT_BACKGROUND = 'rgba(3, 169, 244, 0.2)';
const HOSTS_BACKGROUND = 'rgba(158, 158, 158, 0.2)';
const PROFIT_BACKGROUND = 'rgba(255, 0, 0, 0.2)';

// Цвета ограничивающих линий для различных показателей статистики на графике (дашбоард паблишера)
// (используются также для всплывающей подсказки)
const APPROVED_LEADS_BORDER = 'rgba(63, 165, 61, 1)';
const LEADS_BORDER = 'rgba(209, 202, 6, 1)';
const PAYOUT_BORDER = 'rgba(81, 197, 255, 1)';
const HOSTS_BORDER = 'rgba(158, 158, 158, 1)';
const PROFIT_BORDER = 'rgba(255, 0, 0, 1)';

// Настройка всплывающей подсказки (дашбоард паблишера)
const TOOLTIP_BACKGROUND = 'rgba(0, 0, 0, 0.9)';
const TOOLTIP_TEXT_COLOR = 'rgb(255, 255, 255)';
const TOOLTIP_LABELS_BORDER = 'transparent';

// Опциональные настройки (дашбоард паблишера)
const BORDER_WIDTH = 1;
const POINT_HOVER_RADIUS = 5;

// Вертикальные и горизонтальные линии на графике
const GRID_LINES_COLOR = 'rgb(210, 210, 210)';

function onClickOutFilterBtn() {
    $(document).click(function (e) {
        var el = $(e.target);
        if (el.closest(".filter_wrap").length
            || el.hasClass('btn-filter')
            || el.closest('.btn-filter').length
            || e.target.id === 'filter_save'
            || el.closest('#filter_save').length
        ) {
            return;
        }

        $('.filter_wrap').hide();

        e.stopPropagation();
    });
}

/**
 * Toggle переключателей валюты
 *
 * @param currency
 */
function toggleCurrency(currency) {
    var currency_list_ul = $('#currency_list_ul');
    currency_list_ul.find('li').removeClass('active');
    currency_list_ul.find('[data-currency="' + currency.toLowerCase() + '"]').addClass('active');
}

function toggleTableByCurrency(currency) {
    var data_table_wrap = $('.data_table_wrap');
    data_table_wrap.hide();
    switch (currency.toLowerCase()) {
        case 'usd':
            $('#usd_table_wrap').show();
            break;

        case 'rub':
            $('#rub_table_wrap').show();
            break;

        case 'eur':
            $('#eur_table_wrap').show();
            break;

        default:
            throwIncorrectCurrency(currency);
    }
}

function getTableIdByCurrencyId(currency_id) {
    switch (parseInt(currency_id)) {
        case CURRENCY_RUB_ID:
            return 'rub_table';

        case CURRENCY_USD_ID:
            return 'usd_table';

        case CURRENCY_EUR_ID:
            return 'eur_table';

        default:
            throwIncorrectCurrency(currency_id);
    }
}

/**
 * Установка идентификатора локали
 */
function setAppLocaleId() {
    var APP_LOCALES = {
        1: {
            title: 'Русский',
            code: 'ru'
        },
        2: {
            title: 'English',
            code: 'en'
        },
        3: {
            title: 'Deutsch',
            code: 'de'
        },
        4: {
            title: 'Polski',
            code: 'pl'
        },
        5: {
            title: 'Spain',
            code: 'es'
        },
        6: {
            title: 'France',
            code: 'fr'
        }
    };
    var locale;
    for (locale in APP_LOCALES) {
        if (APP_LOCALES[locale].code === app_locale_code) {
            app_locale_id = locale;
            break;
        }
    }
}

function getCurrencySignById(currency_id) {
    let currency = _.find(currencies, {id: parseInt(currency_id)});
    if (currency === undefined) {
        throwIncorrectCurrency(currency_id);
    }

    return currency.sign;
}

function getCurrencySignByCode(currency_code) {
    let currency = _.find(currencies, {code: currency_code.toUpperCase()});
    if (currency === undefined) {
        throwIncorrectCurrency(currency_code);
    }
    return currency.sign;
}

function getCurrencyCodeById(currency_id) {
    let currency = _.find(currencies, {id: parseInt(currency_id)});
    if (currency === undefined) {
        throwIncorrectCurrency(currency_id);
    }
    return currency.code;
}

function getCurrencyIdByCode(currency_code) {
    let currency = _.find(currencies, {code: currency_code.toUpperCase()});
    if (currency === undefined) {
        throwIncorrectCurrency(currency_code);
    }
    return currency.id;
}

/**
 * Инициализация параметра валюты
 */
function initCurrencyParam() {

    //Валюта
    var currency = UrlParameter.getCurrency();
    if (currency == 'null') {
        currency = UserAccount.getAccountCurrency().toLowerCase();

        insertValueInUrl('currency', currency);
    }

    toggleCurrency(currency);
    toggleTableByCurrency(currency);

    if (currency !== UserAccount.getAccountCurrency()) {
        // Установка валюты аккаунта
        UserAccount.setAccountCurrency(currency);
        UserAccount.changeActiveCurrency(currency);
    }
}

//расширяем Object для определения кол-ва свойств в принимаемом Объекте
Object.size = function (obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};

/**
 * Вешаются обработчики событий на Объекты, которые должны работать как ссылки и, возможно, открываться в новых окнах
 *
 * @returns {void}
 */
function openNewWindowHandler() {
    $('.openNewWindow').off('click').on('click', function (e) {
        var href = $(this).data('href') || false;
        if (href === false) {
            return false;
        }

        //если зажат ctrl, нажатие колесика миши или cmd(Mac OS) - открываем в новом окне
        if (e.ctrlKey || e.which == 2 || e.metaKey) {
            window.open(href, '_blank');
        } else {
            location.href = href;
        }
    });
}

/**
 * Rand() as in php
 * @param {int} min
 * @param {int} max
 * @returns {Number}
 */
function rand(min, max) {
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Inner AJAX
 * @param {String} url
 * @param {String} request_type
 * @param {Object} params
 * @param {String} callback
 * @param {String} selector   //селектор, который нужно сделать disabled на время выполения AJAX запроса
 * @returns {callback}
 */
function httpRequest(url, request_type, params, callback, selector) {

    if (selector !== undefined && selector !== '' && selector != null) {
        //Вкл. прелоадер на кнопке
        var l = Ladda.create(nativeGetEl(selector));
        l.start();
    }

    $.ajax({
        type: request_type,
        url: url,
        data: params,
        beforeSend: function () {
            activeAjax = true;
        }
    }).success(function (data) {
        if (selector !== undefined && selector !== '' && selector != null) {
            $(selector).attr('disabled', false);
        }

        if (typeof callback == 'function') {
            if (data == 'needs_redirect') {
                location.href = '/';
                return false;
            }

            callback(data);
        }
        activeAjax = false;
    }).error(function (data) {
        if (selector !== undefined && selector !== '' && selector != null) {
            $(selector).attr('disabled', false);
        }

        if (typeof callback == 'function') {
            if (data == 'needs_redirect') {
                location.href = '/';
                return false;
            }

            var result = $.parseJSON(data.responseText);
            callback(result);
        }
        activeAjax = false;
    }).always(function () {
        if (selector !== undefined && selector !== '' && selector != null) {
            //Выкл. прелоадер на кнопке
            l.stop();
        }
    });
}

/**
 * API AJAX
 * @param {String} method
 * @param {String} request_type
 * @param {Object} params
 * @param {String} callback
 * @param {String} selector   //селектор, который нужно сделать disabled на время выполения AJAX запроса
 */
function apiRequest(method, request_type, params, callback, selector) {

    if (selector !== undefined && !empty(selector)) {
        //Вкл. прелоадер на кнопке
        var l = Ladda.create(nativeGetEl(selector));
        l.start();
    }

    if (is_null(params)) {
        params = {locale: 'ru'};
    } else {
        params.locale = 'ru';
    }

    activeAjax = true;

    api({
        method: request_type,
        url: API_HOST + '/' + method,
        params: request_type === 'GET' ? params : [],
        data: params,
        transformResponse: [function (data) {
            data = JSON.parse(data);
            data.request = params;

            return data;
        }],
    })
        .then(response => {
            if (selector !== undefined && !empty(selector)) {
                //Выкл. прелоадер на кнопке
                l.stop();
            }
            activeAjax = false;

            if (typeof callback === 'function') {
                callback(response.data);
            }
        }, error => {
            if (selector !== undefined && selector !== '' && !is_null(selector)) {
                //Выкл. прелоадер на кнопке
                l.stop();
            }

            if (typeof callback === 'function') {
                callback(error.response.data);
            }
        });
}

/**
 * Вывод системный сообщений
 *
 * @param type
 * @param title
 * @param text
 * @param options
 * @returns {boolean}
 */
function showMessage(type, title, text, options) {

    if (options !== undefined) {
        toastr.options = options;
    } else {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "2000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    }

    var alert_types = ['success', 'info', 'warning', 'error'];
    if (!in_array(type, alert_types)) {
        throw 'Неизвестный тип оповещения';
    }

    if (text === undefined) {
        toastr[type](title);
    } else {
        toastr[type](text, title);
    }

    return true;
}

/**
 * Получение переменных с адресной строки
 *
 * @returns {Array}
 */
function getUrlVars() {
    var vars = {};
    var href = decodeURI(window.location.href);
    var answer_position = href.indexOf('?');
    var hash_position = href.indexOf('#');

    if (answer_position < 0 && hash_position > 0) {
        href = href.replace('#', '?');
        answer_position = hash_position;
    }
    if (answer_position > 0 && hash_position > 0) {
        href = href.replace('#', '&');
    }
    var hashes = href.slice(answer_position + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        var part = hashes[i].split('=');
        // vars.push(part[0]);
        vars[part[0]] = part[1];
    }

    return vars;
}

function getVarsFromUrl(param) {
    let regexp = new RegExp('[\\??|&]' + param + '\\[?\\d\*\?\\]?=(.*?[^\&]*)', 'g'),
        search_str = decodeURIComponent(location.search),
        results = search_str.match(regexp),
        params = [],
        value;

    for (let key in results) {
        value = results[key].match(/=(.*[^&])&?$/);
        value = _.get(value, '[1]', '');

        if (isNumeric(value) && value[0] !== '+') {
            value = parseInt(value);
        }

        params.push(value);
    }

    return params;
}

function setQueryString(query) {
    if (typeof query !== 'string') {
        return;
    }

    if (query == '') {
        return;
    }

    if (history.replaceState)
        history.replaceState(null, null, '?' + query);
    else
        location.href = '#' + query;
}

/**
 * Проверка на уникальность значений в массиве
 * @param {Array} inputArray
 * @returns {Array}
 */
function uniqueArray(inputArray) {
    var n = inputArray.length, k = 0, finalArray = [];
    for (var i = 0; i < n; i++) {
        var j = 0;
        while (j < k && finalArray[j] !== inputArray[i])
            j++;
        if (j == k)
            finalArray[k++] = inputArray[i];
    }
    return finalArray;
}

/**
 * Поиск значения в массиве
 * @param {string} needle // что искать
 * @param {array} haystack // где искать
 * @param {boolean} strict
 * @returns {Boolean}
 */
function in_array(needle, haystack, strict) {
    var found = false, key, strict = !!strict;
    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }
    return found;
}

/**
 * Конвертация даты с формата Y-m-d в d.m.Y
 *
 * @param {String} date
 * @returns {String}
 */
function convertDateForReadableFormat(date) {
    if (!date) {
        return "";
    } else {
        var rightDate = date.split('-');
        return rightDate[2] + '.' + rightDate[1] + '.' + rightDate[0];
    }
}


/**
 * Конвертация даты с формата Y-m-d в d.m.Y
 *
 * @param {String} date
 * @returns {String}
 */
function convertDateToRightFormat(date) {
    if (!date) {
        return "";
    } else {
        var rightDate = date.split('.');
        return rightDate[2] + '-' + rightDate[1] + '-' + rightDate[0];
    }
}

function convertDateTimeToRightFormat(date) {
    if (!date) {
        return "";
    } else {

        var full_date = date.split(' ');
        var left_part = full_date[0].split('.');

        return left_part[2] + '-' + left_part[1] + '-' + left_part[0] + ' ' + full_date[1];
    }
}


function convertDateTimeToViewFormat(date) {
    if (!date) {
        return "";
    } else {

        var full_date = date.split(' ');
        var left_part = full_date[0].split('-');

        return left_part[2] + '.' + left_part[1] + '.' + left_part[0] + ' ' + full_date[1];
    }
}

/**
 * Запуск popover на странице
 *
 * @returns {undefined}
 */
function runPopover(html = true) {
    $('[data-toggle="popover"]').popover('destroy').popover({
        html: html,
        trigger: 'manual',
        container: $(this).attr('id'),
        // placement: 'top',
        content: function () {
            $return = '<div class="hover-hovercard"></div>';
        }
    }).on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(this).siblings(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide")
            }
        }, 100);
    });
}

function fixPopoverBehavior() {
    $(document).on('shown.bs.popover', function (e) {
        $('.popover').on('mouseleave', function () {
            $('.popover').remove();
        });
    });
};

function runTooltip() {
    $('[data-toggle="tooltip"]').not('[data-original_title]').tooltip({container: 'body'});
}

function runCustomTooltip() {
    $('[data-toggle="custom_tooltip"]').not('[data-original_title]').tooltip();
}

/**
 * Удаление обертки tooltip
 *
 * @returns {undefined}
 */
function removeTooltipDiv() {
    $('.tooltip').remove();
}

/**
 * Добавление  datepicker
 *
 * @returns {void}
 */
function addDatepickerRuLocale() {
    $.fn.datepicker.dates['ru'] = {
        days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
        daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Вск"],
        daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь",
            "Ноябрь", "Декабрь"],
        monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        today: "Сегодня"
    };
}

/**
 * Кнопка делается в тип "loading"
 *
 * @param {String} selector
 * @returns {void}
 */
function buttonLoading(selector) {
    $(selector).button('loading');
}

/**
 * Перевод секунд в минуты
 *
 * @param {String} sec  //секунды
 * @returns {String}
 */
function secondToMinute(sec) {
    var hour = Math.floor(sec / 3600);
    if (hour > 0) {
        sec = sec - (hour * 3600);
    }
    var minute = Math.floor(sec / 60);
    var second = sec % 60;
    return ((hour > 0) ? hour + ':' : '') + minute + ':' + ((second < 10) ? '0' + second : second);
}

/**
 * Хэндлер на скролл и вызов callback для догрузки контента
 *
 * @param {type} callback
 * @returns {void}
 */
function scrollHandler(callback) {
    window.onscroll = function () {
        var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
        var documentHeight = document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;
        var scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

        if (((documentHeight - clientHeight) <= scrollTop + 50) && activeAjax == false) {
            callback();
        }
    };
}

/**
 * Форматирование цифр в человекочитаемый вид
 *
 * @param {Number} number
 * @param {Number} decimals
 * @param {String} dec_point
 * @param {String} thousands_sep
 * @returns {String}
 */
function number_format(number, decimals = 2, dec_point = '.', thousands_sep = '') {
    //  discuss at: http://phpjs.org/functions/number_format/
    // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: davook
    // improved by: Brett Zamir (http://brett-zamir.me)
    // improved by: Brett Zamir (http://brett-zamir.me)
    // improved by: Theriault
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // bugfixed by: Michael White (http://getsprink.com)
    // bugfixed by: Benjamin Lupton
    // bugfixed by: Allan Jensen (http://www.winternet.no)
    // bugfixed by: Howard Yeend
    // bugfixed by: Diogo Resende
    // bugfixed by: Rival
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    //  revised by: Luke Smith (http://lucassmith.name)
    //    input by: Kheang Hok Chin (http://www.distantia.ca/)
    //    input by: Jay Klehr
    //    input by: Amir Habibi (http://www.residence-mixte.com/)
    //    input by: Amirouche
    //   example 1: number_format(1234.56);
    //   returns 1: '1,235'
    //   example 2: number_format(1234.56, 2, ',', ' ');
    //   returns 2: '1 234,56'
    //   example 3: number_format(1234.5678, 2, '.', '');
    //   returns 3: '1234.57'
    //   example 4: number_format(67, 2, ',', '.');
    //   returns 4: '67,00'
    //   example 5: number_format(1000);
    //   returns 5: '1,000'
    //   example 6: number_format(67.311, 2);
    //   returns 6: '67.31'
    //   example 7: number_format(1000.55, 1);
    //   returns 7: '1,000.6'
    //   example 8: number_format(67000, 5, ',', '.');
    //   returns 8: '67.000,00000'
    //   example 9: number_format(0.9, 0);
    //   returns 9: '1'
    //  example 10: number_format('1.20', 2);
    //  returns 10: '1.20'
    //  example 11: number_format('1.20', 4);
    //  returns 11: '1.2000'
    //  example 12: number_format('1.2000', 3);
    //  returns 12: '1.200'
    //  example 13: number_format('1 000,50', 2, '.', ' ');
    //  returns 13: '100 050.00'
    //  example 14: number_format(1e-8, 8, '.', '');
    //  returns 14: '0.00000001'

    number = (number + '')
        .replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + (Math.round(n * k) / k)
                .toFixed(prec);
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
        .split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
        .length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1)
            .join('0');
    }
    return s.join(dec);
}

/**
 * Расширение для dataTable для правильной сортировки чисел с number_format
 *
 * @param {type} oObj
 * @returns {unresolved}
 */
function RenderDecimalNumber(oObj) {
    var num = new NumberFormat();
    num.setInputDecimal('.');
    num.setNumber(oObj.aData[oObj.iDataColumn]);
    num.setPlaces(this.oCustomInfo.decimalPlaces, true);
    num.setCurrency(false);
    num.setNegativeFormat(num.LEFT_DASH);
    num.setSeparators(true, this.oCustomInfo.decimalSeparator, this.oCustomInfo.thousandSeparator);

    return num.toFormatted();
}

/**
 * Метод для расширения datatable всеми возможными плагинами для кастомных сортировок
 */
function extendDatatable() {
    dataTableSortTitleNumeric();
    dataTableSortTitleDeDate();
    dataTableSortDeDate();
    dataTableSortNumberFormat();
}

function dataTableSortTitleNumeric() {
    $.extend($.fn.dataTableExt.oSort, {
        "title-numeric-pre": function (a) {
            var x = a.match(/data-title="*(-?[0-9\.]+)/)[1];
            return parseFloat(x);
        },
        "title-numeric-asc": function (a, b) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },
        "title-numeric-desc": function (a, b) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    });
}

function dataTableSortTitleDeDate() {
    $.extend($.fn.dataTableExt.oSort, {
        "real_date-asc": function (a, b) {
            a = Date.parse(a.match(/data-sort="(.+?)"/)[1]);
            b = Date.parse(b.match(/data-sort="(.+?)"/)[1]);

            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },
        "real_date-desc": function (a, b) {
            a = Date.parse(a.match(/data-sort="(.+?)"/)[1]);
            b = Date.parse(b.match(/data-sort="(.+?)"/)[1]);

            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        },
        "title_de_date-asc": function (a, b) {
            var x, y;

            a = a.match(/title="*(-?[0-9\.]+)/)[1];
            b = b.match(/title="*(-?[0-9\.]+)/)[1];

            if ($.trim(a) !== '') {
                var deDatea = $.trim(a).split('.');
                x = (deDatea[2] + deDatea[1] + deDatea[0]) * 1;
            } else {
                x = Infinity; // = l'an 1000 ...
            }

            if ($.trim(b) !== '') {
                var deDateb = $.trim(b).split('.');
                y = (deDateb[2] + deDateb[1] + deDateb[0]) * 1;
            } else {
                y = Infinity;
            }
            var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
            return z;
        },
        "title_de_date-desc": function (a, b) {
            var x, y;

            a = a.match(/title="*(-?[0-9\.]+)/)[1];
            b = b.match(/title="*(-?[0-9\.]+)/)[1];

            if ($.trim(a) !== '') {
                var deDatea = $.trim(a).split('.');
                x = (deDatea[2] + deDatea[1] + deDatea[0]) * 1;
            } else {
                x = Infinity;
            }

            if ($.trim(b) !== '') {
                var deDateb = $.trim(b).split('.');
                y = (deDateb[2] + deDateb[1] + deDateb[0]) * 1;
            } else {
                y = Infinity;
            }
            var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
            return z;
        },
        "de_datetime_by_data-asc": function (a, b) {

            var x, y;

            a = a.match(/data-sort="*(-?[0-9\.\s\:]+)/)[1];
            b = b.match(/data-sort="*(-?[0-9\.\s\:]+)/)[1];

            if ($.trim(a) !== '') {
                var deDatea = $.trim(a).split(' ');
                var deTimea = deDatea[1].split(':');
                var deDatea2 = deDatea[0].split('.');
                x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
            } else {
                x = Infinity; // = l'an 1000 ...
            }

            if ($.trim(b) !== '') {
                var deDateb = $.trim(b).split(' ');
                var deTimeb = deDateb[1].split(':');
                deDateb = deDateb[0].split('.');
                y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
            } else {
                y = Infinity;
            }
            var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
            return z;
        },
        "de_datetime_by_data-desc": function (a, b) {

            var x, y;

            a = a.match(/data-sort="*(-?[0-9\.\s\:]+)/)[1];
            b = b.match(/data-sort="*(-?[0-9\.\s\:]+)/)[1];

            if ($.trim(a) !== '') {
                var deDatea = $.trim(a).split(' ');
                var deTimea = deDatea[1].split(':');
                var deDatea2 = deDatea[0].split('.');
                x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
            } else {
                x = Infinity;
            }

            if ($.trim(b) !== '') {
                var deDateb = $.trim(b).split(' ');
                var deTimeb = deDateb[1].split(':');
                deDateb = deDateb[0].split('.');
                y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
            } else {
                y = Infinity;
            }
            var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
            return z;
        },
    });
}

/**
 * Плагин для dataTable для сортировки чисел с number_format
 *
 * @returns {undefined}
 */
function dataTableSortNumberFormat() {
    $.extend($.fn.dataTableExt.oSort, {
        "formatted-num-pre": function (a) {
            a = (a === "-" || a === "") ? 0 : a.replace(/[^\d\-\.]/g, "");
            return parseFloat(a);
        },
        "formatted-num-asc": function (a, b) {
            return a - b;
        },
        "formatted-num-desc": function (a, b) {
            return b - a;
        }
    });
}

/**
 * Расширение dataTable для сортировки по дате
 *
 * @returns {void}
 */
function dataTableSortDeDate() {
//Пример параметров для сортировки по дате
//
//      $('#test').DataTable({
//            "paging": false,
//            "columnDefs": [
//                {type: 'de_date', targets: 0}
//            ],
//            "aaSorting": [[0, "desc"]]
    //        });

    $.extend($.fn.dataTableExt.oSort, {
        "de_datetime-asc": function (a, b) {
            var x, y;
            if ($.trim(a) !== '') {
                var deDatea = $.trim(a).split(' ');
                var deTimea = deDatea[1].split(':');
                var deDatea2 = deDatea[0].split('.');
                x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
            } else {
                x = Infinity; // = l'an 1000 ...
            }

            if ($.trim(b) !== '') {
                var deDateb = $.trim(b).split(' ');
                var deTimeb = deDateb[1].split(':');
                deDateb = deDateb[0].split('.');
                y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
            } else {
                y = Infinity;
            }
            var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
            return z;
        },
        "de_datetime-desc": function (a, b) {
            var x, y;
            if ($.trim(a) !== '') {
                var deDatea = $.trim(a).split(' ');
                var deTimea = deDatea[1].split(':');
                var deDatea2 = deDatea[0].split('.');
                x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
            } else {
                x = Infinity;
            }

            if ($.trim(b) !== '') {
                var deDateb = $.trim(b).split(' ');
                var deTimeb = deDateb[1].split(':');
                deDateb = deDateb[0].split('.');
                y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
            } else {
                y = Infinity;
            }
            var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
            return z;
        },
        "de_date-asc": function (a, b) {

            var x, y;
            if ($.trim(a) !== '') {
                var deDatea = $.trim(a).split('.');
                x = (deDatea[2] + deDatea[1] + deDatea[0]) * 1;
            } else {
                x = Infinity; // = l'an 1000 ...
            }

            if ($.trim(b) !== '') {
                var deDateb = $.trim(b).split('.');
                y = (deDateb[2] + deDateb[1] + deDateb[0]) * 1;
            } else {
                y = Infinity;
            }
            var z = ((x < y) ? -1 : ((x > y) ? 1 : 0));
            return z;
        },
        "de_date-desc": function (a, b) {

            var x, y;
            if ($.trim(a) !== '') {
                var deDatea = $.trim(a).split('.');
                x = (deDatea[2] + deDatea[1] + deDatea[0]) * 1;
            } else {
                x = Infinity;
            }

            if ($.trim(b) !== '') {
                var deDateb = $.trim(b).split('.');
                y = (deDateb[2] + deDateb[1] + deDateb[0]) * 1;
            } else {
                y = Infinity;
            }
            var z = ((x < y) ? 1 : ((x > y) ? -1 : 0));
            return z;
        }
    });
}

function is_null(mixed_var) {
    return (mixed_var === null);
}


/**
 * Удаление dataTable с страницы
 *
 * @returns {undefined}
 */
function removeDataTable(selector) {
    if ($(selector + '_wrapper').length) {
        $(selector.trim()).dataTable().fnDestroy();
    }
}

/**
 * Выполнение коллбека при нажатии кнопки Enter
 *
 * @param callback
 * @param options
 */
function submitActionOnEnterKey(callback, options) {
    $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
            if (typeof callback === 'function') {
                callback(options);
            }
        }
    });
}

function forbidEnter() {
    $(document).keydown(function (event) {
        var active_element = document.activeElement.type;
        if (event.keyCode == 13 && active_element != 'textarea') {
            event.preventDefault();
            return false;
        }
    });
}

/**
 * Запись в адресную строку значение параметра
 *
 * @param {String} param  //название параметра
 * @param {String} value  //значание параметра
 * @returns {boolean}
 */
function insertValueInUrl(param, value) {
    if (param === undefined) {
        console.error('param is undefined');
        return false;
    }

    if (value === undefined) {
        console.error('value is undefined');
        return false;
    }

    if (location.search == '') {
        history.pushState('', '', location.pathname + '?' + param + '=' + value);
        return true;
    }

    if (!hasParamInUrl(param)) {
        history.pushState('', '', location.pathname + location.search + '&' + param + '=' + value);
        return true;
    } else {
        replaceQueryParam(param, value);
        return true;
    }
}

/**
 * Проверка на существование параметра в URL
 *
 * @param param
 * @returns {boolean}
 */
function hasParamInUrl(param) {
    return getUrlVars()[param] !== undefined;
}

/**
 * Замена старого значение параметра адресной строки новым
 *
 * @param {string} param  //название параметра
 * @param {string | null} value  //новое значение
 * @returns {boolean}
 */
function replaceQueryParam(param, value) {
    if (param === undefined) {
        console.error('param is undefined');
        return false;
    }

    if (value === undefined) {
        console.error('value is undefined');
        return false;
    }

    var query_string = location.search;
    var reg = new RegExp('([?|&])' + param + '=(.*?)[^&]*', 'gi');

    //Замена
    var new_query_string = query_string.replace(reg, "$1" + param + '=' + value);
    if (new_query_string == '') {
        history.pushState('', '', '?' + param + '=' + value);
    } else {
        //Запись в адресную строку
        setQueryString(new_query_string.substr(1));
    }

    return true;
}

/**
 * Установка нового title
 *
 * @param {String} title
 * @returns {undefined}
 *
 */
function documentTitleSet(title) {
    if (title === undefined || title == '') {
        return;
    }

    document.title = title;
}

function setPageTitle(title) {
    $('h3.page-title').html(title);
}

function date(format, timestamp) {
    //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
    //   returns 1: '09:09:40 m is month'
    //   example 2: date('F j, Y, g:i a', 1062462400);
    //   returns 2: 'September 2, 2003, 2:26 am'
    //   example 3: date('Y W o', 1062462400);
    //   returns 3: '2003 36 2003'
    //   example 4: x = date('Y m d', (new Date()).getTime()/1000);
    //   example 4: (x+'').length == 10 // 2009 01 09
    //   returns 4: true
    //   example 5: date('W', 1104534000);
    //   returns 5: '53'
    //   example 6: date('B t', 1104534000);
    //   returns 6: '999 31'
    //   example 7: date('W U', 1293750000.82); // 2010-12-31
    //   returns 7: '52 1293750000'
    //   example 8: date('W', 1293836400); // 2011-01-01
    //   returns 8: '52'
    //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
    //   returns 9: '52 2011-01-02'

    var that = this;
    var jsdate, f;
    // Keep this here (works, but for code commented-out below for file size reasons)
    // var tal= [];
    var txt_words = [
        'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // trailing backslash -> (dropped)
    // a backslash followed by any character (including backslash) -> the character
    // empty string -> empty string
    var formatChr = /\\?(.?)/gi;
    var formatChrCb = function (t, s) {
        return f[t] ? f[t]() : s;
    };
    var _pad = function (n, c) {
        n = String(n);
        while (n.length < c) {
            n = '0' + n;
        }
        return n;
    };
    f = {
        // Day
        d: function () { // Day of month w/leading 0; 01..31
            return _pad(f.j(), 2);
        },
        D: function () { // Shorthand day name; Mon...Sun
            return f.l()
                .slice(0, 3);
        },
        j: function () { // Day of month; 1..31
            return jsdate.getDate();
        },
        l: function () { // Full day name; Monday...Sunday
            return txt_words[f.w()] + 'day';
        },
        N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
            return f.w() || 7;
        },
        S: function () { // Ordinal suffix for day of month; st, nd, rd, th
            var j = f.j();
            var i = j % 10;
            if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
                i = 0;
            }
            return ['st', 'nd', 'rd'][i - 1] || 'th';
        },
        w: function () { // Day of week; 0[Sun]..6[Sat]
            return jsdate.getDay();
        },
        z: function () { // Day of year; 0..365
            var a = new Date(f.Y(), f.n() - 1, f.j());
            var b = new Date(f.Y(), 0, 1);
            return Math.round((a - b) / 864e5);
        },
        // Week
        W: function () { // ISO-8601 week number
            var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
            var b = new Date(a.getFullYear(), 0, 4);
            return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
        },
        // Month
        F: function () { // Full month name; January...December
            return txt_words[6 + f.n()];
        },
        m: function () { // Month w/leading 0; 01...12
            return _pad(f.n(), 2);
        },
        M: function () { // Shorthand month name; Jan...Dec
            return f.F()
                .slice(0, 3);
        },
        n: function () { // Month; 1...12
            return jsdate.getMonth() + 1;
        },
        t: function () { // Days in month; 28...31
            return (new Date(f.Y(), f.n(), 0))
                .getDate();
        },
        // Year
        L: function () { // Is leap year?; 0 or 1
            var j = f.Y();
            return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
        },
        o: function () { // ISO-8601 year
            var n = f.n();
            var W = f.W();
            var Y = f.Y();
            return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
        },
        Y: function () { // Full year; e.g. 1980...2010
            return jsdate.getFullYear();
        },
        y: function () { // Last two digits of year; 00...99
            return f.Y()
                .toString()
                .slice(-2);
        },
        // Time
        a: function () { // am or pm
            return jsdate.getHours() > 11 ? 'pm' : 'am';
        },
        A: function () { // AM or PM
            return f.a()
                .toUpperCase();
        },
        B: function () { // Swatch Internet time; 000..999
            var H = jsdate.getUTCHours() * 36e2;
            // Hours
            var i = jsdate.getUTCMinutes() * 60;
            // Minutes
            var s = jsdate.getUTCSeconds(); // Seconds
            return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
        },
        g: function () { // 12-Hours; 1..12
            return f.G() % 12 || 12;
        },
        G: function () { // 24-Hours; 0..23
            return jsdate.getHours();
        },
        h: function () { // 12-Hours w/leading 0; 01..12
            return _pad(f.g(), 2);
        },
        H: function () { // 24-Hours w/leading 0; 00..23
            return _pad(f.G(), 2);
        },
        i: function () { // Minutes w/leading 0; 00..59
            return _pad(jsdate.getMinutes(), 2);
        },
        s: function () { // Seconds w/leading 0; 00..59
            return _pad(jsdate.getSeconds(), 2);
        },
        u: function () { // Microseconds; 000000-999000
            return _pad(jsdate.getMilliseconds() * 1000, 6);
        },
        // Timezone
        e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
            // The following works, but requires inclusion of the very large
            // timezone_abbreviations_list() function.
            /*              return that.date_default_timezone_get();
             */
            throw 'Not supported (see source code of date() for timezone on how to add support)';
        },
        I: function () { // DST observed?; 0 or 1
            // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
            // If they are not equal, then DST is observed.
            var a = new Date(f.Y(), 0);
            // Jan 1
            var c = Date.UTC(f.Y(), 0);
            // Jan 1 UTC
            var b = new Date(f.Y(), 6);
            // Jul 1
            var d = Date.UTC(f.Y(), 6); // Jul 1 UTC
            return ((a - c) !== (b - d)) ? 1 : 0;
        },
        O: function () { // Difference to GMT in hour format; e.g. +0200
            var tzo = jsdate.getTimezoneOffset();
            var a = Math.abs(tzo);
            return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
        },
        P: function () { // Difference to GMT w/colon; e.g. +02:00
            var O = f.O();
            return (O.substr(0, 3) + ':' + O.substr(3, 2));
        },
        T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
            // The following works, but requires inclusion of the very
            // large timezone_abbreviations_list() function.
            /*              var abbr, i, os, _default;
             if (!tal.length) {
             tal = that.timezone_abbreviations_list();
             }
             if (that.php_js && that.php_js.default_timezone) {
             _default = that.php_js.default_timezone;
             for (abbr in tal) {
             for (i = 0; i < tal[abbr].length; i++) {
             if (tal[abbr][i].timezone_id === _default) {
             return abbr.toUpperCase();
             }
             }
             }
             }
             for (abbr in tal) {
             for (i = 0; i < tal[abbr].length; i++) {
             os = -jsdate.getTimezoneOffset() * 60;
             if (tal[abbr][i].offset === os) {
             return abbr.toUpperCase();
             }
             }
             }
             */
            return 'UTC';
        },
        Z: function () { // Timezone offset in seconds (-43200...50400)
            return -jsdate.getTimezoneOffset() * 60;
        },
        // Full Date/Time
        c: function () { // ISO-8601 date.
            return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
        },
        r: function () { // RFC 2822
            return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
        },
        U: function () { // Seconds since UNIX epoch
            return jsdate / 1000 | 0;
        }
    };

    function internal_date(format, timestamp) {
        that = this;
        jsdate = (timestamp === undefined ? new Date() : // Not provided
                (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
                    new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
        );
        return format.replace(formatChr, formatChrCb);
    }

    return internal_date(format, timestamp);
}

function showEl(selector) {
    if (selector === undefined || selector === '') {
        return false;
    }

    $(selector).show();
}


function hideEl(selector) {
    if (selector === undefined || selector === '') {
        return false;
    }

    $(selector).hide();
}

/**
 * Сравнение двух дат
 *
 * @param {Object} first_date  //первая дата
 * @param {Object} second_date //вторая дата
 * @param {String} cmp_flag    //флаг сравнения
 * @returns {Boolean}
 */
function validateTwoDate(first_date, second_date, cmp_flag) {
    if (cmp_flag == '1_more_than_2') {//Проверка, что 1 дата больше чем 2
        if (first_date.getFullYear() < second_date.getFullYear()) {
            return false;
        }

        if (first_date.getFullYear() <= second_date.getFullYear() && first_date.getMonth() < second_date.getMonth()) {
            return false;
        }

        if (first_date.getFullYear() <= second_date.getFullYear()
            && first_date.getMonth() <= second_date.getMonth()
            && first_date.getDate() < second_date.getDate()) {
            return false;
        }
    } else if (cmp_flag == '1_less_than_2') {//Проверка, что 1 дата меньше чем 2
        if (first_date.getFullYear() > second_date.getFullYear()) {
            return false;
        }

        if (first_date.getFullYear() >= second_date.getFullYear() && first_date.getMonth() > second_date.getMonth()) {
            return false;
        }

        if (first_date.getFullYear() >= second_date.getFullYear()
            && first_date.getMonth() >= second_date.getMonth()
            && first_date.getDate() > second_date.getDate()) {
            return false;
        }
    } else {
        return false;
    }

    return true;
}

$.fn.exists = function () {
    return this.length !== 0;
}
$.fn.getFormData = function () {

    let params = {}, item, param, is_array_param;
    let formdata = this.serializeArray();

    for (item of formdata) {
        let value = item.value.trim();

        if (isNumeric(value) && value[0] !== '+') {
            value = parseInt(value);
        }

        is_array_param = false;
        param = item.name.trim();

        if (param.substr(-2) === '[]') {
            is_array_param = true;
            param = param.substr(0, param.length - 2);
        }

        if (params[param] instanceof Array) {
            params[param].push(value);
        } else if (!params.hasOwnProperty(param) && value !== '') {
            // If its array parameter
            if (is_array_param) {
                params[param] = [value];
            } else {
                params[param] = value;
            }
        }
    }

    return params;
};

function isNumeric(val) {
    return Number(parseFloat(val)) == val;
}

function isset() {
    //  discuss at: http://phpjs.org/functions/isset/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: FremyCompany
    // improved by: Onno Marsman
    // improved by: Rafał Kukawski (http://blog.kukawski.pl)
    //   example 1: isset( undefined, true);
    //   returns 1: false
    //   example 2: isset( 'Kevin van Zonneveld' );
    //   returns 2: true

    var a = arguments,
        l = a.length,
        i = 0,
        undef

    if (l === 0) {
        throw new Error('Empty isset')
    }

    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false
        }
        i++
    }
    return true
}

/**
 * Аналог одноименной ф-ции в PHP
 *
 * @returns {Number}
 */
function time() {
    return parseInt(new Date().getTime() / 1000)
}


/**
 * Аналог php ф-ции
 *
 * @param text
 * @param now
 * @returns {*}
 */
function strtotime(text, now) {
    //   example 1: strtotime('+1 day', 1129633200);
    //   returns 1: 1129719600
    //   example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
    //   returns 2: 1130425202
    //   example 3: strtotime('last month', 1129633200);
    //   returns 3: 1127041200
    //   example 4: strtotime('2009-05-04 08:30:00 GMT');
    //   returns 4: 1241425800

    var parsed, match, today, year, date, days, ranges, len, times, regex, i, fail = false;

    if (!text) {
        return fail;
    }

    // Unecessary spaces
    text = text.replace(/^\s+|\s+$/g, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/[\t\r\n]/g, '')
        .toLowerCase();

    // in contrast to php, js Date.parse function interprets:
    // dates given as yyyy-mm-dd as in timezone: UTC,
    // dates with "." or "-" as MDY instead of DMY
    // dates with two-digit years differently
    // etc...etc...
    // ...therefore we manually parse lots of common date formats
    match = text.match(
        /^(\d{1,4})([\-\.\/\:])(\d{1,2})([\-\.\/\:])(\d{1,4})(?:\s(\d{1,2}):(\d{2})?:?(\d{2})?)?(?:\s([A-Z]+)?)?$/);

    if (match && match[2] === match[4]) {
        if (match[1] > 1901) {
            switch (match[2]) {
                case '-': { // YYYY-M-D
                    if (match[3] > 12 || match[5] > 31) {
                        return fail;
                    }

                    return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                        match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                }
                case '.': { // YYYY.M.D is not parsed by strtotime()
                    return fail;
                }
                case '/': { // YYYY/M/D
                    if (match[3] > 12 || match[5] > 31) {
                        return fail;
                    }

                    return new Date(match[1], parseInt(match[3], 10) - 1, match[5],
                        match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                }
            }
        } else if (match[5] > 1901) {
            switch (match[2]) {
                case '-': { // D-M-YYYY
                    if (match[3] > 12 || match[1] > 31) {
                        return fail;
                    }

                    return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                        match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                }
                case '.': { // D.M.YYYY
                    if (match[3] > 12 || match[1] > 31) {
                        return fail;
                    }

                    return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                        match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                }
                case '/': { // M/D/YYYY
                    if (match[1] > 12 || match[3] > 31) {
                        return fail;
                    }

                    return new Date(match[5], parseInt(match[1], 10) - 1, match[3],
                        match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                }
            }
        } else {
            switch (match[2]) {
                case '-': { // YY-M-D
                    if (match[3] > 12 || match[5] > 31 || (match[1] < 70 && match[1] > 38)) {
                        return fail;
                    }

                    year = match[1] >= 0 && match[1] <= 38 ? +match[1] + 2000 : match[1];
                    return new Date(year, parseInt(match[3], 10) - 1, match[5],
                        match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                }
                case '.': { // D.M.YY or H.MM.SS
                    if (match[5] >= 70) { // D.M.YY
                        if (match[3] > 12 || match[1] > 31) {
                            return fail;
                        }

                        return new Date(match[5], parseInt(match[3], 10) - 1, match[1],
                            match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                    }
                    if (match[5] < 60 && !match[6]) { // H.MM.SS
                        if (match[1] > 23 || match[3] > 59) {
                            return fail;
                        }

                        today = new Date();
                        return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                            match[1] || 0, match[3] || 0, match[5] || 0, match[9] || 0) / 1000;
                    }

                    return fail; // invalid format, cannot be parsed
                }
                case '/': { // M/D/YY
                    if (match[1] > 12 || match[3] > 31 || (match[5] < 70 && match[5] > 38)) {
                        return fail;
                    }

                    year = match[5] >= 0 && match[5] <= 38 ? +match[5] + 2000 : match[5];
                    return new Date(year, parseInt(match[1], 10) - 1, match[3],
                        match[6] || 0, match[7] || 0, match[8] || 0, match[9] || 0) / 1000;
                }
                case ':': { // HH:MM:SS
                    if (match[1] > 23 || match[3] > 59 || match[5] > 59) {
                        return fail;
                    }

                    today = new Date();
                    return new Date(today.getFullYear(), today.getMonth(), today.getDate(),
                        match[1] || 0, match[3] || 0, match[5] || 0) / 1000;
                }
            }
        }
    }

    // other formats and "now" should be parsed by Date.parse()
    if (text === 'now') {
        return now === null || isNaN(now) ? new Date()
            .getTime() / 1000 | 0 : now | 0;
    }
    if (!isNaN(parsed = Date.parse(text))) {
        return parsed / 1000 | 0;
    }

    date = now ? new Date(now * 1000) : new Date();
    days = {
        'sun': 0,
        'mon': 1,
        'tue': 2,
        'wed': 3,
        'thu': 4,
        'fri': 5,
        'sat': 6
    };
    ranges = {
        'yea': 'FullYear',
        'mon': 'Month',
        'day': 'Date',
        'hou': 'Hours',
        'min': 'Minutes',
        'sec': 'Seconds'
    };

    function lastNext(type, range, modifier) {
        var diff, day = days[range];

        if (typeof day !== 'undefined') {
            diff = day - date.getDay();

            if (diff === 0) {
                diff = 7 * modifier;
            } else if (diff > 0 && type === 'last') {
                diff -= 7;
            } else if (diff < 0 && type === 'next') {
                diff += 7;
            }

            date.setDate(date.getDate() + diff);
        }
    }

    function process(val) {
        var splt = val.split(' '),
            type = splt[0],
            range = splt[1].substring(0, 3),
            typeIsNumber = /\d+/.test(type),
            ago = splt[2] === 'ago',
            num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

        if (typeIsNumber) {
            num *= parseInt(type, 10);
        }

        if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
            return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
        }

        if (range === 'wee') {
            return date.setDate(date.getDate() + (num * 7));
        }

        if (type === 'next' || type === 'last') {
            lastNext(type, range, num);
        } else if (!typeIsNumber) {
            return false;
        }

        return true;
    }

    times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
        '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
        '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
    regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

    match = text.match(new RegExp(regex, 'gi'));
    if (!match) {
        return fail;
    }

    for (i = 0, len = match.length; i < len; i++) {
        if (!process(match[i])) {
            return fail;
        }
    }

    // ECMAScript 5 only
    // if (!match.every(process))
    //    return false;

    return (date.getTime() / 1000);
}

$.fn.setCursorPosition = function (pos) {
    this.each(function (index, elem) {
        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    });
    return this;
};

/**
 * Аналог PHP ф-ции
 *
 * @param haystack
 * @param needle
 * @param bool
 * @returns {*}
 */
function stristr(haystack, needle, bool) {
    //   example 1: stristr('Kevin van Zonneveld', 'Van');
    //   returns 1: 'van Zonneveld'
    //   example 2: stristr('Kevin van Zonneveld', 'VAN', true);
    //   returns 2: 'Kevin '

    var pos = 0;

    haystack += '';
    pos = haystack.toLowerCase()
        .indexOf((needle + '')
            .toLowerCase());
    if (pos == -1) {
        return false;
    } else {
        if (bool) {
            return haystack.substr(0, pos);
        } else {
            return haystack.slice(pos);
        }
    }
}

function htmlspecialchars_decode(string, quote_style) {
    var optTemp = 0,
        i = 0,
        noquotes = false;
    if (typeof quote_style === 'undefined') {
        quote_style = 2;
    }
    string = string.toString()
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE': 1,
        'ENT_HTML_QUOTE_DOUBLE': 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE': 4
    };
    if (quote_style === 0) {
        noquotes = true;
    }
    if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
        quote_style = [].concat(quote_style);
        for (i = 0; i < quote_style.length; i++) {
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
            if (OPTS[quote_style[i]] === 0) {
                noquotes = true;
            } else if (OPTS[quote_style[i]]) {
                optTemp = optTemp | OPTS[quote_style[i]];
            }
        }
        quote_style = optTemp;
    }
    if (quote_style && OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
        // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
    }
    if (!noquotes) {
        string = string.replace(/&quot;/g, '"');
    }
    // Put this in last place to avoid escape being double-decoded
    string = string.replace(/&amp;/g, '&');

    return string;
}

function http_build_query(formdata, numeric_prefix, arg_separator, url_decode) {
    //  discuss at: http://phpjs.org/functions/http_build_query/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Legaev Andrey
    // improved by: Michael White (http://getsprink.com)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Brett Zamir (http://brett-zamir.me)
    //  revised by: stag019
    //    input by: Dreamer
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
    //        note: If the value is null, key and value are skipped in the http_build_query of PHP while in phpjs they are not.
    //  depends on: urlencode
    //   example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
    //   returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
    //   example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
    //   returns 2: 'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&php=hypertext+processor&cow=milk'

    var value, key, tmp = [],
        that = this;

    if (url_decode === undefined) url_decode = true;

    var _http_build_query_helper = function (key, val, arg_separator) {
        var k, tmp = [];
        if (val === true) {
            val = '1';
        } else if (val === false) {
            val = '0';
        }
        if (val != null) {
            if (typeof val === 'object') {
                for (k in val) {
                    if (val[k] != null) {
                        tmp.push(_http_build_query_helper(key + '[' + k + ']', val[k], arg_separator));
                    }
                }
                return tmp.join(arg_separator);
            } else if (typeof val !== 'function') {

                if (url_decode) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val);

                } else {
                    return key + '=' + val;
                }
            } else {
                throw new Error('There was an error processing for http_build_query().');
            }
        } else {
            return '';
        }
    };

    if (!arg_separator) {
        arg_separator = '&';
    }
    for (key in formdata) {
        value = formdata[key];
        if (numeric_prefix && !isNaN(key)) {
            key = String(numeric_prefix) + key;
        }
        var query = _http_build_query_helper(key, value, arg_separator);
        if (query !== '') {
            tmp.push(query);
        }
    }

    return tmp.join(arg_separator);
}


/**
 * Обертка для нативного querySelector
 *
 * @param selector
 */
function nativeGetEl(selector) {
    return document.querySelector(selector);
}

/**
 * Отображение ошибок валидации формы
 *
 * @param result
 * @param form_selector
 * @param errors_selector
 */
function showFormErrors(result, form_selector, errors_selector) {

    var reg_form = $(form_selector);
    var reg_error_wrapper = $(errors_selector);

    reg_form.find('.form-group').removeClass('has-error');

    var error_messages = '<b>' + result.message + '</b>';

    if (isset(result.errors) && Object.size(result.errors)) {
        error_messages += '<br><br>';
    }

    for (var field_name in result.errors) {
        reg_form.find('[name=' + field_name + ']').parent().addClass('has-error');

        for (var item in result.errors[field_name]) {
            error_messages += '- ' + result.errors[field_name][item] + '<br>';
        }
    }

    reg_error_wrapper.show().html(error_messages);
}

/**
 * Отображение ошибок валидации в нотификейшине
 *
 * @param result
 * @param form_selector
 */
function showErrorsInAlert(result, form_selector) {
    if (!is_null(form_selector)) {
        var form_el = $(form_selector);
        removeFormErrorFields(form_selector);
    }

    var error_description = '';
    for (var field_name in result.errors) {

        if (!is_null(form_selector)) {
            form_el.find('[name=' + field_name + ']').parent().addClass('has-error');
        }

        for (var item in result.errors[field_name]) {
            error_description += '- ' + result.errors[field_name][item] + '<br>';
        }
    }

    showMessage('error', result.message, error_description, null);
}

function removeFormErrorFields(form_selector) {
    $(form_selector).find('.form-group').removeClass('has-error');
}

function showAjaxPreloader() {
    $('#ajax_preloader').fadeIn();
}

function hideAjaxPreloader() {
    $('#ajax_preloader').hide();
}

/**
 * Скролл к нужному эл-ту на странице
 *
 * @param selector
 * @param speed
 */
function scrollToElement(selector, speed) {

    speed = (is_null(speed) ? 1500 : speed);

    $('html, body').animate({
        scrollTop: $(selector).offset().top
    }, speed);
}

if ($.fn.editable !== undefined) {
    $.fn.editable.defaults.mode = 'inline';
}

/**
 * Обертка для работы с socket.io
 *
 * @constructor
 */
function SocketIoConnection() {
    if ("WebSocket" in window) {
        var socket = io(SOCKET_URL);

        socket.on('updateCountUnreadedTickets', function (data) {
            console.log(data);
            var params = JSON.parse(data);
            updateCountUnreadedTickets(params);
        });

        socket.on('insertMessageInTicket', function (data) {
            console.log(data);
            var params = JSON.parse(data);
            insertMessageInTicket(params);
        });

        socket.on('user-balance-changed', function (data) {
            data = JSON.parse(data);
            UserAccount.setBalance(data.data, UserAccount.getAccountCurrency());
        });

        socket.on('user-logout', function () {
            location.reload();
        });

        //Авторизация пользователя
        this.ident = function (token) {
            socket.emit('auth', {token: token});
        };

        this.send = function (action, data) {
            socket.emit(action, data);
        };
    }
}

/**
 * Инкремент кол-ва непрочитанных сообщений тикетов в меню
 */
function updateCountUnreadedTickets() {
    var unread_ticket_label = $('.main_nav .ticket_nav span.unread_tickets') || false;

    if (unread_ticket_label.length > 0) {
        //Получение кол-ва непрочитанных тикетов
        apiRequest('ticket.getCountUnreadTicket', 'GET', {}, getCountUnreadTicketCallback, null, false);

    } else {
        //Вставка лейбла непрочитанных тикетов в ПК меню
        $('.main_nav .ticket_nav a .unread_tickets').html(1);

        //Вставка лейсбла непрочитанных тикетов в мобильное меню
        $('.mobile-navbar .ticket_nav a .unread_tickets').html(1);
    }

}

/**
 * Вставка лейбла непрочитанных тикетов
 *
 * @param result
 */
function getCountUnreadTicketCallback(result) {
    if (result.status_code == 200) {
        //Вставка лейсбла непрочитанных тикетов в ПК меню
        $('.main_nav .ticket_nav a .unread_tickets').html(result.response.count_unread_tickets);

        //Вставка лейсбла непрочитанных тикетов в мобильное меню
        $('.mobile-navbar .ticket_nav a .unread_tickets').html(result.response.count_unread_tickets);
    }
}

/**
 * Вставка ссобщения в тикет
 *
 * @param params
 */
function insertMessageInTicket(params) {
    var active_ticket = $('#ticket_hash').val();

    //Добавление значка в тикет, что там есть непрочитанные сообщения
    $('.ticket_list_item[data-ticket_hash=' + params.data.message_info.ticket_hash + '] td')
        .first()
        .html('<span class="ticket_have_unread_messages"></span>');

    //Если пришло сообщение в тикет, который открыт - вставляем сообщение в чат
    if (active_ticket == params.data.message_info.ticket_hash) {
        var message_html = getMessageHtml(params.data.message_info);

        $('#chat_messages').append(message_html);

        //Скролл к последнему сообщению
        scrollToLastMessage();

        //Удаление значка тикета о непрочитанных сообщениях
        setTimeout(function () {
            removeUnreadMessagesIcon(params.data.message_info.ticket_hash);
        }, 1500);

        //Установка флага прочтения сообщений в тикете
        apiRequest('ticket.readMessages', 'POST', {ticket_hash: params.data.message_info.ticket_hash}, null, null, false);
    }
}

/**
 * Получение html сообщения тикета
 *
 * @param data
 * @returns {string}
 */
function getMessageHtml(data) {
    var message_html = '';
    if (data.user_role == 'manager' || data.user_role == 'administrator') {
        message_html = '<div class="chat-message right row admin_message">' +
            '<div class="col-lg-1 visible-lg-block">' +
            '<img class="message-avatar" src="/images/support-picture.png" alt="">' + '</div>' +
            '<div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">' +
            '<div class="chat-message-info">' +
            '<span class="message-date">' + date("d.m.Y H:i", strtotime(data.created_at)) + '</span></div>' +
            '<div class="message">' +
            '<a class="message-author" href="#"> </a>' +
            '<span class="message-content">' + data.body + '</span>' +
            '</div></div>' +
            '</div>';
    } else {
        message_html = '<div class="chat-message row left user_message">' +
            '<div class="col-lg-1 visible-lg-block">' +
            '<img class="message-avatar" src="/images/user-picture.png" alt=""></div>' +
            '<div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">' +
            '<div class="chat-message-info">' +
            '<span class="message-date">' + date("d.m.Y H:i", strtotime(data.created_at)) + '</span></div>' +
            '<div class="message">' +
            '<a class="message-author" href="#"> </a>' +
            '<span class="message-content">' + data.body + '</span></div></div></div>';
    }

    return message_html;
}

/**
 * Изменение стрелок datepicker
 */
function changeDatepickerSymbols() {
    $('.datepicker .prev').text('<');
    $('.datepicker .next').text('>');
}

/**
 * Конвертация IP адресса
 *
 * @param proper_address
 * @returns {boolean}
 */
function long2ip(proper_address) {

    var output = false;

    if (!isNaN(proper_address) && (proper_address >= 0 || proper_address <= 4294967295)) {
        output = Math.floor(proper_address / Math.pow(256, 3)) + '.' +
            Math.floor((proper_address % Math.pow(256, 3)) / Math.pow(256, 2)) + '.' +
            Math.floor(((proper_address % Math.pow(256, 3)) % Math.pow(256, 2)) / Math.pow(256, 1)) + '.' +
            Math.floor((((proper_address % Math.pow(256, 3)) % Math.pow(256, 2)) % Math.pow(256, 1)) / Math.pow(256, 0));
    }

    return output;
}

function getHumanPriceById(price, currency_id) {
    return number_format(price, 2, '.', ',') + getCurrencySignById(currency_id);
}

function getDate(date_str, format) {
    if (format === undefined || is_null(format)) format = 'd.m.Y H:i';

    if (is_null(date_str)) return '-';
    if (date_str === undefined) return '?';

    return date(format, strtotime(date_str));
}

function array_unique(inputArr) {
    // eslint-disable-line camelcase
    //  discuss at: http://locutus.io/php/array_unique/
    // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    //    input by: duncan
    //    input by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Kevin van Zonneveld (http://kvz.io)
    // bugfixed by: Nate
    // bugfixed by: Kevin van Zonneveld (http://kvz.io)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    // improved by: Michael Grier
    //      note 1: The second argument, sort_flags is not implemented;
    //      note 1: also should be sorted (asort?) first according to docs
    //   example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin'])
    //   returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
    //   example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'})
    //   returns 2: {a: 'green', 0: 'red', 1: 'blue'}

    var key = ''
    var tmpArr2 = {}
    var val = ''

    var _arraySearch = function (needle, haystack) {
        var fkey = ''
        for (fkey in haystack) {
            if (haystack.hasOwnProperty(fkey)) {
                if ((haystack[fkey] + '') === (needle + '')) {
                    return fkey
                }
            }
        }
        return false
    }

    for (key in inputArr) {
        if (inputArr.hasOwnProperty(key)) {
            val = inputArr[key]
            if (_arraySearch(val, tmpArr2) === false) {
                tmpArr2[key] = val
            }
        }
    }

    return tmpArr2
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function truncateStr(string, n, useWordBoundary, use_ellipsis) {
    var isTooLong = string.length > n,
        s_ = isTooLong ? string.substr(0, n - 1) : string;
    s_ = (useWordBoundary && isTooLong) ? s_.substr(0, s_.lastIndexOf(' ')) : s_;
    return isTooLong ? s_ + (use_ellipsis ? '&hellip;' : '') : s_;
}

function str_to_bool(string) {
    string = string.toLowerCase();
    return string === 'true';
}

/**
 * Функция для добавления события на закрытие botstrap popover при нажатии на все кроме самого popover
 */
function addEventForHidePopoverClickOutside() {
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
}

/**
 * Рендеринг handlebars шаблона
 *
 * @param template_name
 * @param template_data
 * @param selector
 * @param options
 * @param callback
 * @param insertion_type
 */
function renderTemplate(template_name, template_data, selector, options, callback, insertion_type) {
    var source;
    var template;

    $.ajax({
        url: template_name,
        cache: true,
        success: function (data) {
            source = data;
            template = Handlebars.compile(source, options);

            switch (insertion_type) {
                case 'append':
                    $(selector).append(template(template_data));
                    break;

                case 'after':
                    $(selector).after(template(template_data));
                    break;

                default:
                    $(selector).html(template(template_data));
            }

            callback();
        }
    });
}

/**
 * Fix header to realign itself to the correct position
 */
function fixStatFixedHeaderOnChangeCurrency() {
    $('.stat_table').floatThead('reflow');
}

function cleanStrOfHash(string) {
    if (string != '') {
        // Clear #
        if (string.substr(0, 1) == '#') {
            string = string.substr(1);
        }
    }

    return string;
}

/**
 * Получение даты с заданного datepicker
 *
 * @param selector
 * @returns {string}
 */
function getDateFromDatepicker(selector) {
    var datepicker_date = $(selector).datepicker("getDate");

    var year = datepicker_date.getFullYear(),
        month = datepicker_date.getMonth() + 1,
        date = datepicker_date.getDate();

    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }

    return date + '.' + month + '.' + year;
}

/**
 * Установка дат с и по в фильтры и в адрессную строку
 *
 * @param date_from  - d.m.Y format
 * @param date_to    - d.m.Y format
 */
function setDateFilter(date_from, date_to) {
    var date_for_url,
        filter_date_btn = $('#filter_date_button');

    if (is_null(date_from)) {
        date_from = DATE_FROM_DEFAULT;
        $('#filter_date_from').datepicker('update', date_from);
        date_for_url = convertDateToRightFormat(date_from);
        insertValueInUrl('date_from', date_for_url);

    } else {
        $('#filter_date_from').datepicker('update', date_from);
        date_for_url = convertDateToRightFormat(date_from);
        insertValueInUrl('date_from', date_for_url);
    }

    //Установка фильтра "Дата по"
    if (is_null(date_to)) {
        date_to = DATE_TO_DEFAULT;
        $('#filter_date_to').datepicker('update', date_to);
        date_for_url = convertDateToRightFormat(date_to);
        insertValueInUrl('date_to', date_for_url);

    } else {
        $('#filter_date_to').datepicker('update', date_to);
        date_for_url = convertDateToRightFormat(date_to);
        insertValueInUrl('date_to', date_for_url);
    }

    filter_date_btn.html(date_from + ' - ' + date_to);
}

function getNextHour(hour) {
    hour = parseInt(hour);

    if (hour === 23) {
        return '00:00';
    } else if (hour < 9) {
        return '0' + (hour + 1) + ':00'
    }
    return (hour + 1) + ':00';
}

/**
 * Получение цвета строки в зависимости от ROI
 *
 * @param roi
 * @param traffic_cost
 * @returns {*}
 */
function getRoiTrColor(roi, traffic_cost) {
    if (roi > 0 || roi == '∞') {
        return '#E8F5E9';
    } else {
        return '#FBE9E7';
    }
}

/**
 * Получение цвета ячейки статуса лида
 *
 * @param lead_status
 * @returns {*}
 */
function getTdColorForLeadStatus(lead_status) {
    switch (lead_status) {

        case 'new':
            return NEW_LEAD_COLOR;

        case 'approved':
            return APPROVED_LEAD_COLOR;

        case 'cancelled':
            return '#ffe3e4';

        case 'trashed':
            return '#ffe3e4';

        default:
            throw 'Unknown lead\'s status';
    }
}

/**
 * Получение перевода статусов лида
 *
 * @param lead_status
 * @returns {*}
 */
function getLeadStatusTranslation(lead_status) {

    switch (lead_status) {
        case 'new':
            return LANG_STATISTICS.lead_new_status;

        case 'approved':
            return LANG_STATISTICS.lead_approved_status;

        case 'cancelled':
            return LANG_STATISTICS.lead_cancelled_status;

        case 'trashed':
            return LANG_STATISTICS.lead_trashed_status;

        default:
            throw 'Unknown lead\'s status';
    }
}

/**
 * Удаление внутренних строк статистики
 *
 * @param group_id
 */
function removeInsideTr(group_id) {

    // Если нужно удалить строки для определенной группы(браузера, ос и т.д)
    if (group_id) {

        $('.group-' + group_id).remove();

    } else {
        // Удаляем внутренние строки статистики
        $('.tr_stat_inside').remove();

        // Убираем во всех ссылках, которые должны открывать внутреннюю статистику -
        // класс open(флаг, обозначающий что по сущности есть открытая статистика)
        $('.open_inner_stat_link').removeClass('open');
    }
}

/**
 * Получение заголовка финансов в шапке таблицы статистики
 *
 * @param currency_id
 * @returns {string}
 */
function getFinanceThTitle(currency_id) {
    return LANG_MESSAGES.finance + ', ' + getCurrencySignById(currency_id);
}

/**
 * Получение заголовка дохода в шапке таблицы статистики
 *
 * @param currency_id
 * @returns {string}
 */
function getPayoutThTitle(currency_id) {
    return LANG_MESSAGES.payout + ', ' + getCurrencySignById(currency_id);
}

/**
 * Добавление нужных классов для кнопок пагинации DataTables
 */
function stylePagginationBtns() {
    $('.paginate_button').addClass('btn btn-default').filter('.current').removeClass('btn-default').addClass('btn-info');
}

function validateSortingColumn(table_identifier) {

    var sorting_column = UrlParameter.getSortingColumn(),
        table = $('#' + table_identifier);


    if (!table.find('[data-column=' + sorting_column + ']').exists()) {
        var first_column = table.find('thead th[data-column]').first().data('column');
        UrlParameter.setSortingColumn(first_column);
    }
}

function initClipboard() {
    new Clipboard('.copy_to_clipboard')
        .on('success', function (e) {
            let old_message = $(e.trigger).attr('data-title'),
                target = e.trigger;

            $(target).attr('title', LANG_MESSAGES.link_copied)
                .tooltip('fixTitle')
                .tooltip('show');

            $(target).on('hide.bs.tooltip', function () {
                $(target).attr('title', old_message)
                    .tooltip('fixTitle').tooltip('show');
            });
        });
}

function empty(value) {

    if (value instanceof Array && value.length === 0) {
        return true;
    } else if (value instanceof Object && Object.size(value) === 0) {
        return true;
    }

    return value === null || value === '' || value == 0;
}

function initSelect2Single(el) {
    return $(el).select2Custom({
        containerCssClass: "select2_style2",
        allowClear: !0,
        dropdownCssClass: "select2_style2_drop width_240 m-t-none w384i",
        formatNoMatches: LANG_FILTERS.nothing_found
    });
}

/**
 * Формат вывода для фильтра по странам плагина select2
 *
 * @param option
 * @returns {*}
 */
function countryFilterFormatResult(option) {

    let current_option = $(option.element),
        country_code = current_option.data('country_code');

    if (!country_code) {
        return option.text;
    }

    return $(
        '<span class="country country_' + country_code + '"></span>' +
        '<span>' + $(option.element).text() + ' </span>'
    );
}

function getOfferCountryHtml(country) {
    return '<div class="display_i_b">'
        + '<span class="country country_' + country.code + '"></span> ' + country.title
        + '</div>';
}

function getIds(array) {
    var temp = _.keyBy(array, 'id');
    temp = _.keys(temp);

    return _.map(temp, function (key) {
        return parseInt(key);
    });
}

var getStackTrace = function () {
    var obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
};


function throwIncorrectCurrency(id) {
    throw "Incorrect currency id: " + id + '; Trace: ' + getStackTrace();
}

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    }

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function lightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

function str_rand(max = 8) {
    var result = '',
        words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
        max_position = words.length - 1,
        position, i;

    for (i = 0; i < max; ++i) {
        position = Math.floor(Math.random() * max_position);
        result = result + words.substring(position, position + 1);
    }
    return result;
}

/**
 * Поиск и удаление дублей поля "Ничего не найдено" в фильтрах
 */
function checkDuplicateNoResultFilds() {
    $('.select2-results .select2-no-results').each(function (index, el) {
        var element = $(el);
        var ul = element.closest('.select2-results');
        var all_duplicate_in_ul = ul.find('.select2-no-results');
        if (all_duplicate_in_ul.length > 1) {
            all_duplicate_in_ul.remove();
            ul.append(element);
        }
    })
}

function callOnEnter(element_selector, callback) {
    $(element_selector).on('keyup', function (e) {
        if (e.keyCode === 13) {
            callback(e);
        }
    });
}

function checkTargetGeoCountryFilter() {
    var url_values = getUrlVars()['target_geo_country_ids'] || '';
    var filter_button = $('#filter_target_geo_country_button');

    if (url_values != '' && url_values != 'null') {
        var values_arr = url_values.split(',');
        $('#filter_target_geo_country').val(values_arr).trigger('change');
        filter_button.html(LANG_FILTERS.target_geo + ' <b>' + values_arr.length + '</b>');
    } else {
        filter_button.html(LANG_FILTERS.target_geo);
    }
}

function checkCountryFilter() {
    var url_values = getUrlVars()['country_ids'] || '';
    var filter_button = $('#filter_country_button');

    if (url_values != '' && url_values != 'null') {
        var values_arr = url_values.split(',');
        $('#filter_country').val(values_arr).trigger('change');
        filter_button.html(LANG_FILTERS.countries + ' <b>' + values_arr.length + '</b>');
    } else {
        filter_button.html(LANG_FILTERS.countries);
    }
}

function hideFilterLanding() {
    $('#filter_landing_button').parent().hide();
    insertValueInUrl('landing_hashes', 'null');
}

function hideFilterTransit() {
    $('#filter_transit_button').parent().hide();
    insertValueInUrl('transit_hashes', 'null');
}

function showFilterLanding() {
    $('#filter_landing_button').parent().show();
}

function showFilterTransit() {
    $('#filter_transit_button').parent().show();
}

function closeDateFilterOnPeriodSelected() {
    $('.filter_wrap').hide();
}

function getSubstatusTranslation(sub_status_id) {
    return sub_status_id ? LANG_LEADS['substatus_id-' + sub_status_id] : ''
}

function addLogoutListener() {
    $('.logout').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        LaddaPreloader.start('#dekstop-logout-navbar');
        LaddaPreloader.start('#mobile-logout-navbar');

        UserLoginer.logout();
        $(this).off('click');
    });
}

function addLogoutAsUserListener() {
    $('.return_to_admin_cabinet').on('click', function (e) {
        e.preventDefault();

        api.post('auth.logoutAsUser', {foreign_user_hash: $(this).data('foreign_user_hash')}).then(response => {
            if (response.data.status_code !== 202) {
                return UserLoginer.logout();
            }

            try {
                window.close();
            } catch (e) {
                console.log(e);
            }

            location.reload();
        });
    });
}

function getSecondLocationPath() {
    return location.pathname.split('/')[2];
}

function formatServerMessages(messages) {
    let message = '';

    for (let key in messages) {
        message += messages[key] + '<br>';
    }

    return message;
}

function decrementNavbarCount(location, sublocation) {
    let menu_item_index = _.findIndex(navbar.menu, {href: location});

    navbar.menu[menu_item_index].count--;
    _.find(navbar.menu[menu_item_index].childrens, {href: sublocation}).count--;
}

function refreshNavbarCount(location, sublocation) {
    let menu_item_index = _.findIndex(navbar.menu, {href: location});

    navbar.menu[menu_item_index].count = 0;
    _.find(navbar.menu[menu_item_index].childrens, {href: sublocation}).count = 0;
}