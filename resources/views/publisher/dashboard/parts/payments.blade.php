<script type="text/x-template" id="payment-list-tpl">
<div>

  <h3>{{ trans('payments.payments_history') }}</h3>

  <div class="table-responsive" id="payment_list_wrap">
    <table class="table table-hover table-striped table-bordered table-condensed text-left datatable-label-correction"
           id="payment_table">
      <thead>
      <tr>
        <th class="w110">{{ trans('finance.table_date') }}</th>
        <th>{{ trans('payments.payment_system') }}</th>
        <th>{{ trans('payments.requisites') }}</th>
        <th>{{ trans('finance.table_payout') }}</th>
        <th class="w110">{{ trans('finance.table_status') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(payment, index) in payments" :key="payment.hash">
        <td>
          <span>@{{ payment.created_at | datehour }}</span>
        </td>
        <td class="text-capitalize">
          @{{ payment.requisite_type }}
        </td>
        <td>
          <payment-requisite-detail :requisite="payment.requisite"></payment-requisite-detail>
        </td>
        <td class="money_td">
          <span :data-title="payment.balance_payout"></span>
          <money :sum="payment.balance_payout" :currency_id="payment.currency_id"></money>
        </td>
        <td class="text-capitalize">
          <div class="relative top-minus-1">
            <span v-if="payment.status === 'pending'" class="label label-warning">
              @{{ LANG_FINANCE.pending }}</span>
            <span v-if="payment.status === 'accepted'" class="label label-success">
              @{{ LANG_FINANCE.accepted }}</span>
            <span v-if="payment.status === 'cancelled'" class="label label-danger">
              @{{ LANG_FINANCE.cancelled }}</span>

            <button v-if="payment.status === 'pending'"
                    @click="cancelPayment($event, payment, index)"
                    class="btn btn-xs btn-outline btn-danger ladda-button"
                    :id="'cancel_pending_payment-' + payment.hash"
                    data-style="zoom-out">
              <span class="ladda-label">{{ trans('messages.cancel') }}</span>
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <empty-list-message v-if="payments.length === 0"
                        message="{{  trans('finance.payment_not_found') }}"
    ></empty-list-message>
  </div>

  <a v-if="payments.length" href="/finance/payment" class="link-blue m-t-sm display_i_b">
    {{ trans('payments.all_payments') }}</a>

</div>
</script>