let bus = new Vue();

let vm = new Vue({
    el: '#users',
    data: {
        CURRENCY_RUB_ID: CURRENCY_RUB_ID,
        CURRENCY_USD_ID: CURRENCY_USD_ID,
        CURRENCY_EUR_ID: CURRENCY_EUR_ID,

        publishers: [],
        LANG_MESSAGES: LANG_MESSAGES,
        LANG_USERS: LANG_USERS,
        publishers_loading: false,
        pagination: {
            page: 1,
            per_page: 40,
            finished: false,
            active_ajax: false,
        },
    },

    created() {
        this.getPublishers();

        bus.$on('publisher-profile-updated', publisher_info => {
            this.onPublisherProfileUpdated(publisher_info);
        });
    },

    mounted() {
        scrollHandler(() => {
            if (this.pagination.finished || this.pagination.active_ajax) {
                return false;
            }

            this.pagination.page++;
            this.getPublishers();
        });
    },
    watch: {
        'publishers_loading'() {
            if (this.publishers_loading) {
                this.pagination.active_ajax = true;

                if (this.publishers.length > 0) {
                    ContentPreloader.show('#scroll-preloader-container');
                } else {
                    ContentPreloader.show('#publishers_list_table');
                }
            } else {

                this.pagination.active_ajax = false;
                ContentPreloader.hide();
            }

            this.$nextTick(() => {
                runTooltip();
            });
        },
    },

    methods: {

        getPublishers() {
            this.publishers_loading = true;

            let params = {
                page: this.pagination.page,
                per_page: this.pagination.per_page,
                with: ['profile'],
            };

            api.get('/publisher.getList', {params: params}).then(response => {
                this.pagination.finished = response.data.response.all_loaded;

                this.publishers = this.publishers.concat(response.data.response.data);

                this.publishers_loading = false;
            }, () => {
                this.publishers_loading = false;
            });
        },

        onPublisherProfileUpdated(publisher_info) {
            let index = _.findIndex(this.publishers, {hash: publisher_info.hash});
            this.publishers.splice(index, 1, publisher_info);
        },

        openPublisherEditModal(publisher_info) {
            bus.$emit('open-publisher-edit-modal', publisher_info);
        },
    }
});
