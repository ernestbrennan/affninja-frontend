<script type="text/x-template" id="new-lead-tpl">
  <div>
    <button @click="openModal" class="btn btn-sm btn-default">
      @{{ lang_leads.generate_lead }}
    </button>

    <div class="modal fade" id="new-lead-modal" role="dialog" tabindex="-1">
      <div class="modal-dialog ">
        <div class="modal-content">

          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">
              @{{ lang_leads.lead_generation }}
            </h4>
          </div>

          <div class="modal-body">
            <div class="form-group">
              <label class="control-label" for="flow_title">
                @{{ lang_messages.flow_title }}:
              </label>
              <div class="input-group">
                <input v-model="flow_title" id="flow_title" class="form-control" @enter="getFlowByTitle">
                <span class="input-group-btn">
                            <button @click="getFlowByTitle" class="btn btn-default ladda-button" id="find-flow"
                                    type="button" data-style="zoom-out" data-spinner-color="#666"
                            ><span class="ladda-label">{{ trans('messages.find') }}</span></button>
                        </span>
              </div>
            </div>
            <template v-if="flow_id">
              <div class="form-group">
                @{{ lang_messages.publisher }}: @{{ publisher_email }}
              </div>
              <div class="form-group">
                <label class="control-label" for="target_geo">{{ trans('statistics.target_geo') }}:</label>
                <select v-model="target_geo_id" id="target_geo" class="form-control">
                  <option v-for="item in target_geo" :value="item.id"> @{{ item.country.title }}</option>
                </select>
              </div>
              <div class="form-group">
                <label class="control-label" for="">
                  @{{ lang_messages.order_data }}:
                </label>
                <textarea v-model="contacts" id="order_parameters" class="form-control"
                          :placeholder="lang_messages.name + ',' + lang_messages.phone + ' (' + lang_messages.order_new_line + ')'"
                          rows="5"></textarea>
              </div>
            </template>
          </div>

          <div class="modal-footer">
            <button @click="generateLead"
                    class="btn btn-success btn-sm ladda-button" id="generate_lead_submit"
                    data-style="zoom-out">
                        <span class="ladda-label">
                            @{{ lang_messages.generate }}
                        </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</script>