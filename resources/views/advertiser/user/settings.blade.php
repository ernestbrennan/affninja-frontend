@extends('advertiser::app', [
'title' => trans('users.settings_title'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  <div id="settings">
    <ul class="nav nav-tabs">
      <li class="@if(empty(app('request')->input('tab'))) active @endif">
        <a data-toggle="tab" href="#change_profile_tab" id="profile_tab" data-tab="profile">
          {{ trans('users.change_profile_tab') }}
        </a>
      </li>
      <li class="">
        <a data-toggle="tab" href="#change_password_tab" id="password_tab" data-tab="password">
          {{ trans('users.change_password_tab') }}
        </a>
      </li>
    </ul>
    <div class="tab-content">

      @include('advertiser::user.parts.profile')
      @include('advertiser::user.parts.password')

    </div>
  </div>
  <input id="user-info" value="{{ json_encode($user_info) }}" type="hidden">
@endsection

@section('scripts')
  <script>
      LANG_USERS = {!! json_encode(Lang::get('users')) !!};
      $('#{{ app('request')->input('tab')  }}_tab').tab('show');
  </script>
  <script src="/affiliate/user/build.js?{{ Config::get('app.version') }}"></script>
@endsection