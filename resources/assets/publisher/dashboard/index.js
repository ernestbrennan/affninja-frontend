let bus = new Vue();

let dashboard = new Vue({
    el: '#dashboard',
    mixins: [on_scroll_mixin],
    data: {
        count_hot_offers: 0,
        count_new_offers: 0,
        news_type: 'all',
        offer_type: 'hot',
    },

    mounted() {
        let params = {
            for: 'offer_list',
        };

        this.$refs.hot_offers.reloadOffers(_.clone(params));
        this.$refs.new_offers.reloadOffers(_.clone(params));
    },

    methods: {
        reloadOffers() {
            this.getOfferRef().getNextPage();
        },

        reloadNews() {
            this.getNewsRef().getNextPage();
        },

        getOfferRef(){
            return this.$refs[this.offer_type + '_offers'];
        },

        getNewsRef(){
            return this.$refs[this.news_type + '_news'];
        },

        updateHotOffersCount(count_hot_offers) {
            this.count_hot_offers = count_hot_offers;
        },

        updateNewOffersCount(count_new_offers) {
            this.count_new_offers = count_new_offers;
        },
    },
});