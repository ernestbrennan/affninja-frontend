Vue.component('chart', {
    template: '#chart-tpl',
    data() {
        return {
            LANG_DASHBOARD: LANG_DASHBOARD,
            currency_id: 3,
            no_chart_data: false,
            period: 'week',
            period_len: {
                by_day: 24,
                by_week: 7,
                by_month: 30,
            },
            chart: null,
            chart_info: [],
            labels: [],
            approved_leads: {
                label: LANG_DASHBOARD.approved_leads,
                data: [],
                backgroundColor: [APPROVED_LEADS_BACKGROUND],
                borderColor: [APPROVED_LEADS_BORDER],
                borderWidth: BORDER_WIDTH,
                pointBorderColor: APPROVED_LEADS_BORDER,
                pointBackgroundColor: APPROVED_LEADS_BACKGROUND,
                pointHoverRadius: POINT_HOVER_RADIUS,
            },
            leads: {
                label: LANG_DASHBOARD.leads,
                data: [],
                backgroundColor: [LEADS_BACKGROUND],
                borderColor: [LEADS_BORDER],
                borderWidth: BORDER_WIDTH,
                pointBorderColor: LEADS_BORDER,
                pointBackgroundColor: LEADS_BACKGROUND,
                pointHoverRadius: POINT_HOVER_RADIUS,
            },
            payout: {
                label: LANG_DASHBOARD.payout,
                data: [],
                backgroundColor: [PAYOUT_BACKGROUND],
                borderColor: [PAYOUT_BORDER],
                borderWidth: BORDER_WIDTH,
                pointBorderColor: PAYOUT_BACKGROUND,
                pointBackgroundColor: PAYOUT_BACKGROUND,
                pointHoverRadius: POINT_HOVER_RADIUS,
            },
            hosts: {
                label: LANG_DASHBOARD.hosts,
                data: [],
                backgroundColor: [HOSTS_BACKGROUND],
                borderColor: [HOSTS_BORDER],
                borderWidth: BORDER_WIDTH,
                pointBorderColor: HOSTS_BORDER,
                pointBackgroundColor: HOSTS_BACKGROUND,
                pointHoverRadius: POINT_HOVER_RADIUS,
            },
            real_approved_leads: [],
            real_leads: [],
            real_payout: [],
            real_hosts: [],
            loading: false,
            preloared: null,
            timer: null,
        }
    },

    created() {
        navbar_account_bus.$on('change-account-currency', currency_code => {
            this.onSelectCurrency(getCurrencyIdByCode(currency_code));
        });
    },

    mounted() {
        this.currency_id = getCurrencyIdByCode(UserAccount.getAccountCurrency());
        this.initCurrency();
        this.getLocalStorage();
        this.getStatistics();
    },

    watch: {
        'loading'() {
            if (this.loading) {
                if (this.timer !== null) {
                    clearTimeout(this.timer);
                }

                return this.preloared = ContentPreloader.show('#chart_wrap');
            }

            this.timer = setTimeout(() => {
                ContentPreloader.hide(this.preloared);
            }, 300)
        },
    },

    methods: {
        onSelectCurrency(currency_id) {
            this.currency_id = currency_id;
            this.getStatistics();
            this.initLocalStorage();

            UserAccount.setAccountCurrency(getCurrencyCodeById(currency_id));
        },

        onSelectPeriod(period) {
            this.period = period;
            this.getStatistics();
            this.initLocalStorage();
        },

        initCurrency() {
            this.currency_id = getCurrencyIdByCode(UserAccount.getAccountCurrency());
        },

        initLocalStorage() {
            let dashboard = {
                currency_id: this.currency_id,
                period: this.period,
            };

            localStorage.setItem('dashboard', JSON.stringify(dashboard));
        },

        getLocalStorage() {
            let dashboard = JSON.parse(localStorage.getItem('dashboard'));

            if (!Object.size(dashboard)) {
                return;
            }

            this.currency_id = dashboard.currency_id;
            this.period = dashboard.period;
        },

        getStatistics() {
            this.no_chart_data = false;

            let params = {
                currency_id: this.currency_id,
                period: this.period,
            };

            this.loading = true;

            api.get('/publisher_statistics.getList', {params: params}).then(response => {
                if (response.data.response.length) {
                    this.no_chart_data = false;
                    this.chart_info = response.data.response;
                    return this.createChart();
                }

                this.chart_info = [];
                this.no_chart_data = true;
                this.createChart();
            }).catch(() => {
                this.no_chart_data = true;
                this.loading = false;
            });
        },

        createChart() {
            this.clearChartConfig();
            this.addStatisticsByPeriod();
            this.recalculateDataInPercent();

            this.normalizeChartData();

            let ctx = this.getContext();
            let config = this.generateChartConfig();

            if (this.chart !== null) {
                this.chart.destroy();
            }

            this.chart = new Chart(ctx, config);
            this.loading = false;
        },

        normalizeChartData() {
            this.approved_leads.data.reverse();
            this.leads.data.reverse();
            this.payout.data.reverse();
            this.hosts.data.reverse();

            this.real_approved_leads.reverse();
            this.real_leads.reverse();
            this.real_payout.reverse();
            this.real_hosts.reverse();
        },

        getContext() {
            return document.getElementById("myChart").getContext('2d');
        },

        generateChartConfig() {
            let self = this;

            return {
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: [
                        this.hosts,
                        this.payout,
                        this.leads,
                        this.approved_leads,
                    ],
                },
                real_data: [
                    this.real_hosts,
                    this.real_payout,
                    this.real_leads,
                    this.real_approved_leads,
                ],
                options: {
                    animation: {
                        duration: 300,
                    },
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            left: 0,
                            right: 15,
                            top: 10,
                            bottom: 10,
                        },
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                callback: function (value, index, values) {
                                    if (value === 1) {
                                        return '';
                                    }
                                    return null;
                                },
                            },
                            gridLines: {
                                drawBorder: false,
                                drawOnChartArea: true,
                                color: GRID_LINES_COLOR,
                                borderDash: [2, 5],
                                drawTicks: false,
                            },
                        }],
                        xAxes: [{
                            gridLines: {
                                display: true,
                                drawOnChartArea: true,
                                color: GRID_LINES_COLOR,
                                borderDash: [2, 5],
                                drawBorder: true,
                                drawTicks: false,
                            },
                            scaleLabel: {
                                display: false,
                            },
                            ticks: {
                                padding: 8,
                                beginAtZero: true,
                                maxRotation: self.period === 'month' ? 0 : 50,
                                autoSkip: true,
                                callback: function (value, index, values) {
                                    if (self.period === 'month') {
                                        if (index === 0 || index + 1 === values.length) {
                                            return value;
                                        }

                                        if ((index + 1) % 7 === 0) {
                                            return value;
                                        }

                                        return '';
                                    }

                                    return value;
                                },
                            },
                        }],
                    },
                    tooltips: {
                        mode: 'point',
                        titleMarginBottom: 15,
                        bodySpacing: 10,
                        xPadding: 10,
                        yPadding: 10,
                        callbacks: {
                            labelColor: function (tooltip_item, chart) {
                                let background_color = chart.config.data.datasets[tooltip_item.datasetIndex].borderColor[0];

                                let real_value = chart.config.real_data[tooltip_item.datasetIndex][tooltip_item.index];

                                tooltip_item.yLabel = real_value;

                                if (tooltip_item.datasetIndex === 1) {
                                    tooltip_item.yLabel = tooltip_item.yLabel + ' ' + getCurrencyCodeById(+self.currency_id);
                                }

                                return {
                                    borderColor: TOOLTIP_LABELS_BORDER,
                                    backgroundColor: background_color,
                                }
                            },

                            labelTextColor: function (tooltipItem, chart) {
                                return TOOLTIP_TEXT_COLOR;
                            },
                        },
                        backgroundColor: TOOLTIP_BACKGROUND,
                        displayColors: true,
                        multiKeyBackground: TOOLTIP_LABELS_BORDER,
                    },
                },
            };
        },

        addStatisticsByPeriod() {
            switch (this.period) {
                case 'day':
                    return this.addStatisticsByDay();

                case 'week':
                    return this.addStatisticsByWeek();

                case 'month':
                    return this.addStatisticsByMonth();

                default:
                    throw 'Undefined type of period';
            }
        },

        addStatisticsByDay() {
            let now = moment(DATE_TIME_TO_DEFAULT);

            for (let i = 0; i < this.period_len.by_day; i++) {
                formatDate = moment(now).subtract(i, 'hour').hour();

                formatDate < 10 ? formatDate = '0' + formatDate : formatDate;

                this.labels[i] = formatDate + ':00';

                let params = _.find(this.chart_info, {'hour': parseInt(formatDate)});
                this.addParamsToRealData(params);
            }

            this.labels.reverse();
        },

        addStatisticsByWeek() {
            let curDate = moment(DATE_TIME_TO_DEFAULT) / 1000,
                day = 24 * 3600;

            for (let i = this.period_len.by_week - 1; i >= 0; i--) {
                let formatDate = date('Y-m-d', curDate),
                    params = _.find(this.chart_info, {'date': formatDate});

                this.labels[i] = date('d.m', curDate);
                this.addParamsToRealData(params);

                curDate -= day;
            }
        },

        addStatisticsByMonth() {
            let curDate = moment(DATE_TIME_TO_DEFAULT) / 1000,
                day = 24 * 3600,
                prevMonthDate = (moment(DATE_TIME_TO_DEFAULT).subtract(1, 'month') / 1000) - (day / 2);

            for (let i = 0; curDate > prevMonthDate; curDate -= day) {
                let formatDate = date('Y-m-d', curDate),
                    params = _.find(this.chart_info, {'date': formatDate});

                this.labels[i++] = date('d.m', curDate);
                this.addParamsToRealData(params);
            }

            this.labels.reverse();
        },

        addParamsToRealData(params) {
            if (!Object.size(params)) {
                this.real_approved_leads.push(0);
                this.real_leads.push(0);
                this.real_payout.push(0);
                this.real_hosts.push(0);
                return;
            }

            this.real_approved_leads.push(+params.approved_leads);
            this.real_leads.push(+params.leads);
            this.real_payout.push(parseInt(params.payout));
            this.real_hosts.push(+params.hosts);
        },

        recalculateDataInPercent() {
            let max = {
                approved_leads: Math.max.apply(null, this.real_approved_leads),
                leads: Math.max.apply(null, this.real_leads),
                payout: Math.max.apply(null, this.real_payout),
                hosts: Math.max.apply(null, this.real_hosts),
            };

            this.hosts.data = this.real_hosts.map(item => {
                return max.hosts === 0 ? 0 : (item / max.hosts);
            });

            this.leads.data = this.real_leads.map(item => {
                return max.leads === 0 ? 0 : (item / max.leads) * 0.8;
            });

            this.approved_leads.data = this.real_approved_leads.map(item => {
                return max.approved_leads === 0 ? 0 : (item / max.approved_leads) * 0.7;
            });

            this.payout.data = this.real_payout.map(item => {
                return max.payout === 0 ? 0 : (item / max.payout) * 0.9;
            });
        },

        clearChartConfig() {
            this.labels.splice(0);
            this.approved_leads.data.splice(0);
            this.leads.data.splice(0);
            this.payout.data.splice(0);
            this.hosts.data.splice(0);

            this.real_approved_leads.splice(0);
            this.real_leads.splice(0);
            this.real_payout.splice(0);
            this.real_hosts.splice(0);
        },
    },
});