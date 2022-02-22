<script type="text/x-template" id="defer-ticket-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="defer-ticket-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ trans('tickets.defer_modal_header')  }}</h4>
        </div>
        <div class="modal-body">

          <div class="form-group">
            <label class="control-label" for="фвь">
              {{ trans('tickets.responsible') }}:
            </label>
            <admins-select v-model="ticket.responsible_user"></admins-select>
          </div>

          <div class="form-group">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label for="filter_deposit_date">{{ trans('messages.date') }}:</label>
                <datetime-picker v-model="deferred_until_at"></datetime-picker>
              </div>
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button @click="deferTicket" class="btn btn-sm btn-success ladda-button" id="defer_ticket_btn"
                  data-style="zoom-out">{{ trans('messages.defer') }}</button>
        </div>
      </div>
    </div>
  </div>
</script>