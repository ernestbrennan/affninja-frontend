const lead_statistics_mixin = {
    methods: {
        isMobile(lead) {
            return isMobileOrTablet(lead.device_type_id)
        },
    
        getLeadStatusTdStyle(lead) {
            return 'background-color: ' + getTdColorForLeadStatus(lead.status);
        },
    }
};