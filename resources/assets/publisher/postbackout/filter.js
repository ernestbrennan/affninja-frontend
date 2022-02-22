const Filters = {
    formatResult: countryFilterFormatResult,
    getData() {
        let params = $('#filters').getFormData();

        params.date_from = UrlParameter.getDateFrom();
        params.date_to = UrlParameter.getDateTo();
        params.lead_hash = UrlParameter.getLeadHash();
		params.postback_hash = UrlParameter.getPostbackhash();
        return params;
    }
};

Filters.__proto__ = BaseFilters;

$(document).ready(function () {
    Filters.init();
});