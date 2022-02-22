<script type="text/x-template" id="advertiser-account-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="advertiser-account-modal">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 v-html="LANG_USERS.advertiser_accounts + ' <b>'+ advertiser_email + '</b>'"
              class="modal-title"></h4>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <div class="row">
              <div class="col-xs-6">
                <label class="control-label">{{ trans('messages.currency') }}:</label>
                <select-item v-model="selected_currency"
                             :options="available_currencies"
                             :disabled="loading"
                             class="multiselect-sm"
                             track_by="value">
                </select-item>
              </div>
              <div>
                <button @click="createAccount" :disabled="!selected_currency.value"
                        class="btn btn-sm btn-success ladda-button"
                        style="margin-top: 23px;"
                        id="advertiser-create-account-submit" data-style="zoom-out">
                  <span class="ladda-label">{{ trans('messages.add_btn') }}</span>
                </button>
              </div>
            </div>
          </div>

          <div :class="[loading ? 'preloader' : '']">
            <div class="form-group">
              <table v-if="accounts.length"
                     class="table table-bordered table-hover table-stripped table-condensed text-right">
                <thead>
                <tr>
                  <th class="w165">{{ trans('messages.balance') }}</th>
                  <th class="w165">{{ trans('messages.hold') }}</th>
                  <th class="w165">{{ trans('users.system_account') }}</th>
                  <th class="w70"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(account, index) in accounts" :key="account.id">
                  <td>
                    <money :sum="+account.balance"
                           :currency_id="account.currency_id"
                           :mute_zero="true"></money>
                  </td>
                  <td>
                    <money :sum="+account.hold"
                           :currency_id="account.currency_id"
                           :mute_zero="true"></money>
                  </td>
                  <td>
                    <money :sum="+account.system_balance"
                           :currency_id="account.currency_id"
                           :mute_zero="true"></money>
                  </td>
                  <td>
                    <button v-show="!canDeleteAccount(account)"
                            class="btn btn-xs btn-danger pull-right disabled"
                            data-toggle="tooltip"
                            :data-title="LANG_USERS.cant_delete_account_msg"
                            @mouseleave="hideTooltip($event)"
                            type="button">
                      <span class="ladda-label">{{ trans('messages.delete_btn') }}</span>
                    </button>
                    <button v-show="canDeleteAccount(account)"
                            @click="deleteAccount(index)"
                            :id="'account-delete-submit-' + index"
                            class="btn btn-xs btn-danger pull-right"
                            data-style="zoom-out"
                            type="button">
                      <span class="ladda-label">{{ trans('messages.delete_btn') }}</span>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>

              <empty-list-message v-if="!accounts.length && !loading" message="{{ trans('users.accounts_not_found') }}"
              ></empty-list-message>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</script>