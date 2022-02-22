Vue.component('all-offers', {
    template: '#all_offers_list_tpl',
    mixins: [offers_list_mixin, create_flow_mixin, toggle_target_geo_visibility],
    data() {
        return {
            LANG_OFFERS: LANG_OFFERS,
            offers: [],
            CDN_HOST: CDN_HOST,
            pagination: {
                page: 1,
                per_page: 20,
                loading: false,
                finished: false,
            },
            preloader: null,
        }
    },

    watch: {
        'pagination.loading'() {
            if (this.pagination.loading) {
                filters_bus.$emit('apply-filter-start');
                activeAjax = true;

                if (!this.offers.length) {
                    return this.preloader = ContentPreloader.show('#all_offers_list_wrap');
                }
            }

            filters_bus.$emit('apply-filter-stop');
            activeAjax = false;
            ContentPreloader.hide(this.preloader);
        }
    },

    methods: {

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
                    this.offers = response.data.response.data;
                } else {
                    response.data.response.data.forEach(offer => {
                        this.offers.push(offer);
                    });
                }
            });
        },
    }
});
