<div v-if="transit_info" id="transit_settings_modal" class="modal fade" role="dialog">
<div class="modal-dialog ">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
      <h4 class="modal-title" v-if="action == 'create'">{{ trans('transits.create_header') }}</h4>
      <h4 class="modal-title" v-if="action == 'edit'">{{ trans('transits.edit_header') }}</h4>
    </div>
    <div class="modal-body p-b-none-i">
      <form id="transit_settings_form" enctype="multipart/form-data">

        <div class="form-group">
          <div class="row">
            <div class="col-xs-6">
              <label id="transit_title" class="control-label" for="transit_title">
                {{ trans('messages.title') }}:</label>
              <input v-model.lazy="transit_info.title" id="transit_title" type="text" class="form-control">
            </div>
            <div class="col-xs-6">
              <label class="control-label" for="transit_subdomain">{{ trans('messages.subdomain') }}:</label>
              <input v-model="transit_info.subdomain" id="transit_subdomain" type="text"
                     class="form-control">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="control-label" for="transit_realpath">{{ trans('transits.realpath') }}:</label>
          <input v-model="transit_info.realpath" class="form-control" id="transit_realpath"
                 placeholder="/online/odropsoffnl">
        </div>

        <div class="form-group">
          <div class="row">
            <div class="col-xs-6">
              <label class="control-label" for="thumb_path">{{ trans('messages.preview') }}:</label>
              <input @change="uploadTransitPreview" type="file" id="transit_preview" class="form-control">
            </div>
            <div class="col-xs-6">
              <label class="control-label" for="transit_locale_id">{{ trans('messages.locale') }}:</label>
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
            <input v-model="transit_info.is_responsive" :true-value="1" :false-value="0"
                   id="transit_is_responsive" type="checkbox">
            <label for="transit_is_responsive">{{ trans('messages.is_responsive') }}</label>
          </div>
          <div class="checkbox checkbox-success checkbox-inline">
            <input v-model="transit_info.is_mobile" :true-value="1" :false-value="0"
                   id="transit_is_mobile" type="checkbox">
            <label for="transit_is_mobile">{{ trans('messages.is_mobile') }}</label>
          </div>
        </div>

        <hr>

        <div class="form-group checkbox-inline-wrap">
          <h5 class="m-b-sm">{{ trans('messages.access') }}:</h5>
          <div class="checkbox checkbox-success checkbox-inline">
            <input v-model="transit_info.is_active" :true-value="1" :false-value="0"
                   id="transit_is_active" type="checkbox">
            <label for="transit_is_active">{{ trans('messages.is_active') }}</label>
          </div>
          <div class="checkbox checkbox-success checkbox-inline">
            <input v-model="transit_info.is_private" :true-value="1" :false-value="0"
                   id="transit_is_private" type="checkbox">
            <label for="transit_is_private">{{ trans('messages.is_private') }}</label>
          </div>
          <div class="checkbox checkbox-success checkbox-inline">
            <input v-model="transit_info.is_advertiser_viewable" :true-value="1" :false-value="0"
                   id="transit_is_advertiser_viewable" type="checkbox">
            <label for="transit_is_advertiser_viewable">{{ trans('messages.is_advertiser_viewable') }}</label>
          </div>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button v-if="action == 'create'" @click="createTransit"
              id="transit_create_submit_btn"
              type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
        <span class="ladda-label"> {{ trans('messages.create_submit') }}</span>
      </button>
      <button v-if="action == 'edit'" @click="editTransit()"
              id="transit_edit_submit_btn"
              type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
        <span class="ladda-label"> {{ trans('messages.edit_submit') }}</span>
      </button>
    </div>
  </div>
</div>
</div>