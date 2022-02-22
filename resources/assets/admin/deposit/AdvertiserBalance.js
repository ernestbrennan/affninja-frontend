Vue.component('advertiser-balance', {
    template: '#advertiser-balance-tpl',
    components: {
        'multiselect': window.VueMultiselect.default
    },
    data() {
        return {
            API_HOST: API_HOST,
            balance_transactions: [],
            action: '',
            selected_id: null,
            type: null,
            deposit_info: {
                currency_id: null,
                replenishment_method: null,
                description: '',
                advertiser_id: null,
                invoice: null,
                contract: null,
            },
            deposit_table: null,
            datatable: null,
            datatable_was_initialized: false
        }
    },

    created() {
        bus.$on('refresh-balance-transactions', () => {
            this.getBalanceTransactions();
        });

        bus.$on('reload-balance-transactions', () => {
            this. reloadBalanceTransactions();
        });
    },

    mounted() {
        this.getBalanceTransactions();
        this.deposit_table = $('#balance_transactions_table');
        extendDatatable();
    },

    watch: {
        'balance_transactions'() {
            if (null !== this.datatable) {
                this.datatable.destroy();
            }

            Vue.nextTick(() => {
                if (this.balance_transactions.length) {
                    // this.runDatatable();
                }
                runTooltip();
            });
        },
    },

    methods: {
        getBalanceTransactions: function () {
            let ladda = LaddaPreloader.start('#filters_submit'),
                params = Filters.getData();
            params.types = ['advertiser.deposit', 'advertiser.write-off'];
            params.with = ['admin'];

            ContentPreloader.show('#balance-transactions-wrap');
            LaddaPreloader.start('#filters_submit');

            api.get('/balance_transaction.getList', {params: params}).then(response => {
                this.balance_transactions = response.data.response;

                LaddaPreloader.stop(ladda);
                ContentPreloader.hide();
            });
        },

        reloadBalanceTransactions() {
            this.setFiltersParametrsInUrl();
            this.getBalanceTransactions();
        },

        setFiltersParametrsInUrl() {
            Filters.setFiltersInUrl('#filters', {
                date_from: UrlParameter.getDateFrom(),
                date_to: UrlParameter.getDateTo(),
            });
        },

        openEditDepositModal(deposit) {
            bus.$emit('open-edit-deposit-modal', deposit);
        },

        openEditTransactionModal(transaction) {
            bus.$emit('open-edit-write-off-modal', transaction);
        },

        // runDatatable() {
        //     this.datatable = $('#deposit_table').DataTable({
        //         language: {
        //             paginate: {
        //                 previous: 'Пред.',
        //                 next: 'След.'
        //             }
        //         },
        //         pageLength: 25,
        //         bLengthChange: false,
        //         bInfo: false,
        //         bFilter: false,
        //         columnDefs: [
        //             {targets: 0, type: 'de_date'},
        //             {targets: 1, orderable: false},
        //             {targets: 2, orderable: false},
        //             {targets: 3, type: 'title-numeric'},
        //             {targets: 4, orderable: false},
        //             {targets: 5, orderable: false},
        //         ],
        //         aaSorting: [[0, 'desc']],
        //         drawCallback() {
        //             stylePagginationBtns();
        //         }
        //     });
        // }
    }
});
