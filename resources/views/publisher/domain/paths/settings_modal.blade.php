<div class="modal fade" role="dialog" id="settings_modal">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span>&times;</span>
        </button>
        <h4 v-show="action === 'create'">@{{ lang_domains.create_domain_page }}</h4>
        <h4 v-show="action === 'edit'">@{{ lang_domains.edit_domain_page }}</h4>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label class="control-label" for="path">@{{ lang_domains.path }}:</label>
          <input v-model="path_info.path" class="form-control" id="path">
        </div>

        <div class="form-group" id="flows_wrap" style="display: none;">
          <label class="control-label" for="flows">@{{ lang_messages.flow }}:</label>
          <select name="flow" id="flows"></select>
        </div>

        <div class="form-group">
          <label class="control-label" for="status">@{{ lang_messages.status }}:</label>
          <select v-model="path_info.status" class="form-control" id="status">
            <option value="moneypage">{{ trans('domains.path_active_status') }}</option>
            <option value="moneypage_for">{{ trans('domains.path_active_for_status') }}</option>
            <option value="safepage">{{ trans('domains.path_block_all_status') }}</option>
          </select>
        </div>

        <div v-show="path_info.status === 'moneypage_for'" class="form-group">
          <label class="control-label" for="data_parameter">@{{ lang_domains.path_data_parameter }}:</label>
          <select v-model="path_info.data_parameter" class="form-control" id="data_parameter">
            <option value="data1">data1</option>
            <option value="data2">data2</option>
            <option value="data3">data3</option>
            <option value="data4">data4</option>
          </select>
        </div>

        <div v-show="path_info.status === 'moneypage_for'" class="form-group">
          <label class="control-label" for="identifiers">@{{ lang_domains.path_identifiers }}:</label>
          <textarea v-model="path_info.identifiers" class="form-control" id="identifiers" rows="4"></textarea>
        </div>

        {{--<div class="form-group">--}}
        {{--<label class="control-label" for="cloak_system_id">@{{ lang_messages.cloak_system }}:</label>--}}
        {{--<select v-model="path_info.cloak_system_id" @change="cleanAttributes" class="form-control"--}}
        {{--id="cloak_system_id">--}}
        {{--<option value="2">FraudFilter</option>--}}
        {{--<option value="3">Keitaro</option>--}}
        {{--</select>--}}
        {{--</div>--}}

        <div v-show="path_info.cloak_system_id == 2" class="form-group">
          <div class="row">
            <div class="col-xs-5">
              <label class="control-label" for="fraudfilter_api_key">{{ trans('flows.fraudfilter_api_key') }}:</label>
              <input v-model="path_info.attributes.api_key" class="form-control" id="fraudfilter_api_key">
            </div>

            <div class="col-xs-3 p-l-none">
              <label class="control-label" for="fraudfilter_campaign_id">
                {{ trans('flows.fraudfilter_campaign_id') }}:</label>
              <input v-model="path_info.attributes.campaign_id" class="form-control" id="fraudfilter_campaign_id">
            </div>

            <div class="col-xs-4 p-l-none">
              <label class="control-label" for="fraudfilter_customer_email">
                {{ trans('flows.fraudfilter_customer_email') }}:</label>
              <input v-model="path_info.attributes.customer_email" class="form-control" id="fraudfilter_customer_email">
            </div>
          </div>
        </div>

        {{--<div v-show="path_info.cloak_system_id == 3" class="form-group">--}}
        {{--<div class="form-group">--}}
        {{--<label class="control-label" for="keitaro_api_key">{{ trans('flows.keitaro_api_key') }}:</label>--}}
        {{--<input v-model="path_info.attributes.api_key" class="form-control" id="keitaro_api_key">--}}
        {{--</div>--}}
        {{--<div class="form-group">--}}
        {{--<label class="control-label" for="keitaro_alias">--}}
        {{--{{ trans('flows.keitaro_alias') }}:</label>--}}
        {{--<input v-model="path_info.attributes.alias" class="form-control" id="keitaro_alias">--}}
        {{--</div>--}}
        {{--</div>--}}

        <div class="form-group">
          <div class="checkbox checkbox-success checkbox-inline">
            <input v-model="path_info.is_cache_result" :true-value="1" :false-value="0"
                   id="is_cache_result" type="checkbox">
            <label class="control-label" for="is_cache_result">{{ trans('flows.cloak_is_cache_result') }}</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button v-show="action === 'create'" @click="createPath"
                class="btn btn-sm btn-success ladda-button" id="create_path" data-style="zoom-out">
          <span class="ladda-label">@{{ lang_messages.add_btn }}</span>
        </button>
        <button v-show="action === 'edit'" @click="editPath" class="btn btn-sm btn-success ladda-button"
                id="edit_path" data-style="zoom-out">
          <span class="ladda-label">@{{ lang_messages.save }}</span>
        </button>
      </div>
    </div>
  </div>
</div>