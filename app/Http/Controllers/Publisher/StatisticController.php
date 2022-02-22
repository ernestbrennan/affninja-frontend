<?php

namespace App\Http\Controllers\Publisher;

use App\Http\Controllers\Controller;

class StatisticController extends Controller
{
	public function index()
	{
		$flow_list = sendApiRequest('GET', 'flow.getList', []);
		$country_list = sendApiRequest('GET', 'country.getList', []);
		$offer_list = sendApiRequest('GET', 'offer.getList', []);
		$stat_settings = sendApiRequest('GET', 'user.getStatisticSettings', []);

		return view('publisher.statistics.index', compact('flow_list', 'country_list',
			'offer_list', 'stat_settings'));
	}
}
