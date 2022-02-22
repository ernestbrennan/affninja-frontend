<script type="text/x-template" id="target-geo-settings-component-template">

	{{-- Target geo settings modal --}}
	<div id="target_geo_settings_modal" class="modal fade" role="dialog">
		<div class="modal-dialog ">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					<h4 class="modal-title" v-if="action === 'create'">{{ trans('target_geo.create_header') }}</h4>
					<h4 class="modal-title" v-if="action === 'edit'">{{ trans('target_geo.edit_header') }}</h4>
				</div>
				<div class="modal-body p-b-none-i">
					<form id="target_geo_settings_form">

						<div class="form-group">
							<label class="control-label" for="target_geo_locale_id">{{ trans('messages.country') }}:</label>
							<countries-select2 @updated="onCountryChanged"
							                   :countries="countries"
							                   v-model="target_geo_info.country_id"
							                   class="form-control"
							></countries-select2>
						</div>

						<div v-if="action === 'create'" class="form-group">
							<label class="control-label" for="target_geo_payout">
								{{ trans('target_geo.payout_profit_and_currency') }}:
							</label>
							<div class="row">
								<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 p-r-none">
									<input v-model.lazy="target_geo_info.payout" type="number" class="form-control" id="target_geo_payout">
								</div>
								<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
									<select v-model="target_geo_info.payout_currency_id" class="form-control">
										<option value="1">RUB</option>
										<option value="3">USD</option>
										<option value="5">EUR</option>
									</select>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label class="control-label" for="target_geo_price">
								{{ trans('target_geo.price_old_price_and_currency') }}:
							</label>
							<div class="row">
								<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 p-r-none">
									<input v-model.lazy="target_geo_info.price" type="number" class="form-control" id="target_geo_price">
								</div>
								<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 p-r-none">
									<input v-model.lazy="target_geo_info.old_price" type="number" class="form-control"
									       id="target_geo_old_price">
								</div>
								<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
									<currencies-select2 @updated="onPriceCurrencyChanged"
									                    :currencies="currencies"
									                    v-model="target_geo_info.price_currency_id"
									                    class="form-control"
									></currencies-select2>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label class="control-label" for="target_geo_hold_time">{{ trans('messages.hold_time') }}:</label>
							<input v-model.lazy="target_geo_info.hold_time" type="number" class="form-control"
							       id="target_geo_hold_time">
						</div>

						<div class="form-group">
							<div class="checkbox checkbox-success checkbox-inline">
								<input v-model="target_geo_info.is_active"
								       v-bind:true-value="1" v-bind:false-value="0"
								       type="checkbox" id="target_geo_is_active">
								<label for="target_geo_is_active">{{ trans('messages.is_active') }}</label>
							</div>
							<div class="checkbox checkbox-success checkbox-inline m-l">
								<input v-model="target_geo_info.is_default"
								       v-bind:true-value="1" v-bind:false-value="0"
								       type="checkbox" id="is_default">
								<label for="is_default">{{ trans('messages.is_default') }}</label>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button v-if="action == 'create'" @click="createTargetGeo"
					        id="target_geo_create_submit"
					        type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
						<span class="ladda-label">{{ trans('messages.create_submit') }}</span>
					</button>
					<button v-if="action == 'edit'" @click="editTargetGeo"
					        id="target_geo_edit_submit"
					        type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
						<span class="ladda-label">{{ trans('messages.edit_submit') }}</span>
					</button>
					<button v-if="action == 'edit'"
					        @click="deleteTargetGeo(target_index, target_geo_index, target_geo_info.id)"
					        id="target_geo_delete_submit"
					        type="button" class="btn btn-danger btn-sm ladda-button pull-right" data-style="zoom-out">
						<span class="ladda-label">{{ trans('messages.delete_btn') }}</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</script>