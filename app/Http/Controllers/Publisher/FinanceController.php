<?php

namespace App\Http\Controllers\Publisher;

use App\Http\Controllers\Controller;

class FinanceController extends Controller
{
    public function index()
    {

        return view('publisher.finance.index');
    }
}
