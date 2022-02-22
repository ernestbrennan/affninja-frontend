<form id="filters" class="filters_panel_white">
  <div class="filter">
    <button type="button" class="btn btn-sm btn-select btn-filter" id="filter_date_button"
            data-filter="date">
    </button>
    <div class="filter_wrap filter_date_wrap" id="filter_date_wrap">
      <div class="filter_date_from_wrap">
        <div id="filter_date_from" data-date-format="dd.mm.yyy"></div>
      </div>
      <div class="filter_date_to_wrap">
        <div id="filter_date_to" data-date-format="dd.mm.yyyy"></div>
      </div>
      <div class="filter_date_set_wrap">
        <ul class="set_date_filter">
          <li>
            <a href="#" data-date_from="{{ date('d.m.Y', time()) }}"
               data-date_to="{{ date('d.m.Y', time()) }}">{{ trans('filters.today') }}
            </a>
          </li>
          <li>
            <a href="#" data-date_from="{{ date('d.m.Y', strtotime('yesterday')) }}"
               data-date_to="{{ date('d.m.Y', strtotime('yesterday')) }}">{{ trans('filters.yesterday') }}
            </a>
          </li>
          <li id="this_week_link_wrap">
            <a href="#" data-date_from="{{ date('d.m.Y', strtotime('this week')) }}"
               data-date_to="{{ date('d.m.Y', time()) }}">{{ trans('filters.current_week') }}
            </a>
          </li>
          <li id="prev_week_link_wrap">
            <a href="#" data-date_from="{{ date('d.m.Y', strtotime('last week')) }}"
               data-date_to="{{ date('d.m.Y', strtotime('last sunday')) }}">{{ trans('filters.prev_week') }}
            </a>
          </li>
          <li id="this_month_link_wrap">
            <a href="#" data-date_from="{{ date('01.m.Y', strtotime('yesterday')) }}"
               data-date_to="{{ date('d.m.Y', time()) }}">{{ trans('filters.this_month') }}
            </a>
          </li>
          <li id="prev_month_link_wrap">
            <a href="#"
               data-date_from="{{ date('d.m.Y', strtotime('first day of previous month')) }}"
               data-date_to="{{ date('d.m.Y', strtotime('last day of previous month')) }}">{{ trans('filters.prev_month') }}
            </a>
          </li>
        </ul>
        <button type="button" class="btn btn-info btn-sm filter_submit filter_date_submit"
                id="filter_date_submit"
                data-filter="date">{{ trans('filters.apply') }}
        </button>
        <img class="filter_button_close" src="/images/close.svg" height="19"
             width="19">
      </div>
    </div>
  </div>
  <div class="filter">
    <button type="button" class="btn btn-sm btn-select">
      {{ trans('filters.flow_filter') }}
    </button>
    <div class="filter_wrap filter_wrap_select2">
      <div class="select2_style3_wrap">
        <select class="select2_style3 js-select2 select2-offscreen select2_filter" multiple
                tabindex="-1" data-filtername="{{ trans('filters.flow_filter') }}"
                name="flow_hashes[]">
          @foreach($flow_list['response'] AS $flow)
            <option value="{{ $flow['hash'] }}"
                    @if(in_array($flow['hash'], Request::input('flow_hashes', []))) selected @endif>
              {{ $flow['title'] }}
            </option>
          @endforeach
        </select>
      </div>
      <button class="btn btn-sm btn-info apply_filter">{{ trans('filters.apply') }}</button>
      <button class="btn btn-sm btn-default filter_clear">{{ trans('filters.clear') }}</button>
    </div>
  </div>
  <div class="filter">
    <input type="text" class="form-control filter_search btn-filter" name="postback_hash"
           id="postback_hash" value="{{ app('request')->get('postback_hash', '') }}"
           placeholder="{{ trans('postbackout.postback_hash_placeholder') }}">
  </div>
  <div class="filter">
    <input type="text" class="form-control filter_search btn-filter" name="lead_hash" id="lead_hash"
           value="{{ app('request')->get('lead_hash', '') }}"
           placeholder="{{ trans('postbackout.lead_hash_placeholder') }}">
  </div>
  <button type="button" id="filter_submit" data-style="zoom-out" data-spinner-color="#666"
          class="btn btn-success btn-outline btn-sm ladda-button btn-filter">
    <span class="ladda-label">{{ trans('filters.apply') }}</span>
  </button>
</form>