<div class="form-group">
  <div class="hpanel panel-collapse m-t">
    <div class="panel-heading hbuilt">
      <div class="panel-tools">
        <a class="showhide"><i class="fa fa-chevron-down"></i></a>
      </div>
      <span class="panel-title">@{{ LANG_FLOWS.additional_settings }}</span>
    </div>

    <div class="panel-body" style="display: none">
      <div class="form-group">
        <flow-groups :flow_hash="flow_info.hash" :group_hash="flow_info.group_hash"
                     v-on:selected="updateGroupHash"></flow-groups>
      </div>

      <div class="checkbox checkbox-success">
        <input v-model="is_tb" id="is_tb"
               type="checkbox">
        <label for="is_tb">@{{ LANG_FLOWS.specify_traffback }}</label>
        <i class="hint"
           data-toggle="tooltip"
           data-placement="right"
           :data-title="LANG_FLOWS.is_tb_tooltip"></i>
      </div>
      <div v-show="is_tb" class="checkbox-content">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-11 p-r-xs">
            <input v-model="flow_info.tb_url"
                   type="text" id="tb_url" class="form-control" placeholder="http://example.com">
          </div>
        </div>
      </div>

      <div class="checkbox checkbox-success m-b-none-i">
        <input v-model="flow_info.is_detect_bot" :true-value="1" :false-value="0"
               type="checkbox" id="is_detect_bot">
        <label for="is_detect_bot">@{{ LANG_FLOWS.is_detect_bot }}</label>
        <i class="hint"
           data-toggle="tooltip"
           data-placement="right"
           :data-title="LANG_FLOWS.is_detect_bot_tooltip"></i>
      </div>
    </div>
  </div>
</div>