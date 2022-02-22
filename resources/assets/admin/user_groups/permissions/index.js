let vm = new Vue({
    el: '#permissions',
    data: {
        LANG_MESSAGES: LANG_MESSAGES,

        group: {},
        selected_item: {},
        users: [],
        selected_users: [],
        loading: false,
    },

    watch: {
        'selected_item'() {
            if (Object.size(this.selected_item)) {
                this.addUser(this.selected_item);
            }
        },
    },

    methods: {
        onSearch(search) {
            this.users.splice(0);
            this.getUsers([], search);
        },

        getUsers(hashes = [], search = '') {
            if (!hashes.length && search.length < 2) {
                return;
            }

            this.loading = true;

            User.getPublishers([], 'email', search, hashes).then(users => {
                Vue.set(this, 'users', this.sortUsers(users.data));
                this.loading = false;
            })
        },

        addUser(user) {
            let params = {
                users: this.normalizeUsersParams(this.selected_users),
            };

            params.users.push(user.id);

            this.syncUsers(params).then((response) => {
                this.selected_users.unshift(_.find(response.users, {hash: user.hash}));
                Vue.set(this, 'selected_item', {});
                Vue.set(this, 'users', this.sortUsers(this.users));
            });
        },

        deleteUser(user) {
            Swal.show(LANG_USER_GROUPS.on_delete_user_msg + ' ' + user.email + '?').then(() => {
                let params = {},
                    index = _.findIndex(this.selected_users, {hash: user.hash});

                if (this.selected_users.length > 1) {
                    let selected_users = _.clone(this.selected_users);
                    selected_users.splice(index, 1);
                    params.users = this.normalizeUsersParams(selected_users);
                }

                this.syncUsers(params).then((response) => {
                    this.selected_users.splice(index, 1);
                    this.users.push(user);
                    this.users.sort((a, b) => {
                        return a.title > b.title;
                    });
                });
            }, () => {});
        },

        normalizeUsersParams(users) {
            return users.map((user) => {
                return user.id;
            });
        },

        sortUsers(users) {
            let self = this;

            return users.filter(function (user) {
                let index = _.findIndex(self.selected_users, {id: user.id});
                return index < 0;
            });
        },

        syncUsers(params) {
            params.id = this.group.id;
            params.description = this.group.description;
            params.title = this.group.title;
            params.color = this.group.color;

            return new Promise((resolve, reject) => {
                api.post('/user_groups.edit', params).then(response => {
                    if (response.data.status_code === 404) {
                        reject(response.data)
                    } else {
                        resolve(response.data.response)
                    }
                });
            });
        },
    }
});