<div class="modal fade" tabindex="-1" role="dialog" id="clone_modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span>×</span></button>
        <h4 class="modal-title">{{ trans('flows.clone_modal_title')  }} @{{ active_flow.title }}</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="clone_flow_title">{{ trans('messages.title') }}:</label>
          <input v-model="clone_flow.title" class="form-control" id="clone_flow_title">
        </div>
        <div class="form-group">
          <div class="checkbox checkbox-inline checkbox-success">
            <input v-model="clone_flow.clone_postbacks" type="checkbox" id="clone_postbacks">
            <label for="clone_postbacks">{{ trans('flows.clone_postbacks') }}</label>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="row">
          <div class="col-xs-12 pull-right">
            <a @click="cloneFlow('clone')" class="btn btn-sm btn-success ladda-button clone_flow" data-style="zoom-out">
              <span class="ladda-label">
                {{ trans('messages.clone') }}
              </span>
            </a>
            <a @click="cloneFlow('clone_and_open')" class="btn btn-sm btn-default clone_flow" data-style="zoom-out">
              <span class="ladda-label">
                 {{ trans('messages.clone_and_open') }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>