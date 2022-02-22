<script type="text/x-template" id="yandex_metrika_component">
  <div class="modal fade" tabindex="-1" role="dialog" id="yandex_metrika_modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span></button>
          <h4 v-if="action === 'create'" class="modal-title">{{ trans('flows.create_yandex_metrika_title') }}</h4>
          <h4 v-if="action === 'edit'" class="modal-title">{{ trans('flows.edit_yandex_metrika_title') }}</h4>
        </div>
        <div class="modal-body">
          <div v-show="action === 'create' || action === 'edit'">
            <div class="form-group">
              <label class="control-label" for="yandex_metrika_id">{{ trans('flows.yandex_metrika_id') }}:</label>
              <input v-model="yandex_metrika_info.attributes.id" class="form-control" id="yandex_metrika_id"
                     type="text">
            </div>
            <div class="form-group">
              <div class="checkbox checkbox-success m-b-none-i">
                <input v-model="yandex_metrika_info.attributes.webvisor"
                       v-bind:true-value="1" v-bind:false-value="0" type="checkbox" id="yandex_metrika_webvisor">
                <label for="yandex_metrika_webvisor">{{ trans('flows.yandex_metrika_webvisor') }}</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col-xs-12 text-riight">
              <button v-if="action === 'create'" @click="createWidget"
                      :disabled="!attributes_changed"
                      class="btn btn-success btn-sm ladda-button"
                      id="create_flow_widget" data-style="zoom-out">
							<span class="ladda-label">
								 {{ trans('messages.create') }}
							</span>
              </button>
              <button v-if="action === 'edit'" @click="editWidget"
                      :disabled="!attributes_changed"
                      class="btn btn-success btn-sm ladda-button"
                      id="edit_flow_widget"
                      data-style="zoom-out">
							<span class="ladda-label">
								{{ trans('messages.save') }}
							</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>