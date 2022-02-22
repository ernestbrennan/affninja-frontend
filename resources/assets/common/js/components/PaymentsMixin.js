var payments_mixin = {
    methods: {
        getPayoutTooltip(balance_pauout, comission, currency_id) {
            let currency_sign = getCurrencySignById(currency_id),
                sign = comission > 0 ? '+' : '-';

            balance_pauout = number_format(balance_pauout, 2, '.', ' ');
            comission = number_format(Math.abs(comission), 2, '.', ' ');

            return `${balance_pauout}${currency_sign} ${sign} ${comission}${currency_sign}`
        }
    }
};