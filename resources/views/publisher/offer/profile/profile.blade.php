@extends('publisher::app', [
'page_preloader'=> true,
'title' => $offer_info['response']['title']
])

@section('content')

  @include('publisher::offer.profile.components.landings')
  @include('publisher::offer.profile.components.transits')

  <div id="offer_profile">
    <div @mouseleave="hideTooltip($event)" class="absolute" style="top: 15px; right: 15px;">
      <div class="display-flex-center">
        <button v-show="offer_info.already_added"
                @click="removeMyOffer(offer_info.hash)"
                class="btn btn-sm btn-danger btn-outline ladda-button"
                id="remove_my_offer"
                data-style="zoom-out"
                data-spinner-color="#666">
          {{ trans('offers.remove_from_favorites') }}
        </button>
        <button v-show="!offer_info.already_added"
                @click="createMyOffer(offer_info.hash)"
                class="btn btn-sm btn-success btn-outline ladda-button"
                id="create_my_offers"
                data-style="zoom-out"
                data-spinner-color="#666">
          {{ trans('offers.add_to_favorites') }}
        </button>
        <div class="m-l-xs">
          <i class="hint"
             data-toggle="tooltip"
             data-placement="bottom"
             data-title="{{ trans('offers.add_to_my_tooltip') }}"></i>
        </div>
      </div>
    </div>

    <fast-link-modal :targets="offer_info.targets" :offer_hash="offer_info.hash"></fast-link-modal>

    <div class="row">
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
            <p class="m-t m-b-none text-bold">{{ trans('messages.rules') }}:</p>
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
            <transits :transits="transits"
                      @selected-transit-updated="onSelectedTransitUpdated"
            ></transits>
          </div>
          <div class="col-xs-6">
            <landings :landings="selected_target.landings"
                      @selected-landing-updated="onSelectedLandingUpdated"
            ></landings>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-fixed-footer animated">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="form-group">
              <button @click="openFastLinkModal" class="btn btn-sm btn-success btn-outline ladda-button"
              >{{ trans('offers.get_fast_link') }}</button>
              <button @click="createFlow('{{$offer_info['response']['hash']}}')"
                      class="btn btn-sm btn-success btn-outline"
              >{{ trans('offers.create_flow') }}</button>
            </div>
          </div>
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
      LANG_STATISTICS = {!! json_encode(Lang::get('statistics')) !!};
      CDN_HOST = '{{ env('CDN_HOST') }}';
  </script>
  <script src="/publisher/offer/profile.js?{{ Config::get('app.version') }}"></script>
@endsection