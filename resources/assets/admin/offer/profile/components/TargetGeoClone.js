Vue.component('target-geo-clone-modal', {
    template: '#target_geo_settings_clone_tpl',
    props: ['countries'],
    data() {
        return {
            target_geo_info: {},
            target_geo_clone_modal: null,
            selected_country: {},
        }
    },

    mounted() {
        this.target_geo_clone_modal = $('#target_geo_clone_modal');
    },

    watch: {
        'selected_country'() {
            this.target_geo_info.country_id = this.selected_country.id;
        },
    },

    methods: {
        onCountryChanged(country_id) {
            this.target_geo_info.country_id = country_id;
        },

        openCloneModal(target_index, target_geo_index, target_geo_info) {
            if (target_index === undefined) {
                throw "Undefined target_index"
            }
            if (target_geo_index === undefined) {
                throw "Undefined target_geo_index"
            }
            if (target_geo_info === undefined) {
                throw "Undefined target_id"
            }

            this.target_index = target_index;
            this.target_geo_index = target_geo_index;
            this.target_geo_info = _.pick(target_geo_info, ['id', 'country_id']);
            this.selected_country = _.find(this.countries, {id: this.target_geo_info.country_id});
            this.target_geo_info.clone_rules = 1;

            this.target_geo_clone_modal.modal();
        },

        cloneTargetGeo() {
            let ladda = LaddaPreloader.start('#target_geo_clone_submit'),
                params = this.target_geo_info;

            api.post('/target_geo.clone', params).then(response => {

                vm.targetGeoCreatedEvent(this.target_index, response.data.response);
                this.target_geo_clone_modal.modal('hide');

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

    }
});
