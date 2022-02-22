<div class="filters_panel_white">
  <form id="filters">
    <payment-systems-filter></payment-systems-filter>
    <publishers-filter></publishers-filter>
    <currencies-filter></currencies-filter>
    <apply-filters></apply-filters>
  </form>

  <div v-if="tab === 'pending'" class="filter pull-right m-l-md m-r-none">
    <button @click="openCreatePaymentModal"
            class="btn btn-success btn-outline btn-sm ladda-button btn-filter"
            data-spinner-color="#666"
            data-style="zoom-out" type="button">
      {{ trans('finance.generate_payment') }}
    </button>
  </div>

  <div v-show="tab === 'pending' || tab === 'accepted'" class="form-group checkbox checkbox-success pull-right">
    <input v-model="not_confirm" id="do_not_confirm" type="checkbox">
    <label class="control-label fw500"
           for="do_not_confirm">{{ trans('payments.not_confirm') }}</label>
  </div>
</div>