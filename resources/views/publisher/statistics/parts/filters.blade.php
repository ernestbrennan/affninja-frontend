<div class="filters_panel_white">
  <groupings-component v-show="current_tab === 'report'"
                       :groupings="groupings"
                       :level_1_fields="group_by_report_fields"
                       :unmatched_fields_1="unmatched_fields_1"
                       :unmatched_fields_2="unmatched_fields_2"
  ></groupings-component>
  <group-device-fields v-show="current_tab === 'device'" :fields="group_by_device_fields"></group-device-fields>
  <date-filter></date-filter>

  <filters-wrap v-if="current_tab === 'report' || current_tab === 'device'"
                :filters="['flow_hashes', 'target_geo_country_ids', 'offer_hashes']">
    <flows-filter></flows-filter>
    <target-geo-countries-filter></target-geo-countries-filter>
    <offers-filter></offers-filter>
  </filters-wrap>

  <flows-filter v-show="current_tab !== 'report' && current_tab !== 'device'"></flows-filter>

  <countries-filter v-show="current_tab !== 'target_geo'
                        && current_tab !== 'report' && current_tab !== 'device'"></countries-filter>
  <target-geo-countries-filter
          v-show="current_tab === 'target_geo' || current_tab === 'leads'"></target-geo-countries-filter>

  <offers-filter v-show="current_tab !== 'report' && current_tab !== 'device'"></offers-filter>
  <landings-filter v-show="(offer_hashes.length || landing_hashes.length)
                         && current_tab !== 'report' && current_tab !== 'device'"></landings-filter>
  <transits-filter v-show="(offer_hashes.length || transit_hashes.length)
                         && current_tab !== 'report' && current_tab !== 'device'"></transits-filter>
  <data-params-filter v-show="current_tab !== 'report' && current_tab !== 'device'"></data-params-filter>
  <lead-statuses-filter v-show="current_tab === 'leads'"></lead-statuses-filter>
  <device-type-filter v-show="current_tab === 'leads'"></device-type-filter>
  <browsers-filter v-show="current_tab === 'leads'"></browsers-filter>
  <os-platforms-filter v-show="current_tab === 'leads'"></os-platforms-filter>
  <apply-filters></apply-filters>

  <div class="pull-right">
    <div v-show="current_tab !== 'leads'" class="filter" id="table_settings_btn_wrap">
      <button class="btn btn-sm btn-default hl_box_toggler"
              id="stat_output_columns_btn"
              data-target="#stat_settings_wrap">
        {{ trans('filters.columns') }}
      </button>
    </div>
    <currency-filter :set_url="false"></currency-filter>
  </div>
</div>