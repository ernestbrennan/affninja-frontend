Vue.component('vue-timezone', {
    template: `<div class="form-group">
                   <label class="control-label">{{ LANG_MESSAGES.timezone }}:</label>
                   <select-item v-model="selected" :options="timezones" ></select-item>
               </div>`,

    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            timezones: [],
            selected: {},
        }
    },
    props: ['value'],

    created() {
        this.buildTimezonesList();
    },

    watch: {
        'value'() {
            if (!this.value.length) {
                return;
            }

            this.selected = _.find(this.timezones, {value: this.value});
        },

        'selected'() {
            this.$emit('input', this.selected.value);
        },
    },

    methods: {
        buildTimezonesList() {

            let timezones = this.getTimezonesList(),
                offset;

            timezones.forEach(timezone => {
                offset = moment().tz(timezone.php)._offset / 60;

                offset = `${offset >= 1 ? '+' + offset : offset}:00`;

                this.timezones.push({
                    title: `(GMT ${offset}) ${timezone.name}`,
                    value: timezone.php
                })
            });
        },

        getTimezonesList() {
            return [{
                php: 'Pacific/Kwajalein',
                name: 'Eniwetok, Kwajalein'
            }, {
                php: 'Pacific/Samoa',
                name: 'Midway Island, Samoa'
            }, {
                php: 'America/Adak',
                name: 'Hawaii'
            }, {
                php: 'America/Anchorage',
                name: 'Alaska'
            }, {
                php: 'America/Los_Angeles',
                name: 'Pacific Time (US & Canada)'
            }, {
                php: 'US/Mountain',
                name: 'Mountain Time (US & Canada)'
            }, {
                php: 'US/Central',
                name: 'Central Time (US & Canada), Mexico City'
            }, {
                php: 'US/Eastern',
                name: 'Eastern Time (US & Canada), Bogota, Lima'
            }, {
                php: 'America/La_Paz',
                name: 'Atlantic Time (Canada), Caracas, La Paz'
            }, {
                php: 'America/Argentina/Buenos_Aires',
                name: 'Brazil, Buenos Aires, Georgetown'
            }, {
                php: 'America/Noronha',
                name: 'Mid-Atlantic'
            }, {
                php: 'Atlantic/Cape_Verde',
                name: 'Azores, Cape Verde Islands'
            }, {
                php: 'Europe/London',
                name: 'Western Europe Time, London, Lisbon, Casablanca'
            }, {
                php: 'Europe/Madrid',
                name: 'Brussels, Copenhagen, Madrid, Paris'
            }, {
                php: 'Europe/Kiev',
                name: 'Kiev, Kaliningrad, South Africa'
            }, {
                php: 'Europe/Moscow',
                name: 'Baghdad, Riyadh, Moscow, St. Petersburg'
            }, {
                php: 'Asia/Tbilisi',
                name: 'Abu Dhabi, Muscat, Baku, Tbilisi'
            }, {
                php: 'Asia/Yekaterinburg',
                name: 'Ekaterinburg, Islamabad, Karachi, Tashkent'
            }, {
                php: 'Asia/Almaty',
                name: 'Almaty, Dhaka, Colombo'
            }, {
                php: 'Asia/Bangkok',
                name: 'Bangkok, Hanoi, Jakarta'
            }, {
                php: 'Asia/Hong_Kong',
                name: 'Beijing, Perth, Singapore, Hong Kong'
            }, {
                php: 'Asia/Tokyo',
                name: 'Tokyo, Seoul, Osaka, Sapporo, Yakutsk'
            }, {
                php: 'Asia/Vladivostok',
                name: 'Eastern Australia, Guam, Vladivostok'
            }, {
                php: 'Asia/Magadan',
                name: 'Magadan, Solomon Islands, New Caledonia'
            }, {
                php: 'Pacific/Auckland',
                name: 'Auckland, Wellington, Fiji, Kamchatka'
            }];
        }
    },
});