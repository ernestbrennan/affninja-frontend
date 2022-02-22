Vue.component('transaction-list', {
    template: '#transaction-list-tpl',
    data: function () {
        return {
            // Global variables
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_STATISTICS: LANG_STATISTICS,
            LANG_FILTERS: LANG_FILTERS,
            LANG_FINANCE: LANG_FINANCE,

            currencies_ids: [1, 3, 5],

            transactions: [],
            group_by: null,
            group_by_operation: null,
            group_by_operation_total: [],
            group_by_dates: [],
            group_by_dates_total: [],
            group_by_offers: [],
            group_by_offers_total: [],
            group_by_countries: [],
            group_by_countries_total: [],
        }
    },

    created() {
        bus.$on('refresh-transactions', (grouping_option) => {
            this.group_by = grouping_option === null ? null : grouping_option.value;

            this.getBalanceTransactions();
        });

        dataTableSortTitleNumeric();
    },

    watch: {
        'transactions'() {
            if (this.group_by !== null && this.transactions.length) {
                return this.groupingTransactions(this.group_by);
            }

            Datatable.destroyDatatable();

            Vue.nextTick(() => {

                if (!this.transactions.length) {
                    return;
                }

                let config = {
                    // Позволяет использовать верхний ряд thead как сортировочный
                    orderCellsTop: true,
                    aaSorting: [[0, "desc"]],
                    columnDefs: [
                        {targets: 0, type: 'de_datetime_by_data'},
                        {targets: 1, orderable: false},
                        {targets: 2, type: 'string'},
                        {targets: 3, orderable: false},
                        {targets: 4, orderable: false},
                        {targets: 5, orderable: false},
                        {targets: 6, orderable: false},
                        {targets: 7, type: 'title-numeric-pre'},
                        {targets: 8, type: 'title-numeric-pre'},
                    ],
                };

                Datatable.init('finance_table', config, false);
                runTooltip();
            });
        },
    },

    methods: {
        groupingTransactions(group_by) {
            this.refreshGrouping();

            switch (group_by) {
                case 'operation':
                    return this.groupByOperation();

                case 'date':
                    return this.groupByDate();

                case 'offer':
                    return this.groupByOffer();

                case 'country':
                    return this.groupByCountry();

                default:
                    throw 'Undefined type of grouping_option'
            }
        },

        refreshGrouping() {
            this.group_by_operation = null;
            this.group_by_dates = [];
            this.group_by_offers = [];
            this.group_by_countries = [];
        },

        getTransactionType(type) {
            if (type === 'advertiser.cancel' || type === 'advertiser.deposit') {
                return 'replenishment';
            } else if (type === 'advertiser.unhold' || type === 'advertiser.write-off') {
                return 'write_off';
            }
        },

        groupByOperation() {
            let group_by_operation = [],
                replanishment_info = {
                    title: 'replenishment',
                    data: [],
                    total: [],
                },
                write_off_info = {
                    title: 'write_off',
                    data: [],
                    total: [],
                },
                total = [];

            this.currencies_ids.forEach((item) => {
                let operation_info = {
                    title: item,
                    operation_sum: 0,
                };

                replanishment_info.data.push(_.cloneDeep(operation_info));
                write_off_info.data.push(_.cloneDeep(operation_info));

                let total_info = {
                    title: item,
                    total_sum: 0,
                };

                total.push(_.cloneDeep(total_info));
            });

            group_by_operation.push(replanishment_info);
            group_by_operation.push(write_off_info);

            this.transactions.forEach((transaction) => {
                let transaction_type = this.getTransactionType(transaction.type),
                    currency_id = +transaction.currency_id,
                    balance_sum = Math.abs(parseFloat(transaction.balance_sum));

                if (transaction_type === 'replenishment') {
                    let index = _.findIndex(replanishment_info.data, {title: +currency_id}),
                        total_index = _.findIndex(total, {title: +currency_id});

                    replanishment_info.data[index].operation_sum += balance_sum;
                    total[total_index].total_sum += balance_sum;
                } else if (transaction_type === 'write_off') {
                    let index = _.findIndex(replanishment_info.data, {title: +currency_id}),
                        total_index = _.findIndex(total, {title: +currency_id});

                    write_off_info.data[index].operation_sum += balance_sum;
                    total[total_index].total_sum += balance_sum;
                }
            });

            this.group_by_operation_total = total;
            this.group_by_operation = group_by_operation;
        },

        groupByDate() {
            let dates = [], total = [];

            this.currencies_ids.forEach((item) => {
                total.push({
                    title: item,
                    replenishment_sum: 0,
                    write_off_sum: 0,
                });
            });

            this.transactions.forEach((transaction) => {
                let date = transaction.created_at.slice(0, 10),
                    currency_id = transaction.currency_id,
                    date_index = _.findIndex(dates, {title: date}),
                    currency_index = _.findIndex(dates[date_index] ? dates[date_index].data : [], {title: currency_id}),
                    balance_sum = Math.abs(parseFloat(transaction.balance_sum)),
                    transaction_type = this.getTransactionType(transaction.type),
                    total_index = _.findIndex(total, {title: currency_id});

                if (date_index === -1) {
                    let date_info = {
                        title: date,
                        data: [],
                    };

                    this.currencies_ids.forEach((item) => {
                        date_info.data.push({
                            title: item,
                            replenishment_sum: 0,
                            write_off_sum: 0,
                        });
                    });

                    let index = _.findIndex(date_info.data, {title: +currency_id});

                    if (transaction_type === 'replenishment') {
                        date_info.data[index].replenishment_sum += balance_sum;
                        total[total_index].replenishment_sum += balance_sum;
                    } else if (transaction_type === 'write_off') {
                        date_info.data[index].write_off_sum += balance_sum;
                        total[total_index].write_off_sum += balance_sum;
                    }

                    dates.push(date_info);
                } else {

                    if (transaction_type === 'replenishment') {
                        dates[date_index].data[currency_index].replenishment_sum += balance_sum;
                        total[total_index].replenishment_sum += balance_sum;
                    } else if (transaction_type === 'write_off') {
                        dates[date_index].data[currency_index].write_off_sum += balance_sum;
                        total[total_index].write_off_sum += balance_sum;
                    }
                }
            });

            this.group_by_dates = dates;
            this.group_by_dates_total = total;
        },

        groupByOffer() {
            let offers = [],
                without_offer = {
                    title: LANG_FINANCE.without_offer,
                    data: [],
                },
                total = [];

            this.currencies_ids.forEach((item) => {
                let currency_data = {
                    title: item,
                    replenishment_sum: 0,
                    write_off_sum: 0,
                };

                total.push(_.cloneDeep(currency_data));
                without_offer.data.push(_.cloneDeep(currency_data));
            });

            this.transactions.forEach((transaction) => {
                let balance_sum = Math.abs(parseFloat(transaction.balance_sum)),
                    currency_id = transaction.currency_id,
                    transaction_type = this.getTransactionType(transaction.type),
                    without_offer_index = _.findIndex(without_offer.data, {title: currency_id}),
                    total_index = _.findIndex(total, {title: currency_id});

                if (transaction.lead === undefined || transaction.lead === null) {
                    if (transaction_type === 'replenishment') {
                        without_offer.data[without_offer_index].replenishment_sum += balance_sum;
                        return total[total_index].replenishment_sum += balance_sum;
                    } else if (transaction_type === 'write_off') {
                        without_offer.data[without_offer_index].write_off_sum += balance_sum;
                        return total[total_index].write_off_sum += balance_sum;
                    }
                }

                let offer = transaction.lead.offer,
                    i = _.findIndex(offers, {hash: offer.hash});

                if (i === -1) {
                    let offer_info = {
                        title: offer.title,
                        hash: offer.hash,
                        data: [],
                    };

                    this.currencies_ids.forEach((item) => {
                        offer_info.data.push({
                            title: item,
                            replenishment_sum: 0,
                            write_off_sum: 0,
                        });
                    });

                    let index = _.findIndex(offer_info.data, {title: +currency_id});

                    if (transaction_type === 'replenishment') {
                        offer_info.data[index].replenishment_sum += balance_sum;
                        total[total_index].replenishment_sum += balance_sum;
                    } else if (transaction_type === 'write_off') {
                        offer_info.data[index].write_off_sum += balance_sum;
                        total[total_index].write_off_sum += balance_sum;
                    }

                    offers.push(offer_info);
                } else {
                    let index = _.findIndex(offers[i].data, {title: +currency_id});

                    if (transaction_type === 'replenishment') {
                        offers[i].data[index].replenishment_sum += balance_sum;
                        total[total_index].replenishment_sum += balance_sum;
                    } else if (transaction_type === 'write_off') {
                        offers[i].data[index].write_off_sum += balance_sum;
                        total[total_index].write_off_sum += balance_sum;
                    }
                }
            });

            let sum_check = false;

            without_offer.data.forEach((item) => {
                if (item.replenishment_sum !== 0 || item.write_off_sum !== 0) {
                    sum_check = true;
                }
            });

            if (sum_check) {
                offers.push(without_offer);
            }

            this.group_by_offers_total = total;
            this.group_by_offers = offers;
        },

        groupByCountry() {
            let countries = [],
                without_country = {
                    title: LANG_FINANCE.without_country,
                    data: [],
                },
                total = [];

            this.currencies_ids.forEach((item) => {
                let currency_data = {
                    title: item,
                    replenishment_sum: 0,
                    write_off_sum: 0,
                };

                total.push(_.cloneDeep(currency_data));
                without_country.data.push(_.cloneDeep(currency_data));
            });

            this.transactions.forEach((transaction) => {
                let balance_sum = Math.abs(parseFloat(transaction.balance_sum)),
                    currency_id = transaction.currency_id,
                    transaction_type = this.getTransactionType(transaction.type),
                    without_country_index = _.findIndex(without_country.data, {title: currency_id}),
                    total_index = _.findIndex(total, {title: currency_id});

                if (transaction.lead === undefined || transaction.lead === null) {
                    if (transaction_type === 'replenishment') {
                        without_country.data[without_country_index].replenishment_sum += balance_sum;
                        return total[total_index].replenishment_sum += balance_sum;
                    } else if (transaction_type === 'write_off') {
                        without_country.data[without_country_index].write_off_sum += balance_sum;
                        return total[total_index].write_off_sum += balance_sum;
                    }
                }

                let country = transaction.lead.country,
                    i = _.findIndex(countries, {id: country.id});

                if (i === -1) {
                    let country_info = {
                        title: country.title,
                        id: country.id,
                        data: [],
                    };

                    this.currencies_ids.forEach((item) => {
                        country_info.data.push({
                            title: item,
                            replenishment_sum: 0,
                            write_off_sum: 0,
                        });
                    });

                    let index = _.findIndex(country_info.data, {title: +currency_id});

                    if (transaction_type === 'replenishment') {
                        country_info.data[index].replenishment_sum += balance_sum;
                        total[total_index].replenishment_sum += balance_sum;
                    } else if (transaction_type === 'write_off') {
                        country_info.data[index].write_off_sum += balance_sum;
                        total[total_index].write_off_sum += balance_sum;
                    }

                    countries.push(country_info);
                } else {
                    let index = _.findIndex(countries[i].data, {title: +currency_id});

                    if (transaction_type === 'replenishment') {
                        countries[i].data[index].replenishment_sum += balance_sum;
                        total[total_index].replenishment_sum += balance_sum;
                    } else if (transaction_type === 'write_off') {
                        countries[i].data[index].write_off_sum += balance_sum;
                        total[total_index].write_off_sum += balance_sum;
                    }
                }
            });

            let sum_check = false;

            without_country.data.forEach((item) => {
                if (item.replenishment_sum !== 0 || item.write_off_sum !== 0) {
                    sum_check = true;
                }
            });

            if (sum_check) {
                countries.push(without_country);
            }

            this.group_by_countries_total = total;
            this.group_by_countries = countries;
        },

        clearTransactions() {
            this.transactions = [];
        },

        getBalanceTransactions() {
            ContentPreloader.show('#transaction-list-wrap');

            let params = Filters.getData();

            if (!params.types || !params.types.length) {
                params.types = this.getAllTypes()
            }

            api.get('/balance_transaction.getList', {params: params}).then(response => {

                this.transactions.splice(0);

                response.data.response.forEach((transaction) => {
                    if (transaction.type === 'advertiser.cancel' && +transaction.balance_sum === 0) {
                        return;
                    }

                    this.transactions.push(transaction);
                });

                bus.$emit('calc-summary', this.transactions);

                ContentPreloader.hide();
            });
        },

        getAllTypes() {
            return _.map($('#filter_type').find('option'), 'value');
        },

        getLeadLink(lead) {
            return '/leads?search_field=hash&search=' + lead.hash;
        },
    }
});
