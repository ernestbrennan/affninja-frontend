let NewLead = {
    generateLead(flow_id, target_geo_id, contacts) {
        return new Promise((resolve, reject) => {
            api.post('/lead.create ', {flow_id: flow_id, target_geo_id: target_geo_id, contacts: contacts})
                .then(response => {
                    if (response.data.status_code === 404) {
                        reject(response.data)
                    } else {
                        resolve(response.data.response)
                    }
                })
                .catch((error) => {
                    reject(error.data)
            });
        })
    },
};