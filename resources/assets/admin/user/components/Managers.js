Vue.component('managers', {
	template: '#managers-component-template',
    mixins: [regenerate_password],
    data: function () {
        return {
            managers: [],
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_USERS: LANG_USERS,
            managers_loading: false,
            pagination: {
                page: 1,
                per_page: 40,
                finished: false,
                active_ajax: false,
            },
        }
    },

    created() {
        bus.$on('manager-was-blocked', user_info => {
            this.onManagerWasBlocked(user_info);

            this.$nextTick(() => {
                runTooltip();
            })
        });

        bus.$on('manager-was-unlocked', user_info => {
            this.onManagerWasUnlocked(user_info);
        });

        bus.$on('user-created', (user_info) => {
            if (user_info.response.role === 'manager') {
                this.onManagerCreated(user_info.response);
            }
        });
    },

    watch: {
        'managers_loading'() {
            if (this.managers_loading) {
                if (this.managers.length > 0) {
                    ContentPreloader.show('.scroll-preloader-container');
                } else {
                    ContentPreloader.show('#managers_list_table');
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

		createManager() {
			bus.$emit('user-create', 'manager');
		},

        blockManager(manager_info) {
		    bus.$emit('user-block', manager_info);
        },

        unlockManager(advertiser_info, event) {
            bus.$emit('user-unlock', advertiser_info, event);
        },

        removeTooltipDiv() {
		    $('.tooltip').tooltip('hide');
        },

        onManagerCreated(user_info) {
            user_info.profile = user_info.manager;
            delete user_info.manager;

            this.managers.unshift(user_info);
        },

        onManagerWasBlocked(user_info) {
            let index = _.findIndex(this.managers, {id: user_info.id});
            _.assign(this.managers[index], user_info);
        },

        onManagerWasUnlocked: function (user_info) {
            let index = _.findIndex(this.managers, {id: user_info.id});
            _.assign(this.managers[index], user_info);
        },

        initLoading() {
            if (this.pagination.finished || this.pagination.active_ajax) {
                return false;
            }

            this.pagination.page++;
            this.getManagers();
        },

        getManagers() {
            let params = {
                page: this.pagination.page,
                per_page: this.pagination.per_page,
                with: ['profile'],
            };

            this.managers_loading = true;
            this.pagination.active_ajax = true;

            api.get('/manager.getList', {params: params}).then(response => {
                this.pagination.finished = response.data.response.all_loaded;

                this.managers = this.managers.concat(response.data.response.data);

                this.managers_loading = false;
                this.pagination.active_ajax = false;
            }, () => {
                this.managers_loading = false;
                this.pagination.active_ajax = false;
            });
        },
	}
});