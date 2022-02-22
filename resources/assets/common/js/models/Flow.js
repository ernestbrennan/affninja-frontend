let Flow = {
    getList(relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/flow.getList', {params: relations}).then(response => {
                if (response.data.status_code === 404) {
                    reject(response.data)
                } else {
                    resolve(response.data.response)
                }
            });
        })
    },
    getByTitle(title, relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/flow.getByTitle', {params: {title: title, with: relations}})
                .then(response => {
                    if (response.data.status_code === 404) {
                        reject(response.data)
                    } else {
                        resolve(response.data.response)
                    }
                });
        })
    },
};