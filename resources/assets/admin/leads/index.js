let bus = new Vue();

let StatParameter = {
    leads_loading: false,
    page: 1,
    all_loaded: false,
};
$(document).ready(function () {

    StatColumns.init();

    HlBox.addEvent();
    runPopover();
    extendDatatable();

    // Удаление внутренних tr при нажатии на заголовки колонок таблиц
    $(document).on('click', '.dataTable:not(.dataTableCustom) thead th', function () {
        removeInsideTr();
    });

    // Scroll to top of statistic's table when paginate buttons are pressed
    $(document).on('page.dt', '.table.dataTable', function () {
        scrollToElement('#leads_table_wrap', 0);
    });

    //fixed thead on chage page
    $(document).on('click', '.paginate_button', function () {
        fixStatFixedHeaderOnChangeCurrency();
    });

});

const vm = new Vue({
    el: '#leads',
    mixins: [filters_manager],

    data: {
        currency_id: null,
        current_tab: null,
        offer_hashes: [],
        landing_hashes: [],
        transit_hashes: [],
        additional_url_params: {
            sort_by: UrlParameter.getSortBy() || 'created_at',
            sorting: UrlParameter.getSortingOrNull() || 'desc',
            processed_date_from: getUrlVars()['processed_date_from'] || null,
            processed_date_to: getUrlVars()['processed_date_to'] || null,
        },
        filters: [
            'date_to', 'date_from', 'publisher_hashes', 'advertiser_hashes', 'country_ids', 'target_geo_country_ids',
            'offer_hashes', 'landing_hashes', 'transit_hashes', 'currency_ids', 'search_field', 'search',
            'is_autogenerated', 'lead_statuses',
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
        }],
        search: null,
        search_field: {},
    },

    created() {
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
        let self = this;
        this.getStat();

        // Load lead or preorder stat on scroll event
        scrollHandler(function () {
            if (StatParameter.all_loaded || StatParameter.leads_loading) {
                return false;
            }
            StatParameter.page++;
            self.$refs.by_leads.getStatByLead();
        });
    },

    methods: {
        refreshState() {
            this.$refs.by_leads.clearLeads();
            StatParameter.page = 1;
            StatParameter.leads_loading = false;
        },

        getStat() {
            this.refreshState();

            filters_bus.$emit('apply-filter-start');
            ContentPreloader.show('#leads_table_wrap');

            this.$refs.by_leads.getStatByLead();
        },
    }
});