const create_flow_mixin = {
    methods: {
        createFlow(offer_hash) {
            api.post('/flow.create', {offer_hash: offer_hash}).then(response => {
                location.href = '/tools/flows/' + response.data.response.hash;
            });
        },
    }
};