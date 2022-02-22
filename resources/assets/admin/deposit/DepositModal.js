Vue.component('deposit-modal', {
    template: '#deposit-modal-tpl',
    props: ['advertisers'],
    components: {
        'multiselect': window.VueMultiselect.default
    },
    data() {
        return {
            action: '',
            deposit_info: {
                currency_id: null,
                replenishment_method: null,
                description: '',
                advertiser_id: null,
                invoice: null,
                contract: null,
                created_at: null,
            },
            modal: null,
            selected_advertiser: {},
            currencies: [],
            selected_currency: {},
            currencies_loading: false,
            replenishment_methods: [{
                value: 'cash',
                title: 'Cash'
            }, {
                value: 'swift',
                title: 'Swift'
            }, {
                value: 'epayments',
                title: 'Epayments'
            }, {
                value: 'webmoney',
                title: 'Webmoney'
            }, {
                value: 'paxum',
                title: 'Paxum'
            }, {
                value: 'privat24',
                title: 'Privat24'
            }, {
                value: 'bitcoin',
                title: 'Bitcoin'
            }, {
                value: 'other',
                title: 'Other'
            },],
            selected_replenishment_method: {},
        }
    },

    created() {
        bus.$on('open-create-deposit-modal', () => {
            this.openCreateDepositModal();
        });

        bus.$on('open-edit-deposit-modal', (deposit) => {
            this.openEditDepositModal(deposit);
        });
    },

    mounted() {
        this.modal = $('#deposit-modal');
    },

    watch: {
        'selected_advertiser'(selected_advertiser) {
            this.deposit_info.advertiser_id = selected_advertiser.id;
        },
        'selected_replenishment_method'(selected_replenishment_method) {
            this.deposit_info.replenishment_method = selected_replenishment_method.value;
        },
        'deposit_info.advertiser_id'(advertiser_id) {
            if (advertiser_id === undefined) {
                return;
            }
            this.getAdvertiserAccounts(advertiser_id);
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
        openCreateDepositModal() {
            this.action = 'create';

            this.selected_currency = {};
            this.selected_advertiser = {};
            this.selected_replenishment_method = {};
            this.currencies.splice(0);

            this.deposit_info = {
                currency_id: null,
                replenishment_method: null,
                description: '',
                advertiser_id: null,
            };

            this.refreshFileInputs();

            $('#filter_deposit_date').val(moment(DATE_TIME_TO_DEFAULT).format('DD.MM.YYYY HH:mm:ss'));

            this.modal.modal();
        },

        createDeposit() {
            if (parseFloat(this.deposit_info.sum) < 0.01) {
                return;
            }

            let ladda = LaddaPreloader.start('#create_deposit_submit'),
                formdata = new FormData(),
                params = _.pick(this.deposit_info, [
                    'advertiser_id', 'currency_id', 'sum', 'description', 'replenishment_method',
                ]);

            params.created_at = convertDateTimeToRightFormat($('#filter_deposit_date').val());
            params.created_at = params.created_at === '' ? date('Y-m-d H:i:s', time()) : params.created_at;

            this.appendFilesToFormdata(formdata);
            this.appendParamsToFormdata(formdata, params);
            this.appendLocaleToFormdata(formdata);

            api.post('/deposit.create', formdata).then(response => {
                LaddaPreloader.stop(ladda);
                showMessage('success', response.data.message);
                bus.$emit('refresh-balance-transactions');

                this.modal.modal('hide');
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        openEditDepositModal(transaction) {
            this.action = 'edit';
            this.deposit_info = {
                id: transaction.deposit.id,
                description: transaction.deposit.description,
                replenishment_method: transaction.deposit.replenishment_method,
            };

            this.refreshFileInputs();
            var deposit_time = convertDateTimeToViewFormat(transaction.deposit.created_at);

            $('#filter_deposit_date').val(deposit_time);
            this.modal.modal();
        },

        editDeposit() {
            this.deposit_info.created_at = convertDateTimeToRightFormat($('#filter_deposit_date').val());
            let ladda = LaddaPreloader.start('#edit_deposit_submit'),
                formdata = new FormData(),
                params = _.pick(this.deposit_info, ['created_at', 'id', 'description', 'replenishment_method']);

            this.appendFilesToFormdata(formdata);
            this.appendParamsToFormdata(formdata, params);
            this.appendLocaleToFormdata(formdata);

            api.post('/deposit.edit', formdata).then(response => {

                bus.$emit('refresh-balance-transactions');

                LaddaPreloader.stop(ladda);
                this.modal.modal('hide');
                showMessage('success', response.data.message);
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        refreshFileInputs() {
            $('#contract').val('');
            $('#invoice').val('');
        },

        appendParamsToFormdata(formdata, params) {
            let i;
            for (i in params) {
                formdata.append(i, params[i]);
            }
        },

        appendLocaleToFormdata(formdata) {
            formdata.append("locale", app_locale_code);
        },

        appendFilesToFormdata(formdata) {
            let invoice = document.querySelector('#invoice');
            if (invoice.files.length) {
                invoice = invoice.files[0] || null;
                formdata.append("invoice", invoice);
            }

            let contract = document.querySelector('#contract');
            if (contract.files.length) {
                contract = contract.files[0] || null;
                formdata.append("contract", contract);
            }
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
