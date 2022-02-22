<?php

namespace App\Http\Controllers\Advertiser;

use App\Http\Controllers\Controller;

class OfferController extends Controller
{
	public function index()
	{
		$category_list_for_filter = sendApiRequest('GET', 'offer_category.getListForOfferFilter', []);
        $offer_labels = sendApiRequest('GET', 'offer_labels.getList', ['with' => ['offers_count']]);

		return view('advertiser.offer.index.index', compact('category_list_for_filter', 'offer_labels'));
	}

	public function profile($offer_hash)
	{
        $offer_info = sendApiRequest('GET', 'offer.getByHash', [
            'offer_hash' => $offer_hash,
            'for' => 'offer_profile'
        ]);

        if (!isset($offer_info['response'])) {
            return redirect('/');
        }

        $offer_sources = sendApiRequest('GET', 'offer_source.getList');

        return view('advertiser.offer.profile.profile', [
            'offer_info' => $offer_info,
            'offer_sources' => $offer_sources,
        ]);
	}
}
