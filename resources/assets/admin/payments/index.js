const Tab = {
    init() {
        this.openTab(this.get());
        let self = this;
        $('a[data-toggle="tab"]').on('shown.bs.tab', function () {
            self.changeTab($(this).data('tab'));
        });
    },

    get() {
        return location.pathname.split('/')[3];
    },

    changeTab(tab) {
        history.pushState(null, '', '/finance/payments/' + tab + location.search);
        vm.tab = tab;
        this.openTab(tab);
    },

    openTab(tab) {
        $('[data-tab=' + tab + ']').tab('show');
        $('.payments').hide();
        $('#tab_' + tab + '_wrap').show();
    }
};

const bus = new Vue();

let vm = new Vue({
    el: '#payments',
    mixins: [filters_manager],
    data: {
        not_confirm: false,
        tab: Tab.get(),
        filters: [
            'payment_systems', 'publisher_hashes', 'currency_ids',
        ],
        user_groups: [],
    },

    created() {
        this.getUserGroups();
    },

    mounted() {
        Tab.init();

        filters_bus.$on('filters-ready', () => {
            this.initTabs();
        });

        filters_bus.$on('filters-applies', () => {
            this.reloadPayments(filters_submit = true);
        });
    },

    watch: {
        'tab'() {
            this.reloadPayments();
        },
    },

    methods: {
        openCreatePaymentModal() {
            this.$refs['create-payment-modal'].openModal();
        },

        initTabs() {
            let params = this.getFiltersData(this.filters);

            this.$refs.pending.getPayments(_.clone(params));
            this.$refs.accepted.getPayments(_.clone(params));
            this.$refs.paid.getPayments(_.clone(params));
            this.$refs.cancelled.getPayments(_.clone(params));
        },

        reloadPayments(filters_submit = false) {
            let params = this.getFiltersData(this.filters);

            switch (this.tab) {
                case 'pending':
                    this.$refs.pending.getPayments(params, filters_submit);
                    break;

                case 'accepted':
                    this.$refs.accepted.getPayments(params, filters_submit);
                    break;

                case 'paid':
                    this.$refs.paid.getPayments(params, filters_submit);
                    break;

                case 'cancelled':
                    this.$refs.cancelled.getPayments(params, filters_submit);
                    break;
            }
        },

        getUserGroups() {
            api.get('/user_groups.getList').then(response => {
                this.user_groups = response.data.response;
            });
        },
    }
});