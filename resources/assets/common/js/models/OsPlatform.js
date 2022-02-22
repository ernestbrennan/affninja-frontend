let OsPlatform = {
    getList(search = null, os_platform_ids = []) {
        let params = {
            search: search,
            ids: os_platform_ids,
        };

        return new Promise((resolve, reject) => {
            api.get('/os_platform.getList', {params: params})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
};