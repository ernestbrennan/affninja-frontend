<script type="text/x-template" id="create-payment-modal-tpl">
    <div id="create-payment-modal" class="modal fade small-modal" role="dialog" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">{{ trans('navbar.payment_tab') }}</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="control-label"
                               for="deposit_advertiser_id">{{ trans('messages.publisher') }}:</label>
                        <select-item v-model="selected_publisher"
                                     :options="publishers"
                                     track_by="hash"
                                     label="email"
                                     :search="true"
                                     :loading="publishers_loading"
                                     :allow_empty="true"
                                     v-on:search-change="onSearch"
                                     :placeholder="'{{ trans('messages.search') }}'">
                        </select-item>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-xs-6 p-r-none">
                                <label class="control-label" for="deposit_payout">
                                    {{ trans('messages.currency') }}:
                                </label>
                                <select-item v-model="selected_currency"
                                             :options="currencies"
                                             track_by="id"
                                             :disabled="!Object.size(selected_publisher)"
                                ></select-item>
                            </div>
                            <div class="col-xs-6">
                                <label class="control-label" for="deposit_payout">
                                    <span>{{ trans('messages.sum') }}</span>:
                                </label>
                                <input v-model.lazy="payout" type="number" class="form-control"
                                       :disabled="!Object.size(selected_publisher)"
                                       id="deposit_payout" style="height: 35px;">
                                <template v-if="Object.size(selected_currency)">
                                    <small>Max:
                                        <money v-show="selected_currency.id === 1"
                                               :sum="selected_publisher.profile.balance_rub" currency_id="1"></money>
                                        <money v-show="selected_currency.id === 3"
                                               :sum="selected_publisher.profile.balance_usd" currency_id="3"></money>
                                        <money v-show="selected_currency.id === 5"
                                               :sum="selected_publisher.profile.balance_eur" currency_id="5"></money>
                                    </small>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label" for="">{{ trans('finance.replenishment_method') }}
                            :</label>
                        <select-item v-model="selected_requisite"
                                     :options="requisites"
                                     track_by="hash"
                                     :disabled="!requisites.length"></select-item>
                    </div>
                </div>

                <div class="modal-footer">
                    <button @click="createPayment" id="create_deposit_submit" type="button"
                            data-style="zoom-out"
                            class="btn btn-success btn-sm ladda-button">
						<span class="ladda-label">
							{{ trans('messages.create') }}
						</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</script>