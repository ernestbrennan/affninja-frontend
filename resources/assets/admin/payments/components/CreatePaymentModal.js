Vue.component('create-payment-modal', {
    template: '#create-payment-modal-tpl',
    data: function () {
        return {
            modal: null,
            selected_publisher: {},
            publishers: [],
            publishers_loading: false,

            payout: '',

            selected_currency: {},
            currencies: [
                {title: LANG_FINANCE.rub, id: CURRENCY_RUB_ID},
                {title: LANG_FINANCE.usd, id: CURRENCY_USD_ID},
                {title: LANG_FINANCE.eur, id: CURRENCY_EUR_ID},
            ],
            
            selected_requisite: {},
            requisites: [],
        }
    },

    mounted() {
        this.modal = $('#create-payment-modal');
    },

    watch: {
        'selected_publisher'() {
            this.selected_currency = {};
            this.selected_requisite = {};
            this.requisites = [];
        },

        'selected_currency'() {
            if (!Object.size(this.selected_currency)) {
                return;
            }

            this.selected_requisite = {};
            this.requisites.splice(0);
            this.getPaymentRequisites();
        },
    },

    methods: {
        openModal() {
            this.refreshInfo();
            this.modal.modal();
        },

        refreshInfo() {
            this.payout = '';
            this.selected_publisher = {};
            this.selected_currency = {};
            this.selected_requisite = {};
        },

        onSearch(search) {
            this.publishers.splice(0);
            this.getPublishers([], search);
        },

        getPublishers(hashes = [], search = '') {
            if (!hashes.length && search.length < 2) {
                return;
            }

            this.publishers_loading = true;

            User.getPublishers(['profile'], 'email', search, hashes).then(publishers => {
                Vue.set(this, 'publishers', publishers.data);
                this.publishers_loading = false;
            })
        },

        getPaymentRequisites() {
            let params = {
                publisher_id: this.selected_publisher.id,
                currency_id: this.selected_currency.id,
            };

            api.get('/payment_requisites.getListForPayment', {params: params}).then((response) => {
                this.requisites = response.data.response.map((item) => {
                    return {
                        title: item.payment_system.title,
                        hash: item.hash,
                        payment_system_id: item.payment_system_id,
                    };
                });
            });
        },

        createPayment() {
            let params = {
                payment_system_id: this.selected_requisite.payment_system_id,
                requisite_hash:	this.selected_requisite.hash,
                payout: this.payout,
                publisher_id: this.selected_publisher.id,
                currency_id: this.selected_currency.id,
                with: ['user.publisher'],
            };

            api.post('/payment.create', params).then((response) => {
                bus.$emit('payment-create', response.data.response);
                this.modal.modal('hide');
            });
        },
    },
});