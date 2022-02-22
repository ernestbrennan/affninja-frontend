let NavbarConfig = [{
    title: LANG_NAVBAR.offers,
    href: '/offers',
}, {
    title: LANG_NAVBAR.statistics,
    href: '/statistics',
    childrens: [{
        title: LANG_NAVBAR.tab_day,
        href: '/statistics/day',
        id: '#tab_day_wrap',
    }, {
        title: LANG_NAVBAR.tab_flow,
        href: '/statistics/flow',
        id: '#tab_flow_wrap',
    }, {
        title: LANG_NAVBAR.tab_offer,
        href: '/statistics/offer',
        id: '#tab_offer_wrap',
    }, {
        title: LANG_NAVBAR.geo,
        href: '/statistics/target_geo',
        id: '#tab_geo_ip_wrap',
    }, {
        title: LANG_NAVBAR.geo_ip,
        href: '/statistics/geo_ip',
        id: '#tab_target_geo_wrap',
    }, {
        title: LANG_NAVBAR.tab_landing,
        href: '/statistics/landing',
        id: '#tab_landing_wrap',
    }, {
        title: LANG_NAVBAR.tab_transit,
        href: '/statistics/transit',
        id: '#tab_transit_wrap',
    }, {
        title: LANG_NAVBAR.reports,
        href: '/statistics/report',
        id: '#tab_report_wrap',
    }, {
        title: LANG_NAVBAR.devices,
        href: '/statistics/device',
        id: '#tab_device_wrap',
    }, {
        title: LANG_NAVBAR.leads,
        href: '/statistics/leads',
        id: '#tab_leads_wrap',
    },]
}, {
    title: LANG_NAVBAR.finance,
    href: '/finance',
    childrens:
        [{
            title: LANG_NAVBAR.payment_tab,
            href: '/finance/payment',
            id: '#payment_tab_wrap',
        }, {
            title: LANG_NAVBAR.specification_hold_tab,
            href: '/finance/specification_hold',
            id: '#specification_hold_tab_wrap',
        }, {
            title: LANG_NAVBAR.payment_requisites,
            href: '/finance/requisites',
            id: '#requisites_tab_wrap',
        },]
}, {
    title: LANG_NAVBAR.tools,
    href: '/tools',
    childrens:
        [{
            title: LANG_NAVBAR.flows,
            href: '/tools/flows',
        }, {
            title: LANG_NAVBAR.domain_parking,
            href: '/tools/domains',
        }, {
            title: LANG_NAVBAR.postbackout_logs,
            href: '/tools/postbackout_logs',
        }, {
            title: LANG_NAVBAR.api,
            href: '/tools/api',
            permission: in_array('API', USER_PERMISSIONS),
        },]
}, {
    title: LANG_NAVBAR.tickets,
    href: '/tickets',
}];