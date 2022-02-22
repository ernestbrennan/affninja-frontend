<?php

namespace App\Providers;

use Illuminate\Routing\Router;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';
    protected $publisher_namespace = 'App\Http\Controllers\Publisher';
    protected $admin_namespace = 'App\Http\Controllers\Admin';
    protected $advertiser_namespace = 'App\Http\Controllers\Advertiser';
    protected $support_namespace = 'App\Http\Controllers\Support';
    protected $manager_namespace = 'App\Http\Controllers\Manager';
    protected $promo_namespace = 'App\Http\Controllers\Promo';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @param  \Illuminate\Routing\Router $router
     * @return void
     */
    public function boot(Router $router)
    {
        parent::boot($router);
    }

    /**
     * Define the routes for the application.
     *
     * @param  \Illuminate\Routing\Router $router
     * @return void
     */
    public function map(Router $router)
    {
        $this->mapWebRoutes($router);

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @param  \Illuminate\Routing\Router $router
     * @return void
     */
    protected function mapWebRoutes(Router $router)
    {
        // Promo
        $router->group([
            'namespace' => $this->promo_namespace
        ], function ($router) {
            require app_path('Http/promo_routes.php');
        });

        // Publisher
        $router->group([
            'namespace' => $this->publisher_namespace
        ], function ($router) {
            require app_path('Http/publisher_routes.php');
        });

        // Admin
        $router->group([
            'namespace' => $this->admin_namespace
        ], function ($router) {
            require app_path('Http/admin_routes.php');
        });

        // Advertiser
        $router->group([
            'namespace' => $this->advertiser_namespace
        ], function ($router) {
            require app_path('Http/advertiser_routes.php');
        });

        // Support
        $router->group([
            'namespace' => $this->support_namespace
        ], function ($router) {
            require app_path('Http/support_routes.php');
        });

        // Manager
        $router->group([
            'namespace' => $this->manager_namespace
        ], function ($router) {
            require app_path('Http/manager_routes.php');
        });
    }
}
