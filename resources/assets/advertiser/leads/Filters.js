const Filters = {
    alwaysOpened: !0,
    formatNoMatches: LANG_FILTERS.nothing_found,
    formatResult: countryFilterFormatResult,
    getData() {
        let params = $('#filters').getFormData();

        params.date_from = UrlParameter.getDateFrom();
        params.date_to = UrlParameter.getDateTo();
        params.group_by = UrlParameter.getGroupBy();
        params.sorting = CustomSort.getSorting();
        params.sort_by = CustomSort.getSortingColumn();
        params.search_field = UrlParameter.getSearchField();
        params.search = UrlParameter.getSearchVal();

        if (params.search_field === 'null') {
            delete params.search_field;
        }

        return params;
    },
};

Filters.__proto__ = BaseFilters;

Vue.component('filters', {
    template: '#filters-tpl',
    data: function () {
        return {
            LANG_STATISTICS: LANG_STATISTICS,
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_FILTERS: LANG_FILTERS,
            group_by: 'init',
            group_by_data: {
                track_by: 'value',
                value: {},
                options: [
                    {title: LANG_FILTERS.filter_by + ":", value: '', $isDisabled: true},
                    {title: LANG_FILTERS.filter_by_created, value: 'created_at'},
                    {title: LANG_FILTERS.filter_by_processed, value: 'processed_at'},
                ]
            },
            search_field: {
                track_by: 'value',
                value: {},
                options: [
                    {title: LANG_MESSAGES.search_field + ":", value: null, $isDisabled: true},
                    {title: LANG_MESSAGES.publisher, value: 'publisher_hash'},
                    {title: LANG_MESSAGES.lead, value: 'hash'},
                    {title: LANG_MESSAGES.phone, value: 'phone'},
                ]
            },
        }
    },

    created() {
        // set value by url or default(group_by, search_field
        var group_by_data_key = _.findKey(this.group_by_data.options, function (o) {
            return o.value === UrlParameter.getGroupBy()
        });

        this.group_by_data.value = this.group_by_data.options[group_by_data_key];
        var search_field_key = _.findKey(this.search_field.options, function (o) {
            return o.value === UrlParameter.getSearchField()
        });
        if (search_field_key) {
            this.search_field.value = this.search_field.options[search_field_key];
        } else {
            this.search_field.value = this.search_field.options[0];
        }
    },

    mounted() {
        Filters.init();
        //Изменение стрелок datepicker
        changeDatepickerSymbols();
        initDateParams();
    },

    watch: {
        'search_field.value'() {
            insertValueInUrl('search_field', this.search_field.value.value);
        },

        'group_by_data.value'() {
            insertValueInUrl('group_by', this.group_by_data.value.value);
        },
    },

    methods: {
        refreshLeads() {
            Filters.setFiltersInUrl('#filters', {
                date_from: UrlParameter.getDateFrom(),
                date_to: UrlParameter.getDateTo(),
                sorting: UrlParameter.getSorting(),
                sorting_column: UrlParameter.getSortingColumn(),
                group_by: UrlParameter.getGroupBy(),
                search_field: UrlParameter.getSearchField(),
            });

            vm.reloadLeads();
        },
    },
});

function initDateParams() {

    var date_from = convertDateForReadableFormat(UrlParameter.getDateFrom()) || null;
    var date_to = convertDateForReadableFormat(UrlParameter.getDateTo()) || null;

    setDateFilter(date_from, date_to);
}