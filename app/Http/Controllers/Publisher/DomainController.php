<?php

namespace App\Http\Controllers\Publisher;

use App\Http\Controllers\Controller;

class DomainController extends Controller
{
	/**
	 * Вывод списка прикрепленных доменов
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
	 */
	public function index()
	{
		return view('publisher.domain.index');
	}
}
