<script type="text/x-template" id="domains_tpl">
  <div class="row">

    {{-- Domains create modal --}}
    <div  id="domains-create-modal" class="modal fade" role="dialog" tabindex="-1">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title">{{ trans('domains.create_domain') }}</h4>

          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="control-label" for="domain_title">{{ trans('domains.domain') }}:</label>
              <input v-model.lazy="domain_info.domain" class="form-control" id="domain_title"
                     type="text">
            </div>
            <div class="form-group">
              <label class="control-label" >{{ trans('messages.type') }}:</label>
              <select-item v-model="domain_info.entity_type" :options="entity_types"></select-item>
            </div>
            <div class="checkbox checkbox-success m-b-none-i">
              <input v-model="domain_info.is_active" :true-value="1" :false-value="0"
                     id="domain_is_active" type="checkbox">
              <label for="domain_is_active" >{{ trans('messages.is_active') }}</label>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="createDomain"
                    v-button-preloader="domain_create_loading"
                    type="button" class="btn btn-success btn-sm" data-style="zoom-out">
              {{ trans('messages.create_submit') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    {{-- Domains list modal --}}
    <div class="col-xs-12">
      <button @click="openCreateModal" class="pull-right btn btn-success btn-sm m-b ladda-button" id="create"
              data-style="zoom-out">
        {{ trans('messages.create') }}
      </button>
    </div>
    <div class="col-xs-12">
      <div v-content-preloader="domains_loading" id="domains_table_wrap">
        <table class="table  table-bordered table-striped text-left" id="domains_table">
          <thead>
          <tr>
            <th>{{ trans('domains.domain') }}</th>
            <th class="w65">{{ trans('messages.type') }}</th>
            <th class="w60"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="domain in domains">
            <td>@{{ domain.domain }}   <inactive-label :is_active="domain.is_active"></inactive-label>
            </td>
            <td>
              <span class="label display_block" :class="[domain.entity_type == 'tds' ? 'label-info' : 'label-warning']">
                @{{ parseEntityType(domain.entity_type)}}</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown"
                        aria-expanded="false">
                  <i class="fa fa-cog"></i> <span class="caret"></span>
                </button>
                <ul class="dropdown-menu dropdown-right">
                  <li @click.prevent="activateDomain(domain.id)" v-show="domain.is_active === 0"><a href="#">{{ trans
                  ('messages.activate')
                  }}</a></li>
                  <li @click.prevent="deactivateDomain(domain.id)" v-show="domain.is_active === 1"><a
                          href="#">{{ trans('messages.deactivate')
                  }}</a></li>
                </ul>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
        <h5 v-if="domains.length === 0" class="text-center m-t">{{ trans('domains.no_domains') }}</h5>
      </div>
    </div>
  </div>
</script>