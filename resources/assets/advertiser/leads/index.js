let bus = new Vue();

let vm = new Vue({
    el: '#leads',
    mixins: [lead_statistics_mixin],
    data: {
        leads: [],
        CDN_HOST: CDN_HOST,
        total: {
            currencies: [],
            total_count: 0,
            held_count: 0,
            approved_count: 0,
            cancelled_count: 0,
            trashed_count: 0,
            real_approve: 0,
            approve: 0,
        },
        all_leads_selected: false,
        selected_leads: [],
        custom_sort: null,
        leads_loading: false,
        pagination: {
            page: 1,
            per_page: 40,
        },
        all_leads_loaded: false,
        ladda: null,
    },

    created() {
        CustomSort.initDefaultSorting('created_at', 'desc');

        this.custom_sort = CustomSort.getInstance();

        bus.$on('leads-updated', (leads) => {
            let lead, index;
            for (lead of leads) {
                index = _.findIndex(this.leads, {hash: lead.hash});
                this.leads.splice(index, 1, lead);
            }
        });
    },

    mounted() {
        this.initDatatable();

        this.reloadLeads();

        let self = this;
        scrollHandler(function () {
            if (self.all_leads_loaded) {
                return false;
            }
            self.pagination.page++;
            self.getLeads();
        });
    },

    watch: {
        'leads'() {
            this.$nextTick(() => {

                this.initDatatable();

                runTooltip();
                runPopover();
                runCustomTooltip();
            });
        },

        'total.currencies'() {
            this.$nextTick(() => {
                this.calcTotal();
            });
        },

        'selected_leads'() {
            if (this.selected_leads.length < this.leads.length || this.selected_leads.length === 0) {
                this.all_leads_selected = false;
            } else {
                this.all_leads_selected = true;
            }
        },
        'leads_loading'() {
            if (this.leads_loading) {
                activeAjax = true;

                this.ladda = LaddaPreloader.start('#stat_submit');

                if (this.leads.length > 0) {
                    ContentPreloader.show('#scroll-preloader-container');
                } else {
                    ContentPreloader.show('#leads_table_wrap');
                }
            } else {
                activeAjax = false;
                LaddaPreloader.stop(this.ladda);
                ContentPreloader.hide();
            }
        },
    },

    methods: {
        initDatatable() {
            let self = this;

            this.custom_sort.initTable({
                table_id: 'leads_table',
                onsort_callback: function () {
                    self.reloadLeads();
                }
            });
        },

        reloadLeads() {
            this.pagination.page = 1;
            this.leads.splice(0);
            this.selected_leads.splice(0);

            this.getLeads();
        },

        setLeadStatus(status) {
            if (status === 'all') {
                status = [];
            } else {
                status = [status];
            }

            $('#lead_statuses').val(status).trigger('change');

            this.reloadLeads();
        },

        getStatusLog(lead) {
            let status_log_title = '';

            for (log_item of lead.status_log) {
                log_item.status_translated = LANG_STATISTICS['lead_' + log_item.status + '_status'];

                status_log_title += "<div class='m-b-xs'>"
                    + date('d.m H:i', strtotime(log_item.created_at))
                    + " <b>" + log_item.status_translated + "</b>"
                    + ' ' + getSubstatusTranslation(log_item.sub_status_id);
            }

            return status_log_title;
        },

        getLeads() {
            this.custom_sort.validateSortingColumn();

            let params = Filters.getData();
            params.page = this.pagination.page;
            params.per_page = this.pagination.per_page;
            params.sorting = UrlParameter.getSorting();
            params.sorting_column = UrlParameter.getSortingColumn();

            if (validateTwoDate(new Date(params.date_from), new Date(params.date_to), '1_less_than_2') === false) {
                showMessage('error', LANG_ORDERS.incorrect_date);
                return;
            }

            this.leads_loading = true;

            api.get('/stat.getByLead', {params: params}).then(response => {

                if (this.pagination.page === 1) {
                    this.total.real_approve = response.data.response.total.real_approve;
                    this.total.approve = response.data.response.total.approve;
                    this.total.currencies = response.data.response.total.currencies;
                }

                this.all_leads_loaded = response.data.response.all_loaded;
                this.leads = this.leads.concat(response.data.response.data);

                this.leads_loading = false;

            }, () => {
                this.leads_loading = false;
            });
        },

        getPhoneIconTitle(number_type) {
            switch (number_type) {
                case 'MOBILE':
                    return LANG_STATISTICS.number_type_mobile;
                case 'FIXED_LINE':
                    return LANG_STATISTICS.number_type_fixed_line;
                case 'UNKNOWN':
                    return LANG_STATISTICS.number_type_unknown;
            }
        },

        selectAllLeads() {
            this.selected_leads = [];

            if (!this.all_leads_selected) {
                this.leads.forEach((lead) => {
                    this.toggleLeadSelection(lead);
                });
            }

            this.all_leads_selected = !this.all_leads_selected;
        },

        toggleLeadSelection(lead) {
            let index = _.indexOf(this.selected_leads, lead.hash);
            if (index === -1) {
                this.selected_leads.push(lead.hash);
            } else {
                this.selected_leads.splice(index, 1);
            }
        },

        calcTotal() {
            this.total.total_count = 0;
            this.total.held_count = 0;
            this.total.approved_count = 0;
            this.total.cancelled_count = 0;
            this.total.trashed_count = 0;

            this.total.currencies.forEach(item => {
                this.total.total_count += parseInt(item.total_count);
                this.total.held_count += parseInt(item.held_count);
                this.total.approved_count += parseInt(item.approved_count);
                this.total.cancelled_count += parseInt(item.cancelled_count);
                this.total.trashed_count += parseInt(item.trashed_count);
            });
        }
    }
});