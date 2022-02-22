Vue.component('payment-list', {
    template: '#payment-list-tpl',
    data() {
        return {
            LANG_FINANCE: LANG_FINANCE,
            payments: [],
            loading: false,
            preloader: null,
        };
    },

    created() {
        bus.$on('create-payment', payment => {
            this.payments.unshift(payment);
        });
    },

    mounted() {
        this.getPayments();
    },

    watch: {
        'loading'() {
            if (this.loading) {
                return this.preloader = ContentPreloader.show('#payment_list_wrap');
            }

            ContentPreloader.hide(this.preloader);
        },
    },

    methods: {
        getPayments() {
            this.loading = true;

            api.get('/payment.getList', {params: {per_page: 5}}).then(response => {
                this.payments = response.data.response.data;
                this.loading = false;
            }, () => {
                this.loading = false;
            });
        },

        cancelPayment(event, payment, index) {
            Swal.show(LANG_PAYMENTS.on_cancel_msg, LANG_MESSAGES.yes_cancel_it).then(() => {
                let ladda = LaddaPreloader.start('#cancel_pending_payment-' + payment.hash);

                api.post('/payment.cancel', {hash: payment.hash}).then(response => {

                    UserAccount.refreshBalance();
                    this.payments.splice(index, 1);

                    switch (parseInt(response.data.response.currency_id)) {
                        case CURRENCY_RUB_ID:
                            this.balance_rub += +response.data.response.balance_payout;
                            break;

                        case CURRENCY_USD_ID:
                            this.balance_usd += +response.data.response.balance_payout;
                            break;

                        case CURRENCY_EUR_ID:
                            this.balance_eur += +response.data.response.balance_payout;
                            break;
                    }

                    LaddaPreloader.stop(ladda);
                    showMessage('success', response.data.message);
                }).catch(() => {
                    LaddaPreloader.stop(ladda);
                });
            }, () => {

            });
        },
    },
});
