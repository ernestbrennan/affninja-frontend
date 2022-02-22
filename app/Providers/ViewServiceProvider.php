<?php

namespace App\Providers;

use View;
use Illuminate\Support\ServiceProvider;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        View::addNamespace('promo', resource_path('views/promo'));
        View::addNamespace('publisher', resource_path('views/publisher'));
        View::addNamespace('admin', resource_path('views/admin'));
        View::addNamespace('advertiser', resource_path('views/advertiser'));
        View::addNamespace('support', resource_path('views/support'));
        View::addNamespace('manager', resource_path('views/manager'));
        View::addNamespace('manager', resource_path('views/manager'));
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
