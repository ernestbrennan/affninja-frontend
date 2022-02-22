<?php

Route::group([
    'middleware' => ['cookie', 'session', 'auth:publisher'],
    'domain' => 'my.' . env('MAIN_DOMAIN'),
    'as' => 'publisher::'
], function () {

    Route::get('/', function () {
        return redirect('dashboard');
    });

    Route::get('/settings', ['as' => 'user_settings', 'uses' => 'UserController@settings']);
    Route::get('/news', ['as' => 'news_index', 'uses' => 'NewsController@index']);

    Route::get('/tools/flows', ['as' => 'flow_index', 'uses' => 'FlowController@index']);
    Route::get('/tools/flows/{flow_hash}', ['uses' => 'FlowController@edit']);

    Route::get('/statistics', function () {
        return redirect()->route('publisher::statistics_index', ['tab' => 'day']);
    });
    Route::get('/statistics/{tab}', ['as' => 'statistics_index', 'uses' => 'StatisticController@index']);

    Route::get('/finance/{tab}', ['as' => 'finance_index', 'uses' => 'FinanceController@index'])
        ->where(['tab' => '(payment|specification_hold|requisites)+']);

    //Инструменты
    Route::get('/tools/domains', ['as' => 'domain_index', 'uses' => 'DomainController@index']);
    Route::get('/tools/postbackout_logs', ['as' => 'postbackout_logs', 'uses' => 'PostbackoutController@index']);

    // Офферы
    Route::get('/offers', ['as' => 'offer_index', 'uses' => 'OfferController@index']);
    Route::get('/offers/{offer_hash}', ['as' => 'offer_profile', 'uses' => 'OfferController@profile']);

    Route::get('/tools/api', ['as' => 'api_index', 'uses' => 'ApiController@index']);
    Route::get('/cloudflare/', 'CloudflareController@index');
    Route::post('/cloudflare/disableIpv6', 'CloudflareController@disableIpv6')->name('cloudflare.disableIpv6');
    Route::get('/dashboard/', 'DashboardController@index');

    // Список страниц клоакинг доменов
    Route::get('/tools/domains/{domain_hash}/paths', ['uses' => 'CloakDomainPathsController@index']);

    Route::get('/tickets', function () {
        return view('publisher.ticket.index.index');
    });
    Route::get('/tickets/{hash}/messages', function ($hash) {
        $ticket = sendApiRequest('GET', 'ticket.getByHash', [
            'hash' => $hash,
            'with' => ['messages.user', 'user']
        ]);

        if (!isset($ticket['response'])) {
            return redirect('/');
        }

        return view('publisher.ticket.messages.index', [
            'ticket' => $ticket['response']
        ]);
    });
});

