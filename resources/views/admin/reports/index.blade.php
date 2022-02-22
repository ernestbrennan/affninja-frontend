@extends('admin::app', [
'title' => trans('navbar.reports'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  @include('admin::reports.parts.by_days')

  <div id="reports">

    <div class="filters_panel_white">
      @include('admin::reports.parts.filters')
    </div>
    <div class="table-responsive">
      <div id="report_tables">
        <by-days v-show="current_report === 'days'" v-on:report-built="onReportBuilt" ref="by_days"></by-days>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_REPORTS = {!! json_encode(Lang::get('reports')) !!};
      LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
      LANG_LEADS = {!! json_encode(Lang::get('leads')) !!};
      LANG_STATISTICS = {!! json_encode(Lang::get('statistics')) !!};
      STAT_SETTINGS = {!! $stat_settings['response']['data'] ?? '{}' !!};
  </script>
  <script src="/admin/reports/build.js?{{ Config::get('app.version') }}"></script>
@endsection