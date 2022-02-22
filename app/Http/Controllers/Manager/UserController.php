<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index()
    {
        return view('manager.user.index.index');
    }

    public function settings()
    {
        $user_info = sendApiRequest('GET', 'user.getByHash', ['user_hash' => \Session::get('user')['hash']]);

        return view('manager.user.settings.settings', ['user_info' => $user_info]);
    }
}
