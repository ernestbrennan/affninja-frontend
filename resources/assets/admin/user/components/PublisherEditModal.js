Vue.component('publisher-edit-modal', {
    template: '#publisher-edit-modal-tpl',
    props: {
        user_groups: {
            type: Array,
            default: [],
            required: true,
        },
    },
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_USERS: LANG_USERS,
            LANG_USER_GROUPS: LANG_USER_GROUPS,
            LANG_NAVBAR: LANG_NAVBAR,

            publisher_info: {
                profile: {},
            },

            selected_user_group: {},

            supports: [],
            selected_support: {},
            empty_support_item: {
                id: null,
                email: LANG_MESSAGES.not_selected
            },
            supports_loading: false,

            show_blocking_comment: false,
            modal: null,
            user_groups_loading: false,
        };
    },

    created() {

        bus.$on('open-publisher-edit-modal', (publisher_info) => {
            this.openEditModal(publisher_info);
        });

        bus.$on('publisher-was-blocked', () => {
            this.show_blocking_comment = false;
            this.publisher_info.status = 'locked';
        });

        bus.$on('user-created', (user_info) => {
            if (user_info.response.role === 'support') {
                this.refreshSupports();
            }
        });
    },

    mounted() {
        this.modal = $('#publisher-edit-modal');
    },

    watch: {
        'user_groups': {
            immediate: true,
            handler() {
                this.user_groups_loading = !this.user_groups.length;

                if (!Object.size(this.selected_user_group)) {
                    this.selected_user_group = _.find(this.user_groups, {id: this.publisher_info.group_id});
                }
            }
        },

        'selected_user_group'(value) {
            if (!Object.size(value)) {
                return;
            }

            this.publisher_info.group_id = value.id;
        },

        'selected_support'(value) {
            this.publisher_info.profile.support_id = value.id;
        },
    },

    methods: {
        refreshSupports() {
            this.selected_support = {};
            this.supports.splice(0);
        },

        blockPublisher() {
            bus.$emit('user-block-without-modal', this.publisher_info);
        },

        openEditModal(publisher_info) {
            this.publisher_info = _.cloneDeep(publisher_info);

            if (!this.supports.length) {
                this.getSupports().then(() => {
                    this.setSelectedSupport();
                });
            } else {
                this.setSelectedSupport();
            }

            this.selected_user_group = _.find(this.user_groups, {id: this.publisher_info.group_id});

            this.modal.modal();
        },

        editProfile() {
            let ladda = LaddaPreloader.start('#publisher_edit_profile_submit'),
                params = _.pick(this.publisher_info.profile, [
                    'full_name', 'skype', 'telegram', 'comment', 'phone', 'support_id'
                ]);

            params.user_hash = this.publisher_info.hash;
            params.group_id = this.publisher_info.group_id;

            api.post('/publisher.changeProfile', params).then(response => {

                bus.$emit('publisher-profile-updated', this.publisher_info);

                LaddaPreloader.stop(ladda);
                this.modal.modal('hide');
                showMessage('success', response.data.message);

            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        getSupports() {
            return new Promise((resolve, reject) => {
                let params = {
                    page: 1,
                    per_page: 50,
                };

                this.supports_loading = true;

                api.get('/support.getList', {params: params}).then(response => {

                    this.supports.push(this.empty_support_item);
                    this.supports = this.supports.concat(response.data.response.data);

                    this.supports_loading = false;

                    resolve();
                }, () => {
                    this.supports_loading = false;
                    reject();
                });
            });
        },

        setSelectedSupport() {
            let selected_support = _.find(this.supports, {id: this.publisher_info.profile.support_id});
            if (selected_support === undefined) {
                this.selected_support = this.empty_support_item;
            } else {
                this.selected_support = selected_support;
            }
        }
    },
});