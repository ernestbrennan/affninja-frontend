@extends('admin::app', [
'title' => trans('messages.tickets'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  <div id="tickets">

    @include('admin::ticket.index.defer_modal')
    <defer-ticket-modal v-on:deffered="onDeffered" ref="defer_ticket_modal"></defer-ticket-modal>

    <table v-show="tickets.length" class="table table-hover table-condensed table-light-td">
      <thead>
      <tr>
        {{--<th></th>--}}
        <th class="hash_td">{{ trans('messages.hash') }}</th>
        <th>{{ trans('messages.status') }}</th>
        <th>{{ trans('messages.topic') }}</th>
        <th>{{ trans('users.created') }}</th>
        <th colspan="2">{{ trans('tickets.answers') }}</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(ticket, index) in tickets" class="ticket">
        {{--<td class="checkbox_td pointer">--}}
          {{--<div class="checkbox checkbox-success">--}}
            {{--<input :checked="_.indexOf(selected_tickets, ticket.id) !== -1" type="checkbox">--}}
            {{--<label></label>--}}
          {{--</div>--}}
        {{--</td>--}}
        <td class="hash_td">@{{ ticket.hash }}</td>
        <td style="width: 100px">
          <ticket-status :status="ticket.status"></ticket-status>
          <span v-if="ticket.status === 'deffered'" class="badge badge-sm badge-danger"
          >@{{ ticket.deferred_until_at | datetime }}</span>
        </td>
        <td>
          <a :href="'/tickets/' + ticket.hash + '/messages'">@{{ ticket.title }}</a>
          <span v-if="!ticket.is_read_admin" class="badge badge-sm badge-success">New</span>
        </td>

        <td style="width: 250px">
          <i class="fa fa-user" :title="LANG_MESSAGES[ticket.user.role]" data-toggle="tooltip"></i>
          <enter-in-user-cabinet :email="ticket.user.email" :hash="ticket.user.hash"></enter-in-user-cabinet>
          <user-group-badge :group="ticket.user.group"></user-group-badge>
          <hr class="hr-margin">
          @{{ ticket.created_at | datetime }}
        </td>

        <td style="width: 95px">
          <a :href="'/tickets/' + ticket.hash + '/messages'"
          >@{{ ticket.admin_messages_count }} {{ trans('messages.replies') }}</a>
        </td>

        <td class="text-left" style="width: 160px">
          <template v-if="_.get(ticket.last_message_user, 'role') === 'administrator'">
            <span class="text-capitalize">@{{ ticket.last_message_user.profile.full_name }}</span>
          </template>
          <template v-else>
            <enter-in-user-cabinet :email="ticket.last_message_user.email" :hash="ticket.last_message_user.hash"
            ></enter-in-user-cabinet>
          </template>
          <hr class="hr-margin">
          @{{ ticket.last_message_at | datetime }}
        </td>

        <td style="width: 54px">
          <div class="btn-group">
            <button type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown"
                    aria-expanded="false">
              <i class="fa fa-cog"></i> <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-right">
              <li v-if="ticket.status !== 'closed'" @click.prevent="closeTicket(ticket)">
                <a href="#">{{ trans('messages.close') }}</a>
              </li>
              <li v-if="ticket.status !== 'closed'" @click.prevent="openDeferTicketModal(ticket)">
                <a href="#">{{ trans('messages.defer') }}</a>
              </li>
              <li v-if="ticket.status === 'closed'" @click.prevent="openTicket(ticket, index)">
                <a href="#">{{ trans('messages.open') }}</a>
              </li>
            </ul>
          </div>
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
  <script src="/admin/ticket/index/build.js?{{ Config::get('app.version') }}"></script>
@endsection