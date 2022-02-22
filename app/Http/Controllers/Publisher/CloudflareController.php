<?php

namespace App\Http\Controllers\Publisher;

use Requests;
use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CloudflareController extends Controller
{
    const BASE_URL = 'https://api.cloudflare.com/client/v4';

    public function index()
    {
        return view('publisher.cloudflare.index');
    }

    public function disableIpv6(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'domains' => 'string',
            'email' => 'required|email',
            'auth_key' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $zones = explode(',', $request->input('domains'));

        foreach ($zones as $zone) {

            $zone = Requests::get(self::BASE_URL . '/zones?name=' . $zone, [
                'X-Auth-Email' => $request->input('email'),
                'X-Auth-Key' => $request->input('auth_key'),
            ]);

            $zone_info = json_decode($zone->body, true);

            if (!isset($zone_info['result'][0]['id'])) {
                continue;
            }

            Requests::patch(self::BASE_URL . "/zones/{$zone_info['result'][0]['id']}/settings/ipv6", [
                'X-Auth-Email' => $request->input('email'),
                'X-Auth-Key' => $request->input('auth_key'),
                'Content-Type' => 'application/json',
            ],
                json_encode(['value' => 'off'])

            );
        }

        return redirect()->back();
    }
}
