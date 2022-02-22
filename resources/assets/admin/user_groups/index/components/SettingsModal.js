Vue.component('settings-modal', {
    template: '#settings-modal-tpl',
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_USER_GROUPS: LANG_USER_GROUPS,

            action: '',
            group_info: {
                id: null,
                title: '',
                color: '000000',
                description: '',
            },
        };
    },

    created() {
        bus.$on('open-edit-modal', (group_info) => {
            this.openEditModal(group_info);
        });
    },

    mounted() {
        this.modal = $('#settings-modal');
    },

    methods: {
        refreshGroupInfo() {
            this.group_info = {
                id: null,
                title: '',
                color: '000000',
                description: '',
            };
        },

        openCreateModal() {
            this.refreshGroupInfo();

            this.action = 'create';
            this.modal.modal();
        },

        openEditModal(group_info) {
            this.action = 'edit';
            this.group_info = group_info;

            this.group_info.users = getIds(group_info.users);
            this.group_info.color = '#' + group_info.color;

            this.modal.modal();
        },

        createGroup() {
            let params = _.cloneDeep(this.group_info),
                ladda = LaddaPreloader.start('#create_user_groups_submit');

            params.color = params.color.replace('#', '');
            delete params.id;

            api.post('/user_groups.create', params).then(response => {
                bus.$emit('create-group', response.data.response);
                this.modal.modal('hide');
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        editGroup() {
            let params = _.clone(this.group_info),
                ladda = LaddaPreloader.start('#edit_user_groups_submit');

            params.color = params.color.replace('#', '');

            api.post('/user_groups.edit', params).then(response => {
                bus.$emit('edit-group', response.data.response);
                this.modal.modal('hide');
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },
    },
});