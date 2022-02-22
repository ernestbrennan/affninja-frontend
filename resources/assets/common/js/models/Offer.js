let Offer = {
    getList(relations = [], search = '') {
        let params = {
            with: relations,
            search: search,
        };
        return new Promise((resolve, reject) => {
            api.get('/offer.getList', {params: params})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
};