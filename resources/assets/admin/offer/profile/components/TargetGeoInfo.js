Vue.component('target-geo-info', {
    template: '#target-geo-info-component-template',
    props: {
        target_geo_list: {
            type: Array,
            required: true,
        },
        target_index: {
            type: Number,
            required: true,
        },
        offer_info: {
            type: Object,
            required: true,
        },
        landing_type: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            LANG_OFFERS: LANG_OFFERS,
            target_geo_clone_modal: null,
        }
    },

    mounted() {
        this.target_geo_settings_modal = $('#target_geo_settings_modal');

        this.runTooltip();
    },

    watch: {
        'target_geo_list'() {
            this.runTooltip();
        },
    },

    methods: {
        openIntegrationsModal(target_geo) {
            bus.$emit('open-integrations-modal', target_geo);
        },

        runTooltip() {
            this.$nextTick(() => {
                runTooltip();
            });
        },

        openTargetGeoRulesModalEvent(target_index, target_geo_index, target_geo_id, target_geo_rules, target_geo_rule_sort_type) {
            vm.openTargetGeoRulesModalEvent(target_index, target_geo_index, target_geo_id, target_geo_rules, target_geo_rule_sort_type);
        },

        openTargetGeoEditModal(index) {
            vm.openTargetGeoEditModal(this.target_index, index);
        },

        openTargetGeoCloneModal(index) {
            vm.openTargetGeoCloneModal(this.target_index, index);
        },

        openTargetGeoStakesModal(index) {
            vm.openTargetGeoStakesModal(this.target_index, index);
        },

        deleteTargetGeo(target_geo_index, target_geo_id) {

            Swal.show(LANG_TARGET_GEO.on_delete_msg).then(() => {

                api.post('/target_geo.delete', {id: target_geo_id}).then(response => {

                    this.$emit('deleted', target_geo_index);

                    showMessage('success', response.data.message);
                    LaddaPreloader.stop(ladda_handler);

                }, () => {
                    LaddaPreloader.stop(ladda_handler);
                });
            }, () => {
            });
        }
    }
});
