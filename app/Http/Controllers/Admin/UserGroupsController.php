<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class UserGroupsController extends Controller
{
    public function index()
    {
        return view('admin.user_groups.index');
    }
}
