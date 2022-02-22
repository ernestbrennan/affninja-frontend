<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
	public function index()
	{
		return view('admin.payments.index');
	}
}
