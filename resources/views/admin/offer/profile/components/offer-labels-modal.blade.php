<script type="text/x-template" id="offer-labels-modal-tpl">

  <div class="modal fade" id="offer-labels-modal" role="dialog" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="font-light">@{{ LANG_MESSAGES.labels }}</h4>
        </div>
        <div class="modal-body p-b-none-i">
          <div id="labels-content">
            <div v-for="(label, index) in labels">
              <div class="checkbox checkbox-success">
                <input v-model="label.assigned" :id="'label-' + label.id" type="checkbox"
                ><label :for="'label-' + label.id">@{{ label.title }}</label>
              </div>

              <div class="checkbox-content">
                <div class="radio">
                  <input v-model="label.availability"
                         :id="'label-not-available-' + label.id"
                         :name="'label-available-' + label.id"
                         :disabled="!label.assigned"
                         value="is_not_limited"
                         type="radio"
                  ><label :for="'label-not-available-' + label.id">@{{ LANG_OFFERS.label_is_not_limited }}</label>
                </div>

                <div class="radio">
                  <input v-model="label.availability"
                         :id="'label-available-' + label.id"
                         :name="'label-available-' + label.id"
                         :disabled="!label.assigned"
                         value="limited"
                         type="radio"
                  ><label :for="'label-available-' + label.id">@{{ LANG_OFFERS.label_is_limited }}</label>
                </div>
                <datetime-picker v-model="label.available_at"
                                 :disabled="label.availability === 'is_not_limited' || !label.assigned"
                ></datetime-picker>
              </div>

              <hr v-if="labels.length !== index + 1">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="syncLabels"
                  class="btn btn-sm btn-success ladda-button"
                  id="sync-assigned-labels"
                  data-style="zoom-out"
          ><span class="ladda-label">@{{ LANG_MESSAGES.save }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</script>