<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class DomainsController extends Controller
{
    public function index()
    {
        return view('admin.domains.index');
    }
}
