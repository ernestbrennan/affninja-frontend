let bus = new Vue();

let vm = new Vue({
	el: '#advertiser-balance',
	data: {
        advertisers: [],
	},

	created() {
        this.getAdmins();
	},

	methods: {
        openCreateModal(type) {
            this.$refs.deposits.openCreateModal(type);
        },

        getAdmins() {
            User.getAdvertisers().then(response => {
                this.advertisers = response.data;
                Vue.nextTick(() => {
                    Filters.init();
                });
            });
        },

        getBalanceTransactions() {
            bus.$emit('refresh-balance-transactions');
        },

        openCreateDepositModal() {
            bus.$emit('open-create-deposit-modal');
        },

        openCreateWriteOffModal() {
            bus.$emit('open-create-write-off-modal');
        },

        reloadBalanceTransactions() {
            bus.$emit('reload-balance-transactions');
		},

        checkSelectedAdvertisers(hash, key) {
           return decodeURI(window.location.href).indexOf('advertiser_hashes['+key+']=' + hash) !== -1;
		},
    }
});
