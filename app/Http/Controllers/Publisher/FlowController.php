<?php

namespace App\Http\Controllers\Publisher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FlowController extends Controller
{
    public function index()
    {
        $my_offers = sendApiRequest('GET', 'offer.getList', [
            'only_my' => 1
        ])['response'];
        $flow_groups = sendApiRequest('GET', 'flow_groups.getList')['response'];
        $offers = sendApiRequest('GET', 'offer.getList', [])['response'];

        return view('publisher.flow.index.index', compact('my_offers', 'flow_groups', 'offers'));
    }

    public function edit($flow_hash)
    {
        // Для выбора настройки дополнительного потока
        $flows = sendApiRequest('GET', 'flow.getList', [])['response'];

        // Исключаем текущий поток со списка
        if (\count($flows) > 0) {
            $flows = collect($flows)->keyBy('hash')->except($flow_hash)->values()->toArray();
        }

        $flow_info = sendApiRequest('GET', 'flow.getByHash', [
            'flow_hash' => $flow_hash,
            'with_draft' => 1,
            'with' => [
                'landings',
                'transits',
                'extra_flow',
                'widgets.widget',
                'group',
                'offer',
                'target',
            ]
        ]);

        if (!isset($flow_info['response'])) {
            return redirect()->route('publisher::dashboard');
        }

        $flow_info = $flow_info['response'];
        $offer_info = $flow_info['offer'];

        $targets = sendApiRequest('GET', 'target.getList', [
            'offer_hashes[]' => $offer_info['hash'],
            'with' => [
                'target_geo.country', 'target_geo.price_currency',
                'landings.locale', 'landings.domain',
                'transits.locale', 'transits.domain',
                'template',
                'locale'
            ]
        ])['response'];
        $postbacks = sendApiRequest('GET', 'postback.getList', ['flow_hash' => $flow_hash])['response'];

        $group_hash = $flow_info['group']['hash'] ?? null;
        $target_hash = $flow_info['target']['hash'] ?? $targets[0]['hash'];
        $extra_flow_hash = $flow_info['extra_flow']['hash'] ?? null;

        return view('publisher.flow.profile.edit', compact('flows', 'flow_info', 'offer_info', 'targets',
            'postbacks', 'group_hash', 'target_hash', 'extra_flow_hash'));
    }
}
