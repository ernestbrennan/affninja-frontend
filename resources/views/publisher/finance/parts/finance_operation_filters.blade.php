<div class="filters_panel_white">

  @include('publisher::parts.filters.date')
  <div class="filter">
    <button type="button" class="btn btn-sm btn-select btn-filter"
            id="filter_type_button"
            data-filter="type"> {{ trans('messages.type') }}
    </button>
    <div id="filter_type_wrap" class="filter_wrap filter_wrap_select2">
      <div class="select2_style3_wrap">
        <select id="filter_type" class="select2_style3 js-select2 select2-offscreen" multiple
                tabindex="-1" aria-hidden="true">

          <option value="publisher.hold">{{ trans('finance.publisher.hold') }}</option>
          <option value="publisher.unhold">{{ trans('finance.publisher.unhold') }}</option>
          <option value="publisher.cancel">{{ trans('finance.publisher.cancel') }}</option>
          <option value="publisher.withdraw">{{ trans('finance.publisher.withdraw') }}</option>
          <option value="publisher.withdraw_cancel">{{ trans('finance.publisher.withdraw_cancel') }}</option>

        </select>
      </div>
      <button class="btn btn-sm btn-info filter_submit" data-filter="type">
        {{ trans('filters.apply') }}</button>
      <button class="btn btn-sm btn-default filter_clear" data-filter="type">
        {{ trans('filters.clear') }}</button>
    </div>
  </div>
  <button
          type="button" id="filters_submit" data-style="zoom-out"
          class="btn btn-sm ladda-button btn-filter">
    <span class="ladda-label">{{ trans('filters.apply') }}</span>
  </button>
</div>