<?php

namespace App\Http\Controllers\Advertiser;

use App\Http\Controllers\Controller;

class ReportsController extends Controller
{
    public function index()
    {
        $countries = sendApiRequest('GET', 'country.getList', []);
        $offers = sendApiRequest('GET', 'offer.getList', []);

        return view('advertiser.reports.index',compact('countries', 'offers'));
    }
}
