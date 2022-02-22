Vue.component('user-creator', {
    template: '#user-creator-tpl',
    props: {
        user_groups: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_USERS: LANG_USERS,
            user_info: {},
            user_creator_modal: null,

            selected_group: {},
            user_groups_loading: false,
        }
    },

    watch: {
        'user_groups': {
            immediate: true,
            handler() {
                this.user_groups_loading = !this.user_groups.length;

                if (!Object.size(this.selected_group)) {
                    this.selected_group = _.find(this.user_groups, {is_default: 1}) || {};
                }
            }
        }
    },

    mounted() {
        this.user_creator_modal = $('#user_creator_modal');

        bus.$on('user-create', (user_role) => {
            this.user_info = {};
            this.$set(this.user_info, 'role', user_role);

            if (user_role === 'publisher') {
                this.selected_group = _.find(this.user_groups, {is_default: 1}) || {};
            }

            this.user_creator_modal.modal();
        });
    },

    methods: {

        createUser() {
            let l = Ladda.create(document.getElementById('create_user_submit')),
                params = _.assign({}, this.user_info),
                request_path;

            l.start();

            switch (params.role) {
                case 'publisher':
                    params.group_id = this.selected_group.id;
                    request_path = '/user.createPublisher';
                    break;

                case 'administrator':
                    request_path = '/user.createAdministrator';
                    break;

                case 'support':
                    request_path = '/support.create';
                    break;

                case 'manager':
                    request_path = '/manager.create';
                    break;
            }

            api.post(request_path, params).then(response => {
                bus.$emit('user-created', response.data);

                this.user_creator_modal.modal('hide');
                l.stop();
            }, () => {
                l.stop();
            });
        }
    }
});