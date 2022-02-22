<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;

class AppLocale
{
    public const FALLBACK_LOCALE = 'en';

    public function handle(Request $request, Closure $next)
    {
        $user = \Session::get('user');
        $locale = self::FALLBACK_LOCALE;

        if (!is_null($user)) {
            $locale = Session::get('user')['locale'] ?? self::FALLBACK_LOCALE;
        }
        app()->setLocale($locale);

        return $next($request);
    }
}
