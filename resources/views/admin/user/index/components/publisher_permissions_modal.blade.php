<script type="text/x-template" id="publisher-permissions-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="publisher-permissions-modal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title"
              v-html="LANG_USERS.user_permissions + ' <b>'+ publisher_info.email + '</b>'"></h4>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <div id="publisher_permissions_wrap">
              <label class="control-label">@{{ LANG_USERS.user_permissions }}:</label>
              <multiselect-list
                      @edited="onMultiselectListEdited"
                      :entity_id="publisher_info.id"
                      :entity_type="permissions.entity_type"
                      :selected_entities_ids="permissions.selected_entities_ids"
                      :entities="permissions.entities"
              ></multiselect-list>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <div class="form-group">
            <button @click="onPermissionsEdited"
                    :disabled="!change_permissions"
                    class="btn btn-success btn-sm ladda-button"
                    id="change_publisher_permissions_submit"
                    data-spinner-color="#666" data-style="zoom-out">
              <span class="ladda-label">{{ trans('messages.save') }}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</script>