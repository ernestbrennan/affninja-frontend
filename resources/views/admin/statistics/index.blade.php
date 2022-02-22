@extends('admin::app', [
'title' => trans('statistics.title'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  @include('admin::statistics.parts.by_days')
  @include('admin::statistics.parts.by_hours')
  @include('admin::statistics.parts.by_publishers')
  @include('admin::statistics.parts.by_offers')
  @include('admin::statistics.parts.by_target_geo')
  @include('admin::statistics.parts.by_geo_ip')
  @include('admin::statistics.parts.by_landings')
  @include('admin::statistics.parts.by_transits')

  <div id="statistics">
    @include('admin::statistics.parts.filters')

    <by-days :currency_id="currency_id" ref="by_days"></by-days>
    <by-hours :currency_id="currency_id" ref="by_hours"></by-hours>
    <by-publishers :currency_id="currency_id" ref="by_publishers"></by-publishers>
    <by-offers :currency_id="currency_id" ref="by_offers"></by-offers>
    <by-target-geo :currency_id="currency_id" ref="by_target_geo"></by-target-geo>
    <by-geo-ip :currency_id="currency_id" ref="by_geo_ip"></by-geo-ip>
    <by-landings :currency_id="currency_id" ref="by_landings"></by-landings>
    <by-transits :currency_id="currency_id" ref="by_transits"></by-transits>

    <div class="data_table_wrap" id="statistics_table_wrap">
      <div class="table-responsive" id="handlebars_stat_tpl_wrap">

      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_STATISTICS = {!! json_encode(Lang::get('statistics')) !!};
      LANG_LEADS = {!! json_encode(Lang::get('leads')) !!};
      LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
      STAT_SETTINGS = {!! $stat_settings['response']['data'] ?? '{}' !!};
  </script>
  <script src="/admin/report.js?{{ Config::get('app.version') }}"></script>
@endsection