<?php

namespace App\Http\Controllers\Advertiser;

use App\Http\Controllers\Controller;

class LeadController extends Controller
{
	public function index()
	{
		$country_list = sendApiRequest('GET', 'country.getList', []);
		$offers = sendApiRequest('GET', 'offer.getList', []);

		return view('advertiser.leads.index', compact('country_list', 'offers'));
	}
}
