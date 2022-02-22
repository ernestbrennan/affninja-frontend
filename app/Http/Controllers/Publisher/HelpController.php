<?php

namespace App\Http\Controllers\Publisher;

use App\Http\Controllers\Controller;

class HelpController extends Controller
{
    public function index()
    {
        $help = sendApiRequest('GET', 'help.getTree', ['page' => 1]);

        return view('publisher.help.index', ['help' => $help]);
    }
}
