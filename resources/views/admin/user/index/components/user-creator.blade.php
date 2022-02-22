<script type="text/x-template" id="user-creator-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="user_creator_modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="user_creator_form">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 v-show="user_info.role === 'publisher'" class="modal-title">
              @{{ LANG_USERS.modal_title_publisher }}
            </h4>
            <h4 v-show="user_info.role === 'administrator'" class="modal-title">
              @{{ LANG_USERS.modal_title_administrator }}
            </h4>
            <h4 v-show="user_info.role === 'support'" class="modal-title">
              @{{ LANG_USERS.modal_title_support }}
            </h4>
            <h4 v-show="user_info.role === 'manager'" class="modal-title">
              @{{ LANG_USERS.modal_title_manager }}
            </h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="control-label" for="user_email">@{{ LANG_MESSAGES.email }}:</label>
              <input v-model.lazy="user_info.email" type="text" id="user_email" class="form-control">
            </div>
            <div class="form-group">
              <label class="control-label" for="user_password">@{{ LANG_MESSAGES.password }}:</label>
              <input v-model.lazy="user_info.password" type="password" id="user_password"
                     class="form-control">
            </div>

            <div v-if="user_info.role === 'publisher'" class="form-group">
              <label for="publisher_group">@{{ LANG_MESSAGES.group }}:</label>
              <select-item
                      v-model="selected_group"
                      :options="user_groups"
                      :search="true"
                      track_by="id"
                      id="publisher_group"
                      :loading="user_groups_loading"
              ></select-item>
            </div>
          </div>

          <div class="modal-footer">
            <button @click="createUser" :disabled="!user_groups.length"
                    type="button" class="btn btn-sm btn-success ladda-button"
                    id="create_user_submit" data-style="zoom-out"
            ><span class="ladda-label">@{{ LANG_MESSAGES.create_btn }}</span></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</script>
