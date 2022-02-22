@php
  $title = trans('messages.ticket') . ' #'.$ticket['hash'] . ' - '. $ticket['title'];
@endphp

@extends('admin::app', [
'title' => $title,
'page_preloader' => true,
'no_page_header' => true,
])

@section('page_header')
  <h3 class="page-title">
    {{ $title }}
    <button class="btn btn-sm btn-danger pull-right hidden ladda-button" id="close_ticket" data-style="zoom-out"
    >{{ trans('messages.close') }}</button>
  </h3>
@endsection

@section('content')

  <div class="chat-discussion" id="ticket-messages">

    <form v-if="ticket.status !== 'closed'" @submit.prevent="createMessage">
      <div :class="['form-froup', empty_message_error ? 'has-error' : '']">
        <textarea v-model="message"
                  @keyup.ctrl.enter="createMessage"
                  class="form-control" rows="3" placeholder="{{ trans('tickets.new_message') }}..."
        ></textarea>
      </div>
      <div class="form-froup">
        <button class="btn btn-sm btn-outline btn-success m-t ladda-button" id="send_message_btn" data-style="zoom-out"
        >{{ trans('messages.send') }}</button>
      </div>
    </form>
    <div v-for="message in ticket.messages"
         :class="['chat-message', isMyMessage(message) ? 'right': 'left']"
    >
      <div class="message">
        <span class="message-date">@{{ message.created_at | datetime }}</span>
        <span class="message-author">
          <template v-if="isMyMessage(message)">@{{ message.user.profile.full_name }}</template>
          <template v-else>
            <i class="fa fa-user" :title="LANG_MESSAGES[message.user.role]" data-toggle="tooltip"></i>
              <enter-in-user-cabinet :hash="message.user.hash"
                                     :email="message.user.email"
              ></enter-in-user-cabinet>
            <user-group-badge :group="message.user.group"></user-group-badge>
          </template>
        </span>
        <hr class="hr-margin">
        <span class="message-content" v-html="message.message"></span>
      </div>
    </div>

  </div>
@endsection

@section('scripts')
  <script>
      ticket = {!! json_encode($ticket) !!};
      LANG_TICKETS = {!! json_encode(Lang::get('tickets')) !!};
  </script>
  <script src="/admin/ticket/messages/build.js?{{ Config::get('app.version') }}"></script>
@endsection