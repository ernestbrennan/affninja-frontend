@extends('publisher::app', [
'page_preloader'=> true,
'title' => trans('offers.index_title'),
'no_page_header' => true,
])

@section('content')

  {{-- Templates --}}
  <script type="text/x-template" id="all_offers_list_tpl">
      @include('publisher::offer.index.parts.offers_list')
  </script>

  {{-- Root Vue --}}
  <div id="offers_list">
    <div class="filters_panel_white">
      <form id="filters">
        <search-filter></search-filter>
        <countries-for-offer-filter></countries-for-offer-filter>
        <apply-filters></apply-filters>
      </form>
    </div>

    <div class="display-flex">
      <div class="offer-aside">
        @include('publisher::offer.index.parts.aside_panel')
      </div>
      <div class="offer-list" id="all_offers_list_wrap">
        <all-offers ref="all_offers"></all-offers>
      </div>
    </div>
  </div>

@endsection

@section('scripts')
  <script>
      LANG_OFFERS = {!! json_encode(Lang::get('offers')) !!};
      CATEGORY_LIST = {!! json_encode($category_list_for_filter['response']) !!};
      OFFER_LABELS_LIST = {!! json_encode($offer_labels['response']) !!};
  </script>
  <script src="/publisher/offer/build.js?{{ Config::get('app.version') }}"></script>
@endsection
