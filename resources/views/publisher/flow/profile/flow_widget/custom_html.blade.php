<script type="text/x-template" id="custom_html_component">
  <div class="modal fade" tabindex="-1" role="dialog" id="custom_html_modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span></button>
          <h4 v-if="action === 'create'" class="modal-title">{{ trans('flows.create_custom_html_title') }}</h4>
          <h4 v-if="action === 'edit'" class="modal-title">{{ trans('flows.edit_custom_html_title') }}</h4>
        </div>
        <div class="modal-body">

          <div class="form-group">
            <div v-show="action !== null" class="form-group">
              <label for="custom_html_TransitCode">{{ trans('flows.transit_page') }}:</label>
              <textarea v-model="custom_html_info.attributes.TransitCode" class="form-control"
                        id="custom_html_TransitCode" rows="4"
              ></textarea>
            </div>
          </div>

          <div class="form-group">
            <div v-show="action !== null" class="form-group">
              <label for="custom_html_LandingCode">{{ trans('flows.landing_page') }}:</label>
              <textarea v-model="custom_html_info.attributes.LandingCode" class="form-control"
                        id="custom_html_LandingCode" rows="4"
              ></textarea>
            </div>
          </div>

          <div class="form-group">
            <div v-show="action !== null" class="form-group">
              <label for="custom_html_SuccessCode">{{ trans('flows.success_page') }}:</label>
              <textarea v-model="custom_html_info.attributes.SuccessCode" class="form-control"
                        id="custom_html_SuccessCode" rows="4"
              ></textarea>
            </div>
          </div>

          <div class="form-group">
            <div v-show="action !== null" class="form-group">
              <label for="custom_html_CorrectCode">{{ trans('flows.correct_page') }}:</label>
              <textarea v-model="custom_html_info.attributes.CorrectCode" class="form-control"
                        id="custom_html_CorrectCode" rows="4"
              ></textarea>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <div class="row">
            <div class="col-xs-12">
              <button v-if="action === 'create'" @click="createWidget"
                      :disabled="!attributes_changed"
                      class="btn btn-success btn-sm ladda-button"
                      id="create_flow_widget" data-style="zoom-out">
							<span class="ladda-label">
								 {{ trans('messages.create') }}
							</span>
              </button>
              <button v-if="action === 'edit'" @click="editWidget"
                      :disabled="!attributes_changed"
                      class="btn btn-success btn-sm ladda-button"
                      id="edit_flow_widget" data-style="zoom-out">
							<span class="ladda-label">
								 {{ trans('messages.save') }}
							</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>