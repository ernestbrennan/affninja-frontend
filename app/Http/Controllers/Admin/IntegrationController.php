<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class IntegrationController extends Controller
{
	public function index()
	{
		return view('admin.integration.list');
	}
}
