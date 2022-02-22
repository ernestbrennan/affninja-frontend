Vue.component('clone-offer-modal', {
    template: '#clone-offer-modal-tpl',
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_OFFERS: LANG_OFFERS,

            offer_info: {
                id: null,
                title: '',
            },
            modal: null,
        }
    },

    created() {
        bus.$on('open-clone-offer-modal', (offer_id) => {
            this.openModal(offer_id);
        });
    },

    mounted() {
        this.modal = $('#clone-offer-modal');
    },

    methods: {
        openModal(offer_id) {
            this.offer_info.id = offer_id;
            this.modal.modal();
        },

        uploadFile(e) {
            PreviewUploader.upload(e).then(response => {
                Vue.set(this.offer_info, 'thumb_path', response.response.thumb_path);
                showMessage('success', response.message);
            });
        },

        cloneOffer() {
            let params = this.offer_info,
                ladda = LaddaPreloader.start('#clone_offer_submit');

            api.post('offer.clone', params).then((response) => {
                location.href = '/offers/' + response.data.response.hash;
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },
    },
});