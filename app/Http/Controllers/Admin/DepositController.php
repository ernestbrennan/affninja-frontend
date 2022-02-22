<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class DepositController extends Controller
{
	public function index()
	{
		return view('admin.deposit.index');
	}
}
