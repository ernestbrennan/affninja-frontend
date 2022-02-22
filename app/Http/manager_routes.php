<?php

Route::group([
    'middleware' => ['cookie', 'session', 'auth:manager'],
    'domain' => 'manager.' . env('MAIN_DOMAIN'),
    'as' => 'manager::'
], function () {

    Route::get('/', function () {
        return redirect()->route('manager::user_index');
    });

    Route::get('/users', ['as' => 'user_index', 'uses' => 'UserController@index']);
});