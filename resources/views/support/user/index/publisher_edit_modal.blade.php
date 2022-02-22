<script type="text/x-template" id="publisher-edit-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="publisher-edit-modal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title"
              v-html="LANG_USERS.edit + ' <b>'+ publisher_info.email + '</b>'"></h4>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="control-label" for="publisher_full_name">@{{ LANG_MESSAGES.name }}:</label>
            <input v-model="publisher_info.profile.full_name" id="publisher_full_name" class="form-control">
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <label class="control-label" for="publisher_phone">@{{ LANG_MESSAGES.phone }}:</label>
                <input v-model="publisher_info.profile.phone" id="publisher_phone"
                       class="form-control">
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 p-l-none">
                <label class="control-label" for="publisher_telegram">@{{ LANG_USERS.settings_telegram }}:</label>
                <input v-model="publisher_info.profile.telegram" id="publisher_telegram"
                       class="form-control">
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 p-l-none">
                <label class="control-label" for="publisher_skype">@{{ LANG_MESSAGES.skype }}:</label>
                <input v-model="publisher_info.profile.skype" id="publisher_skype"
                       class="form-control">
              </div>
            </div>
          </div>

          <div class="form-group">
            <div id="publisher_permissions_wrap">
              <label class="control-label">@{{ LANG_USERS.user_permissions
                }}:</label>
              <multiselect-list
                      v-on:edited="onMultiselectListEdited"
                      :entity_id="publisher_info.id"
                      :entity_type="permissions.entity_type"
                      :selected_entities_ids="permissions.selected_entities_ids"
                      :entities="permissions.entities"
              ></multiselect-list>
            </div>
          </div>

          <div v-show="change_permissions" class="form-group">
            <button @click="onPermissionsEdited" class="btn btn-success btn-sm ladda-button"
                    id="change_publisher_permissions_submit"
                    data-spinner-color="#666" data-style="zoom-out">
              <span class="ladda-label">@{{ LANG_MESSAGES.save }}</span>
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <div class="form-group">
            <button @click="editProfile" class="btn btn-success btn-sm ladda-button"
                    data-style="zoom-out" id="publisher_edit_profile_submit">
              <span class="ladda-label">@{{ LANG_MESSAGES.save }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>