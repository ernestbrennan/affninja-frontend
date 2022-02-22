Vue.component('supports', {
	template: '#supports-component-template',
    mixins: [regenerate_password],
    data: function () {
        return {
            supports: [],
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_USERS: LANG_USERS,
            supports_loading: false,
            pagination: {
                page: 1,
                per_page: 40,
                finished: false,
                active_ajax: false,
            },
        }
    },

    created() {
        bus.$on('support-was-blocked', user_info => {
            this.onSupportWasBlocked(user_info);

            this.$nextTick(() => {
                runTooltip();
            })
        });

        bus.$on('support-was-unlocked', user_info => {
            this.onSupportWasUnlocked(user_info);
        });

        bus.$on('user-created', (user_info) => {
            if (user_info.response.role === 'support') {
                this.onSupportCreated(user_info.response);
            }
        });
    },

    watch: {
        'supports_loading'() {
            if (this.supports_loading) {
                if (this.supports.length > 0) {
                    ContentPreloader.show('.scroll-preloader-container');
                } else {
                    ContentPreloader.show('#supports_list_table');
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

		createSupport() {
			bus.$emit('user-create', 'support');
		},

        blockSupport(support_info) {
		    bus.$emit('user-block', support_info);
        },

        unlockSupport(advertiser_info, event) {
            bus.$emit('user-unlock', advertiser_info, event);
        },

        removeTooltipDiv() {
		    $('.tooltip').tooltip('hide');
        },

        onSupportCreated(user_info) {
            user_info.profile = user_info.support;
            delete user_info.support;

            this.supports.unshift(user_info);
        },

        onSupportWasBlocked(user_info) {
            let index = _.findIndex(this.supports, {id: user_info.id});
            _.assign(this.supports[index], user_info);
        },

        onSupportWasUnlocked: function (user_info) {
            let index = _.findIndex(this.supports, {id: user_info.id});
            _.assign(this.supports[index], user_info);
        },

        initLoading() {
            if (this.pagination.finished || this.pagination.active_ajax) {
                return false;
            }

            this.pagination.page++;
            this.getSupports();
        },

        getSupports() {
            let params = {
                page: this.pagination.page,
                per_page: this.pagination.per_page,
                with: ['profile'],
            };

            this.supports_loading = true;
            this.pagination.active_ajax = true;

            api.get('/support.getList', {params: params}).then(response => {
                this.pagination.finished = response.data.response.all_loaded;

                this.supports = this.supports.concat(response.data.response.data);

                this.supports_loading = false;
                this.pagination.active_ajax = false;
            }, () => {
                this.supports_loading = false;
                this.pagination.active_ajax = false;
            });
        },
	}
});