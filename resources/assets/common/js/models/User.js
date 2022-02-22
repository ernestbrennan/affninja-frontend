let User = {
    getPublishers(relations = [], search_field = null, search = null, hashes = []) {
        let params = {
            with: relations,
            search_field: search_field,
            search: search,
            hashes: hashes,
            page: 1,
            per_page: 200
        };
        return new Promise((resolve, reject) => {
            api.get('/publisher.getList', {params: params})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
    getList(role = [], hashes = [], search = null, page = 1, per_page = 50) {
        let params = {
            role: role,
            hashes: hashes,
            search: search,
            page: page,
            per_page:per_page
        };
        return new Promise((resolve, reject) => {
            api.get('/user.getList', {params: params})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
    getAdvertisers(relations = [], search_field = null, search = null, hashes = []) {
        let params = {
            with: relations,
            search_field: search_field,
            search: search,
            hashes: hashes,
            page: 1,
            per_page: 200
        };

        return new Promise((resolve, reject) => {
            api.get('/advertiser.getList', {params: params})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
    getAdvertisersWithUncompletedLeads(relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/advertiser.getWithUncompletedLeads', {params: {with: relations}})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
    getAdmins(search, hashes, relations = [], page = 1, per_page = 50) {
        let params = {
            hashes: hashes,
            search_field: 'email',
            search: search,
            with: relations,
            page: page,
            per_page: per_page,
        };

        return new Promise((resolve, reject) => {
            api.get('/administrators.getList', {params: params})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
};