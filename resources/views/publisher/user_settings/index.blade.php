@extends('publisher::app',
['page_preloader'=> true,
'title' => trans('users.settings_title'),
'no_page_header' => true,
])

@section('title')
  {{ trans('users.settings_title') }} - {{ trans('app.name') }}
@endsection

@section('content')
  @include('publisher::postback.global_postback_list')
  @include('publisher::user_settings.parts.active_sessions')
  @include('publisher::requisites.requisites')
  @include('publisher::user_settings.parts.profile_form')

  <div class="hpanel" id="user_settings">
    <ul class="nav nav-tabs">
      <li>
        <a data-toggle="tab" href="#change_profile_tab" id="profile_tab" data-tab="profile">
          {{ trans('users.change_profile_tab') }}
        </a>
      </li>

      <li>
        <a data-toggle="tab" href="#change_password_tab" id="password_tab" data-tab="password">
          {{ trans('users.change_password_tab') }}
        </a>
      </li>

      <li>
        <a data-toggle="tab" href="#change_requisite_tab" id="requisite_tab" data-tab="requisite">
          {{ trans('users.change_requisite_tab') }}
        </a>
      </li>

      <li role="presentation">
        <a data-toggle="tab" href="#postback_tab_wrap" id="postback_tab" data-tab="postback">
          {{ trans('users.global_postbacks_tab') }}
        </a>
      </li>

      <li>
        <a data-toggle="tab" href="#active_sessions_tab" id="sessions_tab" data-tab="sessions">
          {{ trans('messages.active_sessions') }}
        </a>
      </li>
    </ul>

    <div class="tab-content">
      <profile-form></profile-form>
      @include('publisher::user_settings.parts.password')
      <requisites></requisites>
      <global-postback-list></global-postback-list>
      <active-sessions></active-sessions>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      USER_INFO = {!! json_encode($user_info['response']) !!};
      LANG_USERS = {!! json_encode(Lang::get('users')) !!};
      LANG_POSTBACKS = {!! json_encode(Lang::get('postbacks')) !!};
      LANG_FLOWS = {!! json_encode(Lang::get('flows')) !!};
      LANG_AUTH_TOKENS = {!! json_encode(Lang::get('auth_tokens')) !!};
  </script>
  <script src="/publisher/user/build.js?{{ Config::get('app.version') }}"></script>
@endsection
