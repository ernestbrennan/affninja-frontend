<?php

namespace App\Http\Controllers\Support;

use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index()
    {
        return view('support.user.index.index');
    }

    public function settings()
    {
        $user_info = sendApiRequest('GET', 'user.getByHash', ['user_hash' => \Session::get('user')['hash']]);

        return view('support.user.settings.settings', ['user_info' => $user_info]);
    }
}
