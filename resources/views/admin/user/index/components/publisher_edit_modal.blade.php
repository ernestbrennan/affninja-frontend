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
            <label class="control-label" for="publisher_full_name">@{{ LANG_MESSAGES.name
              }}:</label>
            <input v-model="publisher_info.profile.full_name" id="publisher_full_name"
                   class="form-control">
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <label class="control-label" for="publisher_phone">@{{ LANG_MESSAGES.phone }}:</label>
                <input v-model="publisher_info.profile.phone" id="publisher_phone"
                       class="form-control">
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 p-l-none">
                <label class="control-label" for="publisher_telegram">Telegram:</label>
                <input v-model="publisher_info.profile.telegram" id="publisher_telegram"
                       class="form-control">
              </div>
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 p-l-none">
                <label class="control-label" for="publisher_skype">Skype:</label>
                <input v-model="publisher_info.profile.skype" id="publisher_skype"
                       class="form-control">
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label" for="publisher_comment">@{{ LANG_MESSAGES.comment }}:</label>
            <textarea v-model="publisher_info.profile.comment" id="publisher_comment" class="form-control"
                      rows="2"></textarea>
          </div>

          <div class="form-group">
            <label for="publisher_group">@{{ LANG_MESSAGES.group }}:</label>
            <select-item
                    v-model="selected_user_group"
                    :options="user_groups"
                    :search="true"
                    track_by="id"
                    id="publisher_group"
                    :loading="user_groups_loading"
            ></select-item>
          </div>
          <div class="form-group">
            <label for="publisher_group">@{{ LANG_MESSAGES.support_role }}:</label>
            <select-item
                    v-model="selected_support"
                    :options="supports"
                    label="email"
                    track_by="id"
                    :disabled="!supports.length"
            ></select-item>
          </div>
        </div>
        <div class="modal-footer">
          <div class="form-group">
            <button @click="editProfile" :disabled="user_groups_loading" class="btn btn-success btn-sm ladda-button"
                    data-style="zoom-out" id="publisher_edit_profile_submit">
              <span class="ladda-label">@{{ LANG_MESSAGES.save }}</span>
            </button>
            <div v-show="publisher_info.status == 'active'" class="pull-right">
              <button @click="show_blocking_comment = !show_blocking_comment"
                      class="btn btn-outline btn-danger btn-sm ladda-button pull-right" data-style="zoom-out">
                {{ trans('users.block_btn') }}
              </button>
            </div>
            <div v-show="show_blocking_comment">
              <div class="form-group m-t">
                <label class="control-label"
                       for="publisher_reason_for_blocking">{{ trans('users.reason_for_blocking') }}
                  :</label>
                <textarea v-model="publisher_info.reason_for_blocking"
                          id="publisher_reason_for_blocking"
                          class="form-control"
                          rows="2"></textarea>
              </div>
              <div class="form-group">
                <button @click="blockPublisher" class="btn btn-sm btn-danger ladda-button"
                        id="publisher_blocker_submit" data-style="zoom-out">
                  <span class="ladda-label">{{ trans('messages.approve') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>