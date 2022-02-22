Vue.component('paid', {
    template: '#paid_payments_tpl',
    mixins: [payments_mixin, datatable_mixin],
    data() {
        return {
            payments: [],
            loading: false,
            prev_params: {},
            preloader: null,
        }
    },

    created() {
        bus.$on('payment-paid', payment => {
            this.payments.unshift(payment);
            this.drawDatatableAfterAddRow();
        });
    },

    mounted() {
        this.initDatatableConfig('#paid_payments_table', '#tab_paid_wrap', {
            columnDefs: [
                {targets: 0, type: 'real_date'},
                {targets: 8, type: 'title-numeric'},
            ],
        });
    },

    watch: {
        'loading'() {
            if (this.loading) {
                filters_bus.$emit('apply-filter-start');

                this.preloader = ContentPreloader.show('#tab_paid_wrap');
            } else {
                filters_bus.$emit('apply-filter-stop');

                ContentPreloader.hide(this.preloader);
                this.drawDatatable(this.payments.length);
            }
        },
    },

    methods: {
        getPayments(params, filters_submit) {
            if (_.isEqual(params, this.prev_params) && !filters_submit) {
                return;
            }

            this.prev_params = _.clone(params);
            this.loading = true;

            params.status = 'paid';
            params.with = ['processed_user', 'paid_user', 'user.publisher'];

            api.get('/payment.getList', {params: params}).then(response => {
                this.payments = response.data.response.data;

                this.loading = false;
            }, () => {
                this.loading = false;
            });
        },

        getPayoutCalculation(payout, balance_payout, comission, currency_id) {
            comission = getHumanPriceById(comission, currency_id);

            if (+payout < +balance_payout) {
                return getHumanPriceById(balance_payout, currency_id) + '' + comission;
            }

            return getHumanPriceById(balance_payout, currency_id) + '+' + comission;
        },
    }
});
