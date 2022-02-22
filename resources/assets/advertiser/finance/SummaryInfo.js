Vue.component('summary-info', {
    template: '#summary-info-tpl',
    data() {
        return {
            LANG_FINANCE: LANG_FINANCE,
            transactions: [],
            summary: [],
        }
    },

    created() {
        bus.$on('calc-summary', transactions => {
            this.transactions = transactions;

            this.refresh();
        });
    },

    methods: {

        refresh() {
            this.summary.splice(0);

            this.transactions.forEach(transaction => {
                let balance_sum = parseFloat(transaction.balance_sum.replace('-', ''));

                if (_.findIndex(this.summary, {currency_id: transaction.currency_id}) === -1) {
                    this.summary.push({
                        currency_id: transaction.currency_id,
                        expense: 0,
                        income: 0,
                    })
                }

                let index = _.findIndex(this.summary, {currency_id: transaction.currency_id});

                switch (transaction.type) {
                    case 'advertiser.cancel':
                        return this.summary[index].income += balance_sum;

                    case 'advertiser.deposit':
                        return this.summary[index].income += balance_sum;

                    case 'advertiser.unhold':
                        return this.summary[index].expense += balance_sum;

                    case 'advertiser.write-off':
                        return this.summary[index].expense += balance_sum;

                    default:
                        console.warn('Undefined type of transaction');
                }
            })
        },
    },
});
