Vue.component('date-filter', {
    props: {
        validity_time: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            name: 'date',
            LANG_FILTERS: LANG_FILTERS,
            date_from: null,
            date_to: null,
            today: null,
            yesterday: null,
            last_7_days: null,
            first_day_of_week: null,
            first_day_of_prev_week: null,
            last_day_of_prev_week: null,
            first_day_of_month: null,
            first_day_of_prev_month: null,
            last_day_of_prev_month: null,
            date_from_el: null,
            date_to_el: null,
            start_validity_time: null
        };
    },
    mixins: [filters_mixin],

    computed: {
        'date_range'() {
            return date('d.m.Y', strtotime(this.date_from)) + ' - ' + date('d.m.Y', strtotime(this.date_to));
        },
    },

    mounted() {
        this.today = moment(DATE_TIME_TO_DEFAULT).format('YYYY-MM-DD');
        this.last_7_days = moment(DATE_TIME_TO_DEFAULT).subtract(6, 'days').format('YYYY-MM-DD');
        this.start_validity_time = moment(DATE_TIME_TO_DEFAULT).year(2018).month(2).date(17).format('YYYY-MM-DD');


        let default_date_from = this.validity_time ? this.start_validity_time : this.last_7_days;
        this.date_from = UrlParameter.getDateFrom() || default_date_from;
        this.date_to = UrlParameter.getDateTo() || this.today;

        filters_bus.$emit('date_from-init', this.date_from);
        filters_bus.$emit('date_to-init', this.date_to);

        this.yesterday = moment(DATE_TIME_TO_DEFAULT).subtract(1, 'days').format('YYYY-MM-DD');
        this.first_day_of_week = moment(DATE_TIME_TO_DEFAULT).weekday(1).format('YYYY-MM-DD');
        this.first_day_of_prev_week = moment(DATE_TIME_TO_DEFAULT).weekday(-6).format('YYYY-MM-DD');
        this.last_day_of_prev_week = moment(DATE_TIME_TO_DEFAULT).weekday(0).format('YYYY-MM-DD');
        this.first_day_of_month = moment(DATE_TIME_TO_DEFAULT).date(1).format('YYYY-MM-DD');
        this.first_day_of_prev_month = moment(DATE_TIME_TO_DEFAULT).subtract(1, 'month').date(1).format('YYYY-MM-DD');
        this.last_day_of_prev_month = moment(DATE_TIME_TO_DEFAULT).date(0).format('YYYY-MM-DD');

        this.date_from_el = $('#filter_date_from');
        this.date_to_el = $('#filter_date_to');

        this.initDatepicker();
    },

    watch: {
        'date_from'(new_value, old_value) {
            if (is_null(old_value)) {
                return;
            }
            this.date_from_el.datepicker('update', moment(this.date_from).format('DD.MM.YYYY'));
            filters_bus.$emit('date_from-updated', this.date_from);
        },

        'date_to'(new_value, old_value) {
            if (is_null(old_value)) {
                return;
            }
            this.date_to_el.datepicker('update', moment(this.date_to).format('DD.MM.YYYY'));
            filters_bus.$emit('date_to-updated', this.date_to);
        },
    },

    methods: {
        initDatepicker() {
            let self = this;

            addDatepickerRuLocale();

            this.date_from_el
                .datepicker({
                    format: 'dd.mm.yyyy',
                    weekStart: 1,
                    changeMonth: true,
                    language: 'ru',
                    endDate: 'today',
                    maxDate: 'today'
                })
                .datepicker('update', moment(this.date_from).format('DD.MM.YYYY'));

            this.date_to_el
                .datepicker({
                    format: 'dd.mm.yyyy',
                    weekStart: 1,
                    changeMonth: true,
                    language: 'ru',
                    endDate: moment(DATE_TIME_TO_DEFAULT).hour(23)._d,
                    maxDate: 'today'
                })
                .datepicker('update', moment(this.date_to).format('DD.MM.YYYY'));

            changeDatepickerSymbols();
        },

        hideFilter() {
            this.is_open = !this.is_open;
        },

        applyFilter() {
            this.date_from = moment(this.date_from_el.datepicker("getDate")).format('YYYY-MM-DD');
            this.date_to = moment(this.date_to_el.datepicker("getDate")).format('YYYY-MM-DD');

            this.hideFilter();
        },

        setTodayPeriod() {
            this.date_from = this.today;
            this.date_to = this.today;
            this.hideFilter();
        },

        setYesterdayPeriod() {
            this.date_from = this.yesterday;
            this.date_to = this.yesterday;
            this.hideFilter();
        },

        setLast7DaysPeriod() {
            this.date_from = this.last_7_days;
            this.date_to = this.today;
            this.hideFilter();
        },

        setThisWeekPeriod() {
            this.date_from = this.first_day_of_week;
            this.date_to = this.today;
            this.hideFilter();
        },

        setPrevWeekPeriod() {
            this.date_from = this.first_day_of_prev_week;
            this.date_to = this.last_day_of_prev_week;
            this.hideFilter();
        },

        setThisMonthPeriod() {
            this.date_from = this.first_day_of_month;
            this.date_to = this.today;
            this.hideFilter();
        },

        setPrevMonthPeriod() {
            this.date_from = this.first_day_of_prev_month;
            this.date_to = this.last_day_of_prev_month;
            this.hideFilter();
        },

        setAllValidityTime() {
            this.date_from = this.start_validity_time;
            this.date_to = this.today;
            this.hideFilter();
        }
    },
    template: `<div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">{{ date_range}}</button>
        <div v-show="is_open" :class="['filter_wrap_new','filter_date_wrap', validity_time ? 'validity_time' : '']">
            <div class="filter_date_from_wrap">
                <div id="filter_date_from"></div>
            </div>
            <div class="filter_date_to_wrap">
                <div id="filter_date_to"></div>
            </div>
            <div class="filter_date_set_wrap">
                <ul class="set_date_filter">
                    <li v-if="validity_time">
                        <a @click.prevent="setAllValidityTime" href="#">{{ LANG_FILTERS.all_validity_time }}</a>
                    </li>
                    <li><a @click.prevent="setTodayPeriod" href="#">{{ LANG_FILTERS.today }}</a></li>
                    <li><a @click.prevent="setYesterdayPeriod" href="#">{{ LANG_FILTERS.yesterday }}</a></li>
                    <li><a @click.prevent="setLast7DaysPeriod" href="#">{{ LANG_FILTERS.last_7_days }}</a></li>
                    <li><a @click.prevent="setThisWeekPeriod" href="#">{{ LANG_FILTERS.current_week }}</a></li>
                    <li><a @click.prevent="setPrevWeekPeriod" href="#">{{ LANG_FILTERS.prev_week }}</a></li>
                    <li><a @click.prevent="setThisMonthPeriod" href="#">{{ LANG_FILTERS.this_month }}</a></li>
                    <li><a @click.prevent="setPrevMonthPeriod" href="#">{{ LANG_FILTERS.prev_month }}</a></li>
                </ul>
                <button @click="applyFilter" class="btn btn-info btn-sm filter_submit filter_date_submit"
                        id="filter_date_submit" type="button">{{ LANG_FILTERS.apply }}
                </button>
                <img @click="hideFilter" class="filter_button_close" src="/images/close.svg" height="19"
                     width="19">
            </div>
        </div>
    </div>`
});
