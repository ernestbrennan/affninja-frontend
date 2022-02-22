<script type="text/x-template" id="create-offer-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="create-offer-modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">@{{ LANG_OFFERS.modal_create_header }}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="row">
              <div class="col-xs-6">
                <label class="control-label" for="title">@{{ LANG_MESSAGES.title }}:</label>
                <input v-model="offer_info.title" class="form-control" id="title">
              </div>
              <div class="col-xs-6">
                <label class="control-label" for="title_en">@{{ LANG_MESSAGES.title }} EN:</label>
                <input v-model="en_translation.title" class="form-control" id="title_en">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label" for="url">@{{ LANG_MESSAGES.link }}:</label>
            <input v-model="offer_info.url" class="form-control" id="url">
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-xs-6">
                <label class="control-label" for="preview">@{{ LANG_MESSAGES.preview }}:</label>
                <input @change="uploadFile($event)" class="form-control" type="file">
              </div>
              <div class="col-xs-6">
                <label class="control-label">@{{ LANG_MESSAGES.privacy }}:</label>
                <select-item v-model="selected_privacy"
                             :options="privacy_types"
                             track_by="value">
                </select-item>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-sm-6 col-xs-6">
                <label class="control-label" for="agreement">@{{ LANG_OFFERS.agreement }}:</label>
                <textarea v-model="offer_info.agreement" class="form-control" id="agreement" rows="2"></textarea>
              </div>
              <div class="col-sm-6 col-xs-6">
                <label class="control-label" for="agreement_en">@{{ LANG_OFFERS.agreement }} EN:</label>
                <textarea v-model="en_translation.agreement" class="form-control" id="agreement_en" rows="2"></textarea>
              </div>
            </div>

          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-sm-6 col-xs-6">
                <label class="control-label" for="description">@{{ LANG_OFFERS.short_description }}:</label>
                <textarea v-model="offer_info.description" class="form-control" id="description" rows="2"></textarea>
              </div>
              <div class="col-sm-6 col-xs-6">
                <label class="control-label" for="description_en">@{{ LANG_OFFERS.short_description }} EN:</label>
                <textarea v-model="en_translation.description" class="form-control" id="description_en"
                          rows="2"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="createOffer" class="btn btn-success btn-sm ladda-button" id="create_offer_submit"
                  data-style="zoom-out" type="button">
            <span class="ladda-label">
              @{{ LANG_MESSAGES.create_submit }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</script>