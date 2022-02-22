let bus = new Vue();

let vm = new Vue({
    el: '#users',
    data: {
        CURRENCY_RUB_ID: CURRENCY_RUB_ID,
        CURRENCY_USD_ID: CURRENCY_USD_ID,
        CURRENCY_EUR_ID: CURRENCY_EUR_ID,

        advertisers: [],
        LANG_MESSAGES: LANG_MESSAGES,
        LANG_USERS: LANG_USERS,
        advertisers_loading: false,
        pagination: {
            page: 1,
            per_page: 40,
            finished: false,
            active_ajax: false,
        },
    },

    created() {
        this.getAdvertisers();

        bus.$on('advertiser-profile-updated', advertiser_info => {
            this.onAdvertiserProfileUpdated(advertiser_info);
        });
    },

    mounted() {
        scrollHandler(() => {
            if (this.pagination.finished || this.pagination.active_ajax) {
                return false;
            }

            this.pagination.page++;
            this.getAdvertisers();
        });
    },
    watch: {
        'advertisers_loading'() {
            if (this.advertisers_loading) {
                this.pagination.active_ajax = true;

                if (this.advertisers.length > 0) {
                    ContentPreloader.show('#scroll_progress_wrap');
                } else {
                    ContentPreloader.show('#advertisers_list_table');
                }
            } else {

                this.pagination.active_ajax = false;
                ContentPreloader.hide();
            }

            this.$nextTick(() => {
                runTooltip();
            });
        },
    },

    methods: {

        getAdvertisers() {
            this.advertisers_loading = true;

            let params = {
                page: this.pagination.page,
                per_page: this.pagination.per_page,
                with: ['profile', 'accounts'],
            };

            api.get('/advertiser.getList', {params: params}).then(response => {
                this.pagination.finished = response.data.response.all_loaded;

                this.advertisers = this.advertisers.concat(response.data.response.data);

                this.advertisers_loading = false;
            }, () => {
                this.advertisers_loading = false;
            });
        },

        onAdvertiserProfileUpdated(advertiser_info) {
            let index = _.findIndex(this.advertisers, {hash: advertiser_info.hash});
            this.advertisers.splice(index, 1, advertiser_info);
        },

        openAdvertiserEditModal(advertiser_info) {
            bus.$emit('open-advertiser-edit-modal', advertiser_info);
        },
    }
});
