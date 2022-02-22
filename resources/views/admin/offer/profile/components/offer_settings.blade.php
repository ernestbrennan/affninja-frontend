<script type="text/x-template" id="offer-settings-component-template">
  <div>
    {{-- Settings modal --}}
    <div class="modal fade" tabindex="-1" role="dialog" id="offer_settings_modal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">{{ trans('offers.modal_edit_header') }}</h4>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group row">
                <div class="col-xs-6">
                  <label class="control-label" for="title">{{ trans('messages.title') }}:</label>
                  <input v-model.lazy="offer_settings.title" type="text" id="title" class="form-control">
                </div>
                <div class="col-xs-6">
                  <label class="control-label" for="title_en">{{ trans('messages.title') }} EN:</label>
                  <input v-model.lazy="en_translation.title" type="text" id="title_en" class="form-control">
                </div>
              </div>

              <div class="form-group">
                <label class="control-label" for="url">{{ trans('messages.link') }}:</label>
                <input v-model.lazy="offer_settings.url" type="text" id="url" class="form-control">
              </div>

              <div class="form-group row">
                <div class="col-xs-4">
                  <label class="control-label" for="offer_preview">{{ trans('messages.preview') }}:</label>
                  <input @change="uploadOfferPreview" type="file" id="offer_preview" class="form-control">
                </div>
                <div class="col-xs-4">
                  <label class="control-label">{{ trans('messages.privacy') }}:</label>
                  <select-item v-model="selected_privacy"
                               :options="privacy_types"
                               track_by="value"
                  ></select-item>
                </div>
                <div class="col-xs-4">
                  <label class="control-label" for="status">{{ trans('messages.activity') }}:</label>
                  <select-item v-model="selected_status"
                               :options="statuses"
                  ></select-item>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-6 col-xs-6">
                  <label class="control-label" for="agreement">{{ trans('offers.agreement') }}:</label>
                  <textarea v-model.lazy="offer_settings.agreement" class="form-control" id="agreement" rows="4"
                  ></textarea>
                </div>
                <div class="col-sm-6 col-xs-6">
                  <label class="control-label" for="agreement_en">{{ trans('offers.agreement') }} EN:</label>
                  <textarea v-model="en_translation.agreement" class="form-control" id="agreement_en"
                            rows="4"></textarea>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-sm-6 col-xs-6">
                  <label class="control-label" for="description">{{ trans('offers.short_description') }}:</label>
                  <textarea v-model.lazy="offer_settings.description" class="form-control" id="description"
                            rows="4"></textarea>
                </div>
                <div class="col-sm-6 col-xs-6">
                  <label class="control-label" for="description_en">{{ trans('offers.short_description') }} EN:</label>
                  <textarea v-model="en_translation.description" class="form-control" id="description_en"
                            rows="4"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="editOffer"
                    class="btn btn-success btn-sm ladda-button" id="edit_offer_submit" data-style="zoom-out"
                    type="button">
              <span class="ladda-label"> {{ trans('messages.edit_submit') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>