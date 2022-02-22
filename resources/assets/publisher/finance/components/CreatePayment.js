Vue.component('create-payment', {
    template: '#create-payment-tpl',
    data: function () {
        return {
            payment_requisites: [],
            payment: {
                payout: 0,
                currency_id: null,
                requisite_hash: null,
                payment_system_id: null,
            },
            balance_rub: BALANCE_RUB,
            balance_usd: BALANCE_USD,
            balance_eur: BALANCE_EUR,
        };
    },

    created() {
        navbar_account_bus.$on('change-account-currency', currency_code => {
            Vue.set(this.payment, 'currency_id', getCurrencyIdByCode(currency_code));
        });
    },

    mounted() {
        this.payment.currency_id = getCurrencyIdByCode(UserAccount.getAccountCurrency());
    },
    
    watch: {
        'payment.currency_id': function () {
            this.payment.requisite_hash = null;
            this.getPaymentRequisites(this.payment.currency_id);
        }
    },

    methods: {
        setPayout(payout) {
            this.payment.payout = payout;
        },

        getPaymentRequisites(currency_id) {
            let params = {
                currency_id: currency_id,
            };

            api.get('/payment_requisites.getListForPayment', {params: params}).then(response => {
                this.payment_requisites = response.data.response;
            });
        },

        createPayment() {
            let ladda = LaddaPreloader.start('#create_payment');
            this.payment.payment_system_id = _.find(this.payment_requisites, {hash: this.payment.requisite_hash}).payment_system_id;

            api.post('/payment.create', this.payment).then(response => {

                UserAccount.refreshBalance();

                bus.$emit('create-payment', response.data.response);

                LaddaPreloader.stop(ladda);
                showMessage('success', response.data.message);

                switch (parseInt(response.data.response.currency_id)) {
                    case CURRENCY_RUB_ID:
                        this.balance_rub -= response.data.response.balance_payout;
                        break;

                    case CURRENCY_USD_ID:
                        this.balance_usd -= response.data.response.balance_payout;
                        break;

                    case CURRENCY_EUR_ID:
                        this.balance_eur -= response.data.response.balance_payout;
                        break;
                }

            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        getPayout(payout) {
            return number_format(payout, 2, '.', ' ');
        },

        formatPayout(payout, currency_id) {
            return number_format(payout, 2, '.', ' ') + getCurrencySignById(currency_id);
        },
    },
});
