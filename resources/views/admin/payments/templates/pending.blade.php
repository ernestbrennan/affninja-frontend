<script type="text/x-template" id="pending_payments_tpl">
  <div id="datatable_wrap">
    <table v-show="payments.length" class="table table-bordered table-hover table-stripped table-condensed text-left"
           id="pending_payments_table">
      <thead>
      <tr>
        <th class="datetime_th">{{ trans('messages.date') }}</th>
        <th class="w60">{{ trans('payments.payment_hash') }}</th>
        <th>{{ trans('messages.user') }}</th>
        <th class="w130">{{ trans('payments.payment_system') }}</th>
        <th class="w80">{{ trans('payments.requisites') }}</th>
        <th class="w60">{{ trans('payments.payout_th') }}</th>
        <th class="w50"></th>
        <th class="w50"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(payment, index) in payments" class="payment" :key="payment.hash">
        <td>
          <span :data-sort="payment.created_at">@{{ payment.created_at | datehour }}</span>
        </td>
        <td>
          <span>@{{ payment.hash }}</span>
        </td>
        <td>
          <enter-in-user-cabinet :email="payment.user.email"
                                 :hash="payment.user.hash"
          ></enter-in-user-cabinet>
          <span v-if="user_groups.length && payment.user.group_id" class="badge badge-sm pull-right"
                :style="{backgroundColor: '#' + _.find(user_groups, {id: payment.user.group_id}).color}">
            @{{ _.find(user_groups, {id: payment.user.group_id}).title }}
          </span>
        </td>
        <td class="text-capitalize">
          @{{ payment.requisite_type }}
        </td>
        <td>
          <payment-requisite-detail :requisite="payment.requisite"></payment-requisite-detail>
        </td>
        <td class="text-right">
          <span data-toggle="tooltip"
                data-html="true"
                :data-title="getPayoutTooltip(payment.balance_payout, payment.comission, payment.currency_id)">
            <money :sum="payment.payout" :currency_id="payment.currency_id"></money>
          </span>
        </td>
        <td>
          <button @click="acceptPayment($event.target, payment, index)" class="btn btn-xs btn-success" data-style="zoom-out"
                  :id="'accept_pending_payment-' + payment.id">
            <span class="ladda-label">{{ trans('messages.accept_it') }}</span>
          </button>
        </td>
        <td>
          <button @click="cancelPayment($event.target, payment, index)" class="btn btn-xs btn-danger"
                  :id="'cancel_pending_payment-' + payment.id" data-style="zoom-out">
            <span class="ladda-label">{{ trans('messages.cancel_it') }}</span>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <empty-list-message v-show="!payments.length" message="{{ trans('payments.not_found') }}"></empty-list-message>
  </div>
</script>