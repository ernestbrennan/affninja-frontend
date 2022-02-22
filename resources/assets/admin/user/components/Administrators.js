Vue.component('administrators', {
    template: '#administrators-tpl',
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            administrators: [],
            administrators_loading: false,
            pagination: {
                per_page: 25,
                page: 1,
                finished: false,
            }
        };
    },

    created() {
        bus.$on('user-created', (user_info) => {
            if (user_info.response.role === 'administrator') {
                this.onAdministratorCreated(user_info.response);
            }
        });
    },

    methods: {
        initLoading() {
            if (this.pagination.finished || this.pagination.active_ajax) {
                return false;
            }

            this.pagination.page++;
            this.getAdmins();
        },

        onAdministratorCreated(user_info) {
            user_info.profile = user_info.administrator;
            delete user_info.administrator;

            this.administrators.unshift(user_info);
        },

        createAdministrator() {
            bus.$emit('user-create', 'administrator');
        },

        getAdmins() {
            this.administrators_loading = true;

            ContentPreloader.show('#administrators-table-wrap');

            User.getAdmins(null, null, ['profile'], this.pagination.page, this.pagination.per_page)
                .then(response => {

                    this.pagination.finished = response.all_loaded;

                    this.administrators = this.administrators.concat(response.data);
                    this.administrators_loading = false;

                    ContentPreloader.hide();
                });
        },
    }
});