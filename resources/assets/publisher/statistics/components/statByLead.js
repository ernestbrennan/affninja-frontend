let MOBILE_DEVICE_ID = 2;
let TABLET_DEVICE_ID = 3;

Vue.component('by-leads', {
    template: '#stat_by_leads_tpl',
    mixins: [lead_statistics_mixin],
    data() {
        return {
            leads: [],
            CDN_HOST: CDN_HOST,
            total: {},
            pagination: {
                page: 1,
                per_page: 40,
                loading: false,
                finished: false,
            },
            currency_id: null,
            filters: [
                'date_from', 'date_to', 'flow_hashes', 'target_geo_country_ids', 'country_ids', 'offer_hashes',
                'landing_hashes', 'transit_hashes', 'data1', 'data2', 'data3', 'data4', 'currency_id', 'lead_statuses',
                'device_type_ids', 'browser_ids', 'os_platform_ids',
            ],
            scroll_preloader: null,
            sorting: null,
        }
    },

    created() {
        CustomSort.initDefaultSorting('created_at', 'desc');

        bus.$on('get-stat-by-lead', () => {
            this.getStat();
        });

        bus.$on('clear-stat-by-lead', () => {
            this.clearLeads();
        });
    },

    mounted() {
        scrollHandler(() => {
            if (this.pagination.finished || this.pagination.loading) {
                return false;
            }

            this.pagination.page++;
            this.getStat();
        });
    },

    computed: {
        approve: function () {
            return Stat.calculateApprove(this.total.approved_count, this.total.cancelled_count, this.total.held_count, this.total.trashed_count);
        }
    },

    watch: {
        'leads'() {
            let self = this;

            Vue.nextTick(() => {
                CustomSort.initTable({
                    table_id: 'stat_by_lead',
                    onsort_callback() {
                        self.$parent.getStat();
                    }
                });

                runTooltip();
            });
        },
        'pagination.loading'() {
            if (this.pagination.loading) {

                if (this.leads.length > 0) {
                    this.scroll_preloader = ContentPreloader.show('#scroll_progress_wrap');
                }

                filters_bus.$emit('apply-filter-start');
            } else {
                ContentPreloader.hide(this.scroll_preloader);

                filters_bus.$emit('apply-filter-stop');

                this.$nextTick(() => {
                    runTooltip();
                    bus.$emit('report-built');
                });
            }
        },
    },

    methods: {
        refreshLeads() {
            this.pagination.page = 1;
            this.pagination.finished = false;
        },

        setLeadStatus(status) {
            let statuses = [];

            if (status !== 'all') {
                statuses = [status];
            }

            filters_bus.$emit('lead_statuses-refresh', statuses, true);
        },

        clearLeads() {
            this.leads = [];
        },

        openLeadClickParameterModal(lead) {
            this.$refs['lead-click-parameter-modal'].openModal(lead);
        },

        getStat() {
            this.validateLeadSortingColumn();

            let params = this.$parent.getFiltersData(this.filters);

            params.lead_hashes = UrlParameter.getLeadHashes();
            params.per_page = this.pagination.per_page;
            params.page = this.pagination.page;
            params.sort_by = UrlParameter.getSortingColumn();
            params.sorting = UrlParameter.getSorting();

            UrlParameter.getLeadHour() !== 'null' ? params.hour = UrlParameter.getLeadHour() : '';
            UrlParameter.getLeadRegion_id() !== 'null' ? params.region_id = UrlParameter.getLeadRegion_id() : '';
            UrlParameter.getLeadCity_id() !== 'null' ? params.city_id = UrlParameter.getLeadCity_id() : '';
            getVarsFromUrl('created_at').length ? params.created_at = getVarsFromUrl('created_at')[0] : '';

            this.currency_id = params.currency_id;

            if (!validateStatDates(params.date_from, params.date_to)) {
                return false;
            }

            this.pagination.loading = true;

            api.get('/stat.getByLead', {params: params}).then(response => {

                if (this.pagination.page === 1) {
                    _.assign(this.total, response.data.response.total);
                }

                this.pagination.finished = response.data.response.all_loaded;
                this.leads = this.leads.concat(response.data.response.data);

                this.pagination.loading = false;
            }, () => {
                this.pagination.loading = false;
            });
        },

        validateLeadSortingColumn() {
            validateSortingColumn('stat_by_lead');
        },
    }
});

$(document).ready(function () {
    addEventForHidePopoverClickOutside();
});

function isMobileOrTablet(device_type_id) {
    return device_type_id == MOBILE_DEVICE_ID || device_type_id == TABLET_DEVICE_ID;
}