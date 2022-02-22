@extends('manager::app', [
'title' => trans('messages.advertisers'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')

  @include('manager::user.index.advertiser_edit_modal')

  <div id="users">
    <advertiser-edit-modal></advertiser-edit-modal>

    <div class="table-responsive" id="advertisers_list_table">
      <table v-show="advertisers.length" class="table table-bordered table-striped table-condensed">
        <thead>
        <tr>
          <th class="w70">@{{ LANG_MESSAGES.hash }}</th>
          <th>@{{ LANG_MESSAGES.email }}</th>
          <th>@{{ LANG_MESSAGES.balance }}</th>
          <th class="w85">@{{ LANG_MESSAGES.phone }}</th>
          <th class="w85">@{{ LANG_USERS.settings_telegram }}</th>
          <th class="w85">@{{ LANG_MESSAGES.skype }}</th>
          <th class="w30"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="advertiser in advertisers">
          <td>@{{ advertiser.hash }}</td>
          <td class="nowrap">
            <gravatar :email="advertiser.email"></gravatar>
            <enter-in-user-cabinet :email="advertiser.email" :hash="advertiser.hash"></enter-in-user-cabinet>
          </td>
          <td class="text-right nowrap">
            <template v-for="account in advertiser.accounts">
              <money :sum="+account.balance + +account.hold" :currency_id="account.currency_id" class="m-l"></money>
            </template>
          </td>
          <td>@{{ advertiser.profile.phone }}</td>
          <td>@{{ advertiser.profile.telegram }}</td>
          <td>@{{ advertiser.profile.skype }}</td>
          <td>
            <div class="display-flex-rigth-center">
                            <span v-if="advertiser.status === 'locked'"
                                  class="badge badge-sm badge-danger badge-btn m-r-xs"
                                  data-toggle="tooltip" :title="LANG_USERS.status_blocked">
                                <i class="fa fa-lock"></i>
                            </span>
              <button @click="openAdvertiserEditModal(advertiser)"
                      class="btn btn-xs btn-warning pull-right"
                      data-toggle="tooltip" :title="LANG_MESSAGES.edit">
                <i class="fa fa-pencil"></i>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <empty-list-message v-show="!advertisers.length && !pagination.active_ajax" :message="LANG_MESSAGES.is_empty"
    ></empty-list-message>
    <div id="scroll_progress_wrap"></div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_USERS = {!! json_encode(Lang::get('users')) !!};
      LANG_USER_GROUPS = {!! json_encode(Lang::get('advertiser_groups')) !!};
      LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
  </script>
  <script src="/manager/users/index/build.js?{{ Config::get('app.version') }}"></script>
@endsection