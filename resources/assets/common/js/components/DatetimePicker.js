Vue.component('datetime-picker', {
    template: `<input class="form-control">`,
    props: {
        value: {
            type: [String, Number],
            validator(value) {
                if (is_null(value)) {
                    return true;
                }

                return moment(value).isValid();
            },
        },
    },
    data() {
        return {
            server_date_format: SERVER_TIME_FORMAT,
            fallback_time: DATE_TIME_TO_DEFAULT,
            datetime_picker: null,
            init_picker: false,
        };
    },

    watch: {
        'value': {
            immediate: true,
            handler(value,before) {
                if (!isset(this.value) && before === undefined) {
                    this.$emit('input', this.fallback_time);
                }

                if (this.init_picker) {
                    return this.refreshPicker();
                }

                this.$nextTick(() => {
                    this.initPicker();
                });
            },
        },
    },

    methods: {
        initPicker() {
            let self = this;

            this.datetime_picker = $(this.$el)
                .datetimepicker({
                    defaultDate: Date.parse(this.value || this.fallback_time),
                    format: 'DD.MM.YYYY HH:mm:ss',
                    locale: 'ru'
                })
                .on('dp.change', function (e) {
                    self.$emit('input', e.date.format(self.server_date_format));
                });

            this.init_picker = true;
        },

        refreshPicker() {
            let date = moment(this.value) || this.fallback_time;
            this.datetime_picker.data("DateTimePicker").date(date);
        },
    },
});
