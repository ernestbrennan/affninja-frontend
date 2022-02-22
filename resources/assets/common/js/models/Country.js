let Country = {
    getList(relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/country.getList', {params: {with: relations}})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
};