let Landing = {
    getList(offer_hashes = [], relations = [], hashes = []) {
        return new Promise((resolve, reject) => {
            api.get('/landing.getList', {params: {with: relations, offer_hashes: offer_hashes, hashes: hashes}})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
};