let TargetTemplates = {
    create(title, title_en) {
        let params = {
            title, title_en
        };

        return new Promise((resolve, reject) => {
            api.post('/target_template.create', params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(response => {
                    reject(response)
                });
        })
    },
    edit(id, title, title_en) {
        let params = {
            id, title, title_en
        };

        return new Promise((resolve, reject) => {
            api.post('/target_template.edit', params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(response => {
                    reject(response)
                });
        })
    },
    getList(relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/target_template.getList', {params: {with: relations}})
                .then(response => {
                    resolve(response.data.response)
                })
                .catch(response => {
                    reject(response.data)
                });
        })
    },
};