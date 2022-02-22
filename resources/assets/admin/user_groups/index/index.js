let bus = new Vue({});

new Vue({
    el: '#user-groups',
    data: {
        LANG_MESSAGES: LANG_MESSAGES,
        LANG_USER_GROUPS: LANG_USER_GROUPS,
    },

    methods: {
        openCreateModal() {
            this.$refs['settings-modal'].openCreateModal();
        },
    }
});