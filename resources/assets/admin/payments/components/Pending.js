Vue.component('pending', {
    template: '#pending_payments_tpl',
    mixins: [payments_mixin, datatable_mixin],
    props: ['not_confirm', 'user_groups'],
    data() {
        return {
            payments: [],
            loading: false,
            prev_params: {},
            preloader: null,
        }
    },

    created() {
        bus.$on('payment-create', (payment) => {
            this.payments.unshift(payment);
            this.drawDatatableAfterAddRow();
        });
    },

    mounted() {
        this.initDatatableConfig('#pending_payments_table', '#tab_pending_wrap', {
            columnDefs: [
                {targets: 0, type: 'real_date'},
                {targets: 5, type: 'title-numeric'},
                {targets: 6, orderable: false},
                {targets: 7, orderable: false},
            ],
        });
    },

    watch: {
        'loading'() {
            if (this.loading) {
                filters_bus.$emit('apply-filter-start');
                return this.preloader = ContentPreloader.show('#tab_pending_wrap');
            }

            filters_bus.$emit('apply-filter-stop');

            ContentPreloader.hide(this.preloader);

            this.drawDatatable(this.payments.length);
        },
    },

    methods: {
        getPayments(params, filters_submit) {
            if (_.isEqual(params, this.prev_params) && !filters_submit) {
                return;
            }

            this.prev_params = _.clone(params);
            this.loading = true;

            params.status = 'pending';
            params.with = ['user.publisher'];

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

        acceptPayment(target, payment, index) {
            if (this.not_confirm) {
                return this.acceptPaymentRequest(target, payment, index, description = '');
            }

            bus.$emit('alert-modal-success', (result, description) => {
                if (result) {
                    this.acceptPaymentRequest(target, payment, index, description);
                }
            }, LANG_PAYMENTS.on_accept_msg, LANG_MESSAGES.yes_accept_it);
        },

        cancelPayment(target, payment, index) {
            if (this.not_confirm) {
                return this.cancelPaymentRequest(target, payment, index, description = '');
            }

            bus.$emit('alert-modal-danger', (result, description) => {
                if (result) {
                    this.cancelPaymentRequest(target, payment, index, description);
                }
            }, LANG_PAYMENTS.on_cancel_msg, LANG_MESSAGES.yes_cancel_it);
        },

        acceptPaymentRequest(target, payment, index, description) {
            let ladda = LaddaPreloader.start('#accept_pending_payment-' + payment.id),
                params = {
                    hash: payment.hash,
                    description: description,
                    with: ['processed_user', 'user.publisher'],
                };

            api.post('/payment.accept', params).then(response => {
                this.deleteDatatableRow(target);
                this.payments.splice(index, 1);

                bus.$emit('payment-accepted', response.data.response);
                decrementNavbarCount('/finance', '/finance/payments');

                LaddaPreloader.stop(ladda);
                App.user.wait_payments_count--;
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        cancelPaymentRequest(target, payment, index, description) {
            let ladda = LaddaPreloader.start('#cancel_pending_payment-' + payment.id),
                params = {
                    hash: payment.hash,
                    description: description,
                    with: ['processed_user', 'user.publisher'],
                };

            api.post('/payment.cancel', params).then(response => {
                this.deleteDatatableRow(target);
                this.payments.splice(index, 1);

                bus.$emit('payment-cancelled', response.data.response);
                decrementNavbarCount('/finance', '/finance/payments');

                LaddaPreloader.stop(ladda);

                App.user.wait_payments_count--;
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },
    },
});
