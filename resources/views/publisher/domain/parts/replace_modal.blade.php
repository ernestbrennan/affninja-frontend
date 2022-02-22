<div class="modal fade" role="dialog" id="replace_modal">
  <div class="modal-dialog">
    <div class="modal-content" >
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span>&times;</span>
        </button>
        <h4>@{{ LANG_DOMAINS.replacements_text }}</h4>
      </div>

      <div class="modal-body" id="replacement-wrap" >
          <table class="table">
            <thead v-if="replacements_info.replacements.length" >
               <tr>
                 <td class="p-b-none-i">@{{ LANG_DOMAINS.replace_what }}:</td>
                 <td class="p-b-none-i">@{{ LANG_DOMAINS.what_to_replace }}:</td>
                 <td class="p-b-none-i"></td>
               </tr>
            </thead>
            <tbody>
              <tr v-for="(replacement, index) in replacements_info.replacements">
                <td>
                  <input v-model="replacement.from" :placeholder="LANG_MESSAGES.enter_text" class="form-control" type="text"  >
                </td>
                <td>
                  <input v-model="replacement.to" :placeholder="LANG_MESSAGES.enter_text" class="form-control" type="text">
                </td>
                <td class="text-center w45">
                  <button @click="deleteReplacementItem(index)"  :id="'delete-replace-' + index"
                          class="btn btn-sm btn-outline btn-danger" data-style="zoom-out" >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3">
                  <button @click="addReplacement" type="button" class="btn btn-sm btn-default">
                    @{{ LANG_MESSAGES.add_one_more }}</button>
                </td>
              </tr>
            </tfoot>
          </table>
      </div>
      <div class="modal-footer">
        <button @click="saveReplacements()"
                class="btn btn-sm btn-success ladda-button" id="replacements-save" data-style="zoom-out">
          <span class="ladda-label">@{{ LANG_MESSAGES.save }}</span>
        </button>
      </div>
    </div>
  </div>
</div>