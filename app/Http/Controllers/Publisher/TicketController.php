<?php

namespace App\Http\Controllers\Publisher;

use Auth;
use App\Http\Controllers\Controller;

class TicketController extends Controller
{

    /**
     * Вывод списка тикетов
     *
     * @param null $ticket_hash
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function index($ticket_hash = null)
    {
        $tickets = sendApiRequest('GET', 'ticket.getList', []);

        //Редирект на страницу создания тикета, если их у пользователя пока нету
        if (count($tickets['response']) < 1) {
            return redirect()->route('ticket_create');
        }

        $ticket_types = sendApiRequest('GET', 'ticket.getTypeList', []);

        $ticket_hash = (!is_null($ticket_hash) ? $ticket_hash : $tickets['response'][0]['hash']);
        $ticket_messages = sendApiRequest('GET', 'ticket.getMessageList', ['ticket_hash' => $ticket_hash]);

        $ticket_info = sendApiRequest('GET', 'ticket.getByHash', ['ticket_hash' => $ticket_hash]);

        return view('publisher.ticket.index', compact('tickets', 'ticket_info', 'ticket_messages', 'ticket_hash', 'ticket_types'));
    }

    /**
     * Создание тикета
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $ticket_types = sendApiRequest('GET', 'ticket.getTypeList', []);

        return view('publisher.ticket.create', ['ticket_types' => $ticket_types]);
    }
}
