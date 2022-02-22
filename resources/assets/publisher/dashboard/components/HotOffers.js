Vue.component('hot-offers', {
    template: '#hot_offers_list_tpl',
    mixins: [offers_list_mixin, create_flow_mixin, toggle_target_geo_visibility],
    data: function () {
        return {
            LANG_OFFERS: LANG_OFFERS,
            offers: [],
            CDN_HOST: CDN_HOST,
            list_type: 'hot',
            hot_label_id: 1,
            pagination: {
                page: 1,
                per_page: 20,
                loading: false,
                finished: true
            },
            ladda: null,
            preloared: null,
        }
    },

    created() {
        let self = this;
        bus.$on('my-offer-created', offer_hash => {
            let index = _.findIndex(this.offers, {hash: offer_hash});
            // Если нужного оффера нету в списке
            if (index === -1) {
                return;
            }

            this.offers[index].already_added = 1;

            // Бросаем событие только если находимся в списке "Горящих" офферов
            if (Tab.get() === 'hot') {
                bus.$emit('my-offer-creating-completed', this.offers[index])
            }
        });
    },

    watch: {
        'offers'() {
            Vue.nextTick(() => {
                runTooltip();
            });
        },

        'pagination.loading'() {
            let filter_submit_len = $('#filters_submit').length;

            if (filter_submit_len) {
                this.ladda = LaddaPreloader.start('#filters_submit');
            }

            if (this.pagination.loading) {
                if (this.offers.length > 0) {
                    this.preloared = ContentPreloader.show('.offers_scroll-preloader-container');
                } else {
                    this.preloared = ContentPreloader.show('#hot_offers_list_wrap');
                }
            } else {
                filter_submit_len ? LaddaPreloader.stop(this.ladda) : null;
                ContentPreloader.hide(this.preloared);
            }
        },
    },

    methods: {
        getOffers(params) {
            params.labels = [this.hot_label_id];
            params.page = this.pagination.page;
            params.per_page = this.pagination.per_page;

            activeAjax = true;
            this.pagination.loading = true;

            api.get('/offer.getList', {params: params}).then(response => {
                activeAjax = false;
                this.pagination.loading = false;

                if (response.data.status_code !== 200) {
                    return false;
                }

                this.pagination.finished = response.data.response.next_page_url === null;

                if (this.pagination.page === 1) {
                    this.offers = response.data.response.data;
                } else {
                    this.offers = self.offers.concat(response.data.response.data);
                }

                // Нет смысла обновлять кол-во после догрузки списка офферов
                if (this.pagination.page === 1) {
                    this.$emit('hot-offers-count-updated', response.data.response.total);
                }

            }, () => {
                activeAjax = false;
                this.pagination.loading = false;
            });
        }
    }
});
