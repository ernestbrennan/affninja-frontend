Vue.component('publisher-edit-modal', {
    template: '#publisher-edit-modal-tpl',
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_USERS: LANG_USERS,

            publisher_info: {
                profile: {},
            },

            permissions: {
                entities: [],
                entity_type: 'publisher',
                selected_entities_ids: [],
                changed_entities_ids: [],
            },

            show_blocking_comment: false,
            modal: null,
        };
    },

    created() {
        this.getPermissions();

        bus.$on('open-publisher-edit-modal', (publisher_info) => {
            this.openEditModal(publisher_info);
        });

        bus.$on('publisher-was-unlocked', (user_info) => {
            this.publisher_info.status = 'active';
        })
    },

    mounted() {
        this.modal = $('#publisher-edit-modal');
    },

    computed: {
        change_permissions: {
            get() {
                return !_.isEqual(this.permissions.changed_entities_ids, this.permissions.selected_entities_ids);
            },
            set(value) {
                return value;
            },
        },
    },

    methods: {
        onMultiselectListEdited(e) {
            this.permissions.changed_entities_ids = e.entities.map((item) => {
                return parseInt(item);
            });
        },

        normilizeEntities(entities) {
            return entities.map((item) => {
                return item + '';
            });
        },

        cloneObjectsForCompare() {
            this.permissions.changed_entities_ids = _.clone(this.permissions.selected_entities_ids);
        },

        openEditModal(publisher_info) {
            this.getUserPermissions(publisher_info.hash);

            this.publisher_info = _.cloneDeep(publisher_info);
            this.modal.modal();
        },

        editProfile() {
            let ladda = LaddaPreloader.start('#publisher_edit_profile_submit'),
                params = _.pick(this.publisher_info.profile,
                    ['full_name', 'skype', 'telegram', 'phone']);

            params.user_hash = this.publisher_info.hash;

            api.post('/publisher.changeProfile', params).then(response => {
                bus.$emit('publisher-profile-updated', this.publisher_info);

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
                this.modal.modal('hide');
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        onPermissionsEdited(permissions) {
            let ladda = LaddaPreloader.start('#change_publisher_permissions_submit'),
                params = {
                    user_hash: this.publisher_info.hash,
                    permissions: this.normilizeEntities(this.permissions.changed_entities_ids),
                };

            api.post('/user_user_permissions.sync', params).then(response => {
                showMessage('success', response.data.message);
                this.permissions.selected_entities_ids = this.permissions.changed_entities_ids;
                this.cloneObjectsForCompare();
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        getPermissions() {
            api.get('/user_permissions.getList').then(response => {
                this.permissions.entities = _.forEach(response.data.response, item => {
                    item.text = item.description;
                });
            });
        },

        getUserPermissions(user_hash) {
            ContentPreloader.show('#publisher_permissions_wrap');

            let params = {user_hash: user_hash};

            api.get('/user_user_permissions.getForUser', {params: params}).then(response => {
                this.permissions.selected_entities_ids = getIds(response.data.response);
                this.cloneObjectsForCompare();
                ContentPreloader.hide();
            }, () => {
                ContentPreloader.hide();
            });
        },
    },
});