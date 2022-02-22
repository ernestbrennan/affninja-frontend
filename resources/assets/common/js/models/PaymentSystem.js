let PaymentSystem = {
    getList(relations = []) {
        return new Promise((resolve, reject) => {
            api.get('/payment_system.getList', {params: {with: relations}})
                .then(response => {
                    resolve(response.data.response)
                });
        })
    },
};