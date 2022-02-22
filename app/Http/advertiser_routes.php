<?php

Route::group([
    'middleware' => ['cookie', 'session', 'auth:advertiser', 'app.locale'],
    'domain' => 'office.' . env('MAIN_DOMAIN'),
    'as' => 'advertiser::'
], function () {

    Route::get('/', function () {
        return redirect()->route('advertiser::reports_index', ['tab' => 'days']);
    });

    Route::get('/settings', ['as' => 'user_settings', 'uses' => 'UserController@settings']);
    Route::get('/leads', ['as' => 'leads_index', 'uses' => 'LeadController@index']);

    Route::get('/offers', ['as' => 'offer_index', 'uses' => 'OfferController@index']);
    Route::get('/offers/{offer_hash}', ['as' => 'offer_profile', 'uses' => 'OfferController@profile']);

    Route::get('/finance', ['as' => 'finance_index', 'uses' => 'FinanceController@index']);

    Route::get('/report/{tab}', ['as' => 'reports_index', 'uses' => 'ReportsController@index'])
        ->where(['tab' => '(days|offers|publishers)+']);
    Route::get('/report/{report_type}', ['as' => 'reports_index', 'uses' => 'ReportsController@index']);
});
