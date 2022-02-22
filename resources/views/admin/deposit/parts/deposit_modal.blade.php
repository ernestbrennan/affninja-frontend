<script type="text/x-template" id="deposit-modal-tpl">
  <div id="deposit-modal" class="modal fade" role="dialog" tabindex="-1">
    <div class="modal-dialog ">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 v-if="action === 'create'"
              class="modal-title">{{ trans('deposits.create_header') }}</h4>

          <h4 v-else="action === 'edit'"
              class="modal-title">{{ trans('deposits.edit_deposit') }}</h4>
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
            <div class="form-group">
              <label class="control-label" for="">{{ trans('finance.replenishment_method') }}
                :</label>
              <select-item v-model="selected_replenishment_method" :options="replenishment_methods"></select-item>
            </div>
            <div v-if="action == 'create'" class="form-group">
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
                  <input v-model.lazy="deposit_info.sum" type="number" class="form-control"
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
            <div class="form-group">
              <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label for="filter_deposit_date">{{ trans('messages.date') }}:</label>
                  <input class="form-control" id="filter_deposit_date" name="filter_deposit_date">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label" for="invoice">{{ trans('deposits.invoice') }}:</label>
              <input class="form-control" id="invoice" type="file">
            </div>
            <div class="form-group">
              <label class="control-label" for="contract">{{ trans('deposits.contract') }}:</label>
              <input class="form-control" id="contract" type="file">
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button v-if="action == 'create'"
                  @click="createDeposit" id="create_deposit_submit" type="button"
                  data-style="zoom-out"
                  class="btn btn-success btn-sm ladda-button">
							<span class="ladda-label">
								{{ trans('deposits.top_up') }}
							</span>
          </button>

          <button v-else @click="editDeposit" id="edit_deposit_submit" type="button"
                  data-style="zoom-out"
                  class="btn btn-success btn-sm ladda-button">
							<span class="ladda-label">
								{{ trans('messages.edit') }}
							</span>
          </button>
        </div>

      </div>
    </div>
  </div>
</script>