let NavbarConfig = [{
    title: LANG_NAVBAR.offers,
    href: '/offers',
}, {
    title: LANG_NAVBAR.users,
    href: '/users',
    childrens:
        [{
            title: LANG_NAVBAR.publishers,
            href: '/users/publishers',
            id: '#publishers_tab_wrap',
        }, {
            title: LANG_NAVBAR.supports,
            href: '/users/supports',
            id: '#supports_tab_wrap',
        }, {
            title: LANG_NAVBAR.advertisers,
            href: '/users/advertisers',
            id: '#advertisers_tab_wrap',
        }, {
            title: LANG_NAVBAR.managers,
            href: '/users/managers',
            id: '#managers_tab_wrap',
        }, {
            title: LANG_NAVBAR.admins,
            href: '/users/administrators',
            id: '#administrators_tab_wrap',
        }, {
            title: LANG_NAVBAR.user_groups,
            href: '/users/user_groups',
            inner_page: true,
        },]
}, {
    title: LANG_NAVBAR.statistics,
    href: '/statistics',
    childrens:
        [{
            title: LANG_NAVBAR.reports,
            href: '/statistics/reports',
            inner_page: true,
        }, {
            title: LANG_NAVBAR.date,
            href: '/statistics/day',
            id: '#tab_day_wrap',
        }, {
            title: LANG_NAVBAR.publishers,
            href: '/statistics/publisher',
            id: '#tab_publisher_wrap',
        }, {
            title: LANG_NAVBAR.offers,
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
            title: LANG_NAVBAR.landings,
            href: '/statistics/landing',
            id: '#tab_landing_wrap',
        }, {
            title: LANG_NAVBAR.transits,
            href: '/statistics/transit',
            id: '#tab_transit_wrap',
        },]
}, {
    title: LANG_NAVBAR.leads,
    href: '/leads',
}, {
    title: LANG_NAVBAR.finance,
    href: '/finance',
    count: App.user.wait_payments_count,
    childrens:
        [{
            title: LANG_NAVBAR.payment,
            href: '/finance/payments',
            count: App.user.wait_payments_count,
        }, {
            title: LANG_NAVBAR.payment_system,
            href: '/finance/payment_system',
        }, {
            title: LANG_NAVBAR.advertiser_balance,
            href: '/finance/deposit',
        }, {
            title: LANG_NAVBAR.advertisers_leads,
            href: '/finance/advertisers',
        },]
}, {
    title: LANG_NAVBAR.tools,
    href: '/tools',
    count: App.user.failed_jobs_count,
    childrens:
        [{
            title: LANG_NAVBAR.offer_categories,
            href: '/tools/offer_category',
        }, {
            title: LANG_NAVBAR.integration,
            href: '/tools/integration',
        }, {
            title: LANG_NAVBAR.failed_jobs,
            href: '/tools/failed_jobs',
            count: App.user.failed_jobs_count,
        }, {
            title: LANG_NAVBAR.news,
            href: '/tools/news',
        }, {
            title: LANG_NAVBAR.translations,
            href: API_HOST + '/translations',
        }, {
            title: LANG_NAVBAR.api_logs,
            href: '/tools/api_logs'
        }, {
            title: LANG_NAVBAR.domains,
            href: '/tools/domains'
        }]
}, {
    title: LANG_NAVBAR.tickets,
    href: '/tickets',
}];