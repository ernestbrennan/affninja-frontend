<?php

namespace App\Http\Controllers\Advertiser;

use App\Http\Controllers\Controller;

class FinanceController extends Controller
{
	public function index()
	{
        $country_list = sendApiRequest('GET', 'country.getList', []);
        $offer_list = sendApiRequest('GET', 'offer.getList', []);

        return view('advertiser.finance.index', compact('country_list', 'offer_list'));
	}
}
