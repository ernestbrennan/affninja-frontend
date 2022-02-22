<script type="text/x-template" id="landings-tpl">
  <div class="hpanel">
    <div class="panel-heading hbuilt">
      <div class="panel-tools pull-left">
        <a class="showhide"><i class="fa fa-chevron-down"></i></a>
      </div>
      <btn-group-item :active="list_type" @updated="onListTypeUpdated" class="pull-right m-r-xs">
        <button class="btn btn-default btn-outline btn-xs" data-id="list" type="button">
          <i class="fa fa-list-ul"></i></button>
        <button class="btn btn-default btn-outline btn-xs" data-id="grid" type="button">
          <i class="fa fa-th"></i></button>
      </btn-group-item>
      <span class="panel-title m-l-xs">{{ trans('offers.landings') }}</span>
    </div>
    <div class="panel-body">
      <div class="row">
        <div v-show="list_type === 'grid'" class="col-xs-12">
          @include('advertiser::offer.profile.components.landings_grid')
        </div>
        <div v-show="list_type === 'list'" class="col-xs-12">
          @include('advertiser::offer.profile.components.landings_list')
        </div>
      </div>
    </div>
  </div>
</script>