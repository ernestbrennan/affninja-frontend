Vue.component('create-offer-modal', {
    template: '#create-offer-modal-tpl',
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_OFFERS: LANG_OFFERS,

            offer_info: {
                title: '',
                url: '',
                agreement: '',
                description: '',
                is_private: 0,
                thumb_path: '',
            },
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
            modal: null,
        }
    },

    created() {
        bus.$on('open-create-offer-modal', () => {
            this.openModal();
        });
    },

    watch: {
        'selected_privacy'() {
            this.offer_info.is_private = this.selected_privacy.value;
        },
    },

    mounted() {
        this.modal = $('#create-offer-modal');
    },

    methods: {
        openModal() {
            this.selected_privacy = this.privacy_types[1];

            this.modal.modal();
        },

        uploadFile(e) {
            PreviewUploader.upload(e).then(response => {
                Vue.set(this.offer_info, 'thumb_path', response.response.thumb_path);
                showMessage('success', response.message);
            });
        },

        createOffer() {
            let params = this.offer_info,
                ladda = LaddaPreloader.start('#create_offer_submit');

            params.translations = [this.en_translation];

            api.post('offer.create', params).then(() => {
                location.reload();
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },
    },
});