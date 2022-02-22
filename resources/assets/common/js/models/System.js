let System = {
    /**
     * Получение корневой директории всех лендингов/транзиток
     * @returns {Promise}
     */
    getLandingsPath() {
        return new Promise((resolve, reject) => {
            api.get('/system.getLandingsPath').then(response => {
                resolve(response.data.response)
            });
        })
    },
};