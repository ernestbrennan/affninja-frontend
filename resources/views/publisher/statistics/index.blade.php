@extends('publisher::app', [
'page_preloader'=> true,
'title' => trans('statistics.title'),
'no_page_header' => true,
])

@section('title')
  {{ trans('statistics.title') }} - {{ trans('app.name') }}
@endsection

@section('content')

  @include('publisher::statistics.parts.by_days')
  @include('publisher::statistics.parts.by_hours')
  @include('publisher::statistics.parts.by_flows')
  @include('publisher::statistics.parts.by_offers')
  @include('publisher::statistics.parts.by_target_geo')
  @include('publisher::statistics.parts.by_geo_ip')
  @include('publisher::statistics.parts.by_landings')
  @include('publisher::statistics.parts.by_transits')
  @include('publisher::statistics.parts.by_report')
  @include('publisher::statistics.parts.by_device')
  @include('publisher::statistics.parts.by_lead')

  <div id="statistics">
    @include('publisher::statistics.parts.filters')

    <div class="data_table_wrap" id="statistics_table_wrap">
      <by-days :currency_id="currency_id" ref="by_days"></by-days>
      <by-hours :currency_id="currency_id" ref="by_hours"></by-hours>
      <by-flows :currency_id="currency_id" ref="by_flows"></by-flows>
      <by-offers :currency_id="currency_id" ref="by_offers"></by-offers>
      <by-target-geo :currency_id="currency_id" ref="by_target_geo"></by-target-geo>
      <by-geo-ip :currency_id="currency_id" ref="by_geo_ip"></by-geo-ip>
      <by-landings :currency_id="currency_id" ref="by_landings"></by-landings>
      <by-transits :currency_id="currency_id" ref="by_transits"></by-transits>
      <by-report :currency_id="currency_id" v-show="current_tab === 'report'" ref="by_report"></by-report>
      <by-device :currency_id="currency_id" v-show="current_tab === 'device'" ref="by_device"></by-device>
      <by-leads v-show="current_tab === 'leads'" ref="by_leads"></by-leads>

      <div v-show="current_tab !== 'report' && current_tab !== 'leads' && current_tab !== 'device'"
           class="table-responsive"
           id="handlebars_stat_tpl_wrap"></div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_STATISTICS = {!! json_encode(Lang::get('statistics')) !!};
      LANG_FLOWS = {!! json_encode(Lang::get('flows')) !!};
      LANG_LEADS = {!! json_encode(Lang::get('leads')) !!};
      STAT_SETTINGS = {!! $stat_settings['response']['data'] ?? '{}' !!};
  </script>
  <script src="/publisher/statistics/report.js?{{ Config::get('app.version') }}"></script>
@endsection