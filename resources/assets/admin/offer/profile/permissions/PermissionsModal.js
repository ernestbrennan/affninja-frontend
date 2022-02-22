Vue.component('permissions-modal', {
    template: '#permissions-modal-tpl',
    props: {
        api_sync_groups: {
            type: String,
            required: true,
        },
        api_sync_publishers: {
            type: String,
            required: true,
        },
        id_title: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: '',
            required: true,
        },
        id: {
            type: Number,
            required: true,
        },
        selected_publishers: {
            type: Array,
            required: true,
            default() {
                return [];
            }
        },
        selected_groups: {
            type: Array,
            required: true,
            default() {
                return [];
            },
        },
        user_groups: {
            type: Array,
            required: true,
            default: [],
        },
        only_publishers: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            SEARCH_MSG: LANG_MESSAGES.search,

            selected_item: {},
            groups: [],
            publishers: [],
            loading: false,
            tab: 'groups',
            modal: null,
        }
    },

    mounted() {
        this.modal = $(this.$refs['permissions-modal']);
    },

    watch: {
        'user_groups'() {
            this.setGroups();
        },

        'selected_item'() {
            if (Object.size(this.selected_item)) {
                if (this.tab === 'groups') {
                    return this.addGroup(this.selected_item);
                }

                this.addPublisher(this.selected_item);
            }
        },
    },

    methods: {
        openModal() {
            this.tab = this.only_publishers ? 'publishers' : 'groups';
            this.setGroups();

            this.modal.modal();
        },

        onTabUpdated(tab) {
            this.tab = tab;
        },

        onSearch(search) {
            this.publishers.splice(0);
            this.getPublishers([], search);
        },

        setGroups() {
            let groups = _.clone(this.user_groups).sort((a, b) => {
                return a.title > b.title;
            });

            Vue.set(this, 'groups', this.sortGroups(groups));
        },

        addGroup(group) {
            let index = _.find(this.groups, {id: group.id}),
                params = {
                    user_groups: this.normalizeGroupsParams(this.selected_groups),
                };

            params.user_groups.push({
                user_group_id: group.id,
            });

            Vue.set(this, 'selected_item', {});
            this.groups.splice(index, 1);

            this.syncGroups(params).then((response) => {
                this.selected_groups.unshift(_.find(response, {id: group.id}));
                Vue.set(this, 'groups', this.sortGroups(this.groups));
            });
        },

        deleteGroup(group) {
            Swal.show(LANG_USER_GROUPS.on_delete_group_access_rights_msg).then(() => {
                let ladda = LaddaPreloader.start('#group-' + this._uid + group.id),
                    params = {},
                    index = _.findIndex(this.selected_groups, {id: group.id});

                if (this.selected_groups.length > 1) {
                    let user_groups = _.clone(this.selected_groups);
                    user_groups.splice(index, 1);
                    params.user_groups = this.normalizeGroupsParams(user_groups);
                }

                this.syncGroups(params).then((response) => {
                    index = _.findIndex(this.selected_groups, {id: group.id});
                    this.selected_groups.splice(index, 1);
                    this.groups.push(group);
                    this.groups.sort((a, b) => {
                        return a.title > b.title;
                    });

                    LaddaPreloader.stop(ladda);
                }, () => {
                    LaddaPreloader.stop(ladda);
                });
            }, () => {
            });
        },

        syncGroups(params) {
            params[this.id_title] = this.id;

            return new Promise((resolve, reject) => {
                api
                    .post(this.api_sync_groups, params)
                    .then(response => {
                        resolve(response.data.response)
                    })
                    .catch(() => {
                        reject();
                    });
            });
        },

        normalizeGroupsParams(groups) {
            return groups.map((group) => {
                return {
                    user_group_id: group.id,
                }
            });
        },

        sortGroups(groups) {
            let self = this;

            return groups.filter(function (group) {
                let index = _.findIndex(self.selected_groups, {id: group.id});
                return index < 0;
            });
        },

        getPublishers(hashes = [], search = '') {
            if (!hashes.length && search.length < 2) {
                return;
            }

            this.loading = true;

            User.getPublishers([], 'email', search, hashes).then(publishers => {
                Vue.set(this, 'publishers', this.sortPublishers(publishers.data));
                this.loading = false;
            })
        },

        addPublisher(publisher) {
            let selected_publishers_index = _.findIndex(this.selected_publishers, {hash: publisher.hash});

            if (selected_publishers_index !== -1) {
                return;
            }

            let params = {
                publishers: this.normalizePublishersParams(this.selected_publishers),
            };

            params.publishers.push({
                publisher_id: publisher.id,
            });

            let publishers_index = _.find(this.publishers, {hash: publisher.hash});

            Vue.set(this, 'selected_item', {});
            this.publishers.splice(publishers_index, 1);

            this.syncPublishers(params).then((response) => {
                this.selected_publishers.unshift(_.find(response, {hash: publisher.hash}));
            });
        },

        deletePublisher(publisher) {
            Swal
                .show(LANG_PUBLISHERS.on_delete_access_rights_msg + ' ' + publisher.email + '?')
                .then(() => {
                    let ladda = LaddaPreloader.start('#publisher-' + this._uid + publisher.hash),
                        params = {},
                        index = _.findIndex(this.selected_publishers, {hash: publisher.hash});

                    if (this.selected_publishers.length > 1) {
                        let selected_publishers = _.clone(this.selected_publishers);
                        selected_publishers.splice(index, 1);
                        params.publishers = this.normalizePublishersParams(selected_publishers);
                    }

                    this.syncPublishers(params).then((response) => {
                        index = _.findIndex(this.selected_publishers, {hash: publisher.hash});
                        this.selected_publishers.splice(index, 1);

                        LaddaPreloader.stop(ladda);
                    }, () => {
                        LaddaPreloader.stop(ladda);
                    });
                }, () => {
                });
        },

        normalizePublishersParams(publishers) {
            return publishers.map((publisher) => {
                return {
                    publisher_id: publisher.id,
                }
            });
        },

        sortPublishers(publishers) {
            let self = this;

            return publishers.filter(function (publisher) {
                let index = _.findIndex(self.selected_publishers, {id: publisher.id});
                return index < 0;
            });
        },

        syncPublishers(params) {
            params[this.id_title] = this.id;

            return new Promise((resolve, reject) => {
                api
                    .post(this.api_sync_publishers, params)
                    .then(response => {
                        resolve(response.data.response)
                    })
                    .catch(() => {
                        reject();
                    });
            });
        },
    },
});