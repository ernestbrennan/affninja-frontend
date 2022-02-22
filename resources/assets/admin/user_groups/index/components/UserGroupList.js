Vue.component('user-group-list', {
    template: '#user-group-list-tpl',
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_USER_GROUPS: LANG_USER_GROUPS,

            user_groups: [],
        };
    },

    created() {
        bus.$on('create-group', (group_info) => {
            this.user_groups.push(group_info);
        });

        bus.$on('edit-group', (group_info) => {
            let index = _.findIndex(this.user_groups, {id: group_info.id});
            this.user_groups.splice(index, 1, group_info);
        });
    },

    mounted() {
        this.modal = $('#settings-modal');

        this.getUserGroups();
    },

    methods: {
        getUserGroups() {
            ContentPreloader.show('#user_group_list_wrap');

            UserGroup.getList(['users']).then(user_groups => {
                this.user_groups = user_groups;
                ContentPreloader.hide();
            });
        },

        openEditGroupModal(group_info) {
            bus.$emit('open-edit-modal', _.cloneDeep(group_info));
        },

        // deleteGroup(group_id) {
        //     Swal.show(LANG_USER_GROUPS.on_delete_msg).then(() => {
        //         api.delete('/user_groups.delete', {params: {id: group_id}}).then(response => {
        //             let index = _.findIndex(this.user_groups, {id: group_id});
        //
        //             this.user_groups.splice(index, 1);
        //         });
        //     }, () => {
        //     });
        // },
    },
});