Vue.component('write-off-modal', {
    template: '#write-off-modal-tpl',
    props: ['advertisers'],
    components: {
        'multiselect': window.VueMultiselect.default
    },
    data() {
        return {
            action: '',
            selected_id: null,
            deposit_info: {
                currency_id: null,
                description: '',
                user_id: null,
            },
            modal: null,
            selected_advertiser: {},
            currencies: [],
            selected_currency: [],
            currencies_loading: false,
        }
    },

    created() {
        bus.$on('open-create-write-off-modal', () => {
            this.openCreateWriteOffModal();
        });

        bus.$on('open-edit-write-off-modal', (transaction) => {
            this.openEditWriteOffModal(transaction);
        });
    },

    mounted() {
        this.modal = $('#write-off-modal');
    },

    watch: {
        'selected_advertiser'(selected_advertiser) {
            this.deposit_info.user_id = selected_advertiser.id;
        },
        'deposit_info.user_id'(user_id) {
            if (user_id === undefined) {
                return;
            }
            this.getAdvertiserAccounts(user_id);
        },
        'currencies'() {
            if (is_null(this.deposit_info.currency_id)) {
                return this.selected_currency = this.currencies[0];
            }

            let selected_currency = _.find(this.currencies, {id: this.deposit_info.currency_id});
            if (selected_currency === undefined) {
                return this.selected_currency = this.currencies[0];
            }

            return this.selected_currency = selected_currency;
        },
        'selected_currency'(selected_currency) {
            if (selected_currency === undefined) {
                return;
            }
            this.deposit_info.currency_id = selected_currency.id;
        },
    },

    methods: {
        openCreateWriteOffModal() {
            this.action = 'create';

            this.selected_currency = {};
            this.selected_advertiser = {};

            this.currencies.splice(0);

            this.deposit_info = {
                currency_id: null,
                description: '',
                user_id: null,
                transaction_id: null,
            };

            this.modal.modal();
        },

        createWriteOff() {
            let ladda = LaddaPreloader.start('#write_off_submit'),
                params = _.pick(this.deposit_info, ['user_id', 'currency_id', 'balance_sum', 'description']);

            params.type = 'advertiser.write-off';

            api.post('/balance_transaction.create', params).then(response => {
                bus.$emit('refresh-balance-transactions');

                LaddaPreloader.stop(ladda);
                showMessage('success', response.data.message);
                this.modal.modal('hide');
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        openEditWriteOffModal(transaction) {
            this.action = 'edit';
            this.deposit_info = {
                description: transaction.description,
                transaction_id: transaction.id,
            };

            this.modal.modal();
        },

        editWriteOff() {
            if (parseFloat(this.deposit_info.balance_sum) < 0.01) {
                return;
            }

            let ladda = LaddaPreloader.start('#write_off_submit'),
                params = {
                    description: this.deposit_info.description,
                    id: this.deposit_info.transaction_id,
                };

            api.post('/balance_transaction.edit', params).then(response => {
                bus.$emit('refresh-balance-transactions');

                LaddaPreloader.stop(ladda);
                showMessage('success', response.data.message);
                this.modal.modal('hide');
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        getAdvertiserAccounts(advertiser_id) {
            this.currencies_loading = true;

            Account.getList(advertiser_id, ['currency']).then(accounts => {
                this.currencies = _.uniq(_.map(accounts, 'currency'));
                this.currencies_loading = false;
            })
        }
    }
});
