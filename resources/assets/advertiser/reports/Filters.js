const Filters = {
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
    }
};

Filters.__proto__ = BaseFilters;

Vue.component('filters', {
    template: '#filters_tpl',
    data: () => {
        return {
            LANG_STATISTICS: LANG_STATISTICS,
            LANG_MESSAGES: LANG_MESSAGES,
            group_by: 'init',
            group_by_data: {
                track_by: 'value',
                value: {},
                options: [
                    {title: LANG_FILTERS.group_by_field + ":", value: '', $isDisabled: true},
                    {title: LANG_FILTERS.group_by_field_created, value: 'created_at'},
                    {title: LANG_FILTERS.group_by_field_processed, value: 'processed_at'},
                ]
            },
            search_field: {
                track_by: 'value',
                value: {},
                options: [
                    {title: LANG_MESSAGES.search_field + ":", value: null, $isDisabled: true},
                    {title: LANG_MESSAGES.publisher, value: 'publisher_hash'},
                    {title: LANG_MESSAGES.lead, value: 'hash'},
                ]
            },
        }
    },

    created() {
        // set value by url or default(group_by, search_field
        this.group_by_data.value = _.find(this.group_by_data.options, {value: UrlParameter.getGroupBy()});

        let search_field_value = _.find(this.search_field.options, {value: UrlParameter.getSearchField()});

        this.search_field.value = search_field_value ? search_field_value : this.search_field.options[0];
    },

    watch: {
        'group_by_data.value'() {
            insertValueInUrl('group_by', this.group_by_data.value.value);
        },

        'search_field.value'() {
            insertValueInUrl('search_field', this.search_field.value.value);
        }
    },

    methods: {
        refreshReports() {
            Filters.setFiltersInUrl('#filters', {
                date_from: UrlParameter.getDateFrom(),
                date_to: UrlParameter.getDateTo(),
                sorting: UrlParameter.getSorting(),
                sorting_column: UrlParameter.getSortingColumn(),
                group_by: UrlParameter.getGroupBy(),
                search_field: UrlParameter.getSearchField(),
            });

            vm.getReport(getSecondLocationPath());
        },
    },
});

$(document).ready(function () {
    insertValueInUrl('group_by', UrlParameter.getGroupBy());
});
