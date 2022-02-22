<?php

namespace App\Http\Controllers\Publisher;

use App\Http\Controllers\Controller;

class ApiController extends Controller
{
    public function index()
    {
        if (!in_array('API', \Session::get('user')['permissions'])) {
            return redirect('/');
        }

        return view('publisher.api.index');
    }
}
