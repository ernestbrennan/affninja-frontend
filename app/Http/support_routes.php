<?php

Route::group([
    'middleware' => ['cookie', 'session', 'auth:support'],
    'domain' => 'support.' . env('MAIN_DOMAIN'),
    'as' => 'support::'
], function () {

    Route::get('/', function () {
        return redirect()->route('support::user_index');
    });

    Route::get('/users', ['as' => 'user_index', 'uses' => 'UserController@index']);

    Route::get('/moderation', ['as' => 'moderation_index', 'uses' => 'ModerationController@index']);

});