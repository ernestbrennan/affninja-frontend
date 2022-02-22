<div class="hpanel hpanel-white-footer">
  <div class="panel-footer with-border">
    <div class="form-group">
      <a @click.prevent="onLandingsExpandedUpdated"
         href="#landing-additional-settings"
         class="internal-link"
         aria-controls="postback_description">
        @{{ LANG_FLOWS.additional_settings }}
      </a>
      <div class="collapse m-t" id="landing-additional-settings">
        <div class="checkbox checkbox-success">
          <input v-model="flow_info.is_remember_landing" :true-value="1" :false-value="0"
                 class="m-t display_i_b"
                 id="is_remember_landing" type="checkbox">
          <label for="is_remember_landing">{{ trans('flows.remember_landing') }}&#160;<!--
            --><i class="hint"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-title="{{ trans('flows.is_remember_landing_tooltip') }}"></i>
          </label>
        </div>
        <div class="checkbox checkbox-success" v-if="selected_target.landing_type !== 'external'">
          <input v-model="flow_info.is_show_requisite"
                 :true-value="1"
                 :false-value="0"
                 type="checkbox" id="is_show_requisite">
          <label for="is_show_requisite">{{ trans('flows.is_show_requisite') }}&#160;<!--
            --><i class="hint"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-title="{{ trans('flows.is_show_requisite_tooltip') }}"></i>
          </label>
        </div>
        <div class="checkbox checkbox-success" v-if="selected_target.landing_type !== 'external'">
          <input v-model="flow_info.is_hide_target_list"
                 :true-value="1"
                 :false-value="0"
                 type="checkbox" id="is_hide_target_list">
          <label for="is_hide_target_list">{{ trans('flows.is_hide_target_list') }}&#160;<!--
            --><i class="hint"
                  data-toggle="tooltip"
                  data-placement="right"
                  data-title="{{ trans('flows.is_hide_target_list_tooltip') }}"
                  aria-hidden="true"></i></label>
        </div>

        <div class="checkbox checkbox-success">
          <input v-model="is_back_action" id="is_back_action"
                 type="checkbox">
          <label for="is_back_action">@{{ LANG_MESSAGES.back_action }}</label>
          <i class="hint"
             data-toggle="tooltip"
             data-placement="right"
             :data-html="true"
             :data-title="LANG_FLOWS.is_back_action_tooltip"></i>
        </div>
        <div v-show="is_back_action" class="checkbox-content">
          <div class="row">
            <div class="col-xs-8">
              <div class="input-group">
                <input v-model.number="flow_info.back_action_sec"
                       type="text" id="back_action_sec" class="form-control">
                <div class="input-group-addon">@{{ LANG_MESSAGES.seconds_sm }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="checkbox checkbox-success">
          <input v-model="is_back_call" id="is_back_call"
                 type="checkbox">
          <label for="is_back_call">@{{ LANG_MESSAGES.callback }}</label>
          <i class="hint"
             data-toggle="tooltip"
             data-placement="right"
             :data-html="true"
             :data-title="LANG_FLOWS.is_back_call_tooltip"></i>
        </div>
        <div v-show="is_back_call" class="checkbox-content">
          <div class="row m-b">
            <div class="col-xs-8">
              <label class="control-label" for="back_call_btn_sec"
              >{{ trans('flows.is_back_call_btn_label') }}:</label>
              <div class="input-group">
                <input v-model.number="flow_info.back_call_btn_sec"
                       type="text" id="back_call_btn_sec" class="form-control">
                <div class="input-group-addon">@{{ LANG_MESSAGES.seconds_sm }}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-8">
              <label class="control-label" for="back_call_form_sec"
              >{{ trans('flows.is_back_call_form_label') }}:</label>
              <div class="input-group">
                <input v-model.number="flow_info.back_call_form_sec"
                       type="text" id="back_call_form_sec" class="form-control">
                <div class="input-group-addon">@{{ LANG_MESSAGES.seconds_sm }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="checkbox checkbox-success m-b-none">
          <input v-model="is_vibrate_on_mobile" id="is_vibrate_on_mobile"
                 type="checkbox">
          <label for="is_vibrate_on_mobile"> @{{ LANG_MESSAGES.vibration_on_mobile }}</label>
          <i class="hint"
             data-toggle="tooltip"
             data-placement="right"
             :data-html="true"
             :data-title="LANG_FLOWS.is_vibrate_on_mobile_tooltip"></i>
        </div>
        <div v-show="is_vibrate_on_mobile" class="checkbox-content m-t p-b-none-i">
          <div class="row">
            <div class="col-xs-8">
              <div class="input-group">
                <input v-model.number="flow_info.vibrate_on_mobile_sec"
                       type="text" id="vibrate_on_mobile_sec" class="form-control">
                <div class="input-group-addon">@{{ LANG_MESSAGES.seconds_sm }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>