let FlowWidget = {
    create(flow_widget_id, flow_hash, attributes) {
        let params = {
            flow_widget_id: flow_widget_id,
            flow_hash: flow_hash,
            attributes: attributes,
        };

        return new Promise((resolve, reject) => {
            api.post('/flow_flow_widget.create', params)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                });
        })
    },

    edit(flow_hash, attributes) {
        let params = {
            hash: flow_hash,
            attributes: attributes,
        };

        return new Promise((resolve, reject) => {
            api.post('/flow_flow_widget.edit', params)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error)
                });
        })
    },

    delete(widget_hash) {
        let params = {hash: widget_hash};

        return new Promise((resolve, reject) => {
            api.delete('/flow_flow_widget.delete', {params: params})
                .then(response => {
                    resolve(response.data.message)
                })
                .catch(error => {
                    reject(error)
                });
        })
    },

    getByHash(hash, relations = []) {
        let params = {
            hash: hash,
            with: relations
        };

        return new Promise((resolve, reject) => {
            api.delete('/flow_flow_widget.getByHash', {params: params})
                .then(resonse => {
                    resolve(response.data.response)
                })
                .catch(error => {
                    reject(error)
                });
        })
    },

    getList() {
        return new Promise((resolve, reject) => {
            api.get('/flow_widget.getList')
                .then(response => {
                    resolve(response.data.response)
                })
                .catch(error => {
                    reject(error)
                });
        })
    },
};