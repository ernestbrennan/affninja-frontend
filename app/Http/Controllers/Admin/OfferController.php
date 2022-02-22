<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class OfferController extends Controller
{
    public function index()
    {
        $category_list_for_filter = sendApiRequest('GET', 'offer_category.getListForOfferFilter', []);
        $offer_labels = sendApiRequest('GET', 'offer_labels.getList', ['with' => ['offers_count']]);

        return view('admin.offer.index.index', compact('category_list_for_filter', 'offer_labels'));
    }

    public function profile($offer_hash)
    {
        $offer_info = sendApiRequest('GET', 'offer.getByHash', [
            'offer_hash' => $offer_hash, 'for' => 'offer_profile'
        ]);
        $offer_sources = sendApiRequest('GET', 'offer_source.getList', []);
        $locales = sendApiRequest('GET', 'locale.getList', []);
        $publishers = sendApiRequest('GET', 'user.getList', [
                'role' => ['publisher'], 'with' => ['publisher']]
        );
        $advertisers = sendApiRequest('GET', 'user.getList', [
                'role' => ['advertiser'], 'with' => ['advertiser']]
        );
        $countries = sendApiRequest('GET', 'country.getList', []);
        $currencies = sendApiRequest('GET', 'currency.getList', []);
        $integrations = sendApiRequest('GET', 'integration.getList', []);
        $offer_categories = sendApiRequest('GET', 'offer_category.getList', []);
        $user_groups = sendApiRequest('GET', 'user_groups.getList', []);

        return view('admin.offer.profile.profile', compact(
            'offer_info', 'offer_sources', 'locales', 'publishers', 'advertisers', 'countries', 'currencies',
            'integrations', 'offer_categories', 'user_groups'));
    }
}
