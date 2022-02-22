Vue.component('balance-item', {
    data() {
        return {
            active_account: {},
            accounts: App.user.accounts,
            LANG_NAVBAR: LANG_NAVBAR,
            LANG_MESSAGES: LANG_MESSAGES,
            fallback_currency_id: CURRENCY_USD_ID,
        };
    },

    created() {
        if (!this.accounts.length) {
            return;
        }

        let currency_code = this.getSavedCurrencyCode();
        if (currency_code === undefined || is_null(currency_code)) {
            this.active_account = this.accounts[0];
            return this.saveCurrencyCode(this.active_account.currency_id);
        }

        let active_account = _.find(this.accounts, {currency_id: getCurrencyIdByCode(currency_code)});
        if (active_account === undefined) {
            this.active_account = this.accounts[0];
            this.saveCurrencyCode(this.active_account.currency_id);
        } else {
            this.active_account = active_account;
        }
    },

    methods: {
        getSavedCurrencyCode() {
            if (localStorage) {
                return localStorage.getItem('defaultCurrency');
            }

            return getCookie('defaultCurrency');
        },

        saveCurrencyCode(currency_id) {
            let currency_code = getCurrencyCodeById(currency_id);

            if (localStorage) {
                return localStorage.setItem('defaultCurrency', currency_code);
            }

            return setCookie('defaultCurrency', currency_code);
        },

        setActiveAccount(account){
            this.active_account = account;
            this.saveCurrencyCode(this.active_account.currency_id);
        }
    },

    template: `
    <li class="custom-dropdown balance-component">
        <a v-show="accounts.length"
           :title="LANG_NAVBAR.balance"
           href="#"
           data-toggle="dropdown">
            <span id="balance_wrap">
                <div class="balance-container text-right">
                    <money v-if="active_account"
                           :sum="active_account.balance"
                           :currency_id="active_account.currency_id"
                           :space="true"></money>
                </div>
            </span>
            <span v-if="accounts.length > 1" class="caret m-l-xs"></span>
        </a>
        <div v-show="accounts.length > 1" class="dropdown-menu hdropdown bigmenu vcurrency">
            <table class="vcurrency__table vcurrency__table_sel">
                <thead>
                <tr>
                    <th>{{ LANG_NAVBAR.invoice }}</th>
                    <th>{{ LANG_NAVBAR.balance }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="account in accounts" @click="setActiveAccount(account)">
                    <td class="currency_title">
                        <span>{{ account.currency.code }}</span>
                    </td>
                    <td>
                        <div>
                            <money :sum="account.balance" :currency_id="account.currency_id"></money>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </li>`,
});