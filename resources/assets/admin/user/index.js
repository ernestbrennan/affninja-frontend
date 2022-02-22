let bus = new Vue();

const Tab = {
    init() {
        $('#' + getSecondLocationPath() + '_tab_wrap').addClass('active');

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            vm.changeTab();
        });
    },
};

let vm = new Vue({
    el: '#users_list_page',
    data: {
        user_groups: [],
    },

    created() {
        filters_bus.$on('filters-applies', () => {
            this.$nextTick(() => {
                this.$refs.publishers.clearPublishers();
                this.$refs.publishers.refreshPagination();

                this.getUsersList(getSecondLocationPath());
            });
        });

        filters_bus.$on('filters-ready', () => {
            this.$nextTick(() => {
                this.getUsersList(getSecondLocationPath());
            });
        });

        this.getUserGroups();
    },

    mounted() {
        Tab.init();

        let self = this;
        let debounced_user_loading = _.debounce(function () {
            self.initUsersLoading();
        }, 50);

        scrollHandler(debounced_user_loading);
    },

    methods: {

        onListUsersUpdated() {
            ContentPreloader.hide();
        },

        changeTab() {
            let role = getSecondLocationPath();

            // If needle tab already have data
            if (this.$refs[role][role].length) {
                return;
            }

            this.getUsersList(role);
        },

        getUsersList(role) {

            switch (role) {
                case 'publishers':
                    if (this.$refs.publishers.publishers_loading) {
                        return;
                    }
                    return this.$refs.publishers.getPublishers();

                case 'supports':
                    if (this.$refs.supports.supports_loading) {
                        return;
                    }
                    return this.$refs.supports.getSupports();

                case 'advertisers':
                    if (this.$refs.advertisers.advertisers_loading) {
                        return;
                    }
                    return this.$refs.advertisers.getAdvertisers();

                case 'managers':
                    if (this.$refs.managers.managers_loading) {
                        return;
                    }
                    return this.$refs.managers.getManagers();

                case 'administrators':
                    if (this.$refs.administrators.administrators_loading) {
                        return;
                    }
                    return this.$refs.administrators.getAdmins();

                default:
                    throw "Unknown user role";
            }
        },

        initUsersLoading() {
            let role = getSecondLocationPath();

            this.$refs[role].initLoading();
        },

        getUserGroups() {
            api.get('/user_groups.getList').then(response => {
                this.user_groups = response.data.response;
            });
        },
    }
});
