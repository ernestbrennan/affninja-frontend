<form id="filters" class="filters_panel_white">
  <div class="filter">
    <input class="form-control filter_search" name="search" placeholder="{{ trans('filters.search') }}"
           value="{{ Request::input('search', '') }}">
  </div>
  <div class="filter">
    <button class="btn btn-sm btn-select" type="button">
      {{ trans('filters.group') }}</button>
    <div class="filter_wrap filter_wrap_select2">
      <div class="select2_style3_wrap">
        <select class="select2_style3 js-select2 select2-offscreen select2_filter" name="group_hashes[]"
                multiple tabindex="-1" data-filtername="{{ trans('filters.group') }}">
          @foreach($flow_groups AS $group)
            <option value="{{ $group['hash'] }}"
                    @if(in_array($group['hash'], Request::input('group_hashes', []))) selected @endif>
              {{ $group['title'] }}
            </option>
          @endforeach
        </select>
      </div>
      <button class="btn btn-sm btn-info apply_filter">{{ trans('filters.apply') }}</button>
      <button class="btn btn-sm btn-default filter_clear">{{ trans('filters.clear') }}</button>
    </div>
  </div>
  <div class="filter">
    <button class="btn btn-sm btn-select" type="button">
      {{ trans('filters.offer') }}
    </button>
    <div class="filter_wrap filter_wrap_select2">
      <div class="select2_style3_wrap">
        <select class="select2_style3 js-select2 select2-offscreen select2_filter" name="offer_hashes[]"
                multiple tabindex="-1" data-filtername="{{ trans('filters.offer') }}">
          @foreach($offers AS $offer)
            <option value="{{ $offer['hash'] }}"
                    @if(in_array($offer['hash'], Request::input('offer_hashes', []))) selected @endif>
              {{ $offer['title'] }}
            </option>
          @endforeach
        </select>
      </div>
      <button class="btn btn-sm btn-info apply_filter">{{ trans('filters.apply') }}</button>
      <button class="btn btn-sm btn-default filter_clear">{{ trans('filters.clear') }}</button>
    </div>
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
    <button class="btn btn-success btn-outline btn-sm ladda-button btn-filter" id="filters_submit"
            data-spinner-color="#666" data-style="zoom-out" type="button">
      <span class="ladda-label">{{ trans('filters.apply') }}</span>
    </button>
  </div>
  <div class="filter pull-right">
    <button class="btn btn-sm btn-outline btn-success" data-toggle="modal"
            data-target="#create_flow_modal" type="button"
    >{{ trans('flows.create_flow') }}</button>
  </div>
  <div class="filter pull-right">
    <a class="btn btn-sm btn-link" href="{{ route('publisher::user_settings') }}?tab=postback">
      <i class="fa fa-link"></i> {{ trans('postbackout.global_postbackout') }}
    </a>
  </div>
</form>
