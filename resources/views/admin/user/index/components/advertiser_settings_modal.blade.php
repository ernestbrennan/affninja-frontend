<script type="text/x-template" id="advertiser-settings-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="advertiser-settings-modal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 v-if="action === 'create'">@{{ LANG_USERS.modal_title_advertiser }}</h4>
          <h4 v-else
              v-html="LANG_MESSAGES.edit + ' <b>'+ advertiser_info.email + '</b>'"
              class="modal-title"></h4>
        </div>

        <div class="modal-body">

          <template v-if="action === 'create'">
            <div class="form-group">
              <label class="control-label" for="advertiser_email">@{{ LANG_MESSAGES.email }}:</label>
              <input v-model.lazy="advertiser_info.email" type="text" id="advertiser_email" class="form-control">
            </div>
            <div class="form-group">
              <label class="control-label" for="advertiser_password">@{{ LANG_MESSAGES.password }}:</label>
              <input v-model.lazy="advertiser_info.password" type="password" id="advertiser_password"
                     class="form-control">
            </div>
            <div class="form-group">
              <label class="control-label">@{{ LANG_USERS.create_accounts }}:</label>
              <div class="checkbox checkbox-success">
                <input v-model="accounts" type="checkbox" value="3" id="usd_account">
                <label for="usd_account">USD</label>
              </div>
              <div class="checkbox checkbox-success">
                <input v-model="accounts" type="checkbox" value="1" id="rub_account">
                <label for="rub_account">RUB</label>
              </div>
              <div class="checkbox checkbox-success">
                <input v-model="accounts" type="checkbox" value="5" id="eur_account">
                <label for="eur_account">EUR</label>
              </div>
            </div>
          </template>

          <div class="form-group">
            <label class="control-label" for="advertiser_info"
            >@{{ LANG_MESSAGES.title }}:</label>
            <input v-model.lazy="advertiser_info.info" id="advertiser_info"
                   class="form-control">
          </div>
          <div class="form-group">
            <label class="control-label" for="advertiser_full_name"
            >@{{ LANG_USERS.settings_full_name }}:</label>
            <input v-model.lazy="advertiser_info.full_name" id="advertiser_full_name"
                   class="form-control">
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-xs-6">
                <label class="control-label" for="advertiser_phone">@{{ LANG_MESSAGES.phone }}:</label>
                <input v-model.lazy="advertiser_info.phone" id="advertiser_phone"
                       class="form-control">
              </div>
              <div class="col-xs-6">
                <label class="control-label" for="advertiser_telegram">@{{ LANG_MESSAGES.telegram }}:</label>
                <input v-model.lazy="advertiser_info.telegram" id="advertiser_telegram"
                       class="form-control">
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-xs-6">
                <label class="control-label" for="advertiser_whatsapp">@{{ LANG_MESSAGES.whatsapp }}:</label>
                <input v-model.lazy="advertiser_info.whatsapp" id="advertiser_whatsapp"
                       class="form-control">
              </div>
              <div class="col-xs-6">
                <label class="control-label" for="advertiser_skype">@{{ LANG_MESSAGES.skype }}:</label>
                <input v-model.lazy="advertiser_info.skype" id="advertiser_skype"
                       class="form-control">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="publisher_group">@{{ LANG_MESSAGES.manager_role }}:</label>
            <select-item
                    v-model="selected_manager"
                    :options="managers"
                    label="email"
                    track_by="id"
                    :disabled="!managers.length"
            ></select-item>
          </div>
        </div>

        <div class="modal-footer">
          <div class="form-group">

            <button v-if="action === 'create'"
                    @click="createAdvertiser"
                    v-button-preloader="submin_btn_loading"
                    class="btn btn-success btn-sm ladda-button"
                    data-style="zoom-out"
            ><span class="ladda-label">@{{ LANG_MESSAGES.create }}</span>
            </button>

            <button v-if="action === 'edit'"
                    @click="editProfile"
                    v-button-preloader="submin_btn_loading"
                    class="btn btn-success btn-sm ladda-button"
                    data-style="zoom-out"
            ><span class="ladda-label">@{{ LANG_MESSAGES.save }}</span>
            </button>

            <div v-show="advertiser_info.status === 'active'" class="pull-right">
              <button @click="show_blocking_comment = !show_blocking_comment"
                      class="btn btn-outline btn-danger btn-sm ladda-button pull-right"
                      data-style="zoom-out"
              >{{ trans('users.block_btn') }}</button>
            </div>
            <div v-show="show_blocking_comment">
              <div class="form-group m-t">
                <label class="control-label"
                       for="advertiser_reason_for_blocking"
                >{{ trans('users.reason_for_blocking') }}:</label>
                <textarea v-model="advertiser_info.reason_for_blocking"
                          id="advertiser_reason_for_blocking"
                          class="form-control"
                          rows="2"></textarea>
              </div>
              <div class="form-group">
                <button @click="blockAdvertiser" class="btn btn-sm btn-danger ladda-button"
                        id="advertiser_blocker_submit" data-style="zoom-out">
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