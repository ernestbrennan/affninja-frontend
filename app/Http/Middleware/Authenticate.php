<?php

namespace App\Http\Middleware;

use App\Exceptions\BadAuth;
use App\Exceptions\ForeignCabinet;
use Closure;
use Cookie;
use Illuminate\Http\Request;

class Authenticate
{
    public function handle(Request $request, Closure $next, $user_role)
    {
        if ($user_role === 'promo' && !$request->hasCookie('token')) {
            $this->shareCabinetVariable();
            return $next($request);
        }

        try {
            $response = sendApiRequest('GET', 'auth.getUser');

        } catch (BadAuth $e) {
            return $this->returnBadAuthentication($request);

        } catch (ForeignCabinet $e) {
            return redirect(getUserCabinetUrl());
        }

        if ($user_role !== 'promo' && $response['user']['role'] !== $user_role) {
            return redirect(getUserCabinetUrl($response['user']['role']));
        }

        $this->shareCabinetVariable($user_role);
        $request->session()->put('authenticated', 1);
        $request->session()->put('user', $response['user']);
        $request->session()->put('foreign_user_hash', $response['foreign_user_hash']);

        return $next($request);
    }

    private function returnBadAuthentication($request)
    {
        $request->session()->put('authenticated', 0);
        return redirect(getUserCabinetUrl())->withCookie(Cookie::forget('token'));
    }

    private function shareCabinetVariable(?string $user_role = null): void
    {
        if (\is_null($user_role)) {
            $cabinet = 'promo';
        } elseif ($user_role === 'administrator') {
            $cabinet = 'admin';
        } else {
            $cabinet = $user_role;
        }

        \View::share('cabinet', $cabinet);
    }
}
