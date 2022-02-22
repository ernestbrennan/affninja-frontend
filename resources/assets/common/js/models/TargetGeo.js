let TargetGeo = {
    getGeoTargets(target_id, relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/target_geo.getList', {params: {target_id: target_id, with: relations}})
                .then(response => {
                    if (response.data.status_code === 404) {
                        reject(response.data)
                    } else {
                        resolve(response.data.response)
                    }
                });
        })
    },
    getById(id, relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/target_geo.getById', {params: {id: id, with: relations}})
                .then(response => {
                        reject(response.data)
                });
        })
    }
};