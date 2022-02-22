let Stat = {
    calculateCr(approved_count, hits) {
        approved_count = parseInt(approved_count);
        hits = parseInt(hits);

        let cr = 0;
        if (approved_count !== 0 && hits !== 0) {

            cr = approved_count / hits * 100;
            if (cr > 100) {
                cr = 100;
            }
        }

        return number_format(cr, 4);
    },

    calculateCrUnique(approved_count, unique_count) {
        approved_count = parseInt(approved_count);
        unique_count = parseInt(unique_count);

        let cr = 0;
        if (approved_count !== 0 && unique_count !== 0) {

            cr = approved_count / unique_count * 100;
            if (cr > 100) {
                cr = 100;
            }
        }

        return number_format(cr, 4);
    },

    calculateEpc(leads_payout, hits) {
        leads_payout = parseFloat(leads_payout);
        hits = parseFloat(hits);

        let epc = 0;
        if (leads_payout !== 0 && hits !== 0) {
            epc = leads_payout / hits;
        }

        return number_format(epc, 4);
    },

    calculateEpcUnique(leads_payout, unique_count) {
        leads_payout = parseFloat(leads_payout);
        unique_count = parseFloat(unique_count);

        let epc_unique = 0;
        if (leads_payout !== 0 && unique_count !== 0) {
            epc_unique = leads_payout / unique_count;
        }

        return number_format(epc_unique, 4);
    },

    calculateUc(offer_hosts, flow_hosts) {
        flow_hosts = parseInt(flow_hosts);
        offer_hosts = parseInt(offer_hosts);

        let uc = 0;
        if (flow_hosts !== 0) {
            uc = offer_hosts / flow_hosts * 100;
        }

        return number_format(uc);
    },

    calculateRealApprove(approved_count, cancelled_count, held_count) {
        approved_count = parseInt(approved_count);
        cancelled_count = parseInt(cancelled_count);
        held_count = parseInt(held_count);

        let real_approve = 0;
        if (approved_count !== 0 || cancelled_count !== 0 || held_count !== 0) {
            real_approve = approved_count / (approved_count + cancelled_count + held_count) * 100;
        }

        return number_format(real_approve);
    },

    calculateExpectedApprove(approved_count, cancelled_count, held_count) {
        approved_count = parseInt(approved_count);
        cancelled_count = parseInt(cancelled_count);
        held_count = parseInt(held_count);


        let expected_approve = 0;
        if (approved_count !== 0 || cancelled_count !== 0 || held_count !== 0) {
            expected_approve = (approved_count + held_count) / (approved_count + cancelled_count + held_count) * 100;
        }

        return number_format(expected_approve);
    },

    calculateApprove(approved_count, cancelled_count, held_count, trashed_count) {

        approved_count = parseInt(approved_count);
        cancelled_count = parseInt(cancelled_count);
        held_count = parseInt(held_count);
        trashed_count = parseInt(trashed_count);

        let approve = 0;
        if (approved_count !== 0 || cancelled_count !== 0 || held_count !== 0 || trashed_count !== 0) {
             approve = approved_count / (approved_count + cancelled_count + held_count + trashed_count) * 100;
        }

        return number_format(approve);
    },

    calculateRoi(enrolled_payout, traffic_cost) {

        enrolled_payout = parseFloat(enrolled_payout);
        traffic_cost = parseFloat(traffic_cost);

        if (enrolled_payout > 0 && traffic_cost === 0) {
            return '9999';
        }

        if (traffic_cost === 0 || enrolled_payout - traffic_cost === 0) {
            return '0.00';
        }

        return (( enrolled_payout - traffic_cost ) / traffic_cost * 100).toFixed(2);
    },

    getRoiTitle(roi, enrolled, traffic_cost) {

        enrolled = parseFloat(enrolled);
        traffic_cost = parseFloat(traffic_cost);

        if (enrolled > 0 && traffic_cost === 0) {
            return '∞';
        }

        if (roi > 1000) {
            roi = '>1000';
        }

        return roi + '%';
    },

    calculateEnrolled(leads_payout, revshare_payout) {
        return (parseFloat(leads_payout) - parseFloat(revshare_payout));
    },

    calculateCtr(transit_landing_count, transit_hosts) {

        transit_landing_count = parseInt(transit_landing_count);
        transit_hosts = parseInt(transit_hosts);

        let ctr = 0;
        if (transit_landing_count !== 0 && transit_hosts !== 0) {
            ctr = transit_landing_count / transit_hosts * 100;
        }

        return number_format(ctr, 4);
    }
};