let bus = new Vue();

let vm = new Vue({
    el: '#moderation',
    data: {
        moderations: [],
        LANG_MESSAGES: LANG_MESSAGES,
        LANG_USERS: LANG_USERS,
        moderations_loading: false,
    },

    created() {
        this.getModerations();
    },

    methods: {

        getModerations() {
            this.moderations_loading = true;

            api.get('/flow_flow_widget.getCustomCodeList').then(response => {

                this.moderations = response.data.response;
                this.moderations_loading = false;
            }, () => {
                this.moderations_loading = false;
            });
        },
        moderationApply(hash) {
            let ladda = LaddaPreloader.start(`#moderation-apply-${hash}`),
                params = {
                    hash
                };

            api.post('/flow_flow_widget.moderate', params).then(response => {
                let index = _.findIndex(this.moderations, {'hash': hash });
                this.moderations.splice(index,1);

                LaddaPreloader.stop(ladda);
                showMessage('success', response.data.message);
            }, () => {
                LaddaPreloader.stop(ladda);
            })
        }
    }
});
