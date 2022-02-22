Vue.component('advertiser-edit-modal', {
    template: '#advertiser-edit-modal-tpl',
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_USERS: LANG_USERS,

            advertiser_info: {
                profile: {},
            },

            permissions: {
                entities: [],
                entity_type: 'advertiser',
                selected_entities_ids: [],
                changed_entities_ids: [],
            },

            show_blocking_comment: false,
            modal: null,
        };
    },

    created() {
        bus.$on('open-advertiser-edit-modal', (advertiser_info) => {
            this.openEditModal(advertiser_info);
        });

        bus.$on('advertiser-was-unlocked', (user_info) => {
            this.advertiser_info.status = 'active';
        })
    },

    mounted() {
        this.modal = $('#advertiser-edit-modal');
    },

    methods: {
        normilizeEntities(entities) {
            return entities.map((item) => {
                return item + '';
            });
        },

        openEditModal(advertiser_info) {
            this.advertiser_info = _.cloneDeep(advertiser_info);
            this.modal.modal();
        },

        editProfile() {
            let ladda = LaddaPreloader.start('#advertiser_edit_profile_submit'),
                params = _.pick(this.advertiser_info.profile,
                    ['full_name', 'skype', 'telegram', 'phone', 'whatsapp']);

            params.user_hash = this.advertiser_info.hash;

            api.post('/advertiser.changeProfile', params).then(response => {
                bus.$emit('advertiser-profile-updated', this.advertiser_info);

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
                this.modal.modal('hide');
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },
    },
});