Vue.filter('date', function (value) {
    return date('d.m.Y', strtotime(value));
});
Vue.filter('strtotime', function (value) {
    return strtotime(value);
});
Vue.filter('datetime', function (value) {
    return date('d.m.Y H:i:s', strtotime(value));
});
Vue.filter('dateformat', function (value, format) {
    return date(format, strtotime(value));
});
Vue.filter('datehour', function (value, format) {
    return date('d.m.Y H:i', strtotime(value));
});
Vue.filter('flow_url', function (hash) {
    return '/tools/flows/' + hash
});
Vue.filter('cdn_nocache', function (image_src) {
    return CDN_HOST + image_src + '?' + Math.random();
});
Vue.filter('lead_status', function (status) {
    return getLeadStatusTranslation(status);
});
Vue.filter('number_format', function (number, decimals = 2, dec_point = '.', thousands_sep = '') {
    return number_format(number, decimals, dec_point, thousands_sep);
});

Vue.filter('truncate', function (value, length) {
    if (value.length < length) {
        return value;
    }
    return value.substring(0, length) + '...';
});

Vue.filter('cr', function (value, length) {
    return 'CR: ' + _.toNumber(value).toFixed(4) + '%';
});
Vue.filter('epc', function (value, length) {
    return 'EPC: ' + _.toNumber(value).toFixed(4);
});

Vue.component('enter-in-user-cabinet', {
    template: '<a href="#" v-on:click="enterInUserCabinet($event)">{{email}}</a>',
    props: ['email', 'hash'],
    methods: {
        enterInUserCabinet: function (e) {
            e.preventDefault();
            UserLoginer.login(this.hash);
        }
    }
});

Vue.component('get-payout', {
    template: '<span v-html="payout_fixed"></span>',
    props: ['payout', 'currency_id'],
    data: function () {
        return {
            currency_sign: '',
        };
    },
    computed: {
        payout_fixed: function () {
            if (this.currency_id > 0) {
                switch (parseInt(this.currency_id)) {
                    case 1:
                        this.currency_sign = '<span class="rubl">о</span>';
                        break;
                    case 3:
                        this.currency_sign = '$';
                        break;
                    case 5:
                        this.currency_sign = '€';
                        break;
                    default:
                        this.currency_sign = '-';
                        break
                }
            }

            if (this.payout > 0) {
                return '<span class="green_t" title>' + parseFloat(this.payout).toFixed(2) + this.currency_sign + '</span>';
            } else if (this.payout < 0) {
                return '<span class="red_t">' + parseFloat(this.payout).toFixed(2) + this.currency_sign + '</span>';
            } else {
                return parseFloat(this.payout).toFixed(2) + this.currency_sign;
            }
        }
    }
});
/**
 * Компонент для вывода ел-та select со списком пользователей
 */
Vue.component('user-filter', {
    template: '<select2 :value="value" :options="users_processes" v-on:input="updated"></select2>',
    props: ['users', 'value'],
    data: function () {
        return {
            selected: null,
            users_processes: []
        };
    },
    watch: {
        users: function () {
            var self = this;
            this.users_processes = [];
            _.forEach(this.users, function (object) {
                self.users_processes.push({
                    id: object.id,
                    text: object.email
                });
            });
        }
    },
    methods: {
        updated: function (value) {
            this.$emit('updated', value)
        }
    }
});
/**
 * Компонент для вывода ел-та select со списком интеграций
 */
Vue.component('integration-filter', {
    template: '<select2 :value="value" :options="integrations_processes" v-on:input="updated"></select2>',
    props: ['integrations', 'value'],
    data: function () {
        return {
            selected: null,
            integrations_processes: []
        };
    },
    watch: {
        integrations: function () {
            var self = this;
            this.integrations_processes = [];
            _.forEach(this.integrations, function (integration) {
                self.integrations_processes.push({
                    id: integration.id,
                    text: integration.title + ' [' + integration.info + ']'
                });
            });
        }
    },
    methods: {
        updated: function (value) {
            this.$emit('updated', value)
        }
    }
});

Vue.component('currency-select', {
    props: {
        value: {
            type: Number,
            default: 1
        },
    },
    methods: {
        onChange(value) {
            this.$emit('input', parseInt(value));
        }
    },
    template: '<select :value="value" @change="onChange($event.target.value)" class="form-control">' +
    '<option value="1">RUB</option>' +
    '<option value="3">USD</option>' +
    '<option value="5">EUR</option>' +
    '</select>',
});

Vue.component('countries-select2', {
    props: ['countries', 'value'],
    template: '<select2 :value="value" :options="countries_processes" v-on:input="updated"></select2>',
    data: function () {
        return {
            countries_processes: []
        };
    },
    watch: {
        countries: function () {
            var self = this;
            this.countries_processes = [];
            _.forEach(this.countries, function (object) {
                self.countries_processes.push({
                    id: object.id,
                    text: object.title
                });
            });
        }
    },
    methods: {
        updated: function (value) {
            this.$emit('updated', value)
        }
    }
});

Vue.component('currencies-select2', {
    props: ['currencies', 'value'],
    template: '<select2 :value="value" :options="currencies_processes" v-on:input="updated"></select2>',
    data: function () {
        return {
            currencies_processes: []
        };
    },
    watch: {
        currencies: function () {
            var self = this;
            this.currencies_processes = [];
            _.forEach(this.currencies, function (object) {
                self.currencies_processes.push({
                    id: object.id,
                    text: object.code
                });
            });
        }
    },
    methods: {
        updated: function (value) {
            this.$emit('updated', parseInt(value))
        }
    }
});

Vue.component('select2', {
    props: ['options', 'value'],
    template: '<select><slot></slot></select>',
    mounted: function () {
        this.init();
    },
    watch: {
        value: function (value) {
            this.destroy();
            this.init();
        },
        options: function (options) {
            this.destroy();
            this.init();
        }
    },
    destroyed: function () {
        this.destroy();
    },
    methods: {
        init: function () {
            var vm = this;
            $(this.$el)
                .select2({data: this.options})
                .val(this.value).trigger("change")
                .on('change', function () {
                    vm.$emit('input', $(this).val())
                })
        },
        destroy: function () {
            $(this.$el).off().select2('destroy')
        }
    }
});
Vue.component('select2-simple', {
    props: ['options', 'value'],
    template: '<select><slot></slot></select>',
    mounted: function () {
        this.init();
    },
    watch: {
        value: function (value) {
            this.destroy();
            this.init();
        },
        options: function (options) {
            this.destroy();
            this.init();
        }
    },
    destroyed: function () {
        this.destroy();
    },
    methods: {
        init: function () {
            var vm = this;

            initSelect2Single(this.$el)
                .val(this.value).trigger("change")
                .on('change', function () {
                    vm.$emit('input', $(this).val())
                })
        },
        destroy: function () {
            $(this.$el).off().select2('destroy')
        }
    }
});

Vue.component('country-flag', {
    props: {
        country: Object,
        small: false,
    },
    template: `<span :class="country_class" data-toggle="tooltip"
                         :data-title="country.title"></span>`,
    computed: {
        country_class: {
            set() {
            },
            get() {
                return this.small ?
                    'country_small country_small_' + this.country.code :
                    'country country_' + this.country.code;
            },
        },
    },

});

Vue.component('device', {
    props: {
        user_agent: ''
    },
    template: `  <span :data-content="user_agent" data-toggle="popover">{{ device }}</span>`,
    computed: {
        device: {
            set() {
            },
            get() {
                let ua = UAParser(this.user_agent);
                if (ua.device.model) {
                    return [
                        _.get(ua.os, 'name', '') + ' ' + _.get(ua.device, 'model', ''),
                        _.get(ua.browser, 'name', '') + ' ' + _.get(ua.browser, 'major', ''),
                    ]
                        .join(', ')
                        .trim()
                } else {
                    return [
                        _.get(ua.os, 'name', ''),
                        _.get(ua.browser, 'name', '') + ' ' + _.get(ua.browser, 'major', ''),
                    ]
                        .join(', ')
                        .trim()
                }

            },
        },
    }
});

Vue.component('money', {
    props: {
        sum: {},
        currency_id: {
            default: null
        },
        mute_zero: {
            default: false
        },
        color: {
            default: false
        },
        space: {
            type: Boolean,
            default: false
        },
    },
    template: `<span :class="[!sum && mute_zero ? 'highlight-zero' : '', color_class]" v-html="template"></span>`,
    computed: {
        template: {
            set() {
            },
            get() {
                let sign = is_null(this.currency_id) ? '' : getCurrencySignById(this.currency_id);

                return number_format(this.sum, 2, '.', ',')
                    + (this.space ? ' ' : '')
                    + sign;
            },
        },
        'color_class'() {
            if (!this.color || this.sum === 0) {
                return '';
            }

            if (this.sum > 0) {
                return 'green_t';
            }

            return 'red_t';
        }
    },
});
Vue.component('payment-requisite-detail', {
    props: ['requisite'],
    template: `<span v-html="template"></span>`,
    computed: {
        template: {
            set() {
            },
            get() {
                switch (parseInt(this.requisite.payment_system_id)) {
                    case WEBMONEY_RUB:
                    case WEBMONEY_USD:
                    case WEBMONEY_EUR:
                        return this.requisite.purse;

                    case PAXUM_RUB:
                    case PAXUM_USD:
                    case PAXUM_EUR:
                        return this.requisite.email;

                    case EPAYMENTS_RUB:
                    case EPAYMENTS_USD:
                    case EPAYMENTS_EUR:
                        return this.requisite.ewallet;

                    case SWIFT_RUB:
                    case SWIFT_USD:
                    case SWIFT_EUR:
                        return this.requisite.card_number;
                }
            }
        },
    },
});

Vue.component('empty-list-message', {
    props: ['message'],
    template: `<h5 class="empty-list-message" v-html="message"></h5>`
});
Vue.component('currency-code-by-id', {
    props: ['currency_id'],
    template: '<span v-html="template"></span>',
    data() {
        return {
            template: ''
        };
    },
    mounted() {
        this.template = getCurrencyCodeById(this.currency_id)
    },
});
Vue.component('currency-sign-by-id', {
    props: ['currency_id'],
    template: '<span v-html="template"></span>',
    data() {
        return {};
    },
    computed: {
        template: {
            set() {
            },
            get() {
                return getCurrencySignById(this.currency_id)
            },
        },
    },
});

Vue.component('lead-substatus-trans', {
    props: {
        sub_status_id: Number
    },
    template: '<span v-html="translation"></span>',

    computed: {
        translation: {
            set() {
            },
            get() {
                return this.sub_status_id ? LANG_LEADS['substatus_id-' + this.sub_status_id] : '';
            },
        },
    },
});

Vue.directive('mute-zero', {
    bind: function (el, binding) {
        if (binding.value == 0 || binding.value === undefined) {
            el.classList.toggle('highlight-zero');
        }
    }
});

Vue.directive('content-preloader', {
    bind(el, binding) {
        if (binding.value) {
            return el.classList.add('preloader');
        }

        el.classList.remove('preloader');
    },

    update(el, binding) {
        if (binding.value) {
            return el.classList.add('preloader');
        }

        el.classList.remove('preloader');
    }
});

Vue.directive('button-preloader', {
    ladda: null,

    bind(el, binding) {
        if (binding.value) {
            this.ladda = Ladda.create(el);
            return this.ladda.start();
        }

        if (isset(this.ladda)) {
            this.ladda.stop();
        }
    },

    update(el, binding) {
        if (binding.value) {
            this.ladda = Ladda.create(el);
            return this.ladda.start();
        }

        if (isset(this.ladda)) {
            this.ladda.stop();
        }
    }
});

Vue.component('gravatar', {
    props: {
        email: String
    },
    template: '<img :src="url" :alt="email"/>\n',

    computed: {
        url: {
            set() {
            },
            get() {
                return 'https://www.gravatar.com/avatar/' + md5(this.email) + '?rating=PG&size=14&default=wavatar';
            },
        },
    },
});
Vue.component('navbar-counter', {
    props: {
        count: {
            default: 0
        }
    },
    template: '<span v-if="count" class="badge badge-sm badge-success m-l-xs">{{ count }}</span>',
});
Vue.component('ticket-status', {
    props: {
        status: {
            type: String
        }
    },
    data() {
        return {
            LANG_TICKETS: LANG_TICKETS,
        };
    },
    template: `<span :class="['badge badge-sm', getStatusColorClass()]">{{ LANG_TICKETS[status] }}</span>`,

    methods: {
        getStatusColorClass() {
            switch (this.status) {
                case 'created':
                    return 'badge-success';
                case 'pending_answer':
                    return 'badge-info';

                case 'pending_reaction':
                    return 'badge-warning';

                case 'deffered':
                    return 'badge-default';

                case 'closed':
                    return 'badge-danger';
            }
        },
    },
});

Vue.component('user-group-badge', {
    props: {
        group: {
            type: Object
        }
    },
    data() {
        return {
            LANG_TICKETS: LANG_TICKETS,
        };
    },
    template: `<span v-if="group" class="badge badge-sm" :style="{backgroundColor: '#' + group.color}"
                >{{ group.title }}</span>`,
});

Vue.component('validation-success', {
    data() {
        return {}
    },
    props: {
        messages: {
            type: Object
        }
    },
    computed: {
        format_messages() {
            return formatServerMessages(this.messages)
        }
    },
    template: `
    <div v-if="Object.size(messages)" v-html="format_messages" class="alert alert-success text-left" 
         style="margin-bottom: 15px;"></div>`
});

Vue.component('validation-errors', {
    data() {
        return {}
    },
    props: {
        messages: {
            type: Object
        }
    },
    computed: {
        format_messages() {
            return formatServerMessages(this.messages)
        }
    },
    template: `
    <div v-if="Object.size(messages)" v-html="format_messages" class="alert alert-danger text-left" 
         style="margin-bottom: 15px;"></div>`
});

Vue.component('target-type-badge', {
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
        }
    },
    props: {
        type: {
            type: String,
            required: true,
        }
    },
    computed: {
        badge_color() {
            switch (this.type) {
                case 'CPL':
                    return 'background-color: #ff5722';

                case 'CPA':
                    return 'background-color: #2196f3';

                default:
                    throw 'Unknown offer\'s type';
            }
        }
    },
    template: `
    <span :style="badge_color" class="badge badge-sm m-l-xs"
          data-toggle="tooltip" :data-title="LANG_MESSAGES.type"
          v-html="type"></span>`
});

Vue.component('cr-epc-table', {
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
        }
    },
    props: {
        cr: {
            type: String,
        },
        epc: {
            type: String,
        },
    },
    template: `
        <table class="indicators-table">
            <tr>
                <td>{{ LANG_MESSAGES.cr }}:</td>
                <td class="w35">{{ cr }}%</td>
            </tr>
            <tr class="w40 nowrap">
                <td>{{ LANG_MESSAGES.epc }}:</td>
                <td class="w35">{{ epc }}</td>
            </tr>
        </table>`
});

Vue.component('ctr-table', {
    data() {
        return {
            ctr_title: LANG_MESSAGES.ctr,
        }
    },
    props: {
        ctr: {
            type: String,
        }
    },
    template: `
        <table class="indicators-table">
            <tr v-if="ctr">
                <td>{{ ctr_title }}:</td>
                <td class="text-right">{{ ctr }}%</td>
            </tr>
        </table>`
});

Vue.component('target-title', {
    props: {
        title: {
            type: String,
        },
        label: {
            type: String,
        },
        label_left: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    template: `
        <span>
            <template v-if="label_left">
                {{ label + ' ' + target_title }}
            </template>
            <template v-if="!label_left">
                {{ title + ' ' + label }}
            </template>
        </span>`
});

Vue.component('offer-rules', {
    data() {
        return {
            LANG_OFFERS: LANG_OFFERS,
            show_all_rules: false,
            show_show_more_rules_button: false,
        }
    },
    props: {
        agreement: {
            type: String,
        },
        forbidden_sources_str: {
            type: String,
        },
    },
    watch: {
        'agreement': {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.setShowMoreButtonVisibility();
                });
            },
        },
        'forbidden_sources_str': {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.setShowMoreButtonVisibility();
                });
            },
        },
    },
    methods: {
        setShowMoreButtonVisibility() {
            let el = this.$refs['rules-container'];

            if (el.offsetHeight + 5 < el.scrollHeight) {
                this.show_show_more_rules_button = true;
            }
        },

        hideButton() {
            this.show_all_rules = true;
            $(this.$refs['show-more'].$el).slideUp(150);
        },
    },
    template: `
    <div>
        <div :class="['offer-rules-container', show_all_rules ? 'show-all-offer-rules' : '']" 
             ref="rules-container">{{ agreement }}
            <div v-if="forbidden_sources_str" class="m-t-xs">
                {{ LANG_OFFERS.forbidden_offer_sources }}: {{ forbidden_sources_str }}
            </div>
        </div>
        <show-more @click="hideButton($event)" v-show="show_show_more_rules_button" ref="show-more"></show-more>
    </div>`
});

Vue.component('offer-inactive-label', {
    props: {
        status: {
            type: String,
        },
    },
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
        };
    },
    template: `<span v-show="status === 'inactive'" 
                      :title="LANG_MESSAGES.is_inactive" 
                      class="label label-sm label-warning" 
                      data-toggle="tooltip"><i class="fa fa-ban"></i></span>`
});

Vue.component('private-label', {
    props: {
        is_private: {
            type: Number,
        },
        only_icon: {
            type: Boolean,
            default: true,
            required: false,
        },
    },
    data() {
        return {
            TITLE: LANG_MESSAGES.is_private,
        };
    },
    mounted() {
        runTooltip()
    },
    template: `
    <span v-show="is_private" :data-toggle="only_icon ? 'tooltip' : ''" 
          :data-title="TITLE" class="label label-sm label-danger display_i_b">
        <template v-if="only_icon"><i class="fa fa-user-secret"></i></template>
        <template v-else>{{ TITLE }}</template>
    </span>`
});

Vue.component('offer-labels', {
    props: {
        labels: {
            type: Array,
        },
    },
    mounted() {
        runTooltip()
    },
    template: `<div><span v-for="label in labels" class="label" :style="'background-color:' + label.color"
                      v-html="label.title"></span></div>`
});

Vue.component('mobile-label', {
    props: {
        is_mobile: {
            type: Number,
        },
    },
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
        };
    },
    mounted() {
        runTooltip()
    },
    template: `<span v-show="is_mobile" :title="LANG_MESSAGES.is_mobile"
                      class="label label-sm label-success display_i_b cursor-default" 
                      data-toggle="tooltip">M</span>`
});

Vue.component('responsive-label', {
    props: {
        is_responsive: {
            type: Number,
        },
    },
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
        };
    },
    mounted() {
        runTooltip()
    },
    template: `<span v-show="is_responsive" :title="LANG_MESSAGES.is_responsive"
                      class="label label-sm label-info display_i_b" 
                      data-toggle="tooltip"><i class="fa fa-arrows-alt""></i></span>`
});

Vue.component('back-call-label', {
    props: {
        is_back_call: {
            type: Number,
        },
    },
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
        };
    },
    mounted() {
        runTooltip()
    },
    template: `<span v-show="is_back_call" :title="LANG_MESSAGES.callback"
                      class="label label-sm label-default inline-block cursor-default" 
                      data-toggle="tooltip">C</span>`
});

Vue.component('back-action-label', {
    props: {
        is_back_action: {
            type: Number,
        },
    },
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
        };
    },
    mounted() {
        runTooltip()
    },
    template: `<span v-show="is_back_action" :title="LANG_MESSAGES.back_action"
                      class="label label-sm label-default inline-block cursor-default" 
                      data-toggle="tooltip">A</i></span>`
});

Vue.component('vibrate-mobile-label', {
    props: {
        is_vibrate_on_mobile: {
            type: Number,
        },
    },
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
        };
    },
    mounted() {
        runTooltip()
    },
    template: `<span v-show="is_vibrate_on_mobile" :title="LANG_MESSAGES.vibration_on_mobile"
                      class="label label-sm label-default inline-block cursor-default"
                      data-toggle="tooltip">V</span>`
});

Vue.component('default-label', {
    props: {
        is_default: {
            type: Number
        },
        only_icon: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            TITLE: LANG_MESSAGES.is_default,
        };
    },
    mounted() {
        runTooltip();
    },
    template: `
    <span v-show="is_default" :data-toggle="only_icon ? 'tooltip' : ''" 
          :data-title="TITLE" class="label label-info label-sm">
        <template v-if="only_icon"><i class="fa fa-check"></i></template>
        <template v-else>{{ TITLE }}</template>
    </span>`
});

Vue.component('inactive-label', {
    props: {
        is_active: {
            type: Number
        },
        only_icon: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            TITLE: LANG_MESSAGES.is_not_active,
        };
    },
    mounted() {
        runTooltip();
    },
    template: `
    <span v-show="!is_active" :data-toggle="only_icon ? 'tooltip' : ''" 
          :data-title="TITLE" class="label label-warning label-sm">
        <template v-if="only_icon"><i class="fa fa-ban"></i></template>
        <template v-else>{{ TITLE }}</template>
    </span>`
});
