let vm = new Vue({
    el: '#leads',
    data: {
        LANG_USERS: LANG_USERS,
        LANG_MESSAGES: LANG_MESSAGES,
        LANG_LEADS: LANG_LEADS,
        currencies: [],
        advertisers_loading: false,
        advertiser: ADVERTISER,
        leads: [],
        leads_to_complete: [],
        all_selected: false,
        rate: 0,
        reverse_rate: 0,
        publisher_currency_id: null,
        publisher_currency_sign: null,
        advertiser_currency_id: null,
        advertiser_currency_sign: null,
        advertiser_balance: 0,
        datatable: null,
        month: date('m', time()),
        year: date('Y', time()),
    },

    mounted() {
        this.getUncompletedLeads(this.advertiser.id);
        this.getCurrencies();
    },

    watch: {
        'all_selected'() {
            if (!this.all_selected) {
                this.leads_to_complete.splice(0);
            } else {
                this.leads_to_complete = this.leads;
            }
        },
        'rate'() {
            this.reverse_rate = number_format(1 / this.rate, 4);
        },
        'publisher_currency_id'(value) {
            if (is_null(value)) {
                return;
            }
            this.publisher_currency_sign = getCurrencySignById(value)
        },
        'advertiser_currency_id'(value) {
            if (is_null(value)) {
                return;
            }
            this.advertiser_currency_sign = getCurrencySignById(value)
        },
        'leads_to_complete'() {
            if (!this.leads_to_complete.length) {
                this.publisher_currency_id = null;
                this.advertiser_currency_id = null;
                this.rate = 0;
                this.advertiser_balance = 0;
            }
        }
    },

    computed: {
        'profit'() {
            if (!this.total_advertiser_charge || !this.total_publisher_payout) {
                return 0;
            }
            return this.total_advertiser_charge - this.total_publisher_payout;
        },
        'total_publisher_payout'() {
            return _.sum(_.map(_.map(this.leads_to_complete, 'payout'), parseFloat)) * this.rate;
        },
        'total_advertiser_charge'() {
            return _.sum(_.map(_.map(this.leads_to_complete, 'advertiser_payout'), parseFloat));
        },
        'profit_at'() {
            return `${this.year}-${this.month}-01`
        }
    },

    methods: {
        getCurrencies() {
            api.get('/currency.getList').then(response => {
                this.currencies = response.data.response;
            });
        },

        getUncompletedLeads(advertiser_id) {
            ContentPreloader.show('#leads-wrap');

            api.get('/lead.getUncompleted', {params: {advertiser_id: advertiser_id}}).then(response => {
                this.leads = response.data.response;

                this.$nextTick(() => {
                    ContentPreloader.hide();
                    if (this.leads.length) {
                        this.initDatatable();
                    }
                });
            })
        },

        addLeadToComplete(lead, event = null) {
            let index;
            if (this.leads_to_complete.length) {
                index = _.findIndex(this.leads_to_complete, {id: lead.id});
                if (index !== -1) {
                    return this.leads_to_complete.splice(index, 1);
                }
            }

            let advertiser_balance = this.getAdvertiserSystemBalance(lead.advertiser_currency_id),
                charge = parseFloat(lead.advertiser_payout),
                temp_total = this.total_advertiser_charge + charge;

            if (!this.leads_to_complete.length) {
                this.publisher_currency_id = lead.currency_id;
                this.advertiser_currency_id = lead.advertiser_currency_id;
                this.advertiser_balance = advertiser_balance;

                this.advertiser_balance = advertiser_balance;
                this.getAutoRate();
            }

            if (temp_total > advertiser_balance) {
                showMessage('error', LANG_LEADS.do_not_enough_balance);
                return false;
            }

            this.leads_to_complete.push(lead);
        },

        completeLeads() {
            let params = {
                    ids: _.map(this.leads_to_complete, 'id'),
                    rate: this.rate,
                    advertiser_id: this.advertiser.id,
                    profit_at: this.profit_at,
                },
                ladda = LaddaPreloader.start('#complete_leads');

            api.post('/lead.completeByIds', params).then(response => {
                _.remove(this.leads, lead => {
                    return _.findIndex(this.leads_to_complete, {id: lead.id}) !== -1;
                });

                this.decreaseSystemBalance(response.data.response.charged_sum);

                this.advertiser_balance = 0;

                this.leads_to_complete.splice(0);

                LaddaPreloader.stop(ladda);
            });
        },

        getAutoRate() {
            let currency = _.find(this.currencies, {id: this.publisher_currency_id}),
                rates = JSON.parse(currency.rates),
                advertiser_currency_code = getCurrencyCodeById(this.advertiser_currency_id);

            if (is_null(rates) || !isset(rates[advertiser_currency_code])) {
                this.rate = 0;
            } else {
                this.rate = rates[advertiser_currency_code];
            }
        },

        initDatatable() {
            if (is_null(this.datatable)) {
                this.datatable = Datatable.getInstance();
            }

            this.datatable.init('leads-table', {
                paginate: false,
                columnDefs: [
                    {targets: 0, type: 'de_datetime', width: 110},
                    {targets: 1, width: 110},
                    {targets: 2, type: 'title-numeric', width: 80},
                    {targets: 3, type: 'title-numeric', width: 80},
                    {targets: 4, type: 'title-numeric', width: 200},
                    {targets: 5, type: 'title-numeric', width: 200},
                    {targets: 6, orderable: false, width: 50},
                ],
                aaSorting: [[0, "asc"]],
            });
        },

        leadHasDifferentCurrency(lead) {
            return this.publisher_currency_id !== null && lead.currency_id !== this.publisher_currency_id
                || this.advertiser_currency_id !== null && lead.advertiser_currency_id !== this.advertiser_currency_id
        },

        getAdvertiserSystemBalance(currency_id) {
            let account = this.findAccountByCurrencyId(currency_id);

            if (account === undefined) {
                return 0;
            }
            return account.system_balance;
        },

        decreaseSystemBalance(charge) {
            return this.findAccountByCurrencyId(this.advertiser_currency_id).system_balance -= parseFloat(charge);
        },

        findAccountByCurrencyId(currency_id) {
            return _.find(this.advertiser.accounts, {currency_id: currency_id});
        }
    }
});