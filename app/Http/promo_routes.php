<?php

use Illuminate\Http\Request;

Route::group([
    'middleware' => ['cookie', 'session', 'auth:promo', 'app.locale'],
    'domain' => env('MAIN_DOMAIN'),
    'as' => 'promo::'

], function () {
    Route::get('/', ['uses' => 'MainController@index']);
    Route::get('/index', function(){
        return view('promo::index.index');
    });
    Route::get('/password/reset/{token}', ['uses' => 'MainController@resetPassword']);
});

