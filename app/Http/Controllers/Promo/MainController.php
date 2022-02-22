<?php

namespace App\Http\Controllers\Promo;

use App\Http\Controllers\Controller;
use Auth;

class MainController extends Controller
{
	/**
	 * Главная страница
	 *
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function index()
	{
        $user = \Session::get('user');
        if (!\is_null($user)) {
            return redirect()->to(getUserCabinetUrl($user['role']));
        }

        return view('promo::index.index');
    }

	/**
	 * Отображение формы для смены пароля
	 *
	 * @param $token
	 * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
	 */
	public function resetPassword($token)
	{
		return view('promo::main.resetPassword', ['token' => $token]);
	}
}
