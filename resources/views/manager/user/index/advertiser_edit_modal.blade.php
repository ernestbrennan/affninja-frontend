<script type="text/x-template" id="advertiser-edit-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="advertiser-edit-modal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title"
              v-html="LANG_USERS.edit + ' <b>'+ advertiser_info.email + '</b>'"></h4>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="control-label" for="advertiser_full_name">@{{ LANG_MESSAGES.name }}:</label>
            <input v-model="advertiser_info.profile.full_name" id="advertiser_full_name" class="form-control">
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <label class="control-label" for="advertiser_phone">@{{ LANG_MESSAGES.phone }}:</label>
                <input v-model="advertiser_info.profile.phone" id="advertiser_phone"
                       class="form-control">
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 p-l-none">
                <label class="control-label" for="advertiser_telegram">@{{ LANG_USERS.settings_telegram }}:</label>
                <input v-model="advertiser_info.profile.telegram" id="advertiser_telegram"
                       class="form-control">
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 p-l-none">
                <label class="control-label" for="advertiser_skype">@{{ LANG_MESSAGES.skype }}:</label>
                <input v-model="advertiser_info.profile.skype" id="advertiser_skype"
                       class="form-control">
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <label class="control-label" for="advertiser_whatsapp">@{{ LANG_MESSAGES.whatsapp }}:</label>
                <input v-model="advertiser_info.profile.whatsapp" id="advertiser_whatsapp"
                       class="form-control">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="form-group">
            <button @click="editProfile" class="btn btn-success btn-sm ladda-button"
                    data-style="zoom-out" id="advertiser_edit_profile_submit">
              <span class="ladda-label">@{{ LANG_MESSAGES.save }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>