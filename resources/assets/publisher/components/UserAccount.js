let FALLBACK_CURRENCY_CODE = 'USD';

let UserAccount = {
    refreshBalance() {
        navbar_account_bus.$emit('refresh-account-balance');
    },

    getAccountCurrency() {
        if (localStorage) {
            return localStorage.getItem('defaultCurrency') || FALLBACK_CURRENCY_CODE;
        }

        return getCookie('defaultCurrency') || FALLBACK_CURRENCY_CODE;
    },

    setAccountCurrency(currency_code) {
        currency_code = currency_code.toUpperCase();

        navbar_account_bus.$emit('set-account-currency', currency_code);

        if (localStorage) {
            return localStorage.setItem('defaultCurrency', currency_code);
        }

        return setCookie('defaultCurrency', currency_code);
    },
};

export {UserAccount};
