<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class ApiLogsController extends Controller
{
    public function index()
    {
        return view('admin.api_logs.index');
    }
}
