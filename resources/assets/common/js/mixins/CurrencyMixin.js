let currency_mixin = {
    methods: {
        findCurrencySignById(currency_id) {
            return getCurrencySignById(currency_id);
        },
        findCurrencyCodeById(currency_id) {
            return getCurrencyCodeById(currency_id);
        },
    },
};
