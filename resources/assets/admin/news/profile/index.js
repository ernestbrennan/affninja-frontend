let bus = new Vue();

let vm = new Vue({
    el: '#profile',
    data: {
        LANG_NEWS: LANG_NEWS,
        NEWS_INFO: NEWS_INFO,
        page: Object.size(NEWS_INFO) ? 'edit' : 'create',
        news: {},
        offer_info: OFFER_INFO,
        types: [
            {title: LANG_NEWS.offer_created, value: 'offer_created'},
            {title: LANG_NEWS.promo_created, value: 'promo_created'},
            {title: LANG_NEWS.offer_edited, value: 'offer_edited'},
            {title: LANG_NEWS.offer_stopped, value: 'offer_stopped'},
            {title: LANG_NEWS.system, value: 'system'},
            {title: LANG_NEWS.stock, value: 'stock'},
        ],
        selected_type: {},
        selected_offer: null,
    },

    computed: {
        can_send_form() {
            return this.news.title.length
                && this.news.body.length
                && this.news.type !== null
                && this.news.published_at.length;
        },
    },

    created() {
        this.initNewsObject();
    },

    watch: {
        'selected_type'(type) {
            this.news.type = type.value;
            if (this.page === 'create') {
                this.generateTplByType();
            }
        },
        'selected_offer'(offer) {
            this.news.offer_id = offer.id;
        },
    },

    methods: {
        initNewsObject() {
            this.news = NEWS_INFO || {
                id: null,
                title: '',
                body: '',
                offer_id: '',
                type: null,
                published_at: null,
            };

            if (!NEWS_INFO) {
                if (Object.size(this.offer_info)) {
                    return this.selected_offer = {id: this.offer_info.id, title: this.offer_info.title};
                }

                return {title: LANG_NEWS.without_offer, id: null};
            }

            Vue.set(this, 'news', NEWS_INFO);
            this.selected_type = _.find(this.types, {value: NEWS_INFO.type});
            this.selected_offer = NEWS_INFO.offer ? NEWS_INFO.offer : null;
        },

        showPreview() {
            bus.$emit('open-preview-modal', this.news);
        },

        createNews() {
            let ladda = LaddaPreloader.start('#create-news-submit');

            News.create(this.news.title, this.news.body, this.news.type, this.news.offer_id || '',
                this.news.published_at).then(message => {
                window.location = '/tools/news';
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        editNews() {
            let ladda = LaddaPreloader.start('#edit-news-submit');

            News.edit(this.news.id, this.news.title, this.news.body, this.news.type, this.news.offer_id || '',
                this.news.published_at).then(message => {
                showMessage('success', message);

                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        generateTplByType() {
            switch (this.selected_type.value) {
                case 'offer_created':
                    return this.genTplForOfferCreated();

                case 'promo_created':
                    return this.genTplForPromoCreated();

                case 'offer_edited':
                    return this.genTplForOfferEdited();

                case 'offer_stopped':
                    return this.genTplForOfferStopped();

                default:
                    this.news.title = '';
                    this.news.body = '';
            }
        },

        genTplForOfferCreated() {
            this.news.title = 'Новый оффер';
            this.news.body = 'Уважаемые партнеры!<br>'
                + 'Добавлен новый оффер <b>"' + _.get(this.offer_info, 'title', '') + '"</b> по ГЕО:<b>______.</b><br><br>'
                + '<b>Выплата:______.</b><br><br>'
                + 'С уважением, команда ' + APP_NAME;
        },

        genTplForOfferEdited() {
            this.news.title = 'Повышение отчислений / Расширение ГЕО / Возобновление работы оффера';

            this.news.body = 'Уважаемые партнеры!<br>'
                + 'По офферу <b>"' + _.get(this.offer_info, 'title', '') + '"</b> ________<br><br>'
                + 'С уважением, команда ' + APP_NAME;
        },

        genTplForOfferStopped() {
            this.news.title = 'Приостановлен выкуп трафика';

            this.news.body = 'Уважаемые партнеры!<br>'
                + 'По офферу <b>"' + _.get(this.offer_info, 'title', '') + '"</b> временно приостановлен выкуп трафика по ГЕО _____<br><br>'
                + 'Оставшиеся заказы будут приняты до 12:00 ' + moment().add(1, 'day').format('DD.MM.YYYY') + '<br><br>'
                + 'О возобновлении выкупа уведомим дополнительно.<br>'
                + 'Просим перевести Ваш трафик на другие офферы.<br><br>'
                + 'С уважением, команда ' + APP_NAME;
        },

        genTplForPromoCreated() {
            this.news.title = 'Добавлен новый ______';

            this.news.body = 'Уважаемые партнеры!<br>'
                + 'По офферу <b>"' + _.get(this.offer_info, 'title', '') + '"</b> добавлен новый ______<br><br>'
                + 'С уважением, команда ' + APP_NAME;
        },
    },
});