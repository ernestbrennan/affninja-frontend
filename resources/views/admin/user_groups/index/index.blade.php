@extends('admin::app', [
'title' => trans('navbar.user_groups'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  @include('admin::user_groups.index.components.settings_modal')
  @include('admin::user_groups.index.components.user_group_list')

  <div id="user-groups">
    <settings-modal ref="settings-modal"></settings-modal>
    <div class="filters_panel_white">
      <button @click="openCreateModal" class="btn btn-success btn-outline btn-sm pull-right">
        {{ trans('messages.create_btn') }}
      </button>
    </div>
    <div class="row">
      <div class="co12-lg-12 col-md-12 col-sm-12-col-xs-12" id="user_group_list_wrap">
        <user-group-list></user-group-list>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_USER_GROUPS = {!! json_encode(Lang::get('user_groups')) !!};
  </script>
  <script src="/admin/user_groups/build.js?{{ Config::get('app.version') }}"></script>
@endsection