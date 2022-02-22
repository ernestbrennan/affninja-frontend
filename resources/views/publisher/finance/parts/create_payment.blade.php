<script type="text/x-template" id="create-payment-tpl">
  <div id="create-payment">
    <form class="" id="create_payment_form">
      <div class="form-group">
        <label class="control-label" for="payout"> {{ trans('finance.payout') }}:</label>
        <input v-model="payment.payout" class="form-control" name="payout" id="payout" type="number">
        <small v-show="payment.currency_id == 1">
          <span>{{ trans('messages.balance') }}:</span>
          <span @click="setPayout(balance_rub)" class="pointer internal-link">
            <money :sum="balance_rub" currency_id="1"></money>
          </span>
        </small>

        <small v-show="payment.currency_id == 3">{{ trans('messages.balance') }}:
          <span @click="setPayout(balance_usd)" class="pointer internal-link">
            <money :sum="balance_usd" currency_id="3"></money>
          </span>
        </small>

        <small v-show="payment.currency_id == 5">{{ trans('messages.balance') }}:
          <span @click="setPayout(balance_eur)" class="pointer internal-link">
            <money :sum="balance_eur" currency_id="5"></money>
          </span>
        </small>
      </div>

      <div class="form-group">
        <label class="control-label" for="currency_id">
          {{ trans('finance.currency') }}:
        </label>
        <select v-model="payment.currency_id" class="form-control" id="currency_id">
          <option value="1" data-image_html="<span class='rubl'>о</span>">{{ trans('finance.rub') }}</option>
          <option value="3" data-image_html="$">{{ trans('finance.usd') }}</option>
          <option value="5" data-image_html="€">{{ trans('finance.eur') }}</option>
        </select>
      </div>

      <div v-if="payment_requisites" class="form-group">
        <label class="control-label" for="requisite_titles">{{ trans('finance.requisite_to_pay') }}:</label>
        <select v-model="payment.requisite_hash" class="form-control" id="requisite_titles">
          <option v-for="requisite in payment_requisites" :value="requisite.hash">
            @{{ requisite.payment_system.title }}
            <template v-if="requisite.title !== 'Cash'">: @{{ requisite.title }}</template>
          </option>
        </select>
      </div>

      <div class="form-group">
        <button @click="createPayment"
                :disabled="payment.payout <= 0 || !payment.requisite_hash"
                class="btn btn-sm btn-success ladda-button"
                id="create_payment"
                data-style="zoom-out" type="button">
             <span class="ladda-label">
              {{ trans('finance.generate_payment_submit') }}
            </span>
        </button>
      </div>
    </form>
  </div>
</script>
