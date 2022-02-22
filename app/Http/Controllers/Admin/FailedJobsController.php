<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class FailedJobsController extends Controller
{
    public function index()
    {
        return view('admin.failed_jobs.index');
    }
}
