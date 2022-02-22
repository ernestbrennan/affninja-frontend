const bus = new Vue();

let vm = new Vue({
    el: '#offer_profile',
    mixins: [create_flow_mixin, toggle_target_geo_visibility],
    data: {
        LANG_OFFERS: LANG_OFFERS,
        offer_info: OFFER_INFO,
        CDN_HOST: CDN_HOST,
        selected_target: OFFER_INFO.targets[0],
        offer_sources: OFFER_SOURCES,
        forbidden_sources_str: '',
        selected_transit: null,
        selected_landing: null,
        empty_transit_item: {
            title: LANG_STATISTICS.transit_is_undefined,
            hash: null,
        },
        transits: [],
        active_target_hash: null
    },

    created() {
        let selected_target = _.find(this.offer_info.targets, {hash: localStorage.getItem('active_target_hash')});
        this.selected_target = selected_target || this.offer_info.targets[0] || {};

        bus.$on('my-offer-created', () => {
            this.offer_info.already_added = 1;
        });
        bus.$on('my-offer-removed', () => {
            this.offer_info.already_added = 0;
        });
    },

    watch: {
        'selected_target': {
            immediate: true,
            handler() {
                this.active_target_hash = this.selected_target.hash;
                this.transits.splice(0);
                this.transits.push(this.empty_transit_item);
                this.transits = this.transits.concat(this.selected_target.transits);
            },
        },
        'offer_sources': {
            immediate: true,
            handler() {
                let forbidden_sources = _.differenceBy(this.offer_sources, this.offer_info.offer_sources, 'id');
                this.forbidden_sources_str = _.map(forbidden_sources, 'title').join(', ');
            },
        },
        'active_target_hash'() {
            localStorage.setItem('active_target_hash', this.active_target_hash);
            this.selected_target = _.find(this.offer_info.targets, {hash: this.active_target_hash});
        },
    },

    methods: {
        hideTooltip(e) {
            $(e.target).find('button').tooltip('hide');
        },

        onSelectedTransitUpdated(selected_transit) {
            this.selected_transit = selected_transit;
        },

        onSelectedLandingUpdated(selected_landing) {
            this.selected_landing = selected_landing;
        },

        openFastLinkModal() {
            bus.$emit('open-fast-link-modal',
                this.selected_target,
                this.selected_landing,
                this.selected_transit
            );
        },

        createMyOffer(offer_hash) {
            let ladda = LaddaPreloader.start('#create_my_offers');

            api.post('/offer.addToMy', {offer_hash: offer_hash}).then(() => {
                bus.$emit('my-offer-created', offer_hash);

                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        removeMyOffer(offer_hash) {
            let ladda = LaddaPreloader.start('#remove_my_offer');

            api.post('/offer.removeFromMy', {offer_hash: offer_hash}).then(() => {
                bus.$emit('my-offer-removed', offer_hash);

                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },
    },
});