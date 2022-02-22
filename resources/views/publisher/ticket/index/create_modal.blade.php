<script type="text/x-template" id="create-ticket-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="create-ticket-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ trans('tickets.create_modal_header')  }}</h4>
        </div>
        <div class="modal-body">

          <div :class="['form-group', error_title ? 'has-error': '']">
            <label class="control-label" for="title">{{ trans('messages.title') }}:</label>
            <input v-model="title" class="form-control" id="title" type="text">
          </div>
          <div :class="['form-group', error_message ? 'has-error': '']">
            <label class="control-label" for="message">{{ trans('messages.message') }}:</label>
            <textarea v-model="message" class="form-control" id="title" rows="3"></textarea>
          </div>

        </div>
        <div class="modal-footer">
          <button @click="createTicket" class="btn btn-sm btn-success ladda-button" id="create_ticket_btn"
                  data-style="zoom-out">{{ trans('messages.create') }}</button>
        </div>
      </div>
    </div>
  </div>
</script>