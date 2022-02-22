<?php

namespace App\Http\Controllers\Publisher;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        return view('publisher.dashboard.index');
    }
}
