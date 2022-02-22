<script type="text/x-template" id="clone-offer-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" id="clone-offer-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">@{{ LANG_OFFERS.modal_clone_header }}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="control-label" for="title">@{{ LANG_MESSAGES.title }}:</label>
            <input v-model="offer_info.title" class="form-control" id="title">
          </div>
          <div class="form-group">
            <label class="control-label" for="clone_thumb_path">@{{ LANG_MESSAGES.preview }}:</label>
            <input @change="uploadFile($event)" class="form-control" type="file">
          </div>
        </div>
        <div class="modal-footer">
          <button @click="cloneOffer" class="btn btn-success btn-sm ladda-button" id="clone_offer_submit"
                  data-style="zoom-out" type="button">
            <span class="ladda-label">@{{ LANG_MESSAGES.clone_submit }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</script>