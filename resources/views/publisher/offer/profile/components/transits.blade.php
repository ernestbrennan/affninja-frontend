<script type="text/x-template" id="transits-tpl">
  <div class="hpanel">
    <div class="panel-heading hbuilt">
      <btn-group-item :active="list_type" @updated="onListTypeUpdated" class="pull-right m-r-xs">
        <button class="btn btn-default btn-outline btn-xs" data-id="list" type="button">
          <i class="fa fa-list-ul"></i></button>
        <button class="btn btn-default btn-outline btn-xs" data-id="grid" type="button">
          <i class="fa fa-th"></i></button>
      </btn-group-item>
      <span class="panel-title">{{ trans('offers.transits') }}</span>
    </div>
    <div class="panel-body">
      <div class="row">
        <div v-show="list_type === 'grid'" class="col-xs-12">
          @include('publisher::offer.profile.components.transits_grid')
        </div>
        <div v-show="list_type === 'list'" class="col-xs-12">
          @include('publisher::offer.profile.components.transits_list')
        </div>
      </div>
    </div>
  </div>
</script>