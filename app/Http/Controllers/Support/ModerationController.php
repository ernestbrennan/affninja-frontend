<?php

namespace App\Http\Controllers\Support;

use App\Http\Controllers\Controller;

class ModerationController extends Controller
{
    public function index()
    {
        return view('support.moderation.index.index');
    }
}
