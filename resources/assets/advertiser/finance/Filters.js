Vue.component('filters', {
    template: '#filters-tpl',
    mixins: [filters_manager],
    data: function () {
        return {
            // Global variables
            LANG_FILTERS: LANG_FILTERS,
            LANG_FINANCE: LANG_FINANCE,
            search_field: {
                track_by: 'value',
                value: {},
                options: [
                    {title: LANG_MESSAGES.search_field + ":", value: null, $isDisabled: true},
                    {title: LANG_MESSAGES.lead, value: 'lead_hash'},
                    {title: LANG_FINANCE.payment_id, value: 'transaction_hash'},
                ]
            },
            filters: ['grouping_by'],
            grouping_option: null,
            grouping_options: [
                {title: LANG_MESSAGES.not_selected, value: null},
                {title: LANG_MESSAGES.type, value: 'operation'},
                {title: LANG_MESSAGES.date, value: 'date'},
                {title: LANG_FILTERS.offer, value: 'offer'},
                {title: LANG_FILTERS.country, value: 'country'},
            ],
        }
    },

    created() {
        this.initSearchField();

        filters_bus.$on('grouping_by-init', grouping_option => {
            this.grouping_option = grouping_option;
            this.$nextTick(() => {
                this.refreshTransactions();
            });
        });

        filters_bus.$on('grouping_by-updated', grouping_option => {
            this.grouping_option = grouping_option;
        });
    },

    mounted() {
        $('#search').on('input', function () {
            UrlParameter.setSearchVal(cleanStrOfHash($(this).val()));
        });

        Filters.init();

        //Изменение стрелок datepicker
        changeDatepickerSymbols();
        initDateParams();
    },

    methods: {
        refreshTransactions() {
            Filters.setFiltersInUrl('#filters');
            let date_from = getDateFromDatepicker('#filter_date_from');
            let date_to = getDateFromDatepicker('#filter_date_to');
            setDateFilter(date_from, date_to);
            insertValueInUrl('search_field', this.search_field.value.value);
            insertValueInUrl('grouping_by', this.grouping_option !== null ? this.grouping_option.value : null);

            bus.$emit('refresh-transactions', this.grouping_option);
        },

        initSearchField() {
            let search_field_key = _.findKey(this.search_field.options, function (o) {
                return o.value === UrlParameter.getSearchField()
            });
            if (search_field_key) {
                this.search_field.value = this.search_field.options[search_field_key];
            } else {
                this.search_field.value = this.search_field.options[0];
            }
        },

        onSearchFieldUpdated(value) {
            insertValueInUrl('search_field', this.search_field.value.value);
        },
    }
});

const Filters = {
    alwaysOpened: !0,
    formatNoMatches: LANG_FILTERS.nothing_found,
    formatResult: countryFilterFormatResult,
    getData() {
        let params = $('#filters').getFormData();

        params.date_from = UrlParameter.getDateFrom();
        params.date_to = UrlParameter.getDateTo();

        if (UrlParameter.getSearchField() !== 'null') {
            params.search_field = UrlParameter.getSearchField();
        }

        params.search = UrlParameter.getSearchVal();
        return params;
    },
};

Filters.__proto__ = BaseFilters;


function initDateParams() {
    let date_from = convertDateForReadableFormat(UrlParameter.getDateFrom()) || null;
    let date_to = convertDateForReadableFormat(UrlParameter.getDateTo()) || null;

    setDateFilter(date_from, date_to);
}
