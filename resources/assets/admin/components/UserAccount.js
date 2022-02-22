const FALLBACK_CURRENCY_CODE = 'USD';

let UserAccount = {
	getAccountCurrency() {
		if (localStorage) {
			return localStorage.getItem('defaultCurrency') || FALLBACK_CURRENCY_CODE;
		} else {
			return getCookie('defaultCurrency') || FALLBACK_CURRENCY_CODE;
		}
	},
	setAccountCurrency(default_currency) {
		default_currency = default_currency.toUpperCase();

		if (localStorage) {
			return localStorage.setItem('defaultCurrency', default_currency);
		} else {
			return setCookie('defaultCurrency', default_currency);
		}
	}
};

export {UserAccount};
