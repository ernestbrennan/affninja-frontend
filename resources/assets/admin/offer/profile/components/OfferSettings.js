Vue.component('offer-settings', {
    template: '#offer-settings-component-template',
    props: ['offer_info'],
    data() {
        return {
            offer_settings: {},
            offer_settings_modal: null,
            thumb_path: null,
            en_translation: {
                locale_id: EN_LOCALE,
                title: '',
                description: '',
                agreement: '',
            },
            privacy_types: [
                {title: LANG_OFFERS.available_all, value: 0},
                {title: LANG_OFFERS.available_only, value: 1},
            ],
            selected_privacy: {},
            statuses: [
                {title: LANG_MESSAGES.is_active, value: 'active'},
                {title: LANG_MESSAGES.disabled, value: 'inactive'},
                {title: LANG_MESSAGES.archived, value: 'archived'},
            ],
            selected_status: {},
        }
    },

    mounted() {
        this.offer_settings_modal = $('#offer_settings_modal');
    },

    watch: {
        'selected_privacy'(selected_privacy) {
            this.offer_settings.is_private = selected_privacy.value;
        },
        'selected_status'(selected_status) {
            if (!selected_status) {
                return;
            }

            this.offer_settings.status = selected_status.value;
        },
    },

    methods: {

        openOfferEditModal() {
            this.offer_settings = _.pick(this.offer_info, [
                'id', 'title', 'is_private', 'status', 'description', 'agreement', 'url'
            ]);

            let en_translation = _.find(this.offer_info.translations, {locale_id: EN_LOCALE});
            if (en_translation === undefined) {
                en_translation = this.getDefaultEnTranslation();
            }

            this.en_translation = _.omit(en_translation, ['id', 'offer_id']);

            this.selected_privacy = _.find(this.privacy_types, {value: this.offer_info.is_private});
            this.selected_status = _.find(this.statuses, {value: this.offer_info.status});

            this.offer_settings_modal.modal();
        },

        editOffer() {
            let ladda = LaddaPreloader.start('#edit_offer_submit'),
                params = this.offer_settings;

            if (this.thumb_path != null) {
                params.thumb_path = this.thumb_path;
            }

            params.translations = [this.en_translation];

            api.post('/offer.edit', params).then(response => {
                vm.offerEditedEvent(response.data.response);
                LaddaPreloader.stop(ladda);

                this.offer_settings_modal.modal('hide');
                this.thumb_path = null;
                showMessage('success', response.data.message);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        uploadOfferPreview(e) {
            PreviewUploader.upload(e).then(response => {
                Vue.set(this, 'thumb_path', response.response.thumb_path);
                showMessage('success', response.message);
            });
        },

        editOfferCategories(categories) {

            let params = {id: this.offer_info.id, categories: categories || []};

            api.post('/offer.syncCategories', params).then(response => {
                showMessage('success', response.data.message);

                this.$emit('offer-categories-edited', response.data.response);
            });
        },

        getDefaultEnTranslation() {
            return {
                locale_id: EN_LOCALE,
                title: '',
                description: '',
                agreement: '',
            };
        }
    }
});
