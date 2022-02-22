const offers_list_mixin = {
    mounted() {
        $(document).on('click', '.btn-toggle', function (e) {
            e.preventDefault();

            if (!$(this).hasClass('closed')) {
                return;
            }

            let offer = $(this).closest('.offer');
            if (!offer.length) {
                throw 'Do not specified class .offer.';
            }

            $("html, body").animate({scrollTop: offer.offset().top}, 100);
        });
    },

    methods: {
        getNextPage(params = {}) {
            if (this.pagination.finished || this.pagination.loading) {
                return;
            }
            this.pagination.page++;
            this.getOffers(params);
        },

        reloadOffers(params = {}) {
            this.refreshState();
            this.getOffers(params);
        },

        refreshState() {
            this.pagination.page = 1;
            this.pagination.finished = false;
            this.offers = [];
        },

    }
};