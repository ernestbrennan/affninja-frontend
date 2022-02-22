<?php

namespace App\Http\Controllers\Advertiser;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
	public function settings()
	{
		return view('advertiser.user.settings', [
		    'user_info'=> Session::get('user')
        ]);
	}
}
