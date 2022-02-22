Vue.component('all-offers', {
    template: '#all_offers_list_tpl',
    mixins: [offers_list_mixin, toggle_target_geo_visibility],
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_OFFERS: LANG_OFFERS,

            offers: [],
            CDN_HOST: CDN_HOST,
            list_type: 'all',
            pagination: {
                page: 1,
                per_page: 20,
                loading: false,
                finished: false,
            },
            ladda: null,
        }
    },

    watch: {
        offers() {
            Vue.nextTick(function () {
                runTooltip();
            });
        },

        'pagination.loading'() {
            if (this.pagination.loading && !this.offers.length) {
                filters_bus.$emit('apply-filter-start');
                return activeAjax = true;
            }

            filters_bus.$emit('apply-filter-stop');
            activeAjax = false;
        },
    },

    methods: {
        openCloneOfferModal(offer_id) {
            bus.$emit('open-clone-offer-modal', offer_id);
        },

        deleteOffer(offer_id) {
            let self = this;

            Swal.show(LANG_OFFERS.on_archive_msg, LANG_MESSAGES.archive).then(() => {
                if (offer_id === '') {
                    throw 'offer_id is undefined';
                }

                apiRequest('offer.delete', 'POST', {id: offer_id}, function (result) {
                    if (result.status_code !== 202) {
                        return false;
                    }

                    let index = _.findIndex(self.offers, {id: offer_id});

                    self.offers.splice(index, 1);
                }, null);
            });
        },

        getOffers(params) {
            if (this.pagination.loading) {
                return;
            }

            this.pagination.loading = true;

            params.page = this.pagination.page;
            params.per_page = this.pagination.per_page;

            api.get('/offer.getList', {params: params}).then(response => {
                this.pagination.loading = false;

                if (response.data.status_code !== 200) {
                    return false;
                }

                this.pagination.finished = response.data.response.next_page_url === null;

                if (this.pagination.page === 1) {
                    this.offers = this.offers = response.data.response.data;
                } else {
                    this.offers = this.offers.concat(response.data.response.data);
                }
            });
        },
    },
});
