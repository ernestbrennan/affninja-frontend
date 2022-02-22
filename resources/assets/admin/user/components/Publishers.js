Vue.component('publishers', {
    template: '#publishers-component-tpl',
    mixins: [filters_manager, regenerate_password],
    props: {
        user_groups: {
            type: Array,
            required: true,
        }
    },
    data: () => {
        return {
            CURRENCY_RUB_ID: CURRENCY_RUB_ID,
            CURRENCY_USD_ID: CURRENCY_USD_ID,
            CURRENCY_EUR_ID: CURRENCY_EUR_ID,
            
            publishers: [],
            summary_info: {},
            summary_info_loading: false,
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_USERS: LANG_USERS,
            LANG_USER_GROUPS: LANG_USER_GROUPS,
            selected_users: [],
            search_field: null,
            publishers_loading: false,
            filters: [
                'status', 'constraint', 'group_ids', 'search_field', 'search', 'currency_id',
            ],
            additional_url_params: {
                role: 'publisher',
                sort_by: UrlParameter.getSortBy() || 'created_at',
                sorting: UrlParameter.getSortingOrNull() || 'desc',
            },
            search: null,
            search_fields: [
                {title: LANG_MESSAGES.email, value: 'email'},
                {title: LANG_MESSAGES.id, value: 'id'},
                {title: LANG_MESSAGES.hash, value: 'hash'},
                {title: LANG_MESSAGES.phone, value: 'phone'},
                {title: LANG_MESSAGES.telegram, value: 'telegram'},
                {title: LANG_MESSAGES.balance, value: 'balance'},
                {title: LANG_MESSAGES.hold, value: 'hold'},
            ],
            pagination: {
                page: 1,
                per_page: 40,
                finished: false,
                active_ajax: false,
            },
        }
    },

    created() {
        filters_bus.$on('search_field-init', search_field => {
            this.search_field = search_field;
        });

        filters_bus.$on('search_field-updated', search_field => {
            this.search_field = search_field;
        });

        bus.$on('publisher-was-blocked', user_info => {
            this.onPublisherWasBlocked(user_info);

            this.$nextTick(() => {
                runTooltip();
            })
        });

        bus.$on('publisher-was-unlocked', user_info => {
            this.onPublisherWasUnlocked(user_info);
        });

        bus.$on('publisher-profile-updated', publisher_info => {
            this.onPublisherProfileUpdated(publisher_info);
        });

        bus.$on('user-created', (user_info) => {
            if (user_info.response.role === 'publisher') {
                this.onPublisherCreated(user_info.response);
            }
        });
    },

    mounted() {
        this.create_modal = $('#publisher_create_modal');

        filters_bus.$on('apply-filter-stop', () => {
            this.$nextTick(() => {
                this.initDatatable();
            });
        });
    },

    computed: {
        loading: function () {
            return this.publishers_loading || this.summary_info_loading;
        },
    },

    watch: {
        'publishers_loading'() {
            if (this.publishers_loading) {
                filters_bus.$emit('apply-filter-start');

                if (this.publishers.length > 0) {
                    ContentPreloader.show('#scroll-preloader-container');
                } else {
                    ContentPreloader.show('#publishers_list_table');
                }
            } else {
                filters_bus.$emit('apply-filter-stop');
                ContentPreloader.hide();
            }

            this.$nextTick(() => {
                runTooltip();
            })
        },
    },

    methods: {
        unlockPublisher(publisher_info, event = null) {
            bus.$emit('user-unlock', publisher_info, event);
        },

        initLoading() {
            if (this.pagination.finished || this.pagination.active_ajax) {
                return false;
            }

            this.pagination.page++;
            this.getPublishers();
        },

        initDatatable() {
            this.$refs.datatable.init(
                'publishers_sort_table',
                this.additional_url_params.sort_by,
                this.additional_url_params.sorting,
            )
        },

        onDatatableChangeSort(params) {
            this.additional_url_params.sort_by = params.sort_by;
            this.additional_url_params.sorting = params.sorting;

            this.clearPublishers();
            this.refreshPagination();
            this.getPublishers();
            filters_bus.$emit('filters-applies');
        },

        getPublishers() {
            this.summary_info = {};
            this.publishers_loading = true;
            this.pagination.active_ajax = true;

            let params = this.getFiltersData(this.filters);

            this.getPublishersList(_.clone(params));
            this.getPublishersSummary(params);
        },

        getPublishersList(params) {
            params.page = this.pagination.page;
            params.per_page = this.pagination.per_page;

            params.sort_by = this.additional_url_params.sort_by;
            params.sorting = this.additional_url_params.sorting;

            params.with = ['profile', 'group'];

            api.get('/publisher.getList', {params: params}).then(response => {
                this.pagination.finished = response.data.response.all_loaded;

                this.publishers = this.publishers.concat(response.data.response.data);

                this.publishers_loading = false;
                this.pagination.active_ajax = false;
            }, () => {
                this.publishers_loading = false;
                this.pagination.active_ajax = false;
            });
        },

        getPublishersSummary(params) {
            this.summary_info_loading = true;

            api.get('/publisher.getSummary', {params: params}).then(response => {
                this.summary_info = response.data.response;
                this.summary_info_loading = false;
            }, () => {
                this.summary_info_loading = false;
            });
        },

        refreshPagination() {
            this.pagination.page = 1;
            this.pagination.finished = false;
        },

        clearPublishers() {
            this.publishers.splice(0);
        },

        onPublisherWasBlocked(user_info) {
            let index = _.findIndex(this.publishers, {id: user_info.id});
            _.assign(this.publishers[index], user_info);
        },

        onPublisherWasUnlocked(user_info) {
            let index = _.findIndex(this.publishers, {id: user_info.id});
            _.assign(this.publishers[index], user_info);

            removeTooltipDiv();
        },

        onPublisherProfileUpdated(publisher_info) {
            let index = _.findIndex(this.publishers, {id: publisher_info.id});
            this.publishers.splice(index, 1, publisher_info);
            this.publishers[index].group = _.find(this.user_groups, {id: publisher_info.group_id});
        },

        openPublisherCreateModal() {
            bus.$emit('user-create', 'publisher');
        },

        onPublisherCreated(user_info) {
            user_info.profile = user_info.publisher;
            delete user_info.publisher;

            user_info.group = _.find(this.user_groups, {id: user_info.group_id});
            this.publishers.unshift(user_info);
        },

        openPublisherEditModal(publisher_info) {
            bus.$emit('open-publisher-edit-modal', publisher_info);
        },

        openPublisherPermissionsModal(publisher_info) {
            bus.$emit('open-publisher-permissions-modal', publisher_info);
        },

        addUsersInGroup(group_info) {
            group_info.users = _.clone(this.selected_users);

            this.publishers.forEach((item) => {
                if (item.group_id === group_info.id && this.selected_users.indexOf(item.group_id) === -1) {
                    group_info.users.push(item.id);
                }
            });

            api.post('/user_groups.edit', group_info).then(response => {
                this.setGroupByPublisher(group_info);
                this.selected_users = [];
                showMessage('success', response.data.message);
            });
        },

        setGroupByPublisher(group_info) {
            this.publishers.forEach((item) => {
                if (this.selected_users.indexOf(item.id) !== -1) {
                    item.group_id = group_info.id;
                    item.group = group_info;
                }
            });
        },

        toggleUserSelection(user) {
            let index = _.indexOf(this.selected_users, user.id);
            if (index === -1) {
                this.selected_users.push(user.id);
            } else {
                this.selected_users.splice(index, 1);
            }
        },
    }
});