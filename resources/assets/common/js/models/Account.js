let Account = {
    create(user_id, currency_id) {
        return new Promise((resolve, reject) => {
            api.post('/account.create', {user_id: user_id, currency_id: currency_id})
                .then(response => {
                    resolve(response.data)
                })
                .catch(response => {
                    reject(response.data)
                });
        })
    },

    delete(account_id) {
        return new Promise((resolve, reject) => {
            api.post('/account.delete', {id: account_id})
                .then(response => {
                    resolve(response.data)
                })
                .catch(response => {
                    reject(response.data)
                });
        })
    },

    getList(user_id, relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/account.getList', {params: {user_id: user_id, with: relations}})
                .then(response => {
                    resolve(response.data.response)
                })
                .catch(response => {
                    reject(response.data)
                });
        })
    },
};