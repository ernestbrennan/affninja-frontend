let ApiMethods = {
    getList(search = null) {
        return new Promise((resolve, reject) => {
            api.get('/api_log.search', {params: {search: search}})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
};