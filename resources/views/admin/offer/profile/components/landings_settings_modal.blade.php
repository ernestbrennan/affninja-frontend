<div v-if="landing_info" id="landing_settings_modal" class="modal fade" role="dialog">
  <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">×</button>
        <h4 class="modal-title" v-if="action == 'create'">{{ trans('landings.create_header') }}</h4>
        <h4 class="modal-title" v-if="action == 'edit'">{{ trans('landings.edit_header') }}</h4>
      </div>
      <div class="modal-body p-b-none-i">
        <form id="landing_settings_form" enctype="multipart/form-data">
          <div class="form-group">
            <label id="landing_title" class="control-label" for="landing_title">
              {{ trans('messages.title') }}:</label>
            <input v-model="landing_info.title" id="landing_title" class="form-control">
          </div>

          <div v-if="!landing_info.is_external" class="form-group">
            <label class="control-label" for="landing_subdomain">{{ trans('messages.subdomain') }}:</label>
            <input v-model="landing_info.subdomain" id="landing_subdomain"
                   class="form-control" autocomplete="off">
          </div>

          <div v-if="landing_info.is_external" class="form-group">
            <label class="control-label" for="landing_url">{{ trans('messages.url') }}:</label>
            <input v-model="landing_info.url" id="landing_url" class="form-control" autocomplete="off">

            <div class="m-t-xs clearfix">
              <label :class="['label label-default label_token m-b-none-i', external_macro.clickid ? 'checked' : '']"
                     for="clickid"
              ><i class="fa fa-plus"></i> {clickid}
                <input v-model="external_macro.clickid" class="hidden" id="clickid" type="checkbox">
              </label>

              <label :class="['label label-default label_token m-b-none-i', external_macro.offer_hash ? 'checked' : '']"
                     for="offer_hash"
              ><i class="fa fa-plus"></i> {offer_hash}
                <input v-model="external_macro.offer_hash" class="hidden" id="offer_hash" type="checkbox">
              </label>

              <label :class="['label label-default label_token m-b-none-i', external_macro.publisher_hash ? 'checked' : '']"
                     for="publisher_hash"
              ><i class="fa fa-plus"></i> {publisher_hash}
                <input v-model="external_macro.publisher_hash" class="hidden" id="publisher_hash" type="checkbox">
              </label>
            </div>
          </div>

          <div v-show="!landing_info.is_external" class="form-group">
            <label class="control-label" for="landing_realpath">{{ trans('landings.realpath') }}:</label>
            <input v-model="landing_info.realpath" class="form-control" id="landing_realpath"
                   placeholder="/online/odropsoffnl">
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-xs-6">
                <label class="control-label" for="thumb_path">{{ trans('messages.preview') }}:</label>
                <input @change="uploadLandingPreview" type="file" id="landing_preview" class="form-control">
              </div>
              <div class="col-xs-6">
                <label class="control-label" for="landing_locale_id">{{ trans('messages.locale') }}:</label>
                <select-item
                        v-model="selected_locale"
                        :options="locales"
                        :search="true"
                        label="text"
                        track_by="id"
                        :placeholder="LANG_MESSAGES.search"
                ></select-item>
              </div>
            </div>
          </div>

          <hr>

          <div class="form-group checkbox-inline-wrap">
            <h5 class="m-b-sm">{{ trans('messages.appearance') }}:</h5>
            <div class="checkbox checkbox-success checkbox-inline">
              <input v-model="landing_info.is_responsive" :true-value="1" :false-value="0"
                     id="landing_is_responsive" type="checkbox">
              <label for="landing_is_responsive">{{ trans('messages.is_responsive') }}</label>
            </div>
            <div class="checkbox checkbox-success checkbox-inline">
              <input v-model="landing_info.is_mobile"
                     :true-value="1" :false-value="0"
                     id="landing_is_mobile" type="checkbox">
              <label for="landing_is_mobile">{{ trans('messages.is_mobile') }}</label>
            </div>
          </div>

          <hr>

          <div class="form-group checkbox-inline-wrap">
            <h5 class="m-b-sm">{{ trans('messages.access') }}:</h5>
            <div class="checkbox checkbox-success checkbox-inline">
              <input v-model="landing_info.is_active" :true-value="1" :false-value="0"
                     id="landing_is_active" type="checkbox">
              <label for="landing_is_active">{{ trans('messages.is_active') }}</label>
            </div>
            <div class="checkbox checkbox-success checkbox-inline">
              <input v-model="landing_info.is_private" :true-value="1" :false-value="0"
                     id="landing_is_private" type="checkbox">
              <label for="landing_is_private">{{ trans('messages.is_private') }}</label>
            </div>
            <div class="checkbox checkbox-success checkbox-inline">
              <input v-model="landing_info.is_advertiser_viewable" :true-value="1" :false-value="0"
                     id="landing_is_advertiser_viewable" type="checkbox">
              <label for="landing_is_advertiser_viewable">{{ trans('messages.is_advertiser_viewable') }}</label>
            </div>
          </div>

          <hr v-show="!landing_info.is_external">

          <div v-show="!landing_info.is_external" class="form-group">
            <h5 class="m-b-sm">{{ trans('messages.success_page') }}:</h5>
            <div class="checkbox checkbox-success">
              <input v-model="landing_info.is_address_on_success"
                     :true-value="1" :false-value="0"
                     id="landing_is_address_on_success" type="checkbox">
              <label for="landing_is_address_on_success">{{ trans('landings.is_address_on_success') }}</label>
            </div>
            <div class="checkbox checkbox-success">
              <input v-model="landing_info.is_email_on_success"
                     :true-value="1" :false-value="0"
                     id="landing_is_email_on_success" type="checkbox">
              <label for="landing_is_email_on_success">{{ trans('landings.is_email_on_success') }}</label>
            </div>
            <div class="checkbox checkbox-success">
              <input v-model="landing_info.is_custom_success"
                     :true-value="1" :false-value="0"
                     id="landing_is_custom_success" type="checkbox">
              <label for="landing_is_custom_success">{{ trans('landings.is_custom_success') }}</label>
            </div>
            <div v-show="show_use_foreign_order_page_setting" class="checkbox checkbox-success">
              <input v-model="landing_info.use_foreign_order_page" :true-value="1" :false-value="0"
                     id="landing_use_foreign_order_page" type="checkbox">
              <label for="landing_use_foreign_order_page">{{ trans('landings.use_foreign_order_page') }}</label>
            </div>
            <div v-show="landing_info.use_foreign_order_page && show_use_foreign_order_page_setting"
                 class="row checkbox-content">
              <div class="col-lg-6 col-md-6">
                <label class="control-label" for="landing_order_page_landing_id">
                  {{ trans('landings.order_page_landing_id') }}:</label>
                <input v-model.lazy="landing_info.order_page_landing_id" id="landing_order_page_landing_id"
                       type="number" class="form-control">
              </div>
            </div>
          </div>

          <hr>

          <div class="form-group">
            <h5 class="m-b-sm">{{ trans('flows.additional_settings') }}:</h5>
            <div class="checkbox checkbox-success">
              <input v-model="landing_info.is_back_action"
                     :true-value="1" :false-value="0"
                     id="landing_is_back_action" type="checkbox">
              <label for="landing_is_back_action">{{ trans('messages.back_action') }}</label>
            </div>
            <div class="checkbox checkbox-success">
              <input v-model="landing_info.is_back_call"
                     :true-value="1" :false-value="0"
                     id="landing_is_back_call" type="checkbox">
              <label for="landing_is_back_call">{{ trans('messages.callback') }}</label>
            </div>
            <div class="checkbox checkbox-success">
              <input v-model="landing_info.is_vibrate_on_mobile"
                     :true-value="1" :false-value="0"
                     id="landing_is_vibrate_on_mobile" type="checkbox">
              <label for="landing_is_vibrate_on_mobile">{{ trans('messages.vibration_on_mobile') }}</label>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button v-if="action == 'create'" @click="createLanding"
                id="landing_create_submit_btn"
                type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
          <span class="ladda-label"> {{ trans('messages.create_submit') }}</span>
        </button>
        <button v-if="action == 'edit'" @click="editLanding"
                id="landing_edit_submit_btn"
                type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
          <span class="ladda-label"> {{ trans('messages.edit_submit') }}</span>
        </button>
      </div>
    </div>
  </div>
</div>
