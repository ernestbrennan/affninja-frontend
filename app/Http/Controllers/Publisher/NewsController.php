<?php

namespace App\Http\Controllers\Publisher;

use App\Http\Controllers\Controller;

class NewsController extends Controller
{
    public function index()
    {
        $news = sendApiRequest('GET', 'news.getList', ['page' => 1, 'per_page' => 10]);

        //Сброс флага непрочитанных новостей
        sendApiRequest('POST', 'news.readByUser', []);

        return view('publisher.news.index', ['news' => $news]);
    }
}
