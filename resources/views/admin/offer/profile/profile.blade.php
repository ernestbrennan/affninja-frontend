@extends('admin::app', [
'page_preloader' => true,
'title' => $offer_info['response']['title'],
])

@section('content')

  @include('admin::offer.profile.components.landings')
  @include('admin::offer.profile.components.transits')
  @include('admin::offer.profile.components.offer_settings')
  @include('admin::offer.profile.components.targets')
  @include('admin::offer.profile.components.target_geo_info')
  @include('admin::offer.profile.components.target_geo_settings')
  @include('admin::offer.profile.components.target_geo_rules')
  @include('admin::offer.profile.components.target_geo_clone_modal')
  @include('admin::offer.profile.components.target_geo_stakes_modal')
  @include('admin::offer.profile.components.entity_domains')
  @include('admin::offer.profile.components.offer-labels-modal')
  @include('admin::offer.profile.components.permissions_modal')
  @include('admin::offer.profile.components.target_geo_integration')

  <div id="offer_profile">

    <offer-settings :offer_info="offer_info"
                    @offer-edited="offerEditedEvent"
                    @offer-categories-edited="onOfferCategoriesEdited"
                    ref="offer_settings"
    ></offer-settings>

    <multiselect @edited="onMultiselectEdited" ref="multiselect"
    ><span slot="noResult">{{ trans('filters.nothing_found') }}</span></multiselect>

    <target-geo-rules :integrations="integrations" ref="target_geo_rules"></target-geo-rules>

    <target-geo-settings :countries="countries"
                         :currencies="currencies"
                         :integrations="integrations"
                         :offer="offer_info"
                         ref="target_geo_settings"
    ></target-geo-settings>

    <target-geo-clone-modal :countries="countries" ref="target_geo_clone_modal"></target-geo-clone-modal>

    <target-geo-stakes-modal :user_groups="user_groups" ref="target_geo_stakes_modal"></target-geo-stakes-modal>

    <entity-domains ref="entity_domains"></entity-domains>

    <offer-sources-modal :offer_id="offer_info.id"
                         :offer_sources="offer_sources"
                         :offer_offer_sources="offer_offer_sources"
                         @offer-source-edited="offerSourcesEditedEvent"
    ></offer-sources-modal>

    <offer-labels-modal :offer_id="offer_info.id"
                        :assigned_labels="offer_info.labels"
                        @offer-labels-edited="onOfferLabelsEdited"
                        ref="labels_modal"
    ></offer-labels-modal>

    <target-geo-integrations-modal v-if="offer_info.title"
                                   :offer_title="offer_info.title"
                                   @integration-updated="onTargetGeoIntegrationUpdated"
    ></target-geo-integrations-modal>

    <offer-permissions-modal></offer-permissions-modal>

    <target-permissions-modal></target-permissions-modal>

    <div class="row">
      <div class="col-xs-12">
        <button @click="openOfferEditModal" class="btn btn-xs btn-default">
          <i class="fa fa-pencil"></i> {{ trans('messages.edit') }}
        </button>
        <button @click="openOfferCategoriesSettings" class="btn btn-xs btn-default">
          <i class="fa fa-bars"></i> {{ trans('messages.categories') }}
        </button>
        <button @click="openLabelsModal" class="btn btn-xs btn-default">
          <i class="fa fa-tags"></i> {{ trans('messages.labels') }}
        </button>
        <button v-show="offer_info.is_private"
                @click="openPermissionsModal"
                class="btn btn-xs btn-default">
          <i class="fa fa-eye"></i> {{ trans('users.user_permissions') }}
        </button>
        <a :href="'/tools/news/create?offer_hash=' + offer_info.hash" class="btn btn-xs btn-default" target="_blank">
          <i class="fa fa-external-link"></i>{{ trans('messages.news') }}

        </a>
        <button @click="openOfferSourcesModal" class="btn btn-xs btn-default">
          <i class="fa fa-exchange"></i> {{ trans('offers.offer_sources') }}
        </button>
        <div class="preview pull-right">
          <img v-if="offer_info.thumb_path" :src="offer_info.thumb_path | cdn_nocache"
               :alt="offer_info.title" style="max-width:100%;">
          <div class="labels text-right">
            <offer-inactive-label :status="offer_info.status"></offer-inactive-label>
            <private-label :is_private="offer_info.is_private"></private-label>
            <offer-labels :labels="offer_info.labels"></offer-labels>
          </div>
        </div>

      </div>
    </div>

    <div class="row m-t">
      <div class="col-xs-12">
        <targets :locales="select2_locales"
                 :countries="countries"
                 :currencies="currencies"
                 :integrations="integrations"
                 :targets="targets"
                 :offer_info="offer_info"
                 :user_groups="user_groups"
                 @selected-target-updated="onSelectedTargetUpdated"
                 ref="offer_targets"
        ></targets>
      </div>
    </div>

    <div class="row row-eq-height m-t">
      <div class="col-xs-6">
        <transits :locales="select2_locales"
                  :transits="transits"
                  :targets="[selected_target]"
                  :offer_id="offer_info.id"
                  @transit-created="transitCreatedEvent"
                  @transit-edited="transitEditedEvent"
                  @transit-deleted="transitDeletedEvent"
                  ref="offer_transits"
        ></transits>
      </div>
      <div class="col-xs-6">
        <landings :locales="select2_locales"
                  :landings="landings"
                  :targets="[selected_target]"
                  :offer_id="offer_info.id"
                  @landing-created="landingCreatedEvent"
                  @landing-edited="landingEditedEvent"
                  @landing-deleted="landingDeletedEvent"
                  ref="offer_landings"
        ></landings>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_OFFERS = {!! json_encode(Lang::get('offers')) !!};
      LANG_OFFER_REQUISITES = {!! json_encode(Lang::get('offer_requisites')) !!};
      LANG_LANDINGS = {!! json_encode(Lang::get('landings')) !!};
      LANG_TRANSITS = {!! json_encode(Lang::get('transits')) !!};
      LANG_TARGETS = {!! json_encode(Lang::get('targets')) !!};
      LANG_TARGET_GEO = {!! json_encode(Lang::get('target_geo')) !!};
      LANG_TARGET_GEO_RULES = {!! json_encode(Lang::get('target_geo_rules')) !!};
      LANG_PAYMENT_METHODS = {!! json_encode(Lang::get('payment_methods')) !!};
      LANG_OFFER_EMAIL_INTEGRATION = {!! json_encode(Lang::get('email_integrations')) !!};
      LANG_DOMAINS = {!! json_encode(Lang::get('domains')) !!};
      LANG_USER_GROUPS = {!! json_encode(Lang::get('user_groups')) !!};
      LANG_PUBLISHERS = {!! json_encode(Lang::get('publishers')) !!};
  </script>
  <script src="/admin/offer/profile.js?{{ Config::get('app.version') }}"></script>
  <script>
      vm.offer_info = _.omit({!! json_encode($offer_info['response']) !!}, [
          'targets', 'currency', 'offer_sources', 'publishers', 'landings', 'transits', 'offer_categories', 'advertisers',
          'offer_requisites', 'email_integrations'
      ]);
      vm.targets = {!! json_encode($offer_info['response']['targets']) !!};
      vm.offer_offer_sources = {!! json_encode($offer_info['response']['offer_sources']) !!};
      vm.offer_sources = {!! json_encode($offer_sources['response']) !!};
      vm.user_groups = {!! json_encode($user_groups['response']) !!};
      vm.offer_categories = {!! json_encode($offer_categories['response']) !!};
      vm.offer_offer_categories = {!! json_encode($offer_info['response']['offer_categories']) !!};
      vm.offer_publishers = {!! json_encode($offer_info['response']['publishers']) !!};
      vm.offer_user_groups = {!! json_encode($offer_info['response']['user_groups']) !!};
      vm.offer_requisites = {!! json_encode($offer_info['response']['offer_requisites']) !!};
      vm.locales = {!! json_encode($locales['response']) !!};
      vm.publishers = {!! json_encode($publishers['response']) !!};
      vm.advertisers = {!! json_encode($advertisers['response']) !!};
      vm.countries = {!! json_encode($countries['response']) !!};
      vm.currencies = {!! json_encode($currencies['response']) !!};
      vm.integrations = {!! json_encode($integrations['response']) !!};
      vm.offer_email_integration = {!! json_encode($offer_info['response']['email_integration']) !!};
  </script>
@endsection