let bus = new Vue();

let vm = new Vue({
    el: '#list',
    mixins: [filters_manager],
    data: {
        LANG_NEWS: LANG_NEWS,
        CDN_HOST: CDN_HOST,

        news_list: [],
        filters: ['date_to', 'date_from', 'offer_hashes'],
        pagination: {
            loading: false,
            page: 1,
            per_page: 25,
            finished: false,
            active_ajax: false,
        },
    },

    created() {
        filters_bus.$on('filters-applies', () => {
            this.news_list.splice(0);

            this.refreshPagination();
            this.getNewsList();
        });

    },

    mounted() {
        this.getNewsList();

        scrollHandler(() => {
            if (this.pagination.finished || this.pagination.active_ajax) {
                return false;
            }

            this.pagination.page++;
            this.getNewsList();
        });
    },

    watch: {
        'pagination.loading'() {
            if (this.pagination.loading && !this.news_list.length) {
                return filters_bus.$emit('apply-filter-start');
            }

            filters_bus.$emit('apply-filter-stop');

            this.$nextTick(() => {
                runPopover();
            });
        },
    },

    methods: {
        checkPublicationDate(publication_date) {
            return Date.parse(publication_date) > moment(DATE_TIME_TO_DEFAULT)._d;
        },

        getNewsList() {
            this.pagination.loading = true;
            this.pagination.active_ajax = true;

            let filtersData = this.getFiltersData(this.filters);

            News.getList(['offer'], 0, this.pagination.page, this.pagination.per_page, { ...filtersData})
                .then(response => {

                    this.pagination.finished = response.all_loaded;

                    response.data.forEach(news => {
                        this.news_list.push(news);
                    });

                    this.pagination.loading = false;
                    this.pagination.active_ajax = false;
                }, () => {
                    this.pagination.loading = false;
                    this.pagination.active_ajax = false;
                });
        },

        deleteNews(news_id) {
            News.delete(news_id).then(message => {
                let index = _.findIndex(this.news_list, {id: news_id});
                this.news_list.splice(index, 1);

                showMessage('success', message);
            });
        },

        refreshPagination() {
            this.pagination.page = 1;
            this.pagination.finished = false;
        },
    },
});