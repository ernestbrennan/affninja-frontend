<script type="text/x-template" id="advertiser-balance-tpl">
  <div class="row table-responsive">
    <div class="col-lg-12 col-md-12 col-sm-12-col-xs-12">
      <div id="balance-transactions-wrap">
        <table v-if="balance_transactions.length"
               class="table table-hover table-striped table-bordered table-condensed" id="balance_transactions_table">
          <thead>
          <tr>
            <th class="datehour_th">{{ trans('messages.date') }}</th>
            <th class="w60">{{ trans('messages.hash') }}</th>
            <th>{{ trans('messages.advertiser') }}</th>
            <th class="w65">{{ trans('finance.table_payout') }}</th>
            <th>{{ trans('messages.comment') }}</th>
            <th class="w25"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="transaction in balance_transactions">
            <td>@{{ transaction.created_at | datehour }}</td>
            <td>@{{ transaction.hash }}</td>
            <td>
              <enter-in-user-cabinet :email="transaction.user.email"
                                     :hash="transaction.user.hash"
              ></enter-in-user-cabinet>
            </td>
            <td class="text-right">
              <money :sum="transaction.balance_sum" :currency_id="transaction.currency_id" :color="true"></money>
            </td>
            <td>
              @{{ transaction.description }}
              <hr v-if="transaction.description && transaction.admin" class="hr-margin">
              <div v-if="transaction.admin" class="text-muted">@{{ transaction.admin.profile.full_name }}</div>
              <div v-if="transaction.type === 'advertiser.deposit'">
                <a v-if="transaction.deposit.invoice_file_id"
                   :href="API_HOST + '/file.show?id=' + transaction.deposit.invoice_file_id"
                   target="_blank">{{ trans('deposits.invoice') }}</a>
                <a v-if="transaction.deposit.contract_file_id"
                   :href="API_HOST + '/file.show?id=' + transaction.deposit.contract_file_id"
                   target="_blank">{{ trans('deposits.contract') }}</a>
              </div>
            </td>
            <td>
              <button @click="transaction.type === 'advertiser.deposit' ?
                                        openEditDepositModal(transaction) :
                                        openEditTransactionModal(transaction)"
                      data-toggle="tooltip"
                      data-title="{{ trans('messages.edit') }}"
                      class="btn btn-xs btn-warning">
                <span class="ladda-label"><i class="fa fa-pencil"></i></span>
              </button>
            </td>
          </tr>
          </tbody>
        </table>

        <empty-list-message v-if="!balance_transactions.length"
                            message="{{ trans('deposits.deposit_not_found') }}"></empty-list-message>
      </div>
    </div>
  </div>
</script>