Vue.component('advertisers', {
    template: '#advertisers-component-template',
    mixins: [regenerate_password],
    data: function () {
        return {
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

            summary_info: {},
            summary_info_loading: false,
        }
    },

    created() {
        bus.$on('advertiser-was-blocked', user_info => {
            this.onAdvertiserWasBlocked(user_info);

            this.$nextTick(() => {
                runTooltip();
            })
        });

        bus.$on('advertiser-was-unlocked', user_info => {
            this.onAdvertiserWasUnlocked(user_info);
        });

        bus.$on('advertiser-profile-updated', advertiser_info => {
            this.onAdvertiserProfileUpdated(advertiser_info);
        });

        bus.$on('advertiser-created', advertiser => {
            this.advertisers.unshift(advertiser);
        });
    },

    computed: {
        loading: function () {
            return this.advertisers_loading || this.summary_info_loading;
        },
    },

    watch: {
        'advertisers_loading'() {
            if (this.advertisers_loading) {
                if (this.advertisers.length > 0) {
                    ContentPreloader.show('.scroll-preloader-container');
                } else {
                    ContentPreloader.show('#advertisers_list_table');
                }
            } else {
                ContentPreloader.hide();
            }

            this.$nextTick(() => {
                runTooltip();
            })
        },
    },

    methods: {
        openAdvertiserAccountModal(advertiser_id, advertiser_email) {
            bus.$emit('open-advertiser-account-modal', advertiser_id, advertiser_email);
        },

        unlockAdvertiser(advertiser_info, event) {
            removeTooltipDiv();
            bus.$emit('user-unlock', advertiser_info, event);
        },

        openAdvertiserEditModal(advertiser_info) {
            bus.$emit('open-advertiser-settings-modal', advertiser_info);
        },

        openCreateModal() {
            bus.$emit('open-advertiser-settings-modal', null);
        },

        onAdvertiserWasBlocked(user_info) {
            let index = _.findIndex(this.advertisers, {id: user_info.id});
            _.assign(this.advertisers[index], user_info);
        },

        onAdvertiserWasUnlocked: function (user_info) {
            let index = _.findIndex(this.advertisers, {id: user_info.id});
            _.assign(this.advertisers[index], user_info);
        },

        onAdvertiserProfileUpdated(advertiser_info) {
            let index = _.findIndex(this.advertisers, {id: advertiser_info.id});
            this.advertisers.splice(index, 1, advertiser_info);
        },

        initLoading() {
            if (this.pagination.finished || this.pagination.active_ajax) {
                return false;
            }

            this.pagination.page++;
            this.getAdmins();
        },

        getAdvertisers() {
            this.summary_info = {};

            this.getAdvertisersList();
            this.getAdvertisersSummary();
        },

        getAdvertisersList() {
            let params = {
                page: this.pagination.page,
                per_page: this.pagination.per_page,
                with: ['profile'],
            };

            this.advertisers_loading = true;
            this.pagination.active_ajax = true;

            api.get('/advertiser.getList', {params: params}).then(response => {
                this.pagination.finished = response.data.response.all_loaded;

                this.advertisers = this.advertisers.concat(response.data.response.data);

                this.advertisers_loading = false;
                this.pagination.active_ajax = false;
            }, () => {
                this.advertisers_loading = false;
                this.pagination.active_ajax = false;
            });
        },

        getAdvertisersSummary() {
            this.summary_info_loading = true;

            api.get('/advertiser.getSummary').then(response => {
                this.summary_info = response.data.response;
                this.summary_info_loading = false;
            }, () => {
                this.summary_info_loading = false;
            });
        },
    }
});