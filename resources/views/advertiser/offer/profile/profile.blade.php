@extends('advertiser::app', [
'page_preloader'=> true,
'title' => $offer_info['response']['title']
])

@section('content')

  @include('advertiser::offer.profile.components.landings')
  @include('advertiser::offer.profile.components.transits')

  <div class="row" id="offer_profile">
    <div class="col-xs-12">
      <div class="row m-b">
        <div class="col-lg-3 col-md-3 col-sm-3 hidden-xs p-r-none">
          <div class="preview">
            <img :src="CDN_HOST + offer_info.thumb_path"
                 :alt="offer_info.title"
                 style="max-width:100%;">
            <div class="labels text-right">
              <private-label :is_private="offer_info.is_private"></private-label>
              <offer-labels :labels="offer_info.labels"></offer-labels>
            </div>
          </div>
        </div>
        <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
          <a :href="offer_info.url" target="_blank">@{{ offer_info.url }}</a>
          <p class="m-t m-b">@{{ offer_info.description }}</p>
          <p class="m-t m-b-none font-bold">{{ trans('messages.rules') }}:</p>
          <offer-rules :agreement="offer_info.agreement" :forbidden_sources_str="forbidden_sources_str"></offer-rules>
        </div>
      </div>

      <div class="m-b">
        <row-carousel v-model="active_target_hash">
          <button v-for="target in offer_info.targets"
                  :data-id="target.hash"
                  :key="target.hash"
                  class="btn btn-default btn-sm btn-outline"
                  type="button">
            <target-title :label="target.label"
                          :title="target.template.title"
            ></target-title>
          </button>
        </row-carousel>
      </div>

      <div class="row m-b">
        <div v-for="target_geo in selected_target.target_geo" class="col-lg-3 col-md-3 col-sm-6 col-xs-6 nowrap">
          <target-geo-item :target_geo="target_geo"></target-geo-item>
        </div>
      </div>
      <div class="row m-b">
        <div class="col-xs-6">
          <transits :transits="selected_target.transits"></transits>
        </div>
        <div class="col-xs-6">
          <landings :landings="selected_target.landings"></landings>
        </div>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      var LANG_OFFERS = {!! json_encode(Lang::get('offers')) !!};
      var OFFER_INFO = {!! json_encode($offer_info['response']) !!};
      var OFFER_SOURCES = {!! json_encode($offer_sources['response']) !!};
  </script>
  <script src="/affiliate/offer/profile.js?{{ Config::get('app.version') }}"></script>
@endsection