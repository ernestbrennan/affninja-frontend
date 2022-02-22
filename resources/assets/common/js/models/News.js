let News = {
    getList(relations = [], only_my = 0, page = 1, per_page = 10, { offer_hashes = [], date_from = null, date_to = null} = {}) {
        let params = {
            with: relations,
            page: page,
            per_page: per_page,
            only_my: only_my,
            offer_hashes: offer_hashes,
            date_from: date_from,
            date_to: date_to
        };
        return new Promise((resolve, reject) => {
            api.get('/news.getList', {params: params})
                .then(response => {
                    resolve(response.data.response)
                })
                .catch(response => {
                    reject(response.data)
                });
        })
    },
    getByHash(hash = null) {
        return new Promise((resolve, reject) => {
            api.get('/news.getByHash', {hash: hash})
                .then(response => {
                    resolve(response.data.response)
                })
                .catch(response => {
                    reject(response.data)
                });
        })
    },
    create(title, body, type, offer_id = '', published_at) {
        let params = {
            title, body, type, offer_id,
            published_at: date('Y-m-d H:i:s', strtotime(published_at)),
        };

        return new Promise((resolve, reject) => {
            api.post('/news.create', params)
                .then(response => {
                    resolve(response.data.message)
                })
                .catch(response => {
                    reject(response)
                });
        })
    },
    delete(news_id = null) {
        return new Promise((resolve, reject) => {
            api.delete('/news.delete', {params: {id: news_id}})
                .then(response => {
                    resolve(response.data.response)
                })
                .catch(response => {
                    reject(response.data)
                });
        })
    },
    edit(id, title, body, type, offer_id = '', published_at) {
        let params = {
            id, title, body, type, offer_id,
            published_at: date('Y-m-d H:i:s', strtotime(published_at)),
        };

        return new Promise((resolve, reject) => {
            api.post('/news.edit', params)
                .then(response => {
                    resolve(response.data.message)
                })
                .catch(response => {
                    reject(response)
                });
        })
    },
    read() {
        return new Promise((resolve, reject) => {
            api.post('/news.read', params)
                .then(response => {
                    resolve(response.data.response)
                })
                .catch(response => {
                    reject(response.data)
                });
        })
    },
};