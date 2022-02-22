<form id="filters">
  <div class="filter">
    <button type="button" class="btn btn-sm btn-select btn-filter" id="filter_date_button"
            data-filter="date">
    </button>
    @include('admin::parts.filters.date')
  </div>
  <div class="filter">
    <button type="button" class="btn btn-sm btn-select">
      {{ trans('filters.currency') }}</button>
    <div class="filter_wrap filter_wrap_select2">
      <div class="select2_style3_wrap">
        <select class="select2_style3 js-select2 select2-offscreen select2_filter" name="currency_ids[]"
                multiple tabindex="-1" data-filtername="{{ trans('filters.currency') }}">

          <option value="1"
                  @if(in_array(1, Request::input('currency_ids', []))) selected @endif>
            {{ trans('finance.rub') }}
          </option>
          <option value="3"
                  @if(in_array(3, Request::input('currency_ids', []))) selected @endif>
            {{ trans('finance.usd') }}
          </option>
          <option value="5"
                  @if(in_array(5, Request::input('currency_ids', []))) selected @endif>
            {{ trans('finance.eur') }}
          </option>
        </select>
      </div>
      <button class="btn btn-sm btn-info apply_filter">{{ trans('filters.apply') }}</button>
      <button class="btn btn-sm btn-default filter_clear">{{ trans('filters.clear') }}</button>
    </div>
  </div>
  <div class="filter">
    <button type="button" class="btn btn-sm btn-select">
      {{ trans('filters.advertiser_filter') }}</button>
    <div class="filter_wrap filter_wrap_select2">
      <div class="select2_style3_wrap">
        <select name="advertiser_hashes[]" class="select2_style3 js-select2 select2-offscreen select2_filter"
              multiple tabindex="-1" data-filtername="{{ trans('filters.advertiser_filter') }}">
          <option v-for="(advertiser, key) in advertisers" :value="advertiser.hash"
            :selected="checkSelectedAdvertisers(advertiser.hash, key)">
            @{{ advertiser.email }}
          </option>
        </select>
      </div>
      <button class="btn btn-sm btn-info apply_filter">{{ trans('filters.apply') }}</button>
      <button class="btn btn-sm btn-default filter_clear">{{ trans('filters.clear') }}</button>
    </div>
  </div>

  <button type="button" id="filters_submit" data-style="zoom-out"
          class="btn btn-success btn-outline btn-sm ladda-button btn-filter" data-spinner-color="#666"
          @click="reloadBalanceTransactions">
    <span class="ladda-label">{{ trans('filters.apply') }}</span>
  </button>
</form>

