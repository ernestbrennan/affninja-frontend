<script type="text/x-template" id="filters-tpl">
  <form id="filters">
    <div class="filters_panel_white">

      {{--Filter by date--}}
      <div class="filter">
        <button type="button" class="btn btn-sm btn-select btn-filter" id="filter_date_button"
                data-filter="date">
        </button>
        @include('advertiser::parts.filters.date')
      </div>

      {{--Filter by currencies--}}
      @include('advertiser::parts.filters.currencies')

      {{--Filter by transaction type--}}
      <div class="filter">
        <button type="button" class="btn btn-sm btn-select btn-filter"
                id="filter_type_button"
                data-filter="type"> {{ trans('messages.type') }}
        </button>
        <div class="filter_wrap filter_wrap_select2" id="filter_type_wrap">
          <div class="select2_style3_wrap">
            <select class="select2_style3 js-select2 select2-offscreen select2_filter" id="filter_type" name="types[]"
                    data-filtername="{{ trans('messages.type') }}" multiple tabindex="-1" aria-hidden="true">
              <option value="advertiser.unhold"
                      @if(in_array('advertiser.unhold', Request::input('types', []))) selected @endif
              >{{ trans('finance.confirmed_action') }}</option>

              <option value="advertiser.deposit"
                      @if(in_array('advertiser.deposit', Request::input('types', []))) selected @endif
              >{{ trans('finance.advertiser.deposit') }}</option>

              <option value="advertiser.write-off"
                      @if(in_array('advertiser.write-off', Request::input('types', []))) selected @endif
              >{{ trans('finance.write_off_manual') }}</option>

              <option value="advertiser.cancel"
                      @if(in_array('advertiser.cancel', Request::input('types', []))) selected @endif
              >{{ trans('finance.advertiser.cancel') }}</option>
            </select>
          </div>
        </div>
      </div>

      {{--Filter by offer--}}
      <div class="filter">
        <button type="button" class="btn btn-sm btn-select btn-filter"
                id="filter_offer_button"
                data-filter="offer"> {{ trans('filters.offers') }}
        </button>
        <div class="filter_wrap filter_wrap_select2" id="filter_offer_wrap">
          <div class="select2_style3_wrap">
            <select class="select2_style3 js-select2 select2-offscreen select2_filter" name="offer_hashes[]"
                    data-filtername="{{ trans('filters.offers') }}"
                    multiple tabindex="-1" aria-hidden="true">
              @foreach($offer_list['response'] AS $offer)
                <option value="{{ $offer['hash'] }}"
                        @if(in_array($offer['hash'], Request::input('offer_hashes', []))) selected @endif
                >{{ $offer['title'] }}</option>
              @endforeach
            </select>
          </div>
        </div>
      </div>

      {{--Filter by target_geo--}}
      <div class="filter">
        <button type="button" class="btn btn-sm btn-select btn-filter"
                id="filter_target_geo_country_button"
                data-filter="target_geo_country">
          {{ trans('filters.target_geo') }}</button>
        <div class="filter_wrap filter_wrap_select2 select2_filter" id="filter_target_geo_country_wrap">
          <div class="select2_style3_wrap">
            <select class="select2_style3 js-select2 select2-offscreen select2_filter" name="country_ids[]"
                    id="filter_target_geo_country" data-filtername="{{ trans('filters.target_geo') }}"
                    multiple tabindex="-1">
              @foreach($country_list['response'] AS $country)
                <option value="{{ $country['id'] }}" data-country_code="{{ $country['code'] }}"
                        @if(in_array($country['id'], Request::input('country_ids', []))) selected @endif
                > {{ $country['title'] }}</option>
              @endforeach
            </select>
          </div>
        </div>
      </div>

      {{--Filters search_by and search--}}
      <div class="select">
        <div class="input-group">
          <div class="input-group-btn" style="width: 119px">
            <select-item v-model="search_field.value"
                         :options="search_field.options"
                         :track_by="search_field.track_by"
                         @update:selected="onSearchFieldUpdated"></select-item>
          </div>
          <input type="text" class="form-control filter_search btn-filter w110i m-l-n-xs" id="search"
                 name="search"
                 placeholder="{{ trans('messages.search') }}"
                 value="{{ app('request')->input('search') }}">
        </div>
      </div>

      <grouping-by-filter :grouping_options="grouping_options"></grouping-by-filter>

      {{--Submit button--}}
      <button @click="refreshTransactions"
              type="button" id="stat_submit" data-style="zoom-out"
              class="btn btn-success btn-outline btn-sm ladda-button btn-filter">
        <span class="ladda-label">{{ trans('filters.apply') }}</span>
      </button>
    </div>
  </form>
</script>