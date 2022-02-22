const bus = new Vue();

let vm = new Vue({
    el: '#offer_profile',
    mixins: [toggle_target_geo_visibility],
    data: {
        LANG_OFFERS: LANG_OFFERS,
        offer_info: OFFER_INFO,
        CDN_HOST: CDN_HOST,
        offer_sources: OFFER_SOURCES,
        forbidden_sources_str: '',
        selected_target: {},
        active_target_hash: null
    },

    created() {
        let selected_target = _.find(this.offer_info.targets, {hash: localStorage.getItem('active_target_hash')});
        this.selected_target = selected_target || this.offer_info.targets[0] || {};
    },

    watch: {
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
        'selected_target'() {
            this.active_target_hash = this.selected_target.hash
        }
    },
});