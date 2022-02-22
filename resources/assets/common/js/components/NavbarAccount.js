let navbar_account_bus = new Vue();

Vue.component('navbar-account', {
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_NAVBAR: LANG_NAVBAR,

            profile: _.clone(App.user.profile),

            selected_currency: {code: 'USD', id: 3},
            currencies: [
                {code: 'RUB', id: 1},
                {code: 'USD', id: 3},
                {code: 'EUR', id: 5},
            ],
        }
    },

    created() {
        this.setCurrency(UserAccount.getAccountCurrency());

        navbar_account_bus.$on('set-account-currency', (currency_code) => {
            this.setCurrency(currency_code);
        });

        navbar_account_bus.$on('refresh-account-balance', () => {
            this.refreshBalance();
        });
    },

    methods: {
        changeCurrency(currency_code) {
            if (this.selected_currency.code === currency_code) {
                return;
            }

            this.setCurrency(currency_code);
            UserAccount.setAccountCurrency(currency_code);
            navbar_account_bus.$emit('change-account-currency', currency_code);
        },

        setCurrency(currency_code) {
            this.selected_currency = _.find(this.currencies, {code: currency_code});
        },

        refreshBalance() {
            api.get('/user.getBalance').then(response => {
                this.profile = _.merge(this.profile, response.data.response);
            });
        },
    },

    template: `
    <li class="custom-dropdown balance-component">
        <a class="dropdown-toggle" href="#" data-toggle="dropdown">
            <span id="balance_wrap">
                <div class="balance-container text-right">
                    <money :sum="profile['balance_' + selected_currency.code.toLowerCase()]" 
                           :currency_id="selected_currency.id" :space="true"></money><br>
                    <money :sum="profile['hold_' + selected_currency.code.toLowerCase()]" 
                           :currency_id="selected_currency.id" :space="true"></money>
                </div>
                <div class="separator"></div>
                <div class="hold-container">
                    <span>{{ LANG_MESSAGES.balance }}</span>
                    <br>
                    <span>{{ LANG_MESSAGES.hold }}</span>
                </div>
            </span>
            <span class="caret"></span>
        </a>
        <div class="dropdown-menu hdropdown bigmenu vcurrency">
            <table class="vcurrency__table vcurrency__table_sel">
            <thead>
                <tr>
                    <th>{{ LANG_NAVBAR.invoice }}</th>
                    <th>{{ LANG_NAVBAR.balance }}</th>
                    <th>{{ LANG_NAVBAR.hold }}</th>
                </tr>
            </thead>
            <tbody>
                <tr @click="changeCurrency(currency.code)" v-for="currency in currencies"
                    :class="['currency_row', currency.id === selected_currency.id ? 'active' : '']">
                    <td>
                        {{ currency.code }}
                        <i v-if="currency.id === selected_currency.id" 
                           class="currency_active_sign fa fa-check-circle-o green_t" aria-hidden="true"></i>
                    </td>
                    <td><money :sum="profile['balance_' + currency.code.toLowerCase()]" 
                               :currency_id="currency.id"></money></td>
                    <td><money :sum="profile['hold_' + currency.code.toLowerCase()]" 
                               :currency_id="currency.id"></money></td>
                </tr>
            </tbody>
            </table>
        </div>
    </li>`
});