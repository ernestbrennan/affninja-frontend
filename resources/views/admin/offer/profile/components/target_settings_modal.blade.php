<div id="target_settings_modal" class="modal fade" role="dialog">
  <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title" v-if="action == 'create'">{{ trans('targets.create_header') }}</h4>
        <h4 class="modal-title" v-if="action == 'edit'">{{ trans('targets.edit_header') }}</h4>
      </div>
      <div class="modal-body p-b-none-i">

        <div class="form-group">
          <div class="row row-eq-height">
            <div class="col-xs-6">
              <label class="control-label">{{ trans('messages.template') }}:</label>
              <a href="/offers/target_templates" class="nowrap pull-right" target="_blank">
                <i class="fa fa-external-link relative t-2"></i>{{ trans('templates.template_manage') }}
              </a>
              <select-item v-model="selected_template"
                           :options="templates"
                           :search="true"
                           track_by="id"
                           :loading="templates_loading"
              ></select-item>
            </div>
            <div class="col-xs-6">
              <label class="control-label" for="target_label">{{ trans('offers.label') }}:</label>
              <input v-model="target_info.label" id="target_label" class="form-control">
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row">
            <div class="col-xs-6">
              <label class="control-label">@{{ LANG_MESSAGES.type }}:</label>
              <select-item v-model="selected_type"
                           :options="types"
                           track_by="value">
              </select-item>
            </div>
            <div class="col-xs-6">
              <label class="control-label" for="target_locale_id">{{ trans('messages.locale') }}:</label>
              <select-item v-model="selected_locale"
                           label="text"
                           :options="locales"
                           :search="true"
                           track_by="id"
                           :placeholder="LANG_MESSAGES.search"
              ></select-item>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="row">
            <div class="col-xs-6">
              <label class="control-label">{{ trans('messages.privacy') }}:</label>
              <select-item v-model="selected_privacy"
                           :options="privacy_types"
                           track_by="value"
              ></select-item>
            </div>
            <div class="col-xs-6">
              <label class="control-label" for="target_locale_id">{{ trans('offers.landing_type') }}:</label>
              <select-item v-model="selected_landing_type"
                           :options="landing_types"
                           :disabled="action === 'edit'"
                           track_by="title"
              ></select-item>
            </div>
          </div>
        </div>

        <div class="form-group m-b-none-i">
          <div class="checkbox checkbox-success checkbox-inline">
            <input v-model="target_info.is_active" :true-value="1" :false-value="0"
                   id="target_is_active" type="checkbox">
            <label for="target_is_active" class="m-r-sm">{{ trans('messages.is_active') }}</label>
          </div>
          <div class="checkbox checkbox-success checkbox-inline">
            <input v-model="target_info.is_default"
                   :true-value="1"
                   :false-value="0"
                   id="target_is_default" type="checkbox">
            <label for="target_is_default" class="m-r-sm">{{ trans('messages.is_default') }}</label>
          </div>
        </div>

        <div class="form-group" v-show="selected_type.value === 'CPL'">
          <div class="checkbox checkbox-success checkbox-inline">
            <input v-model="target_info.is_autoapprove"
                   :true-value="1"
                   :false-value="0"
                   id="target_is_autoapprove" type="checkbox">
            <label for="target_is_autoapprove" class="m-r-sm">{{ trans('messages.auto_approve') }}</label>
          </div>
        </div>

      </div>
      <div class="modal-footer">
        <button v-if="action === 'create'" @click="createTarget" :disabled="templates_loading"
                id="target_create_submit"
                type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
          <span class="ladda-label">{{ trans('messages.create_submit') }}</span>
        </button>
        <template v-if="action === 'edit'">
          <button @click="editTarget"
                  id="target_edit_submit"
                  type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
            <span class="ladda-label">{{ trans('messages.edit_submit') }}</span>
          </button>
          <button @click="deleteTarget(target_index, target_info.id)"
                  id="target_delete_submit"
                  type="button" class="btn btn-danger btn-sm ladda-button pull-right" data-style="zoom-out">
            <span class="ladda-label">{{ trans('messages.delete_btn') }}</span>
          </button>
        </template>
      </div>
    </div>
  </div>
</div>