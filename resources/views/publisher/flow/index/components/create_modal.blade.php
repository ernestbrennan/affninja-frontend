<div class="modal fade" role="dialog" id="create_flow_modal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span></button>
        <h4 class="modal-title">{{ trans('flows.create_modal_title') }}</h4>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label for="flow_offer">{{ trans('flows.choose_offer') }}:</label>
              <multiselect v-model="selected_offer"
                           label="title"
                           track_by="hash"
                           :options="offers"
                           placeholder=""
                           :loading="offers_loading"
                           :show-labels="false">
                <div slot="option" slot-scope="props" class="option__desc">
                  <span class="option__title">@{{ props.option.title }}</span>
                  <i v-if="props.option.already_added" class="fa fa-star gold pull-right"></i>
                </div>
              </multiselect>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button @click="createFlow"
                :disabled="!_.get(selected_offer, 'hash', false)"
                class="btn btn-sm btn-success ladda-button"
                id="create_flow"
                data-style="zoom-out"
        ><span class="ladda-label">{{ trans('messages.continue') }}</span></button>
      </div>
    </div>
  </div>
</div>