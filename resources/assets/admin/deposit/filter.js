const Filters = {
    formatResult: countryFilterFormatResult,
    getData() {
        let params = $('#filters').getFormData();

        params.date_from = UrlParameter.getDateFrom();
        params.date_to = UrlParameter.getDateTo();

        return params;
    }
};

Filters.__proto__ = BaseFilters;

$(document).ready(function () {
    $("#filter_deposit_date").datetimepicker({
        format: 'DD.MM.YYYY HH:mm:ss',
        locale: 'ru'
    }).on('dp.change', function (e) {
        let date = e.date._d;

        if (date === undefined) {
            return;
        }

        var selected_day = date.getDate();
        var selected_month = date.getMonth();
        var selected_year = date.getFullYear();

        if (!is_null(e.oldDate)) {

            var prev_day = e.oldDate._d.getDate();
            var prev_month = e.oldDate._d.getMonth();
            var prev_year = e.oldDate._d.getFullYear();

            if (prev_day !== selected_day || selected_month !== prev_month
                || selected_year !== prev_year) {
                $(this).data('DateTimePicker').hide();
            }
        }

    }).on('dp.show', function(){
        $('.bootstrap-datetimepicker-widget table tr td').removeClass('today');
    });

    Filters.init();
});
