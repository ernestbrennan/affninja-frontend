let ticket_mixin = {
    data: {
        is_sending_message: false
    },
    methods: {
        markAsRead(ticket_hash) {
            Ticket.markAsRead(ticket_hash);
        }
    },
};
