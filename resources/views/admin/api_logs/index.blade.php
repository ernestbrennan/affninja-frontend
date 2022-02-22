@extends('admin::app', [
'title' => trans('navbar.api_logs'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  <div id="api-logs">
    <div class="filters_panel_white">
      @include('admin::api_logs.parts.filters')
    </div>
    <div v-content-preloader="pagination.loading && pagination.page === 1" class="table-responsive">
      @include('admin::api_logs.parts.list')
    </div>
  </div>

@endsection

@section('scripts')
  <script src="/admin/api_logs/build.js?{{ Config::get('app.version') }}"></script>
@endsection