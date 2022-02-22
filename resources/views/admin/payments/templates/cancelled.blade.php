<script type="text/x-template" id="cancelled_payments_tpl">
  <div>
    <table v-show="payments.length" class="table table-bordered table-hover table-stripped table-condensed text-left"
           id="cancelled_payments_table">
      <thead>
      <tr>
        <th class="datetime_th">{{ trans('messages.date') }}</th>
        <th class="w60">{{ trans('payments.payment_hash') }}</th>
        <th class="w145">{{ trans('messages.user') }}</th>
        <th class="w130">{{ trans('payments.payment_system') }}</th>
        <th class="w80">{{ trans('payments.requisites') }}</th>
        <th class="w70">{{ trans('payments.who_cancelled') }}</th>
        <th>{{ trans('messages.comment') }}</th>
        <th class="w60">{{ trans('payments.payout_th') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="payment in payments" :key="payment.hash" class="payment">
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
        </td>
        <td class="text-capitalize">
          @{{ payment.requisite_type }}
        </td>
        <td>
          <payment-requisite-detail :requisite="payment.requisite"></payment-requisite-detail>
        </td>
        <td>
          <span v-if="payment.processed_user && payment.processed_user.nickname">
            @{{ payment.processed_user.nickname }}
          </span>
        </td>
        <td>
          @{{ payment.description }}
        </td>
        <td class="text-right">
          <span data-toggle="tooltip"
                data-html="true"
                :data-title="getPayoutTooltip(payment.balance_payout, payment.comission, payment.currency_id)">
            <money :sum="payment.payout" :currency_id="payment.currency_id"></money>
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    <empty-list-message v-if="!payments.length" message="{{ trans('payments.not_found') }}"></empty-list-message>
  </div>
</script>