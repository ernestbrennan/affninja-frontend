@extends('advertiser::app', [
'title' => trans('navbar.reports'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  @include('advertiser::reports.parts.by_days')
  @include('advertiser::reports.parts.by_offers')
  @include('advertiser::reports.parts.by_publishers')
  @include('advertiser::reports.parts.filters')

  <div id="reports">
    <div class="filters_panel_white">
      <filters></filters>
    </div>
    <div class="table-responsive relative">
      <div id="report_tables">
        <by-days v-show="current_report === 'days'" ref="by_days" v-on:report-built="onReportBuilt"
        ></by-days>
        <by-offers v-show="current_report === 'offers'" ref="by_offers" v-on:report-built="onReportBuilt"
        ></by-offers>
        <by-publishers v-show="current_report === 'publishers'" ref="by_publishers" v-on:report-built="onReportBuilt"
        ></by-publishers>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_REPORTS = {!! json_encode(Lang::get('reports')) !!};
      LANG_STATISTICS = {!! json_encode(Lang::get('statistics')) !!};
      LANG_LEADS = {!! json_encode(Lang::get('leads')) !!};
      STAT_SETTINGS = {!! $stat_settings['response']['data'] ?? '{}' !!};
  </script>
  <script src="/affiliate/reports/reports.js?{{ Config::get('app.version') }}"></script>
@endsection