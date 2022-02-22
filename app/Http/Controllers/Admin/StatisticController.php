<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class StatisticController extends Controller
{
	public function index()
	{
		$stat_settings = sendApiRequest('GET', 'user.getStatisticSettings', []);

		return view('admin.statistics.index', compact('stat_settings'));
	}
}
