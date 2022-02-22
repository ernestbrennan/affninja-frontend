const Tab = {
    init() {
        let self = this;
        this.openTab();

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            self.openTab();
        });
    },
    
    openTab() {
        let tab = getSecondLocationPath();

        vm.getReport(tab);

        switch (tab) {
            case 'days':
                documentTitleSet(LANG_REPORTS.reports_by_days + ' - ' + LANG_GLOBAL_APP.name);
                break;

            case 'offers':
                documentTitleSet(LANG_REPORTS.reports_by_offers + ' - ' + LANG_GLOBAL_APP.name);
                break;

            case 'publishers':
                documentTitleSet(LANG_REPORTS.reports_by_publishers + ' - ' + LANG_GLOBAL_APP.name);
                break;

            default:
                throw 'Unknown tab type';
        }
    }
};

let vm = new Vue({
    el: '#reports',
    data: {
        current_report: null,
        ladda: null,
        LANG_STATISTICS: LANG_STATISTICS,
        LANG_MESSAGES: LANG_MESSAGES,
    },

    methods: {
        getReport(report_type) {
            navbar.ready = false;

            this.current_report = report_type;
            this.ladda = LaddaPreloader.start('#stat_submit');
            ContentPreloader.show('#report_tables');

            switch (report_type) {
                case 'days':
                    this.$refs.by_days.getReport();
                    break;

                case 'offers':
                    this.$refs.by_offers.getReport();
                    break;

                case 'publishers':
                    this.$refs.by_publishers.getReport();
                    break;

                default:
                    throw 'Unknown report type';
            }
        },

        onReportBuilt() {
            LaddaPreloader.stop(this.ladda);
            ContentPreloader.hide();

            navbar.ready = true;
        }
    }
});

$(document).ready(function () {
    Filters.init();
    Tab.init();
});