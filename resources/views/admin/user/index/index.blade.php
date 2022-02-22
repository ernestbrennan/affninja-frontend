@extends('admin::app', [
'title' => trans('users.index_title'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')

  @include('admin::user.index.components.publishers')
  @include('admin::user.index.components.administrators')
  @include('admin::user.index.components.advertisers')
  @include('admin::user.index.components.supports')
  @include('admin::user.index.components.managers')
  @include('admin::user.index.components.user-blocker')
  @include('admin::user.index.components.user-creator')
  @include('admin::user.index.components.publisher_edit_modal')
  @include('admin::user.index.components.publisher_permissions_modal')
  @include('admin::user.index.components.advertiser_settings_modal')
  @include('admin::user.index.components.advertiser_account_modal')

  <div id="users_list_page">

    <advertiser-account-modal></advertiser-account-modal>
    <user-blocker></user-blocker>
    <user-creator :user_groups="user_groups"></user-creator>

    <div class="tab-content">
      <div class="tab-pane" role="tabpanel" id="publishers_tab_wrap">
        <publishers :user_groups="user_groups" ref="publishers"></publishers>
      </div>
      <div class="tab-pane" role="tabpanel" id="supports_tab_wrap">
        <supports ref="supports"></supports>
      </div>
      <div class="tab-pane" role="tabpanel" id="advertisers_tab_wrap">
        <advertisers ref="advertisers"></advertisers>
      </div>
      <div class="tab-pane" role="tabpanel" id="managers_tab_wrap">
        <managers ref="managers"></managers>
      </div>
      <div class="tab-pane" role="tabpanel" id="administrators_tab_wrap">
        <administrators ref="administrators"></administrators>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_USERS = {!! json_encode(Lang::get('users')) !!};
      LANG_USER_GROUPS = {!! json_encode(Lang::get('user_groups')) !!};
      LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
  </script>
  <script src="/admin/users/build.js?{{ Config::get('app.version') }}"></script>
@endsection