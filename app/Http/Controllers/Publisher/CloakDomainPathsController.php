<?php

namespace App\Http\Controllers\Publisher;

use App\Http\Controllers\Controller;

class CloakDomainPathsController extends Controller
{
    public function index($domain_hash)
    {
        $domain = sendApiRequest('GET', 'domain.getByHash', [
            'hash' => $domain_hash,
            'with' => ['paths']
        ])['response'];

        if (empty($domain)) {
            return redirect()->route('publisher::flow_index');
        }

        return view('publisher.domain.paths.index', ['domain' => $domain]);
    }
}
