<script type="text/x-template" id="target_geo_stakes_tpl">

  {{-- Target geo stakes modal --}}
  <div id="target_geo_stakes_modal" class="modal fade" role="dialog">
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title">{{ trans('target_geo.stakes_header') }}</h4>
        </div>
        <div class="modal-body" style="min-height: 100px">
          <div class="row m-b">
            <div class="col-xs-5 form-group">
              <label class="control-label">{{ trans('target_geo.add_user_group_stake') }}:</label>
              <select-item v-model="group_to_assign_stake"
                           :options="unassigned_groups"
                           track_by="id"
                           label="title"
                           :search="true"
                           :loading="unassigned_groups_loading"
                           :allow_empty="true">
              </select-item>
            </div>
          </div>

          <div id="stakes_list">
            <template v-show="groups_got_stakes">
              <div v-for="group in assigned_groups" class="row m-b">
                <div class="col-xs-6">
                   <span class="badge badge-sm" :style="'background-color: #' + group.color"
                   >@{{ group.title }}</span>
                </div>
                <div class="col-xs-2 p-r-none">
                  <input v-model="group.payout" class="form-control" type="number">
                </div>
                <div class="col-xs-2 p-l-none">
                  <currency-select v-model="group.currency_id" tabindex="-1"></currency-select>
                </div>
                <div class="col-xs-2 p-l-none">
                  <button @click.stop="deleteGroupFromAssigned(group)" class="btn btn-sm btn-danger ladda-button"
                          data-style="zoom-out"
                          :disabled="group.is_default === 1"
                          tabindex="-1"
                  ><span class="ladda-label">{{ trans('messages.delete_btn') }}</span></button>
                </div>
              </div>
            </template>
          </div>

        </div>
        <div class="modal-footer">
          <button @click="saveStakes" class="btn btn-success btn-sm ladda-button"
                  type="button" data-style="zoom-out" id="save_stakes_btn"
          ><span class="ladda-label"> {{ trans('messages.save') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</script>