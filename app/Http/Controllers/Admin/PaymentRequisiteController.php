<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class PaymentRequisiteController extends Controller
{
	public function index()
	{
		return view('admin.payment_requisite.index');
	}
}
