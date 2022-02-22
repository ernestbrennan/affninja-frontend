@extends('admin::app', [
'title' => trans('offers.index_title'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  @include('admin::offer.index.parts.create_offer_modal')
  @include('admin::offer.index.parts.clone_offer_modal')
  @include('admin::offer.index.parts.offers_list')

  <div id="offers">
    <create-offer-modal></create-offer-modal>
    <clone-offer-modal></clone-offer-modal>

    <div class="filters_panel_white">
      <search-filter></search-filter>
      <countries-for-offer-filter></countries-for-offer-filter>
      <sources-for-offer-filter></sources-for-offer-filter>
      <currencies-filter></currencies-filter>
      <apply-filters></apply-filters>
      <div class="pull-right">
        <button @click="openCreateOfferModal" class="btn btn-outline btn-success btn-sm" type="button">
          {{ trans('messages.create_btn') }}
        </button>
      </div>
    </div>

    <div class="display-flex">
      <div class="offer-aside">
        @include('admin::offer.index.parts.aside_panel')
      </div>
      <div class="offer-list">
        <all-offers ref="all_offers"></all-offers>
      </div>
    </div>
  </div>

@endsection

@section('scripts')
  <script>
      LANG_OFFERS = {!! json_encode(Lang::get('offers')) !!};
      LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
      CATEGORY_LIST = {!! json_encode($category_list_for_filter['response']) !!};
      OFFER_LABELS_LIST = {!! json_encode($offer_labels['response']) !!};
  </script>
  <script src="/admin/offer/build.js?{{ Config::get('app.version') }}"></script>
@endsection