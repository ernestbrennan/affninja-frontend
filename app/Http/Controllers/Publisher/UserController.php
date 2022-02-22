<?php

namespace App\Http\Controllers\Publisher;

use Auth;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
	public function settings()
	{
		$user_info = sendApiRequest('GET', 'user.getByHash', ['user_hash' => \Session::get('user')['hash']]);
		$requisites = sendApiRequest('GET', 'payment_requisites.getList', ['with' => ['payment_system']]);
		$postbacks = sendApiRequest('GET', 'postback.getList', []);

		return view('publisher.user_settings.index', compact('user_info', 'requisites', 'postbacks'));
	}
}
