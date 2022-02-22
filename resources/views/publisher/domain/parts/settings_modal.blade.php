<div class="modal fade" role="dialog" id="settings-domain-modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4>@{{ LANG_DOMAINS.create_domain }}</h4>
      </div>

      <div class="modal-body">
        <div class="row">
          <div class="col-lg-12">
            <div v-html="LANG_DOMAINS.head_text" class="well"></div>
          </div>
        </div>

        <div class="form-group">
          <label for="domain">
            @{{ LANG_DOMAINS.domain }}:
          </label>
          <input v-model="domain.domain" type="url"
                 class="form-control" id="domain" placeholder="example.com">
        </div>

        <div v-if="is_cloaking_enabled" class="checkbox checkbox-success display_i_b">
          <input v-model="is_new_cloaking"
                 v-bind:true-value="1" v-bind:false-value="0"
                 id="is-new-cloaking" type="checkbox">
          <label for="is-new-cloaking">
            @{{ LANG_DOMAINS.use_new_cloaking }}
          </label>
        </div>

        <div v-show="is_new_cloaking" class="form-group" id="donor_link">
          <label for="donor_url">
            @{{ LANG_DOMAINS.donor_url }}:
          </label>
          <input v-model="domain.donor_url"
                 class="form-control" id="donor_url"
                 placeholder="http://example.com">
        </div>

        <div v-if="!is_new_cloaking" class="form-group">
          <label for="domain">
            @{{ LANG_DOMAINS.availability }}:
          </label>
          <select-item v-model="selected_availability" :options="availability"></select-item>
        </div>

        <div v-if="!is_new_cloaking" class="form-group">
          <label for="fallback_flow_hash"
          >@{{ domain.is_public ? LANG_DOMAINS.fallback_flow : LANG_MESSAGES.flow }}:</label>
          <select-item v-model="selected_flow" :options="flows" track_by="hash"></select-item>
        </div>
      </div>

      <div class="modal-footer">
        <div class="form-group">
          <button v-if="action === 'create'" @click="createDomain"
                  class="btn btn-sm btn-success ladda-button"
                  id="create_domain_submit" data-style="zoom-out"
          ><span class="ladda-label">@{{ LANG_MESSAGES.create_submit }}</span>
          </button>
          <button v-if="action === 'edit'" @click="editDomain"
                  class="btn btn-sm btn-success ladda-button"
                  id="edit_domain_submit" data-style="zoom-out"
          ><span class="ladda-label">@{{ LANG_MESSAGES.edit }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>