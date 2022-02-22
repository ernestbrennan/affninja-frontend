<div class="modal fade" tabindex="-1" role="dialog" id="edit_payment_system_modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">{{ trans('payment_systems.modal_edit_header') }}</h4>
      </div>
      <div class="modal-body">
        <form id="edit_payment_system_form">
          <div class="form-group">
            <label class="control-label" for="title">{{ trans('payment_systems.title') }}:</label>
            <input v-model="payment_system.title" class="form-control" id="title" name="title">
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label class="control-label" for="status">{{ trans('messages.status') }}:</label>
                <select v-model="payment_system.status" class="form-control" id="status" name="status">
                  <option value="active">{{ trans('messages.is_public') }}</option>
                  <option value="stopped">{{ trans('messages.is_private') }}</option>
                </select>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label class="control-label" for="min_payout">{{ trans('payment_systems.min_payout') }}:</label>
                <input v-model="payment_system.min_payout" class="form-control" id="min_payout" type="number">
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label class="control-label" for="fixed_comission">{{ trans('finance.fixed_comission') }}:</label>
                <input v-model="payment_system.fixed_comission" class="form-control" id="fixed_comission" type="number">
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label class="control-label" for="percentage_comission">{{ trans('finance.percentage_comission') }}:</label>
                <input v-model="payment_system.percentage_comission" class="form-control" id="percentage_comission" type="number">
              </div>
            </div>
            <small>Сумма со знаком минус будет означать доплату с нашей стороны</small>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button @click="editPaymentSystem" class="btn btn-success btn-sm ladda-button" id="edit_payment_system"
                data-style="zoom-out" type="button">
          <span class="ladda-label">{{ trans('messages.save') }}</span>
        </button>
      </div>
    </div>
  </div>
</div>