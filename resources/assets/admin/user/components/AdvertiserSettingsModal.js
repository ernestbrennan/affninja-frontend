Vue.component('advertiser-settings-modal', {
    template: '#advertiser-settings-modal-tpl',
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_USERS: LANG_USERS,
            advertiser_info: {},
            accounts: [],
            show_blocking_comment: false,
            modal: null,
            managers: [],
            selected_manager: {},
            empty_manager_item: {
                id: null,
                email: LANG_MESSAGES.not_selected
            },
            managers_loading: false,
            submin_btn_loading: false,
            action: null
        };
    },

    created() {
        bus.$on('open-advertiser-settings-modal', advertiser_info => {
            this.openModal(advertiser_info);
        });

        bus.$on('advertiser-was-unlocked', user_info => {
            this.advertiser_info.status = 'active';
        });

        bus.$on('advertiser-was-blocked', () => {
            this.show_blocking_comment = false;
            this.advertiser_info.status = 'locked';
        });
    },

    mounted() {
        this.modal = $('#advertiser-settings-modal');
    },

    watch: {
        'selected_manager'(value) {
            this.advertiser_info.manager_id = value.id;
        },
    },

    methods: {
        blockAdvertiser() {
            bus.$emit('user-block-without-modal', this.advertiser_info);
        },

        openModal(advertiser_info) {

            this.resetFormFields();

            if (advertiser_info === null) {
                this.action = 'create';
            } else {
                this.setFormFields(advertiser_info);
                this.action = 'edit';
            }

            if (!this.managers.length) {
                this.getManagers().then(() => {
                    this.setSelectedManager();
                });
            } else {
                this.setSelectedManager();
            }

            this.modal.modal();
        },

        createAdvertiser() {
            this.submin_btn_loading = true;

            let params = this.advertiser_info;
            params.accounts = this.accounts;

            api.post('/user.createAdvertiser', params).then(response => {
                this.submin_btn_loading = false;
                bus.$emit('advertiser-created', response.data.response);

                showMessage('success', response.data.message);
                this.modal.modal('hide');

            }, () => {
                this.submin_btn_loading = false;
            });
        },

        editProfile() {
            this.submin_btn_loading = true;

            api.post('/advertiser.changeProfile', this.advertiser_info).then(response => {

                bus.$emit('advertiser-profile-updated', response.data.response);
                this.submin_btn_loading = false;

                showMessage('success', response.data.message);

                this.modal.modal('hide');
            }, () => {
                this.submin_btn_loading = false;

            });
        },

        getManagers() {
            return new Promise((resolve, reject) => {
                let params = {
                    page: 1,
                    per_page: 50,
                };

                this.managers_loading = true;

                api.get('/manager.getList', {params: params}).then(response => {

                    this.managers.push(this.empty_manager_item);
                    this.managers = this.managers.concat(response.data.response.data);

                    this.managers_loading = false;

                    resolve();
                }, () => {
                    this.managers_loading = false;
                    reject();
                });
            });
        },

        setSelectedManager() {
            let selected_manager = _.find(this.managers, {id: this.advertiser_info.manager_id});
            if (selected_manager === undefined) {
                this.selected_manager = this.empty_manager_item;
            } else {
                this.selected_manager = selected_manager;
            }
        },

        resetFormFields() {
            Vue.set(this.advertiser_info, 'email', '');
            Vue.set(this.advertiser_info, 'password', '');
            Vue.set(this, 'accounts', [3]);
            Vue.set(this.advertiser_info, 'info', '');
            Vue.set(this.advertiser_info, 'full_name', '');
            Vue.set(this.advertiser_info, 'phone', '');
            Vue.set(this.advertiser_info, 'telegram', '');
            Vue.set(this.advertiser_info, 'whatsapp', '');
            Vue.set(this.advertiser_info, 'skype', '');
            Vue.set(this.advertiser_info, 'manager_id', null);
        },

        setFormFields(advertiser_info) {
            Vue.set(this.advertiser_info, 'email', advertiser_info.email);
            Vue.set(this.advertiser_info, 'user_hash', advertiser_info.hash);
            Vue.set(this.advertiser_info, 'info', advertiser_info.profile.info);
            Vue.set(this.advertiser_info, 'full_name', advertiser_info.profile.full_name);
            Vue.set(this.advertiser_info, 'phone', advertiser_info.profile.phone);
            Vue.set(this.advertiser_info, 'telegram', advertiser_info.profile.telegram);
            Vue.set(this.advertiser_info, 'whatsapp', advertiser_info.profile.whatsapp);
            Vue.set(this.advertiser_info, 'skype', advertiser_info.profile.skype);
            Vue.set(this.advertiser_info, 'manager_id', advertiser_info.profile.manager_id);
        }
    },
});