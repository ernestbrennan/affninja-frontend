Vue.component('target-geo-item', {
    props: {
        show_coefficients: {
            type: Boolean,
            default: false,
        },
        target_geo: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            cdn_host: CDN_HOST,
            LANG_TARGET_GEO: LANG_TARGET_GEO
        };
    },

    mounted() {
        Vue.nextTick(() => {
            runTooltip();
        });
    },

    methods: {
        getPayout() {
            if (App.user.role === 'advertiser') {
                return this.target_geo.rules[0].charge;
            }
            return this.target_geo.payout;
        },
        getPayoutCurrencyId() {
            if (App.user.role === 'advertiser') {
                return this.target_geo.rules[0].currency_id;
            }
            return this.target_geo.payout_currency_id;
        }
    },

    template: `
        <div class="target-geo-item">
            <table>
                <tbody>
                    <tr>
                        <td style="min-width: 100px;">
                            <div>
                                <img :src="cdn_host + target_geo.country.thumb_path" :alt="target_geo.country.title" class="flag">
                                &nbsp;{{ target_geo.country.title }}
                            </div>
                        </td>
                        <td class="w60" style="min-width: 60px">
                            <div style="justify-content: center">
                                <span :title="LANG_TARGET_GEO.landing_payout" data-toggle="tooltip">
                                    <money :sum="getPayout()"></money><currency-sign-by-id :currency_id="getPayoutCurrencyId()"></currency-sign-by-id>
                                </span>
                            </div>
                        </td>
                        <td v-if="show_coefficients" class="w85" style="min-width: 82px;">
                            <div>
                                <span class="fs11">{{ target_geo.cr | cr }}</span>
                                <span class="fs11 m-l">{{ target_geo.epc | epc }}</span>
                            </div>
                        </td>    
                    </tr>
                    <tr>
                        <td>
                            <div>
                                <span :title="LANG_TARGET_GEO.target_price" data-toggle="tooltip">
                                      <i class="fa fa-shopping-cart relative top-minus-1"></i> 
                                      {{ target_geo.price }} 
                                      {{ target_geo.price_currency.code }}
                                </span>
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
});