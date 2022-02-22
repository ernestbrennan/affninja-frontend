<?php

namespace App\Http\Controllers\Publisher;

use App\Http\Controllers\Controller;

class PostbackoutController extends Controller
{
	/**
	 * Вывод списка исходящих постбеков
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
	 */
	public function index()
	{
		$postbackout_logs = sendApiRequest('GET', 'postbackout.getList', []);
		$flow_list = sendApiRequest('GET', 'flow.getList', []);

		return view('publisher.postbackout.index', compact('postbackout_logs', 'flow_list'));
	}
}
