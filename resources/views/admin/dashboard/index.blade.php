@extends('admin::app', [
    'page_preloader'=> true,
    'title' => trans('dashboard.index_title'),
    'no_page_header' => true,
])

@section('title'){{ trans('dashboard.index_title') }} - {{ trans('app.name') }}@endsection

@section('content')
  @include('admin::dashboard.parts.chart')

  <div class="dashboard" id="dashboard">
    <chart></chart>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_DASHBOARD = {!! json_encode(Lang::get('dashboard')) !!};
  </script>
  <script src="/admin/dashboard/build.js?{{ Config::get('app.version') }}"></script>
@endsection