<?php

Route::group([
    'middleware' => ['cookie', 'session', 'auth:administrator'],
    'domain' => 'control.' . env('MAIN_DOMAIN'),
    'as' => 'admin::'
], function () {

    Route::get('/', function () {
        return redirect('dashboard');
    });

    Route::get('/dashboard', function () {
        return view('admin.dashboard.index');
    });

    Route::get('/statistics', function () {
        return redirect()->route('admin::statistics_index', ['tab' => 'day']);
    });

    Route::get('statistics/reports', function () {
        return view('admin.reports.index');
    })->name('reports');

    Route::get('/statistics/{tab}', ['as' => 'statistics_index', 'uses' => 'StatisticController@index'])
        ->where(['tab' => '(day|publisher|offer|target_geo|geo_ip|landing|transit)+']);

    Route::get('/users/{tab}', ['as' => 'user_index', 'uses' => 'UserController@index'])
        ->where(['tab' => '(publishers|advertisers|supports|administrators|managers)+']);

    Route::get('/settings', ['as' => 'user_settings', 'uses' => 'UserController@settings']);

    Route::get('/offers', ['as' => 'offer_index', 'uses' => 'OfferController@index']);
    Route::get('/offers/target_templates', function () {
        return view('admin.target_templates.index');
    });
    Route::get('/offers/{offer_hash}', ['as' => 'offer_profile', 'uses' => 'OfferController@profile']);
    // @todo Удалить с 1 мая редирект
    Route::get('/offers/{offer_hash}/permissions', function ($offer_hash) {
        return redirect('/offers/' . $offer_hash);
    });

    Route::get('/tools/news', function () {
        return view('admin.news.list.index');
    });
    Route::get('/tools/news/create', function () {
        $offer_hash = Request::input('offer_hash');
        if (!is_null($offer_hash)) {
            $offer_info = sendApiRequest('GET', 'offer.getByHash', ['offer_hash' => $offer_hash]);
        }

        return view('admin.news.profile.index', [
            'news' => null,
            'offer_info' => $offer_info['response'] ?? [],
        ]);
    });
    Route::get('/tools/news/{hash}/edit', function ($hash) {
        $news = sendApiRequest('GET', 'news.getByHash', [
            'hash' => $hash,
            'with' => ['offer']
        ]);

        return view('admin.news.profile.index', [
            'news' => $news,
        ]);
    });

    Route::get('/tools/offer_category', ['as' => 'offer_category_index', 'uses' => 'OfferCategoryController@index']);
    Route::get('/tools/offer_category/getCreateModal', ['uses' => 'OfferCategoryController@getCreateModal']);
    Route::get('/tools/offer_category/getEditModal/{offer_category_id}', ['uses' => 'OfferCategoryController@getEditModal']);

    Route::get('/users/user_groups', function () {
        return view('admin.user_groups.index.index');
    });

    Route::get('/users/user_groups/{group_id}/permissions', function ($group_id) {
        $group = sendApiRequest('GET', 'user_groups.getById', [
            'id' => $group_id,
            'with' => ['users']
        ]);

        return view('admin.user_groups.permissions.index', [
            'group' => $group['response'],
        ]);
    });

    Route::get('/payment_requisite', ['as' => 'payment_requisite_index', 'uses' => 'PaymentRequisiteController@index']);

    Route::get('/finance/payments', function () {
        return redirect()->route('admin::payment_index', ['status' => 'pending']);
    });

    Route::get('/finance/payments/{status}', ['as' => 'payment_index', 'uses' => 'PaymentController@index']);

    Route::get('/finance/payment_system', ['as' => 'payment_system_index', 'uses' => 'PaymentSystemController@index']);

    Route::get('/tools/integration', ['as' => 'integration_index', 'uses' => 'IntegrationController@index']);
    Route::get('/tools/comebacker_audio', ['as' => 'comebacker_audio_index', 'uses' => 'ComebackerAudioController@index']);
    Route::get('/finance/deposit', ['as' => 'deposit_index', 'uses' => 'DepositController@index']);
    Route::get('/tools/failed_jobs', ['as' => 'failed_jobs', 'uses' => 'FailedJobsController@index']);
    Route::get('/tools/domains', ['as' => 'domains', 'uses' => 'DomainsController@index']);

    Route::get('/tools/api_logs', ['as' => 'api_logs', 'uses' => 'ApiLogsController@index']);

    // Leads
    Route::get('/leads', function () {
        return view('admin.leads.index');
    })->name('leads');

    Route::get('/finance/advertisers', function () {
        return view('admin.leads.completion.advertisers');
    });

    Route::get('/finance/{advertiser_hash}/completion', function ($advertiser_hash) {
        $advertiser = sendApiRequest('GET', 'advertiser.getByHash', [
            'hash' => $advertiser_hash,
            'with' => ['accounts']
        ]);

        if (!isset($advertiser['response'])) {
            return redirect()->route('admin::user_index', ['tab' => 'publishers']);
        }
        return view('admin.leads.completion.leads', [
            'advertiser' => $advertiser['response'],
        ]);
    });

    Route::get('/tickets', function () {
        return view('admin.ticket.index.index');
    });

    Route::get('/tickets/{hash}/messages', function ($hash) {
        $ticket = sendApiRequest('GET', 'ticket.getByHash', [
            'hash' => $hash,
            'with' => ['messages.user.profile', 'messages.user.group']
        ]);

        if (!isset($ticket['response'])) {
            return redirect('/');
        }

        return view('admin.ticket.messages.index', [
            'ticket' => $ticket['response']
        ]);
    });
});