@extends('publisher::app', [
'page_preloader'=> true,
'title' => $flow_info['target']['hash'] ?? false ?
trans('flows.edit_title') . ' "' . $flow_info['title'] . '"' . ' (' . $offer_info['title'] . ')' :
trans('flows.create_title') . ' "' . $offer_info['title'] . '" ' . trans('flows.create_title_flow')
])

@section('content')
  @include('publisher::postback.flow_postback_list')
  @include('publisher::flow.profile.components.flow_groups')
  @include('publisher::flow.profile.flow_widget.flow_widgets')
  @include('publisher::flow.profile.flow_widget.facebook_pixel')
  @include('publisher::flow.profile.flow_widget.yandex_metrika')
  @include('publisher::flow.profile.flow_widget.custom_html')
  @include('publisher::flow.profile.flow_widget.widget_modal')

  <div id="flow_profile">
    <form>

      <link-modal ref="link_modal"></link-modal>

      <div class="form-group">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <label class="control-label" for="title">{{ trans('messages.title') }}:</label>
            <input v-model="flow_info.title" type="text" class="form-control" id="title">
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <div class="form-group">
              <label class="control-label" for="target_hash">@{{ LANG_FLOWS.target_id }}:</label>
              <multiselect
                      :value="_.find(this.targets, {hash: flow_info.target_hash})"
                      :options="targets"
                      track-by="hash"
                      label="title"
                      :searchable="false"
                      :close-on-select="true"
                      :show-labels="false"
                      placeholder=""
                      :allow-empty="false"
                      @input="getTargetGeoList"
                      id="target_hash"
              ><span slot="noResult">{{ trans('filters.nothing_found') }}</span></multiselect>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <a class="internal-link" data-toggle="collapse" href="#taret-geo-wrap" aria-expanded="false"
           aria-controls="taret-geo-wrap"
        >{{ trans('flows.target_geo_title') }}</a>

        <div v-show="flow_info.target_hash != 0" class="m-t collapse" id="taret-geo-wrap">
          <div class="row">
            <div v-for="(target_geo, index) in this.selected_target.target_geo"
                 class="col-lg-3 col-md-3 col-sm-6 col-xs-6 border-right m-b-xs">
              <target-geo-item
                      :key="index"
                      :target_geo="target_geo"
              ></target-geo-item>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group m-b-none">
        <div class="row row-eq-height">
          <div class="col-xs-6">
            @include('publisher::flow.profile.components.transits')
          </div>
          <div class="col-xs-6">
            @include('publisher::flow.profile.components.landings')
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-xs-6">
            @include('publisher::flow.profile.components.transit_settings')
          </div>
          <div class="col-xs-6">
            @include('publisher::flow.profile.components.landing_settings')
          </div>
        </div>
      </div>

      @include('publisher::flow.profile.components.additional_settings_panel')

      <flow-postback-list :flow_info="flow_info"></flow-postback-list>

      <flow-widgets v-if="selected_target.landing_type === 'internal'"
                    v-model="widgets"
                    :flow_hash="flow_info.hash"
      ></flow-widgets>
    </form>

    <div class="panel-fixed-footer animated">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="form-group">
              <button v-if="{{ $offer_info['is_publisher_active'] }}"
                      @click="editFlow"
                      :disabled="!flow_changed"
                      id="edit_flow_submit"
                      class="btn btn-sm btn-success ladda-button pull-left"
                      data-style="zoom-out">
                  <span class="ladda-label">
                    @{{ flow_info.status === 'draft' ? LANG_MESSAGES.create : LANG_MESSAGES.save }}
                  </span>
              </button>
              <button v-else class="btn btn-sm btn-success disabled pull-left"
                      title="{{ trans('flows.offer_is_no_active') }}"
                      data-toggle="tooltip"
              >@{{ flow_info.status === 'draft' ? LANG_MESSAGES.create : LANG_MESSAGES.save }}
              </button>
              <span class="vertical-divider pull-left"></span>
              <button @click="openLinkModal" :disabled="flow_info.status === 'draft'"
                      class="btn btn-sm ladda-button btn-get-link pull-left"
                      data-spinner-color="#666" data-style="zoom-out" data-spinner-color="#666">
                {{ trans('messages.get_link') }}
              </button>
              <a href="/tools/domains" class="btn btn-sm btn-link pull-left"><i class="fa fa-link relative t-1"></i>{{
              trans
              ('domains.create') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_FLOWS = {!! json_encode(Lang::get('flows')) !!};
      LANG_OFFERS = {!! json_encode(Lang::get('offers')) !!};
      LANG_DOMAINS = {!! json_encode(Lang::get('domains')) !!};
      LANG_POSTBACKS = {!! json_encode(Lang::get('postbacks')) !!};
      LANG_FLOW_GROUPS = {!! json_encode(Lang::get('flow_groups')) !!};
  </script>
  <script src="/publisher/flow/profile.js?{{ Config::get('app.version') }}"></script>
  <script>
      Vue.set(vm, 'offer_info', {!! json_encode($offer_info) !!});

      Vue.set(vm.flow_info, 'hash', '{{ $flow_info['hash'] }}');
      Vue.set(vm.flow_info, 'title', '{{ $flow_info['title'] }}');
      Vue.set(vm.flow_info, 'is_detect_bot', '{{ $flow_info['is_detect_bot'] }}');
      Vue.set(vm.flow_info, 'is_hide_target_list', '{{ $flow_info['is_hide_target_list'] }}');
      Vue.set(vm.flow_info, 'is_noback', '{{ $flow_info['is_noback'] }}');
      Vue.set(vm.flow_info, 'is_show_requisite', '{{ $flow_info['is_show_requisite'] }}');
      Vue.set(vm.flow_info, 'is_remember_landing', '{{ $flow_info['is_remember_landing'] }}');
      Vue.set(vm.flow_info, 'is_remember_transit', '{{ $flow_info['is_remember_transit'] }}');
      Vue.set(vm.flow_info, 'tb_url', '{{ $flow_info['tb_url'] }}');
      Vue.set(vm.flow_info, 'group_hash', '{{ $group_hash }}');
      Vue.set(vm.flow_info, 'status', '{{ $flow_info['status'] }}');
      Vue.set(vm.flow_info, 'back_action_sec', '{{ $flow_info['back_action_sec'] }}');
      Vue.set(vm.flow_info, 'back_call_btn_sec', '{{ $flow_info['back_call_btn_sec'] }}');
      Vue.set(vm.flow_info, 'back_call_form_sec', '{{ $flow_info['back_call_form_sec'] }}');
      Vue.set(vm.flow_info, 'vibrate_on_mobile_sec', '{{ $flow_info['vibrate_on_mobile_sec'] }}');

      Vue.set(vm.flow_info, 'is_extra_flow', @if(isset($flow_info['extra_flow'])){{ 1 }}@else{{ 0 }}@endif);

      @if($extra_flow_hash)
      Vue.set(vm.flow_info, 'extra_flow_hash', {{ var_export($extra_flow_hash) }});
      @else
      Vue.set(vm.flow_info, 'extra_flow_hash', null);
      @endif

      Vue.set(vm.flow_info, 'target_hash', '{{ $target_hash }}');
      Vue.set(vm.flow_info, 'landings', {!! json_encode(collect($flow_info['landings'])->pluck('hash')->toArray()) !!});
      Vue.set(vm.flow_info, 'transits', {!! json_encode(collect($flow_info['transits'])->pluck('hash')->toArray()) !!});

      Vue.set(vm, 'is_tb', {!! var_export($flow_info['tb_url'] !== '') !!});
      Vue.set(vm, 'is_back_action', {!!var_export($flow_info['back_action_sec'] !== '') !!});
      Vue.set(vm, 'is_back_call', {!!  var_export($flow_info['back_call_btn_sec'] !== '' &&
      $flow_info['back_call_form_sec'] !== '') !!});
      Vue.set(vm, 'is_vibrate_on_mobile', {!! var_export($flow_info['vibrate_on_mobile_sec'] !== '') !!});
      Vue.set(vm, 'targets', {!! json_encode($targets)!!});
      Vue.set(vm, 'selected_target', {!! json_encode(collect($targets)->where('hash', $target_hash)->first()) !!});
      Vue.set(vm, 'flows', {!! json_encode($flows) !!});
      Vue.set(vm, 'widgets', {!! json_encode($flow_info['widgets']) !!});

      vm.cloneObjectsForCompare();
  </script>
@endsection