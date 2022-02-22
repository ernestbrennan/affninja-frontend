<script type="text/x-template" id="filters_tpl">
  <form id="filters">
    <div class="filter">
      <button type="button" class="btn btn-sm btn-select btn-filter" id="filter_date_button"
              data-filter="date">
      </button>
      @include('advertiser::parts.filters.date')
    </div>
    <div class="select">
      <select-item v-model="group_by_data.value"
                   :options="group_by_data.options"
                   :track_by="group_by_data.track_by">
      </select-item>
    </div>
    <div class="filter">
      <button type="button" class="btn btn-sm btn-select">
        {{ trans('filters.country') }}</button>
      <div class="filter_wrap filter_wrap_select2">
        <div class="select2_style3_wrap">
          <select id="country_ids" class="select2_style3 js-select2 select2-offscreen select2_filter"
                  name="country_ids[]"
                  multiple tabindex="-1" data-filtername="{{ trans('filters.country') }}">
            @foreach($countries['response'] AS $country)
              <option value="{{ $country['id'] }}" data-country_code="{{ $country['code'] }}"
                      @if(in_array($country['id'], Request::input('country_ids', []))) selected @endif>
                {{ $country['title'] }}
              </option>
            @endforeach
          </select>
        </div>
      </div>
    </div>
    <div class="filter">
      <button type="button" class="btn btn-sm btn-select"> {{ trans('filters.offer') }}
      </button>
      <div class="filter_wrap filter_wrap_select2">
        <div class="select2_style3_wrap">
          <select id="offer_hashes" class="select2_style3 js-select2 select2-offscreen select2_filter" multiple
                  tabindex="-1" aria-hidden="true" name="offer_hashes[]"
                  data-filtername="{{ trans('filters.offer') }}">
            @foreach($offers['response'] AS $offer)
              <option value="{{ $offer['hash'] }}"
                      @if(in_array($offer['hash'], Request::input('offer_hashes', []))) selected @endif>
                {{ $offer['title'] }}
              </option>
            @endforeach
          </select>
        </div>
      </div>
    </div>

    {{--Filter by currencies--}}
    @include('advertiser::parts.filters.currencies')

    <div class="select">
      <div class="input-group">
        <div class="input-group-btn">
          <select-item v-model="search_field.value"
                       :options="search_field.options"
                       :track_by="search_field.track_by"
                       style="width: 105px;"
          ></select-item>
        </div>
        <input type="text" class="form-control filter_search btn-filter w110i m-l-n-xs" id="search"
               name="search"
               placeholder="{{ trans('messages.search') }}"
               value="{{ app('request')->input('search') }}">
      </div>
    </div>
    <div class="filter">
      <button @click="refreshReports"
              type="button" id="stat_submit" data-spinner-color="#666" data-style="zoom-out"
              class="btn btn-success btn-outline btn-sm ladda-button btn-filter">
        <span class="ladda-label">{{ trans('filters.apply') }}</span>
      </button>
    </div>
  </form>
</script>