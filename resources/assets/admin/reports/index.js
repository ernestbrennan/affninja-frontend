var vm = new Vue({
    el: '#reports',
    data: {
        current_report: 'days',
        LANG_STATISTICS: LANG_STATISTICS,

        group_by_fields: [{
            value: 'created_at',
            title: LANG_STATISTICS.group_by_created_at
        }, {
            value: 'processed_at',
            title: LANG_STATISTICS.group_by_processed_at
        }, {
            value: 'processed_at_held',
            title: LANG_STATISTICS.group_by_held_processed_at
        }, {
            value: 'publisher_hash',
            title: LANG_STATISTICS.group_by_publisher_id
        }, {
            value: 'advertiser_hash',
            title: LANG_STATISTICS.group_by_advertiser_id
        }, {
            value: 'offer_hash',
            title: LANG_STATISTICS.group_by_offer_id
        }, {
            value: 'country_id',
            title: LANG_STATISTICS.group_by_target_geo
        }, {
            value: 'target_geo',
            title: LANG_STATISTICS.group_by_offer_country
        }],
    },

    created() {
        filters_bus.$on('filters-applies', () => {
            this.getReport('days');
        });
    },

    mounted() {
        this.getReport('days');
    },

    methods: {

        getReport(report_type) {
            navbar.ready = false;

            this.current_report = report_type;

            ContentPreloader.show('#report_tables');

            switch (report_type) {
                case 'days':
                    this.$refs.by_days.getReport();
                    break;

                default:
                    throw 'Unknown report type';
            }
        },

        onReportBuilt() {
            ContentPreloader.hide();
            navbar.ready = true;
        },
    }
});