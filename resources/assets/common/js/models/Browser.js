let Browser = {
    getList(search = null, browser_ids = []) {
        let params = {
            search: search,
            ids: browser_ids,
        };

        return new Promise((resolve, reject) => {
            api.get('/browser.getList', {params: params})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
};