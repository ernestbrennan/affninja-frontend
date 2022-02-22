<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class ComebackerAudioController extends Controller
{
	public function index()
	{
		$comebacker_audio_list = sendApiRequest('GET', 'comebacker_audio.getList', ['with' => ['locale']]);
		$locales = sendApiRequest('GET', 'locale.getList', []);

		return view('admin.comebacker_audio.list.list', compact('comebacker_audio_list', 'locales'));
	}
}
