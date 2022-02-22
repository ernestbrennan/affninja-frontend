Vue.component('flow-chart', {
    props: {
        day_statistics: {
            type: Array,
            default: [],
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    data: () => {
        return {
            default_config: {
                type: 'bar',
                barWidth: 7,
                height: '30px',
                barColor: '#3498db',
                negBarColor: '#3498db',
                tooltipFormat: '{{offset:offset}}',
                tooltipValueLookups: {
                    'offset': {},
                },
            },
        }
    },

    mounted() {
        if (this.day_statistics.length) {
            return this.runChart();
        }

        this.runChartWithoutData();
    },

    methods: {
        runChart() {
            let chart_values = [];

            for (let i = 0; i < this.day_statistics.length; ++i) {
                chart_values[i] = LANG_FLOWS.hosts + ': '
                    + this.day_statistics[i].hosts + '<br>'
                    + this.day_statistics[i].hour + ':00 -> '
                    + this.day_statistics[i].hour + ':59';
            }

            let hosts = _.map(this.day_statistics, 'hosts');
            this.default_config.tooltipValueLookups['offset'] = chart_values;

            $('#' + this.id).sparkline(hosts, this.default_config);
        },

        runChartWithoutData() {
            let chart_values = [],
                hour = moment(DATE_TIME_TO_DEFAULT).hour(),
                hosts = [];

            for (let i = 23; i >= 0; i--) {
                chart_values[i] = LANG_FLOWS.hosts + ': '
                    + 0 + '<br>'
                    + hour + ':00 -> '
                    + hour + ':59';

                hour--;

                if (hour < 0) {
                    hour = 23;
                }

                hosts.push(0);
            }

            this.default_config.tooltipValueLookups['offset'] = chart_values;

            $('#' + this.id).sparkline(hosts, this.default_config);
        },
    },

    template: `<span :id='id'><canvas></canvas></span>`,
});