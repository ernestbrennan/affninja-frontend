<?php namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;

class UserController extends Controller
{
    /**
     * Отображение шаблона списка пользователей
     *
     * @return mixed
     */
    public function index()
    {
        return view('admin.user.index.index');
    }

    /**
     * Отображение шаблона настроек профиля пользователя
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function settings()
    {
        $user_info = sendApiRequest('GET', 'user.getByHash', ['user_hash' => \Session::get('user')['hash']]);

        return view('admin.user.settings.settings', ['user_info' => $user_info]);
    }
}
