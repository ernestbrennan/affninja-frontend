@extends('publisher::app', [
'title' => trans('messages.tickets'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  <div id="tickets">

    @include('publisher::ticket.index.create_modal')
    <create-ticket-modal v-on:created="onCreated" ref="create_ticket_modal"></create-ticket-modal>

    <div class="filters_panel_white">
      <button @click="openCreateTicketModal" class="btn btn-outline btn-success btn-sm btn-create pull-right"
              type="button">
        {{ trans('messages.create') }}
      </button>
    </div>

    <table v-show="tickets.length" class="table table-hover table-condensed table-light-td">
      <thead>
      <tr>
        <th class="hash_td">{{ trans('messages.hash') }}</th>
        <th>{{ trans('messages.status') }}</th>
        <th>{{ trans('messages.topic') }}</th>
        <th>{{ trans('users.created') }}</th>
        <th colspan="2">{{ trans('tickets.answers') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(ticket, index) in tickets" class="ticket">
        <td class="hash_td">@{{ ticket.hash }}</td>
        <td style="width: 100px">
          <span v-if="ticket.status === 'closed'" class="badge badge-sm badge-danger"
          >{{ trans('tickets.closed') }}</span>
          <span v-else class="badge badge-sm badge-success">{{ trans('messages.is_active') }}</span>
        </td>
        <td>
          <a :href="'/tickets/' + ticket.hash + '/messages'">@{{ ticket.title }}</a>
          <span v-if="!ticket.is_read_user" class="badge badge-sm badge-success">New</span>
        </td>

        <td style="width: 250px">
          @{{ ticket.created_at | datetime }}
        </td>

        <td class="text-left" style="width: 160px">
          <template v-if="_.get(ticket.last_message_user, 'role') === 'publisher'">
            @{{ ticket.last_message_user.email }}
          </template>
          <template v-else>
            <span class="text-capitalize">{{ trans('tickets.support_user')}}</span>
          </template>
          <hr class="hr-margin">
          @{{ ticket.last_message_at | datetime }}
        </td>
      </tr>
      </tbody>
    </table>
    <empty-list-message v-if="!tickets.length" :message="LANG_TICKETS.on_get_list_not_found"></empty-list-message>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_TICKETS = {!! json_encode(Lang::get('tickets')) !!};
  </script>
  <script src="/publisher/ticket/index/build.js?{{ Config::get('app.version') }}"></script>
@endsection