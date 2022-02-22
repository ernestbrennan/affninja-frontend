Vue.component('by-offers', {
    template: '#by_offers_tpl',
    mixins: [currency_mixin],
    data() {
        return {
            offers: [],
            total: {},
            custom_sort: null,
            targets_loading: false,
            target_geo_loading: false,
            existing_currencies: [],
        };
    },

    created() {
        CustomSort.initDefaultSorting('id', 'desc');
        this.custom_sort = CustomSort.getInstance();
    },

    mounted() {
        this.initDatatable();
    },

    watch: {
        'offers'() {
            this.$nextTick(() => {
                this.$emit('report-built');

                this.initDatatable();

                runTooltip();
            });
        }
    },

    methods: {

        getReport() {
            this.custom_sort.validateSortingColumn();

            let params = Filters.getData();

            api.get('/stat.getByOffer', {params: params}).then(response => {

                this.total = response.data.response.total;
                this.existing_currencies = response.data.response.existing_currencies;

                    this.offers.splice(0);

                    let offer;
                    for (offer of response.data.response.stats) {
                        offer.show_targets = false;
                        offer.targets = [];
                        this.offers.push(offer);
                    }
                }
            );
        },

        toggleTargetsVisibility(offer, offer_index) {
            let title_selector = '#title-td-offer-' + offer.id;

            if (!offer.targets.length) {
                if (this.targets_loading) {
                    return;
                }

                Vue.set(this.offers[offer_index], 'show_targets', true);
                let id = SmallPreloader.show(title_selector);

                this.getByTargets(offer.id, offer_index).then(() => {
                    SmallPreloader.hide(id);
                });
            } else {
                offer.show_targets = !offer.show_targets;

            }

            // При скрытии целей оффера скрываем все гео цели
            if (!offer.show_targets) {
                offer.targets.forEach((index, target) => {
                    target.show_target_geo = false;
                });
            }
        },

        getByTargets(offer_hash, offer_index) {
            return new Promise((resolve, reject) => {

                this.targets_loading = true;

                let params = Filters.getData();
                params.offer_hash = offer_hash;

                api.get('stat.getByTargets', {params: params}).then(response => {

                    let target;
                    for (target of response.data.response.stats) {
                        target.show_target_geo = false;
                        target.target_geo = [];
                        this.offers[offer_index].targets.push(target);
                    }

                    this.$nextTick(() => {
                        resolve();
                        this.targets_loading = false;
                    });
                });
            });
        },

        toggleTargetGeoVisibility(target, offer_index, target_index) {
            let title_selector = '#title-td-target-' + target.id + ' div';

            if (!target.target_geo.length) {
                if (this.target_geo_loading) {
                    return;
                }

                Vue.set(this.offers[offer_index].targets[target_index], 'show_target_geo', true);

                let id = SmallPreloader.show(title_selector);

                return this.getByTargetGeo(target.id, offer_index, target_index).then(() => {
                    SmallPreloader.hide(id);
                });
            } else {
                target.show_target_geo = !target.show_target_geo;
            }
        },

        getByTargetGeo(target_hash, offer_index, target_index) {

            return new Promise((resolve, reject) => {

                this.target_geo_loading = true;

                let params = Filters.getData();
                params.target_hash = target_hash;

                api.get('stat.getByTargetGeo', {params: params}).then(response => {

                    Vue.set(this.offers[offer_index].targets[target_index], 'target_geo', response.data.response.stats);

                    this.$nextTick(() => {
                        resolve();
                        this.target_geo_loading = false;
                    });
                });
            });
        },

        getLeadLink(offer = null, status = null, country_id = null) {
            let formdata = Filters.getData(), country_ids = '';

            if (!is_null(country_id)) {
                country_ids = '&country_ids[]=' + country_id;
            } else {
                country_ids = '&' + http_build_query({country_ids: _.get(formdata, 'country_ids', [])})
            }

            return '/leads'
                + '?offer_hashes[]=' + _.get(offer, 'id', null)
                + '&lead_statuses[]=' + status
                + country_ids
                + '&' + http_build_query(_.omit(Filters.getData(), ['offer_hashes', 'lead_statuses', 'country_ids']));
        },

        initDatatable() {
            this.custom_sort.initTable({
                table_id: 'by_offers_table',
                onsort_callback: function () {
                    vm.getReport('offers');
                }
            });
        }
    }
});
