Vue.component('preview-modal', {
    template: '#preview-modal-tpl',
    data() {
        return {
            news: {},
            modal: null,
        }
    },

    created() {
        bus.$on('open-preview-modal', news => {
            this.news = news;
            this.modal.modal();
        });
    },

    mounted() {
        this.modal = $('#news-preview-modal');
    },
});