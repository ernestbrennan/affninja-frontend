Vue.component('new-lead', {
    template: '#new-lead-tpl',
    data() {
        return {
            lang_messages: LANG_MESSAGES,
            lang_leads: LANG_LEADS,
            flow_title: '',
            publisher_email: null,
            flow_id: null,
            target_geo_id: null,
            contacts: '',
            flow_exist: false,
            new_lead_modal: null,
            target_geo: [],
            target_id: null,
        };
    },

    mounted() {
        this.new_lead_modal = $('#new-lead-modal');
    },

    methods: {
        openModal() {
            this.flow_title = '';
            this.refreshLeadsData();

            this.new_lead_modal.modal();
        },

        refreshLeadsData() {
            this.flow_id = null;
            this.target_geo_id = null;
            this.contacts = '';
        },

        getFlowByTitle() {
            if (!this.flow_title.length) {
                return;
            }

            let ladda = LaddaPreloader.start('#find-flow');

            Flow.getByTitle(this.flow_title, ['user']).then(flow => {
                this.publisher_email = flow.user.email;
                this.flow_id = flow.id;
                LaddaPreloader.stop(ladda);
                this.getFlowsTargetGeo(flow.target_id);
            }, error => {
                LaddaPreloader.stop(ladda);
                this.refreshLeadsData();
                showMessage('error', error.message);
            });
        },

        getFlowsTargetGeo(target_id) {
            TargetGeo.getGeoTargets(target_id, ['country']).then(target_geo => {
                this.target_geo_id = target_geo[0].id;
                this.target_geo = target_geo;
            }, error => {
                showMessage('error', error.message);
            });
        },

        generateLead() {
            let ladda = LaddaPreloader.start('#generate_lead_submit');

            NewLead.generateLead(this.flow_id, this.target_geo_id, this.contacts).then(response => {
                this.new_lead_modal.modal('hide');

                LaddaPreloader.stop(ladda);
                vm.$refs.by_leads.refreshLeads();
            }, error => {
                LaddaPreloader.stop(ladda);

                if (error.message) {
                    showMessage('error', error.message);
                }
            });
        },
    }
});