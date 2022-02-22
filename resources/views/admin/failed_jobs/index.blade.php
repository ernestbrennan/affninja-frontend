@extends('admin::app', [
'title' => trans('failed_jobs.index_title'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  @include('admin::failed_jobs.failed_jobs_component')

  <div id="failed_jobs_list">
    <failed-jobs></failed-jobs>
  </div>

@endsection

@section('scripts')
  <script>
      LANG_FAILED_JOBS = {!! json_encode(Lang::get('failed_jobs')) !!};
  </script>
  <script src="/admin/failed_jobs/build.js?{{ Config::get('app.version') }}"></script>
@endsection