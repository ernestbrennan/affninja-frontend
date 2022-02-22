<script type="text/x-template" id="write-off-modal-tpl">
  <div id="write-off-modal" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title">{{ trans('deposits.write_off_header') }}</h4>
        </div>
        <div class="modal-body">
          <form id="deposit_settings_form" enctype="multipart/form-data">
            <div v-if="action === 'create'" class="form-group">
              <label class="control-label"
                     for="deposit_advertiser_id">{{ trans('messages.advertiser') }}:</label>
              <select-item v-model="selected_advertiser"
                           :options="advertisers"
                           :search="true"
                           track_by="hash"
                           label="email"
              ></select-item>
            </div>
            <div v-if="action === 'create'" class="form-group">
              <label class="control-label" for="deposit_sum">
                {{ trans('messages.currency') }},
                <span class="text-lowercase">{{ trans('deposits.table_payout') }}</span>:
              </label>
              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 p-r-none">
                  <select-item v-model="selected_currency"
                               :options="currencies"
                               track_by="id"
                               label="code"
                               :loading="currencies_loading"
                  ></select-item>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 p-l-none">
                  <input v-model.lazy="deposit_info.balance_sum" type="number" class="form-control"
                         id="deposit_sum">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label" for="deposit_info_description">
                {{ trans('messages.comment') }}:
              </label>
              <textarea v-model="deposit_info.description" id="deposit_info_description"
                        class="form-control"
                        rows="5"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button v-if="action === 'create'" @click="createWriteOff" id="write_off_submit"
                  class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
							<span class="ladda-label">
								{{ trans('deposits.write_off') }}
							</span>
          </button>

          <button v-if="action === 'edit'" @click="editWriteOff" id="write_off_submit"
                  class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
							<span class="ladda-label">
								{{ trans('messages.edit') }}
							</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</script>