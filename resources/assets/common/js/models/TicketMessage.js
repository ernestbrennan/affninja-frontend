let TicketMessage = {
    create(ticket_hash, message, relations = []) {
        return new Promise((resolve, reject) => {
            api
                .post('/ticket_messages.create', {ticket_hash: ticket_hash, message: message, with: relations})
                .then(response => {
                    resolve(response.data.response)
                })
                .catch(() => {
                    reject();
                });
        })
    },
};