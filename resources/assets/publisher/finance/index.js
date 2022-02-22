let Config = {
    template_path: '/publisher/finance/templates/'
};

let bus = new Vue();

const Tab = {
    init() {
        let self = this;

        $('#' + getSecondLocationPath() + '_tab_wrap').addClass('active');
        this.changeTab();

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            self.changeTab();
        });
    },

    changeTab() {
        switch (getSecondLocationPath()) {
            case 'specification_hold':
                getLeadsOnHold();
                break;

            case 'finance_operation':
                getFinanceOperation();
                break;
        }
    },
};

new Vue({
    el: '#finance',
    data: {},

    mounted() {
        Tab.init();
    },

    methods: {},
});

/**
 * Получение лидов на холде
 */
function getLeadsOnHold() {
    // Check if table already loaded
    if ($('#leads_on_hold_table').exists()) {
        return false;
    }

    ContentPreloader.show('#tab-content-wrap');

    apiRequest('lead.getListOnHold', 'GET', {}, buildLeadsOnHoldHtml, null);
}

/**
 * Построение HTML списка лидов на холде
 *
 * @param result
 * @returns {boolean}
 */
function buildLeadsOnHoldHtml(result) {

    let tpl_data = {
        LANG_FINANCE: LANG_FINANCE,
        LANG_MESSAGES: LANG_MESSAGES,
        CDN_HOST: CDN_HOST,
        total_rub_hold: 0,
        total_rub: 0,
        total_usd_hold: 0,
        total_usd: 0,
        total_eur_hold: 0,
        total_eur: 0,
        leads: []
    };

    let lead;
    for (lead of result.response) {

        lead.created = date('d.m.Y H:i', strtotime(lead.created_at));
        lead.processed = date('d.m.Y H:i', strtotime(lead.processed_at));
        lead.hold_date = date('d.m.Y H:i', strtotime(lead.hold_at));
        lead.currecy_sign = getCurrencySignByCode(lead.currency.code);

        switch (parseInt(lead.currency_id)) {
            case CURRENCY_RUB_ID:
                tpl_data.total_rub_hold += parseFloat(lead.payout);
                tpl_data.total_rub += 1;
                break;

            case CURRENCY_USD_ID:
                tpl_data.total_usd_hold += parseFloat(lead.payout);
                tpl_data.total_usd += 1;
                break;

            case CURRENCY_EUR_ID:
                tpl_data.total_eur_hold += parseFloat(lead.payout);
                tpl_data.total_eur += 1;
                break;

            default:
                throw 'Unknown type of lead\'s currency';
        }

        tpl_data.leads.push(lead);
    }

    renderTemplate(Config.template_path + 'leads_on_hold_list.hbs', tpl_data, '#leads_on_hold_wrap', {},
        function () {
            if (tpl_data.leads.length > 0) {
                runDatatableOnLeadsOnHoldTable();
                runTooltip();
            }

            ContentPreloader.hide($('#tab-content-wrap'));
        }
    );
}


function runDatatableOnLeadsOnHoldTable() {
    $('#leads_on_hold_table').DataTable({
        language: {
            paginate: {
                previous: "Пред.",
                next: "След."
            }
        },
        pageLength: 25,
        bLengthChange: false,
        bInfo: false,
        bFilter: false,
        columnDefs: [
            {targets: 1, type: 'de_datetime_by_data'},
            {targets: 2, type: 'de_datetime_by_data'},
            {targets: 5, type: 'de_datetime_by_data'}
        ],
        aaSorting: [[5, "asc"]],
        drawCallback: function () {
            stylePagginationBtns();
        }
    });
}

