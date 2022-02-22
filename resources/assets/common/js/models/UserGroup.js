let UserGroup = {
    getList(relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/user_groups.getList', {params: {with: relations}})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
};