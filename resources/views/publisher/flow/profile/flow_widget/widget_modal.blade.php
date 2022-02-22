<script type="text/x-template" id="widget-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="widget-modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span></button>
          <h4 class="modal-title">@{{ title }}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="control-label" for="widget-modal-id">{{ trans('messages.id') }}:</label>
            <input v-model="widget_info.attributes.id" class="form-control" id="widget-modal-id">
          </div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col-xs-12">
              <button v-if="action === 'create'"
                      @click="createWidget"
                      :disabled="!attributes_changed"
                      v-button-preloader="loading"
                      class="btn btn-success btn-sm ladda-button"
                      data-style="zoom-out">
                <span class="ladda-label">{{ trans('messages.create') }}</span>
              </button>
              <button v-if="action === 'edit'"
                      @click="editWidget"
                      :disabled="!attributes_changed"
                      v-button-preloader="loading"
                      class="btn btn-success btn-sm ladda-button"
                      data-style="zoom-out">
                <span class="ladda-label">{{ trans('messages.save') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>