let Ticket = {
    getByHash(hash, relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/ticket.getByHash', {params: {hash: hash, with: relations}})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
    getList(relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/ticket.getList', {params: {with: relations}})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
    close(hash) {
        return new Promise((resolve, reject) => {
            api.post('/ticket.close', {hash: hash})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
    create(title, message, relations = []) {
        return new Promise((resolve, reject) => {
            api.post('/ticket.create', {title: title, first_message: message, with: relations})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
    open(hash) {
        return new Promise((resolve, reject) => {
            api.post('/ticket.open', {hash: hash})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
    defer(hash, responsible_user_id, deferred_until_at) {
        return new Promise((resolve, reject) => {
            api
                .post('/ticket.defer', {
                    hash: hash,
                    responsible_user_id: responsible_user_id,
                    deferred_until_at: deferred_until_at
                })
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
    markAsRead(hash) {
        return new Promise((resolve, reject) => {
            api.post('/ticket.markAsRead', {hash: hash}).then(response => {
                resolve(response.data.response)
            });
        })
    },
};