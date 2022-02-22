Vue.component('publisher-permissions-modal', {
    template: '#publisher-permissions-modal-tpl',
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

            permissions: {
                entities: [],
                entity_type: 'publisher',
                selected_entities_ids: [],
                changed_entities_ids: [],
            },
            modal: null,
        };
    },

    created() {
        bus.$on('open-publisher-permissions-modal', (publisher_info) => {
            this.openPermissionsModal(publisher_info);
        });
    },

    mounted() {
        this.modal = $('#publisher-permissions-modal');
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

        openPermissionsModal(publisher_info) {
            if (!this.permissions.entities.length) {
                this.getPermissions();
            }

            this.getUserPermissions(publisher_info.hash);

            this.publisher_info = _.cloneDeep(publisher_info);

            this.modal.modal();
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
                this.modal.modal('hide');
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