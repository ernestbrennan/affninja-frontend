Vue.component('currency-filter', {
    props: {
        set_url: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            id: null,
            active: null,
            name: 'currency_id',
        }
    },

    created() {
        if (Object.size(navbar_account_bus)) {
            navbar_account_bus.$on('change-account-currency', currency_code => {
                this.currencyChanged(getCurrencyIdByCode(currency_code));
            });
        }
    },

    mounted() {
        this.id = this._uid + str_rand(8);

        let currency_id = UrlParameter.getCurrencyId();
        if (is_null(currency_id)) {
            currency_id = getCurrencyIdByCode(UserAccount.getAccountCurrency());
        }
        filters_bus.$emit(this.name + '-init', +currency_id);

        this.setCurrency(currency_id);
    },

    methods: {
        currencyChanged(currency_id) {
            this.setCurrency(currency_id);

            filters_bus.$emit(this.name + '-updated', this.active)
        },

        setCurrency(currency_id) {
            this.active = currency_id;

            let currency_code = getCurrencyCodeById(currency_id);

            if (Object.size(UserAccount) && currency_code !== UserAccount.getAccountCurrency()) {
                UserAccount.setAccountCurrency(currency_code);
            }

            if (this.set_url) {
                UrlParameter.setCurrency(currency_id);
            }
        },
    },

    template: `<btn-group-item :active="active" class="btn-group" role="group" @updated="currencyChanged">
                  <button class="btn btn-success btn-outline btn-sm" data-id="1" type="button"
                    >RUB</button
                    ><button class="btn btn-success btn-outline btn-sm" data-id="3" type="button"
                    >USD</button
                    ><button class="btn btn-success btn-outline btn-sm" data-id="5" type="button"
                    >EUR</button>
               </btn-group-item>`,
});