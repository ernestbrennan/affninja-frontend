Vue.component('advertiser-account-modal', {
    template: '#advertiser-account-modal-tpl',
    data() {
        return {
            LANG_USERS: LANG_USERS,

            accounts: [],
            currencies: [
                {title: 'RUB', value: 1},
                {title: 'USD', value: 3},
                {title: 'EUR', value: 5},
            ],
            available_currencies: [],
            selected_currency: {},
            advertiser_id: null,
            advertiser_email: null,
            modal: null,
            loading: false,
        };
    },

    created() {
        bus.$on('open-advertiser-account-modal', (advertiser_id, advertiser_email) => {
            this.openModal(advertiser_id, advertiser_email);
        });
    },

    mounted() {
        this.modal = $('#advertiser-account-modal');
    },

    watch: {
        'accounts'() {
            if (!this.accounts.length) {
                return this.available_currencies = this.currencies;
            }

            let self = this;

            this.available_currencies = this.currencies.filter(function (item) {
                let index = _.findIndex(self.accounts, {currency_id: item.value});

                return index === -1
            });

            this.$nextTick(() => {
                runTooltip();
            });
        },
    },

    methods: {
        hideTooltip(e) {
            $(e.target).tooltip('hide');
        },

        getCurrencyCodeById(currency_id) {
            return getCurrencyCodeById(currency_id);
        },

        canDeleteAccount(account) {
            return this.accounts.length !== 1 && !parseFloat(account.balance) && !parseFloat(account.hold) && !parseFloat(account.system_balance);
        },

        openModal(advertiser_id, advertiser_email) {
            this.advertiser_id = advertiser_id;
            this.advertiser_email = advertiser_email;
            this.accounts.splice(0);
            this.modal.modal();

            this.getAccountsList();
        },

        createAccount() {
            let ladda = LaddaPreloader.start('#advertiser-create-account-submit');

            Account.create(this.advertiser_id, this.selected_currency.value).then(data => {
                let account = data.response;

                account.balance = 0;
                account.hold = 0;
                account.system_balance = 0;

                this.accounts.push(account);
                this.selected_currency = {};

                showMessage('success', data.message);
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        deleteAccount(index) {
            Swal.show(LANG_USERS.on_delete_account_msg).then(() => {
                let ladda = LaddaPreloader.start('#account-delete-submit-' + index);

                Account.delete(this.accounts[index].id).then(data => {
                    this.accounts.splice(index, 1);

                    showMessage('success', data.message);
                    LaddaPreloader.stop(ladda);
                }, () => {
                    LaddaPreloader.stop(ladda);
                });
            }, () => {

            });
        },

        getAccountsList() {
            this.loading = true;

            Account.getList(this.advertiser_id).then(accounts => {
                this.loading = false;

                this.accounts = accounts;
            }, () => {
                this.loading = false;
            });
        },
    },
});