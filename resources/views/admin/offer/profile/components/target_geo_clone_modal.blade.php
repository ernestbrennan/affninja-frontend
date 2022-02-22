<script type="text/x-template" id="target_geo_settings_clone_tpl">

  {{-- Target geo clone modal --}}
  <div id="target_geo_clone_modal" class="modal fade" role="dialog">
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title">{{ trans('target_geo.clone_header') }}</h4>
        </div>
        <div class="modal-body">
          <form id="target_geo_clone_form">

            <div class="form-group">
              <label class="control-label" for="target_geo_locale_id">{{ trans('messages.country') }}:</label>
              <select-item v-model="selected_country"
                           :options="countries"
                           :search="true"
                           track_by="id"
                           label="title"
              ></select-item>
            </div>

            <div class="form-group">
              <div class="checkbox checkbox-success checkbox-inline">
                <input v-model="target_geo_info.clone_rules" v-bind:true-value="1" v-bind:false-value="0"
                       type="checkbox" id="target_geo_clone_rules">
                <label for="target_geo_clone_rules">{{ trans('target_geo.clone_rules') }}</label>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="cloneTargetGeo" id="target_geo_clone_submit"
                  type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
            <span class="ladda-label"> {{ trans('messages.clone_submit') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</script>