<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class PaymentSystemController extends Controller
{
    public function index()
    {
        return view('admin.payment_system.index');
    }
}
