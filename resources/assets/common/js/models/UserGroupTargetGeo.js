let UserGroupTargetGeo = {
    getList(target_geo_id) {
        return new Promise((resolve, reject) => {
            api.get('/user_group_target_geo.getList', {params: {target_geo_id: target_geo_id}})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
};