<script type="text/x-template" id="filters-tpl">
    <form id="filters" class="filters_panel_white">
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

        {{--Filter by currencies--}}
        @include('advertiser::parts.filters.currencies')

        <div class="filter">
            <button type="button" class="btn btn-sm btn-select"> {{ trans('filters.offer') }}
            </button>
            <div class="filter_wrap filter_wrap_select2">
                <div class="select2_style3_wrap">
                    <select id="offer_hashes" class="select2_style3 js-select2 select2-offscreen select2_filter"
                            multiple
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

        <div class="filter">
            <button type="button" class="btn btn-sm btn-select">
                {{ trans('filters.country') }}</button>
            <div class="filter_wrap filter_wrap_select2">
                <div class="select2_style3_wrap">
                    <select id="target_geo_country_ids" class="select2_style3 js-select2 select2-offscreen select2_filter"
                            name="target_geo_country_ids[]"
                            multiple tabindex="-1" data-filtername="{{ trans('filters.country') }}">
                        @foreach($country_list['response'] AS $country)
                            <option value="{{ $country['id'] }}" data-country_code="{{ $country['code'] }}"
                                    @if(in_array($country['id'], Request::input('target_geo_country_ids', []))) selected @endif>
                                {{ $country['title'] }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>

        <div class="filter">
            <button type="button" class="btn btn-sm btn-select" id="lead_statuses_button">
                {{ trans('messages.status') }}</button>
            <div class="filter_wrap filter_wrap_select2">
                <div class="select2_style3_wrap">
                    <select id="lead_statuses" class="select2_style3 js-select2 select2-offscreen select2_filter"
                            multiple
                            tabindex="-1" aria-hidden="true" name="lead_statuses[]"
                            data-filtername="{{ trans('messages.status') }}">

                        <option @if(in_array('new', Request::input('lead_statuses', []))) selected
                                @endif value="new">
                            {{ trans('statistics.lead_new_status') }}
                        </option>
                        <option @if(in_array('approved', Request::input('lead_statuses', []))) selected
                                @endif value="approved">
                            {{ trans('statistics.lead_approved_status') }}
                        </option>
                        <option @if(in_array('cancelled', Request::input('lead_statuses', []))) selected
                                @endif value="cancelled">
                            {{ trans('statistics.lead_cancelled_status') }}
                        </option>
                        <option @if(in_array('trashed', Request::input('lead_statuses', []))) selected
                                @endif value="trashed">
                            {{ trans('statistics.lead_trashed_status') }}
                        </option>

                    </select>
                </div>
            </div>
        </div>

        <div class="select">
            <div class="input-group">
                <div class="input-group-btn">
                    <select-item v-model="search_field.value"
                                 :options="search_field.options"
                                 :track_by="search_field.track_by"
                                 style="width: 105px;"></select-item>
                </div>
                <input type="text" class="form-control filter_search btn-filter w110i m-l-n-xs" id="search"
                       name="search"
                       placeholder="{{ trans('messages.search') }}"
                       @if(app('request')->input('search') !== 'null') value="{{ app('request')->input('search') }}" @endif>
            </div>
        </div>
        <div class="filter">
            <button type="button" @click="refreshLeads" id="stat_submit" data-style="zoom-out" data-spinner-color="#666"
                    class="btn btn-success btn-outline btn-sm ladda-button btn-filter">
                <span class="ladda-label">{{ trans('filters.apply') }}</span>
            </button>
        </div>
    </form>
</script>