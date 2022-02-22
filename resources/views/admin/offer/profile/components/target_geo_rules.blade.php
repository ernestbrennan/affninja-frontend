<script type="text/x-template" id="target-geo-rules-component-template" style="display: none;">
  <div>

    {{-- TargetGeoRule settings modal --}}
    <div id="target_geo_rules_modal" class="modal fade" role="dialog" tabindex="-1">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">
              {{ trans('target_geo_rules.modal_header') }}
              <span v-if="target_index !== null && target_geo_index !== null"> -
                @{{ this.$root.targets[target_index].target_geo[target_geo_index].country.title }}
							</span>
            </h4>
          </div>
          <div class="modal-body">
            <button v-show="!settings_form_is_active" @click="openCreateForm" type="button"
                    class="btn btn-success btn-sm"
            >{{ trans('messages.create_btn') }}</button>
            <form v-show="settings_form_is_active" class="form">

              <div class="form-group">
                <label class="control-label" for="target_geo_rule_integration_id">
                  {{ trans('messages.integration') }}:</label>
                <select-item v-model="selected_integration"
                             :options="formatted_integrations"
                             :search="true"
                             id="target_geo_rule_integration_id"
                ></select-item>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-xs-12">
                    <label class="control-label">
                      {{ trans('messages.advertiser') }}:</label>
                    <advertisers-select v-if="_.size(target_geo_rule_info)"
                                        :value="advertiser_hash"
                                        @updated="onAdvertiserUpdated"
                    ></advertisers-select>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="row">
                  <div class="col-xs-6">
                    <label class="control-label" for="target_geo_rule_charge">
                      {{ trans('target_geo_rules.charge') }}:</label>
                    <input v-model="target_geo_rule_info.charge"
                           class="form-control"
                           id="target_geo_rule_charge"
                           type="number">
                  </div>
                  <div class="col-xs-6">
                    <label class="control-label" for="target_geo_rule_currency_id">
                      {{ trans('messages.currency') }}:</label>
                    <select-item v-model="selected_currency"
                                 :options="currencies"
                                 track_by="id"
                                 label="code"
                                 :loading="currencies_loading"
                                 id="target_geo_rule_currency_id"
                    ></select-item>
                  </div>
                </div>
              </div>

              <div class="form-group m-b-none">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="checkbox checkbox-success">
                      <input v-model="use_limit" id="use_limit" type="checkbox">
                      <label for="use_limit">{{ trans('target_geo_rules.use_limit') }}</label>
                    </div>
                    <div v-show="use_limit">
                      <label for="target_geo_rule_limit">{{ trans('messages.limit') }}:</label>
                      <input v-model.lazy="target_geo_rule_info.limit" type="number" id="target_geo_rule_limit"
                             class="form-control">
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div class="checkbox checkbox-success">
                      <input v-model="use_weight" id="use_weight" type="checkbox">
                      <label for="use_weight">{{ trans('target_geo_rules.use_weight') }}</label>
                    </div>
                    <div v-show="use_weight">
                      <label for="target_geo_rule_weight">{{ trans('messages.weight') }}:</label>
                      <input v-model.lazy="target_geo_rule_info.weight" class="form-control" id="target_geo_rule_weight"
                             type="number">
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="control-label" for="target_geo_rule_integration_data">
                  {{ trans('integrations.integration_data') }}:
                </label>
                <textarea v-model.lazy="target_geo_rule_info.integration_data"
                          id="target_geo_rule_integration_data" class="form-control" rows="3"></textarea>
              </div>

              <div class="form-group checkbox checkbox-success">
                <input v-model="target_geo_rule_info.is_fallback" :true-value="1" :false-value="0"
                       id="target_geo_rule_is_fallback" type="checkbox">
                <label for="target_geo_rule_is_fallback">{{ trans('messages.is_default') }}</label>
              </div>

              <div class="form-group">
                <button v-if="action === 'create'" @click="createRule"
                        class="btn btn-success btn-sm ladda-button"
                        id="rule_create_btn"
                        type="button"
                        data-style="zoom-out"
                >{{ trans('messages.create_submit') }}</button>

                <button v-show="action === 'edit'" @click="editRule"
                        class="btn btn-success btn-sm ladda-button"
                        id="target_geo_rule_edit_submit"
                        type="button"
                        data-style="zoom-out">
                  <span class="ladda-label">{{ trans('messages.edit_submit') }}</span>
                </button>

                <span @click="clearSettingsForm" class="hide_form_btn">{{ trans('messages.cancel') }}</span>

                <button v-show="action === 'edit'" @click="deleteRule"
                        class="btn btn-danger btn-sm ladda-button pull-right"
                        id="rule_delete_btn"
                        type="button"
                        data-style="zoom-out">
                  <span class="ladda-label">{{ trans('messages.delete_btn') }}</span>
                </button>
              </div>
            </form>

            {{-- Target geo rule list --}}
            <div v-if="target_geo_rules.length > 0" class="m-t">
              <hr>
              <h5>{{ trans('target_geo.target_geo_rule_sort_type') }}:</h5>
              <div class="form-group radio">
                <input v-model="rule_sort_type" value="priority" id="target_geo_rule_priority"
                       name="target_geo_rule_sort_type" type="radio">
                <label for="target_geo_rule_priority">{{ trans('target_geo.target_geo_rule_priority') }}</label>
                <br>
                <input v-model="rule_sort_type" value="weight" id="rule_weight" name="target_geo_rule_sort_type"
                       type="radio">
                <label for="rule_weight">{{ trans('target_geo.target_geo_rule_weight') }}</label>
              </div>
              <h5>{{ trans('messages.target_geo_rules') }}:</h5>
              <div id="target_geo_rule_list_wrap" class="relative">

                <draggable :list="target_geo_rules" @end="updatePriorities">

                  <div v-for="(rule, index) in target_geo_rules"
                       @click="openEditForm(index)"
                       :class="[target_geo_rule_info.id == rule.id ? 'active': '', 'list-group-item pointer']"
                  >
                    @{{ rule.advertiser.email }}
                    <span v-if="rule.is_fallback" class="label label-info">{{ trans('messages.is_default') }}</span>

                    <div class="pull-right">
                      <span class="m-l-sm" data-toggle="tooltip" data-title="{{ trans('target_geo_rules.charge') }}">
                        <money :sum="rule.charge" :currency_id="rule.currency_id"></money>
                      </span>

                      <span class="m-l-sm" data-toggle="tooltip" data-title="{{ trans('messages.limit') }}">
                        <i class="fa fa-exclamation"></i> @{{ rule.limit }}
                      </span>

                      <span class="m-l-sm" data-toggle="tooltip" data-title="{{ trans('messages.weight') }}">
                        <i class="fa fa-sliders"></i> @{{ rule.weight }}
                      </span>

                      <span class="m-l-sm" data-toggle="tooltip"
                            data-title="{{ trans('target_geo_rules.today_leads_count') }}">
                        <i class="fa fa-bar-chart"></i> @{{ rule.today_leads_count }}
                      </span>
                    </div>
                  </div>

                </draggable>
              </div>
              <button @click="resetStat" class="btn btn-sm btn-danger m-t ladda-button" id="rule_reset_stat"
                      data-style="zoom-out">
                <span class="ladda-label">{{ trans('target_geo_rules.reset_stat') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>