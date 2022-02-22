<script type="text/x-template" id="transits-component-template">
  <div class="hpanel">
    @include('admin::offer.profile.components.transits_settings_modal')
    <transit-permissions-modal></transit-permissions-modal>

    <div class="panel-heading hbuilt">
      <div class="panel-tools pull-left">
        <a class="showhide"><i class="fa fa-chevron-down"></i></a>
      </div>
      <span class="panel-title m-l-xs">{{ trans('messages.transits') }}</span>
      <btn-group-item :active="list_type" @updated="onListTypeUpdated" class="pull-right m-l-xs">
        <button class="btn btn-default btn-outline btn-xs" data-id="list" type="button">
          <i class="fa fa-list-ul"></i></button>
        <button class="btn btn-default btn-outline btn-xs" data-id="grid" type="button">
          <i class="fa fa-th"></i></button>
      </btn-group-item>
    </div>
    <div :class="['panel-body', list_type === 'list' ? 'panel-base' : 'panel-standart']">
      <div class="">
        <button @click="openTransitCreateModal"
                :disabled="!Object.size(targets[0])"
                class="btn btn-xs btn-success btn-outline pull-right m-b-xs"
        >{{ trans('offers.add_transit') }}</button>
      </div>
      <div class="row">
        <div v-if="list_type === 'grid'" class="col-xs-12">
          @include('admin::offer.profile.components.transits_grid')
        </div>
        <div v-if="list_type === 'list'" class="col-xs-12">
          @include('admin::offer.profile.components.transits_list')
        </div>
        <empty-list-message v-if="!transits.length" message="{{ trans('transits.not_found') }}"></empty-list-message>
      </div>
    </div>
  </div>
</script>