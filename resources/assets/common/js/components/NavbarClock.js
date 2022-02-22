Vue.component('navbar-clock', {
    data() {
        return {
            server_time: LANG_NAVBAR.server_time,
            timezone: App.user.timezone,
            time: null,
        };
    },

    mounted() {
        this.runClock();
    },

    methods: {
        runClock() {
            this.getTime();

            setInterval(() => {
                this.getTime();
            }, 1000);
        },
        getTime() {
            this.time = moment().tz(this.timezone).format('DD.MM H:mm:ss');
        }
    },
    template: `<span>{{ server_time + ': ' }}<br><small>{{ time }} ({{timezone}})</small></span>`,
});