Vue.component('all-news', {
    data() {
        return {
            news: [],
            LANG_NEWS: LANG_NEWS,
            pagination: {
                page: 1,
                per_page: 10,
                finished: false,
                loading: false,
            },
        };
    },

    mounted() {
        this.getNews();
    },

    methods: {
        getNews() {
            this.pagination.loading = true;

            this.$nextTick(() => {
                this.fixPanelHeightToShowFullPreloader();
            });

            News.getList(['offer'], 0, this.pagination.page, this.pagination.per_page).then(response => {
                this.pagination.finished = response.all_loaded;
                this.news = this.news.concat(response.data);

                this.$nextTick(() => {
                    this.pagination.loading = false;
                })
            });
        },

        loadMoreNews() {
            this.pagination.page++;
            this.getNews();
        },

        fixPanelHeightToShowFullPreloader() {
            let news_panel = $('#all-news-panel');
            news_panel.scrollTop(news_panel[0].scrollHeight);
        }
    },

    template: `
        <div>
        <div v-for="item in news" class="news">
            <div class="row">
                <div class="col-xs-9">
                    <h4 class="title">
                    <a v-if="item.offer" :href="'/offers/' + item.offer.hash">{{ item.title }}</a>
                    <template v-else>{{ item.title }}</template>
                    </h4>
                </div>
                <div class="col-xs-3">
                    <small class="pull-right text-muted">{{ item.published_at | date }}</small>
                </div>
            </div>
            <div v-html="item.body" class="body"></div>
        </div>
        <empty-list-message v-if="!news.length && pagination.finished" :message="LANG_NEWS.on_get_list_not_found"
        ></empty-list-message>
        <preloader v-show="pagination.loading && !pagination.finished"></preloader>
        <show-more @click="loadMoreNews" v-show="!pagination.loading && !pagination.finished"></show-more>
     </div>`
});
