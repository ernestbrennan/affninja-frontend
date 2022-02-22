<script type="text/x-template" id="entity_domains_modal_tpl">

  <div id="entity_domains_modal" class="modal fade" role="dialog" tabindex="-1">
    <div v-if="entity_info" class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title">{{ trans('domains.domains') }}</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-12">
              <table class="table table-striped">
                <tbody>
                <tr v-for="domain in entity_info.domains">
                  <td>
                    <i v-if="domain.type === 'custom'" class="fa fa-star-o"
                       data-toggle="tooltip"

                       data-title="{{ trans('domains.custom') }}"></i>
                    <i v-if="domain.type === 'system'" class="fa fa-cog"
                       data-toggle="tooltip"

                       data-title="{{ trans('domains.system') }}"></i>
                    <a :href="domain.host + '?preview=1'" target="_blank">@{{ domain.domain }}</a>
                  </td>
                  <td class="text-right">
                    <button v-if="domain.type === 'custom'" @click="prepareEditDomain(domain)"
                            class="btn btn-xs btn-warning"
                            data-toggle="tooltip"

                            data-title="{{ trans('messages.edit') }}">
                      <i class="fa fa-pencil"></i>
                    </button>
                    <button v-if="domain.type === 'custom'" @click="deleteDomain(domain)"
                            class="btn btn-xs btn-danger"
                            data-toggle="tooltip"

                            data-title="{{ trans('messages.delete_btn') }}">
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <form class="m-t">
            <div class="form-group">
              <label class="control-label" for="custom_domain">{{ trans('messages.custom_domain') }}:</label>
              <input v-model="domain_info.domain" class="form-control" id="custom_domain" type="text"
                     placeholder="example.com">
            </div>
              <div v-show="domain_info.domain.length && entity_type === 'landing'" class="form-group checkbox checkbox-success m-t">
                <input v-model="domain_info.is_subdomain" v-bind:true-value="1" v-bind:false-value="0"
                       id="is_subdomain" type="checkbox">
                <label for="is_subdomain">{{ trans('domains.is_subdomain') }}</label>
              </div>
          </form>
        </div>
        <div class="modal-footer">
          <button v-if="action === 'create'" @click.prevent="createDomain" class="btn btn-sm btn-success ladda-button" id="create_domain_btn"
                  data-style="zoom-out">
            <span class="ladda-label">{{ trans('messages.create_submit') }}</span>
          </button>
          <button v-if="action === 'edit'" @click.prevent="editDomain" class="btn btn-sm btn-success ladda-button"
                  id="edit_domain_btn" data-style="zoom-out">
            <span class="ladda-label">{{ trans('messages.edit_submit') }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</script>