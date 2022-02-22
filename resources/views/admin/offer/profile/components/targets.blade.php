<script type="text/x-template" id="targets-component-template">
  <div>
    @include('admin::offer.profile.components.target_settings_modal')

    <div class="display-flex-rigth-center m-b">
      <button v-show="selected_target.is_private"
              @click="openTargetPermissionsModal"
              class="btn btn-xs btn-default m-r-xs">
        <i class="fa fa-eye"></i> {{ trans('users.user_permissions') }}
      </button>
      <button v-if="targets.length"
              @click="openTargetEditModal(selected_target.index)"
              class="btn btn-xs btn-default btn-outline m-r-xs" type="button">
        <i class="fa fa-pencil"></i>
        {{ trans('offers.edit_target') }}
      </button>
      <button @click="openTargetCreateModal" class="btn btn-xs btn-success btn-outline">
        {{ trans('offers.add_target') }}
      </button>
    </div>

    <div v-show="targets.length" class="m-b">
      <row-carousel v-model="active_target_hash">
        <button v-for="target in targets"
                :data-id="target.hash"
                :key="target.hash"
                class="btn btn-default btn-sm btn-outline"
                type="button">
          <target-title :label="target.label"
                        :title="target.template.title"
          ></target-title>
            <default-label :is_default="target.is_default" :only_icon="true"></default-label>
            <inactive-label :is_active="target.is_active" :only_icon="true"></inactive-label>
            <private-label :is_private="target.is_private" :only_icon="true"></private-label>
        </button>
      </row-carousel>
    </div>

    {{-- Targets --}}
    <div class="hpanel">
      <div class="panel-heading hbuilt">
        <div class="panel-tools pull-left">
          <a class="showhide"><i class="fa fa-chevron-down"></i></a>
        </div>
        <span class="panel-title m-l-xs">{{ trans('target_geo.index_title') }}</span>
      </div>
      <div class="panel-body">
        <div class="">
          <button @click="openTargetGeoCreateModal(selected_target.id, selected_target.index)"
                  :disabled="!targets.length"
                  class="btn btn-xs btn-success btn-outline pull-right m-b" type="button">
            {{ trans('offers.add_target_geo') }}
          </button>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <target-geo-info v-if="_.size(selected_target)"
                             :target_geo_list="selected_target.target_geo"
                             :target_index="selected_target.index"
                             :offer_info="offer_info"
                             :key="target_geo_info.id"
                             :landing_type="selected_target.landing_type"
            ></target-geo-info>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>