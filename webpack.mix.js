const {mix} = require('laravel-mix');
const {MIX_PACKAGE, NPM, VENDOR, OUTPUT, output} = require('laravel-multimix');

const production = process.env.NODE_ENV === 'production';

mix.disableNotifications();

if (!production) {
    mix.sourceMaps()
}

mix
    .autoload({
        jquery: ['$', 'jQuery'],
    })
    .sass('node_modules/font-awesome/scss/font-awesome.scss', 'dist/')
    .less('node_modules/bootstrap/less/bootstrap.less', 'dist/')
    .sass('resources/assets/common/plugins/multi-select/scss/multi-select.scss', 'dist/')
    .sass('resources/assets/common/styles/style.scss', 'dist/')
    .copy('resources/assets/common/handlebars', 'public/common/handlebars', false)
    .copy('resources/assets/common/js/advertisment/advertisment.js', 'public/common/ad.js')

    .styles([
        'public/dist/bootstrap.css',
        'public/dist/multi-select.css',
        'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
        'node_modules/animate.css/animate.min.css',
        'node_modules/sweetalert/dist/sweetalert.css',
        'node_modules/ladda/dist/ladda-themeless.min.css',
        'node_modules/toastr/build/toastr.min.css',
        'node_modules/select2/dist/css/select2.min.css',
        'resources/assets/common/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css',
        'resources/assets/common/plugins/pe-icon-7-stroke/css/pe-icon-7-stroke.css',
        'resources/assets/common/plugins/datatables/uikit/dataTables.uikit.css',
        'node_modules/vue-multiselect/dist/vue-multiselect.min.css',
    ], 'public/dist/vendor.css')
    .copy('node_modules/sortablejs/Sortable.min.js', 'public/dist/sortable.js')
    .copy('node_modules/vuedraggable/dist/vuedraggable.js', 'public/dist')
    .copy('resources/assets/common/plugins/pe-icon-7-stroke/fonts/', 'public/fonts', false)
    .copy('resources/assets/common/fonts/', 'public/fonts', false)
    .copy('resources/assets/common/images/', 'public/images', false)
    .copy('resources/assets/common/plugins/multi-select/js/jquery.multi-select.js', 'public/dist/jquery.multi-select.js')
    .copy('resources/assets/common/plugins/jquery.quicksearch/jquery.quicksearch.js', 'public/dist/jquery.quicksearch.js')
    .js(['resources/assets/vendor.js'], 'public/dist/vendor.js')
    .babel([
        'resources/assets/common/js/*.js',
        'resources/assets/common/js/mixins/*.js',
        'resources/assets/common/js/components/*.js',
        'resources/assets/common/js/filters/*.js',
        'resources/assets/common/js/models/*.js',
        'resources/assets/common/js/select/*.js',
    ], 'public/dist/components.js');

// Promo
if (MIX_PACKAGE === 'app' || MIX_PACKAGE === 'promo') {
    mix.js('resources/assets/promo/app.js', 'public/promo')
        .sass('resources/assets/common/styles/promo.scss', 'public/promo/dist/app.css')
        .styles([
            'public/dist/bootstrap.css',
            'public/dist/font-awesome.css',
            'node_modules/animate.css/animate.min.css',
            'node_modules/ladda/dist/ladda-themeless.min.css',
            'resources/assets/common/plugins/pe-icon-7-stroke/css/pe-icon-7-stroke.css',
            'resources/assets/common/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css',
        ], 'public/promo/dist/vendor.css')
        .babel([
            'resources/assets/promo/index/components/*.js',
            'resources/assets/promo/index/index.js',
        ], 'public/promo/dist/index/build.js')
}

// Publisher
if (MIX_PACKAGE === 'app' || MIX_PACKAGE === 'publisher') {
    mix.js('resources/assets/publisher/app.js', 'public/publisher/dist')
        .copy('resources/assets/publisher/finance/templates/', 'public/publisher/finance/templates/', false)
        .copy('resources/assets/publisher/postbackout/templates/', 'public/publisher/postbackout/templates/', false)
        .copy('resources/assets/publisher/statistics/components/StatColumns/templates/', 'public/publisher/statistics/components/StatColumns/templates/')
        .copy('resources/assets/publisher/api/templates', 'public/publisher/api/templates', false)
        .babel([
            'resources/assets/publisher/navbar/config.js',
            'resources/assets/common/js/navbar/Navbar.js',
        ], 'public/publisher/navbar.js')
        .babel([
            'resources/assets/publisher/statistics/components/StatColumns/StatColumns.js',
            'resources/assets/publisher/statistics/components/StatParameter/StatParameter.js',
            'resources/assets/admin/leads/components/LeadClickModal.js',
            'resources/assets/publisher/statistics/mixins/*.js',
            'resources/assets/publisher/statistics/components/*.js',
            'resources/assets/publisher/statistics/stat.js',
        ], 'public/publisher/statistics/report.js')
        .babel([
            'resources/assets/publisher/postback/FlowPostbackList.js',
            'resources/assets/publisher/flow/mixins/*.js',
            'resources/assets/publisher/flow/flow_widget/*.js',
            'resources/assets/publisher/components/DataTypesQuery.js',
            'resources/assets/publisher/components/LinkModal.js',
            'resources/assets/publisher/flow/components/FlowGroups.js',
            'resources/assets/publisher/flow/flow.js',
        ], 'public/publisher/flow/profile.js')
        .babel([
            'resources/assets/publisher/flow/components/Filters.js',
            'resources/assets/publisher/components/DataTypesQuery.js',
            'resources/assets/publisher/components/LinkModal.js',
            'resources/assets/publisher/flow/components/FlowChart.js',
            'resources/assets/common/plugins/sparkline/jquery.sparkline.js',
            'resources/assets/publisher/flow/index.js'
        ], 'public/publisher/flow/build.js')
        .babel([
            'resources/assets/publisher/components/CreateFlowMixin.js',
            'resources/assets/publisher/offer/index/components/AllOffers.js',
            'resources/assets/publisher/offer/index/index.js',
        ], 'public/publisher/offer/build.js')
        .babel([
            'resources/assets/publisher/components/CreateFlowMixin.js',
            'resources/assets/publisher/components/DataTypesQuery.js',
            'resources/assets/publisher/offer/profile/components/*.js',
            'resources/assets/publisher/offer/profile/profile.js',
        ], 'public/publisher/offer/profile.js')
        .babel([
            'resources/assets/publisher/components/DataTypesQuery.js',
            'resources/assets/publisher/components/LinkModal.js',
            'resources/assets/publisher/domain/index.js',
        ], 'public/publisher/domain/build.js')
        .babel([
            'resources/assets/publisher/domain/paths/index.js',
        ], 'public/publisher/domain/paths/build.js')
        .babel([
            'resources/assets/publisher/postbackout/components/PostbackoutParameter/PostbackoutParameter.js',
            'resources/assets/publisher/postbackout/components/UrlParameter/UrlParameter.js',
            'resources/assets/publisher/postbackout/filter.js',
            'resources/assets/publisher/postbackout/index.js',
        ], 'public/publisher/postbackout/build.js')
        .babel([
            'resources/assets/publisher/api/index.js',
        ], 'public/publisher/api/build.js')
        .babel([
            'resources/assets/publisher/requisites/Requisites.js',
            'resources/assets/publisher/finance/components/*.js',
            'resources/assets/publisher/finance/index.js',
        ], 'public/publisher/finance/build.js')
        .babel([
            'resources/assets/publisher/requisites/Requisites.js',
            'resources/assets/publisher/postback/GlobalPostbackList.js',
            'resources/assets/publisher/user_settings/components/*.js',
            'resources/assets/publisher/user_settings/index.js',
        ], 'public/publisher/user/build.js')
        .babel([
            'resources/assets/publisher/ticket/CreateModal.js',
            'resources/assets/publisher/ticket/Ticket.js',
        ], 'public/publisher/ticket/index/build.js')
        .babel([
            'resources/assets/publisher/ticket/TicketMessages.js',
        ], 'public/publisher/ticket/messages/build.js')
        .babel([
            'resources/assets/publisher/components/CreateFlowMixin.js',
            'resources/assets/publisher/dashboard/components/*.js',
            'resources/assets/publisher/dashboard/index.js',
        ], 'public/publisher/dashboard/build.js')
}

// Admin
if (MIX_PACKAGE === 'app' || MIX_PACKAGE === 'admin') {
    mix.js('resources/assets/admin/app.js', 'public/admin/dist')
        .copy('resources/assets/admin/statistics/components/StatColumns/templates', 'public/admin/statistics/components/StatColumns/templates', false)
        .babel([
            'resources/assets/admin/navbar/config.js',
            'resources/assets/common/js/navbar/Navbar.js',
        ], 'public/admin/navbar.js')
        .babel([
            'resources/assets/admin/statistics/components/StatColumns/StatColumns.js',
            'resources/assets/admin/statistics/components/StatParameter/StatParameter.js',
            'resources/assets/admin/statistics/components/*.js',
            'resources/assets/admin/statistics/stat.js',
        ], 'public/admin/report.js')
        .babel([
            'resources/assets/admin/statistics/components/StatColumns/StatColumns.js',
            'resources/assets/admin/leads/components/NewLead.js',
            'resources/assets/admin/leads/components/LeadClickModal.js',
            'resources/assets/admin/leads/statByLead.js',
            'resources/assets/admin/leads/index.js',
        ], 'public/admin/leads/build.js')
        .babel([
            'resources/assets/admin/leads/completion/advertisers.js',
        ], 'public/admin/leads/completion/advertisers/build.js')
        .babel([
            'resources/assets/admin/leads/completion/leads.js',
        ], 'public/admin/leads/completion/leads/build.js')
        .babel([
            'resources/assets/admin/reports/reportByDays.js',
            'resources/assets/admin/reports/index.js',
        ], 'public/admin/reports/build.js')
        .babel([
            'public/dist/sortable.js',
            'public/dist/vuedraggable.js',
            'public/dist/jquery.quicksearch.js',
            'public/dist/jquery.multi-select.js',
            'resources/assets/admin/offer/profile/permissions/*.js',
            'resources/assets/admin/offer/profile/components/*.js',
            'resources/assets/admin/offer/profile/profile.js',
        ], 'public/admin/offer/profile.js')
        .babel([
            'public/dist/jquery.quicksearch.js',
            'public/dist/jquery.multi-select.js',
            'resources/assets/admin/user/components/AdvertiserAccountModal.js',
            'resources/assets/admin/user/components/RegeneratePassword.js',
            'resources/assets/admin/user/components/PublisherEditModal.js',
            'resources/assets/admin/user/components/PublisherPermissionsModal.js',
            'resources/assets/admin/user/components/AdvertiserSettingsModal.js',
            'resources/assets/admin/user/components/Publishers.js',
            'resources/assets/admin/user/components/Administrators.js',
            'resources/assets/admin/user/components/Advertisers.js',
            'resources/assets/admin/user/components/Supports.js',
            'resources/assets/admin/user/components/Managers.js',
            'resources/assets/admin/user/components/UserBlocker.js',
            'resources/assets/admin/user/components/UserCreator.js',
            'resources/assets/admin/user/index.js',
        ], 'public/admin/users/build.js')
        .babel([
            'resources/assets/admin/offer/index/components/AllOffers.js',
            'resources/assets/admin/offer/index/components/CreateOfferModal.js',
            'resources/assets/admin/offer/index/components/CloneOfferModal.js',
            'resources/assets/admin/offer/index/index.js',
        ], 'public/admin/offer/build.js')
        .babel([
            'resources/assets/admin/payments/components/*.js',
            'resources/assets/admin/payments/index.js',
        ], 'public/admin/finance/build.js')
        .babel([
            'public/dist/jquery.quicksearch.js',
            'public/dist/jquery.multi-select.js',
            'resources/assets/admin/payment_system/index.js',
        ], 'public/admin/payment_system/build.js')
        .babel([
            'resources/assets/admin/deposit/filter.js',
            'resources/assets/admin/deposit/components/DepositParameter/DepositParameter.js',
            'resources/assets/admin/deposit/DepositModal.js',
            'resources/assets/admin/deposit/WriteoffModal.js',
            'resources/assets/admin/deposit/AdvertiserBalance.js',
            'resources/assets/admin/deposit/index.js',
        ], 'public/admin/deposit/build.js')
        .babel([
            'resources/assets/admin/offer_category/index.js',
        ], 'public/admin/offer_category/build.js')
        .babel([
            'resources/assets/admin/intagration/components/*.js',
            'resources/assets/admin/intagration/list.js',
        ], 'public/admin/intagration/build.js')
        .babel([
            'resources/assets/admin/comebacker_audio/ComebackerAudio.component.js',
            'resources/assets/admin/comebacker_audio/list/list.js',
        ], 'public/admin/comebacker_audio/build.js')
        .babel([
            'resources/assets/admin/failed_jobs/FailedJobs.component.js',
            'resources/assets/admin/failed_jobs/index.js',
        ], 'public/admin/failed_jobs/build.js')
        .babel([
            'resources/assets/admin/domains/Domains.component.js',
            'resources/assets/admin/domains/index.js',
        ], 'public/admin/domains/build.js')
        .babel([
            'resources/assets/admin/api_logs/index.js',
        ], 'public/admin/api_logs/build.js')
        .babel([
            'resources/assets/admin/user/settings/ProfileForm.js',
            'resources/assets/admin/user/settings/settings.js',
        ], 'public/admin/settings/build.js')
        .babel([
            'public/dist/jquery.quicksearch.js',
            'public/dist/jquery.multi-select.js',
            'resources/assets/admin/user_groups/index/components/*.js',
            'resources/assets/admin/user_groups/index/index.js',
        ], 'public/admin/user_groups/build.js')
        .babel([
            'resources/assets/admin/user_groups/permissions/index.js',
        ], 'public/admin/user_groups/permissions/build.js')
        .babel([
            'resources/assets/admin/ticket/DeferModal.js',
            'resources/assets/admin/ticket/Ticket.js',
        ], 'public/admin/ticket/index/build.js')
        .babel([
            'resources/assets/admin/ticket/TicketMessages.js',
        ], 'public/admin/ticket/messages/build.js')
        .babel([
            'resources/assets/admin/news/list/index.js',
        ], 'public/admin/news/list/build.js')
        .babel([
            'resources/assets/common/plugins/quill-extensions/plugins/*.js',
            'resources/assets/admin/news/profile/PreviewModal.js',
            'resources/assets/admin/news/profile/index.js',
        ], 'public/admin/news/profile/build.js')
        .babel([
            'resources/assets/admin/target_templates/index.js',
        ], 'public/admin/target_templates/build.js')
        .babel([
            'resources/assets/admin/dashboard/components/*.js',
            'resources/assets/admin/dashboard/index.js',
        ], 'public/admin/dashboard/build.js')
}

// Advertiser
if (MIX_PACKAGE === 'app' || MIX_PACKAGE === 'advertiser') {
    mix.js('resources/assets/advertiser/app.js', 'public/affiliate/dist')
        .babel([
            'resources/assets/advertiser/navbar/config.js',
            'resources/assets/common/js/navbar/Navbar.js',
        ], 'public/affiliate/navbar.js')
        .babel([
            'resources/assets/advertiser/reports/Filters.js',
            'resources/assets/advertiser/reports/reportByDays.js',
            'resources/assets/advertiser/reports/reportByOffers.js',
            'resources/assets/advertiser/reports/reportByPublishers.js',
            'resources/assets/advertiser/reports/reports.js',
        ], 'public/affiliate/reports/reports.js')
        .babel([
            'resources/assets/advertiser/leads/ApproveButton.js',
            'resources/assets/advertiser/leads/CancelledButton.js',
            'resources/assets/advertiser/leads/Filters.js',
            'resources/assets/advertiser/leads/index.js',
        ], 'public/affiliate/leads/build.js')
        .babel([
            'resources/assets/advertiser/finance/Filters.js',
            'resources/assets/advertiser/finance/SummaryInfo.js',
            'resources/assets/advertiser/finance/TransactionList.js',
            'resources/assets/advertiser/finance/index.js',
        ], 'public/affiliate/finance/build.js')
        .babel([
            'resources/assets/advertiser/offer/profile/components/*.js',
            'resources/assets/advertiser/offer/profile/profile.js',
        ], 'public/affiliate/offer/profile.js')
        .babel([
            'resources/assets/admin/offer/index/components/AllOffers.js',
            'resources/assets/admin/offer/index/index.js',
        ], 'public/affiliate/offer/build.js')
        .babel([
            'resources/assets/advertiser/user/ProfileForm.js',
            'resources/assets/advertiser/user/settings.js',
        ], 'public/affiliate/user/build.js')
}

// Support
if (MIX_PACKAGE === 'app' || MIX_PACKAGE === 'support') {

    mix.js('resources/assets/support/app.js', 'public/support/dist')
        .babel([
            'resources/assets/support/navbar/config.js',
            'resources/assets/common/js/navbar/Navbar.js',
        ], 'public/support/navbar.js')
        .babel([
            'public/dist/jquery.quicksearch.js',
            'public/dist/jquery.multi-select.js',
            'resources/assets/support/user/PublisherEditModal.js',
            'resources/assets/support/user/index.js',
        ], 'public/support/users/index/build.js')
        .babel([
            'public/dist/jquery.quicksearch.js',
            'public/dist/jquery.multi-select.js',
            'resources/assets/support/moderation/index.js',
        ], 'public/support/moderation/index/build.js')
}

// Manager
if (MIX_PACKAGE === 'app' || MIX_PACKAGE === 'manager') {

    mix.js('resources/assets/manager/app.js', 'public/manager/dist')
        .babel([
            'resources/assets/manager/navbar/config.js',
            'resources/assets/common/js/navbar/Navbar.js',
        ], 'public/manager/navbar.js')
        .babel([
            'resources/assets/manager/user/AdvetiserEditModal.js',
            'resources/assets/manager/user/index.js',
        ], 'public/manager/users/index/build.js')
}
