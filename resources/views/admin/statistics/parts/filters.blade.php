<div class="filters_panel_white">
  <form id="filters">
    <date-filter></date-filter>
    <publishers-filter></publishers-filter>
    <target-geo-countries-filter v-show="current_tab === 'target_geo'"></target-geo-countries-filter>
    <countries-filter v-show="current_tab !== 'target_geo'"></countries-filter>
    <offers-filter></offers-filter>
    <landings-filter v-show="offer_hashes.length || landing_hashes.length"></landings-filter>
    <transits-filter v-show="offer_hashes.length || transit_hashes.length"></transits-filter>
    <apply-filters></apply-filters>
  </form>

  <div class="pull-right">
    <div class="filter" id="table_settings_btn_wrap">
      <button class="btn btn-sm btn-default hl_box_toggler" id="stat_output_columns_btn"
              data-target="#stat_settings_wrap">
        {{ trans('filters.columns') }}
      </button>
    </div>
    <div class="filter">
      <currency-filter :set_url="false"></currency-filter>
    </div>
  </div>
</div>