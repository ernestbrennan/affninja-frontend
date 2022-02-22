<script type="text/x-template" id="facebook_pixel_component">
  <div class="modal fade" tabindex="-1" role="dialog" id="facebook_pixel_modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span></button>
          <h4 v-if="action === 'create'" class="modal-title">{{ trans('flows.create_fb_pixel_title') }}</h4>
          <h4 v-if="action === 'edit'" class="modal-title">{{ trans('flows.edit_fb_pixel_title') }}</h4>
        </div>
        <div class="modal-body">
          <div v-show="action === 'create' || action === 'edit'">
            <div class="form-group">
              <label class="control-label" for="facebook_pixel_id">{{ trans('flows.fb_pixel_id') }}:</label>
              <input v-model="facebook_pixel_info.attributes.id" class="form-control" id="facebook_pixel_id"
                     type="number">
            </div>

            <div class="form-group">
              <label for="available_pages">{{ trans('flows.fb_pixel_pages') }}:</label>

              <multiselect
                      :value="selected_pages"
                      :options="available_pages"
                      :multiple="true"
                      track-by="id"
                      label="text"
                      :searchable="true"
                      :close-on-select="true"
                      :show-labels="false"
                      placeholder=""
                      @input="fbPixelPagesUpdated"
              ><span slot="noResult">{{ trans('filters.nothing_found') }}</span></multiselect>
            </div>

            <div v-show="selected_pages.length > 0" class="alert alert-info" style="margin-bottom: 15px!important;">
              <a href="https://www.facebook.com/business/help/952192354843755" target="_blank">
                <i class="fa fa-external-link"></i> {{ trans('flows.fb_pixel_more_info') }}
              </a>
            </div>

            <div v-show="show_transit_events" class="form-group">
              <label class="control-label">{{ trans('flows.transit_page_events') }}:</label>

              <div v-show="_.find(available_events, ['text', 'TransitPageView']) !== -1" class="checkbox checkbox-success">
                <input v-model="facebook_pixel_info.attributes.TransitPageView" id="fb_pixel_TransitPageView"
                       :true-value="1" :false-value="0" type="checkbox">
                <label for="fb_pixel_TransitPageView">PageView</label>
                <i class="hint" aria-hidden="true"
                   data-container="body" data-toggle="popover" data-html="true"
                   data-content="{{ trans('flows.PageView_event') }}"></i>
              </div>
              <hr>
            </div>

            <div v-show="show_landing_events" class="form-group">
              <label class="control-label">{{ trans('flows.landing_page_events') }}:</label>
              <div v-show="_.indexOf(available_events, 'LandingPageView') !== -1" class="checkbox checkbox-success">
                <input v-model="facebook_pixel_info.attributes.LandingPageView" id="fb_pixel_LandingPageView"
                       :true-value="1" :false-value="0" type="checkbox">
                <label for="fb_pixel_LandingPageView">PageView</label>
                <i class="hint" aria-hidden="true"
                   data-container="body" data-toggle="popover" data-html="true"
                   data-content="{{ trans('flows.PageView_event') }}"></i>
              </div>

              <div v-show="_.indexOf(available_events, 'LandingViewContent') !== -1" class="checkbox checkbox-success">
                <input v-model="facebook_pixel_info.attributes.LandingViewContent" id="fb_pixel_LandingViewContent"
                       :true-value="1" :false-value="0" type="checkbox">
                <label for="fb_pixel_LandingViewContent">ViewContent</label>
                <i class="hint" aria-hidden="true"
                   data-container="body" data-toggle="popover" data-html="true"
                    data-content="{{ trans('flows.ViewContent_event') }}"></i>
              </div>

              <div v-show="_.indexOf(available_events, 'LandingLead') !== -1" class="checkbox checkbox-success">
                <input v-model="facebook_pixel_info.attributes.LandingLead" id="fb_pixel_LandingLead"
                       :true-value="1" :false-value="0" type="checkbox">
                <label for="fb_pixel_LandingLead">Lead</label>
                <i class="hint"
                   data-toggle="popover" aria-hidden="true"
                   data-container="body" data-html="true"
                   data-content="{{ trans('flows.Lead_event') }}"
                ></i>
              </div>
              <hr>
            </div>

            <div v-show="show_success_events" class="form-group">
              <label class="control-label">{{ trans('flows.success_page_events') }}:</label>
              <div v-show="_.indexOf(available_events, 'SuccessPageView') !== -1" class="checkbox checkbox-success">
                <input v-model="facebook_pixel_info.attributes.SuccessPageView" id="fb_pixel_SuccessPageView"
                       :true-value="1" :false-value="0" type="checkbox">
                <label for="fb_pixel_SuccessPageView">PageView</label>
                <i class="hint" data-toggle="popover" aria-hidden="true"
                   data-container="body" data-html="true"
                   data-content="{{ trans('flows.PageView_event') }}"></i>
              </div>

              <div v-show="_.indexOf(available_events, 'SuccessPurchase') !== -1" class="checkbox checkbox-success">
                <input v-model="facebook_pixel_info.attributes.SuccessPurchase" id="fb_pixel_SuccessPurchase"
                       :true-value="1" :false-value="0" type="checkbox">
                <label for="fb_pixel_SuccessPurchase">Purchase</label>
                <i class="hint" data-toggle="popover" aria-hidden="true"
                   data-container="body" data-html="true"
                   data-content="{{ trans('flows.SuccessPurchase_event') }}"></i>
              </div>
              <div v-show="facebook_pixel_info.attributes.SuccessPurchase" class="checkbox checkbox-success m-l">
                <input v-model="facebook_pixel_info.attributes.send_purchase_payout" :true-value="1" :false-value="0"
                       id="fb_pixel_send_SuccessPurchase_payout" type="checkbox">
                <label for="fb_pixel_send_SuccessPurchase_payout"
                >{{ trans('flows.fb_pixel_send_purchase_payout') }}</label>
              </div>
              <hr>
            </div>

            <div class="form-group">
              <div class="checkbox checkbox-success m-b-none-i">
                <input v-model="facebook_pixel_info.attributes.init_by_image"
                       :true-value="1" :false-value="0" type="checkbox" id="fb_pixel_init_by_image">
                <label for="fb_pixel_init_by_image">{{ trans('flows.fb_pixel_init_by_image') }}</label>
                <i class="hint" aria-hidden="true"
                   data-container="body" data-toggle="popover"  data-html="true"
                   data-content="{{ trans('flows.InitByImage_event') }}"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col-xs-12 text-riight">
              <button v-if="action === 'create'" @click="createWidget" :disabled="!facebook_changed"
                      class="btn btn-success btn-sm ladda-button" id="create_flow_widget" data-style="zoom-out">
							<span class="ladda-label">{{ trans('messages.create') }}</span>
              </button>
              <button v-if="action === 'edit'" @click="editWidget" :disabled="!facebook_changed"
                      class="btn btn-success btn-sm ladda-button" id="edit_flow_widget" data-style="zoom-out">
							<span class="ladda-label">{{ trans('messages.save') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>