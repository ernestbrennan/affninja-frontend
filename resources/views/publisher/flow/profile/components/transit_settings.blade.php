<div class="hpanel hpanel-white-footer">
  <div class="panel-footer with-border">
    <div class="form-group">
      <a @click.prevent="onTransitsExpandedUpdated"
         class="internal-link" data-toggle="collapse" href="#transit-additional-settings"
         aria-expanded="false" aria-controls="transits_description"
      >@{{ LANG_FLOWS.additional_settings }}</a>
      <div class="collapse m-t" id="transit-additional-settings">
        <div class="checkbox checkbox-success">
          <input v-model="flow_info.is_remember_transit" :true-value="1" :false-value="0"
                 type="checkbox" id="is_remember_transit">
          <label for="is_remember_transit">{{ trans('flows.remember_transit') }}&#160;<!--
            --><i class="hint" data-toggle="tooltip" data-placement="right"
                  data-title="{{ trans('flows.is_remember_transit_tooltip') }}"
            ></i></label>
        </div>
        <div class="checkbox checkbox-success">
          <input v-model="flow_info.is_noback" :true-value="1" :false-value="0"
                 type="checkbox" id="is_noback">
          <label for="is_noback">{{ trans('flows.is_noback') }}&#160;<!--
            --><i class="hint"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-title="{{ trans('flows.is_noback_tooltip') }}"></i>
          </label>
        </div>

        <div class="checkbox checkbox-success m-b-none">
          <input v-model="flow_info.is_extra_flow" :true-value="1" :false-value="0"
                 type="checkbox" id="is_extra_flow">
          <label for="is_extra_flow">{{ trans('flows.specify_extra_flow') }}&#160;<!--
            --><i class="hint"
                  data-toggle="tooltip" data-placement="right"
                  data-title="{{ trans('flows.is_extra_flow_tooltip') }}"></i>
          </label>
        </div>
        <div v-show="flow_info.is_extra_flow == 1 && flows.length" class="checkbox-content m-t p-b-none-i">
          <div class="row">
            <div class="col-lg-5 col-md-6 col-sm-8 col-xs-10">
              <select-item
                      v-model="selected_flow"
                      :options="flows"
                      track_by="hash"
                      label="title"
                      :searchable="true"
              ></select-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>