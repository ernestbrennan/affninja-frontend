<script type="text/x-template" id="target-geo-integration-tpl">
  <div class="modal fade" id="integrations-modal" role="dialog" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 v-if="target_geo" class="font-light"
          >{{ trans('messages.integration') }} - @{{ target_geo.country.title }}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="row">
              <div class="col-xs-12">
                <label class="control-label">{{ trans('messages.advertiser') }}:</label>
                <advertisers-select :value="advertiser_hash" @updated="onAdvertiserUpdated"></advertisers-select>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-xs-6">
                <label class="control-label" for="integration_charge">{{ trans('target_geo_rules.charge') }}:</label>
                <input v-model="integration_info.charge" class="form-control" id="integration_charge" type="number">
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

          <div class="form-group">
            <label class="control-label" for="target_geo_integration_type"
            >{{ trans('offers.integration_type') }}:</label>
            <select-item v-model="selected_integration_type"
                         :options="integration_types"
                         id="target_geo_integration_type"
            ></select-item>
          </div>

          <div class="form-group">
            <hr>
            <label class="control-label">{{ trans('offers.advertiser_integration') }}:</label>
            <div v-show="integration_info.integration_type === 'api'" class="relative">
              <textarea v-html="api_integration.code" class="form-control" id="api_integration" readonly
                        rows="1"
              ></textarea>
              <small>@{{ LANG_OFFERS.api_integration_description }}</small>
              <button type="button" class="btn btn-default copy_to_clipboard clipboard_in_container"
                      data-clipboard-target="#api_integration"
                      :data-title="LANG_MESSAGES.copy_to_clipboard"
                      data-toggle="tooltip">
                <img class="clippy" src="/images/clippy.svg" width="13" :alt="LANG_MESSAGES.copy_to_clipboard">
              </button>
            </div>

            <div v-if="integration_info.integration_type === 'redirect'">
              <btn-group-item :active="selected_redirect_integration_type.type"
                              @updated="onRedirectIntegrationTypeUpdated"
                              class="m-b-xs">
                <button v-for="integration in redirect_integrations"
                        :data-id="integration.type"
                        class="btn btn-default btn-outline btn-xs"
                        type="button">@{{ integration.title }}
                </button>
              </btn-group-item>
              <div class="relative">
                  <textarea v-html="selected_redirect_integration_type.code"
                            :id="'integration-' + selected_redirect_integration_type.type"
                            class="form-control"
                            readonly
                            rows="3"
                  ></textarea>
                <small>@{{ LANG_OFFERS.redirect_integration_description }}</small>
                <button :data-clipboard-target="'#integration-' + selected_redirect_integration_type.type"
                        :data-title="LANG_MESSAGES.copy_to_clipboard"
                        class="btn btn-default copy_to_clipboard clipboard_in_container"
                        type="button"
                        data-toggle="tooltip">
                  <img class="clippy" src="/images/clippy.svg" width="13" :alt="LANG_MESSAGES.copy_to_clipboard">
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button v-if="action === 'create'"
                  @click="createIntegration"
                  v-button-preloader="integration_saving"
                  class="btn btn-success btn-sm ladda-button"
                  type="button"
                  data-style="zoom-out"
          ><span class="ladda-label">{{ trans('messages.create_submit') }}</span></button>

          <button v-show="action === 'edit'"
                  @click="editIntegration"
                  v-button-preloader="integration_saving"
                  class="btn btn-success btn-sm ladda-button"
                  type="button"
                  data-style="zoom-out">
            <span class="ladda-label">{{ trans('messages.edit_submit') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</script>