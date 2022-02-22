<div class="filter">
  <button type="button" class="btn btn-sm btn-select">
    {{ trans('filters.currency') }}</button>
  <div class="filter_wrap filter_wrap_select2">
    <div class="select2_style3_wrap">
      <select class="select2_style3 js-select2 select2-offscreen select2_filter" name="currency_ids[]"
              multiple tabindex="-1" data-filtername="{{ trans('filters.currency') }}">
        <option class="text-capitalize" value="1"
                @if(in_array(1, Request::input('currency_ids', []))) selected @endif
        >RUB
        </option>
        <option class="text-capitalize" value="3"
                @if(in_array(3, Request::input('currency_ids', []))) selected @endif
        >USD
        </option>
        <option class="text-capitalize" value="5"
                @if(in_array(5, Request::input('currency_ids', []))) selected @endif
        >EUR
        </option>
      </select>
    </div>
  </div>
</div>