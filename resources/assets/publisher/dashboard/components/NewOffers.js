Vue.component('new-offers', {
    template: '#new_offers_list_tpl',
    mixins: [offers_list_mixin, create_flow_mixin, toggle_target_geo_visibility],
    data: function () {
        return {
            LANG_OFFERS: LANG_OFFERS,
            offers: [],
            params: {},
            CDN_HOST: CDN_HOST,
            list_type: 'new',
            new_label_id: 2,
            pagination: {
                page: 1,
                per_page: 20,
                loading: false,
                finished: false
            },
            preloader: null,
        }
    },

    created() {
        let self = this;
        bus.$on('my-offer-created', offer_hash => {
            let index = _.findIndex(self.offers, {hash: offer_hash});
            // Если нужного оффера нету в списке
            if (index === -1) {
                return;
            }

            self.offers[index].already_added = 1;

            // Бросаем событие только если находимся в списке "Новых" офферов
            if (Tab.get() === 'new') {
                bus.$emit('my-offer-creating-completed', self.offers[index])
            }
        });
    },

    watch: {
        'offers'() {
            Vue.nextTick(function () {
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
                    this.preloader = ContentPreloader.show('.offers_scroll-preloader-container');
                } else {
                    this.preloader = ContentPreloader.show('#new_offers_list_wrap');
                }
            } else {
                filter_submit_len ? LaddaPreloader.stop(this.ladda) : null;
                ContentPreloader.hide(this.preloader);
            }
        },
    },

    methods: {

        getOffers(params) {
            params.labels = [this.new_label_id];
            params.page = this.pagination.page;
            params.per_page = this.pagination.per_page;

            activeAjax = true;
            this.pagination.loading = true;

            api.get('/offer.getList', {params: params}).then(response => {
                    activeAjax = false;
                    this.pagination.loading = false;

                    this.pagination.finished = response.data.response.next_page_url === null;

                    if (this.pagination.page === 1) {
                        this.offers = response.data.response.data;
                    } else {
                        this.offers = self.offers.concat(response.data.response.data);
                    }

                    // Нет смысла обновлять кол-во после догрузки списка офферов
                    if (this.pagination.page === 1) {
                        this.$emit('new-offers-count-updated', response.data.response.total);
                    }

                }, () => {
                    activeAjax = false;
                    this.pagination.loading = false;
                }
            );
        }
    }
});
