<script type="text/x-template" id="cc_integrations_component_template">
  <div>
    {{-- Integrations settings modal --}}
    <div v-if="integration_info" id="integration_settings_modal" class="modal fade" role="dialog" tabindex="-1">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" v-show="action == 'create'">{{ trans('integrations.create_header') }}</h4>
            <h4 class="modal-title" v-show="action == 'edit'">{{ trans('integrations.edit_header') }}</h4>
          </div>
          <div class="modal-body">
            <form id="integration_settings_form" enctype="multipart/form-data">

              <div class="form-group">
                <label id="integration_title" class="control-label"
                       for="integration_title">{{ trans('messages.title') }}:
                </label>
                <input v-model.lazy="integration_info.title" id="integration_title" type="text" class="form-control">
              </div>

              <div class="form-group">
                <label class="control-label" for="integration_integration_data">
                  {{ trans('integrations.integration_data') }}:
                </label>
                <textarea v-model.lazy="integration_info.integration_data"
                          class="form-control" id="integration_integration_data" rows="4"></textarea>
              </div>
              <div class="form-group">
                <label class="control-label" for="integration_schema">{{ trans('messages.schema') }}:</label>
                <textarea v-model.lazy="integration_info.schema"
                          class="form-control" id="integration_schema" rows="4"></textarea>
              </div>

              <div class="form-group">
                <label class="control-label" for="integration_info">
                  {{ trans('integrations.info') }}:
                </label>
                <input v-model.lazy="integration_info.info" id="integration_info" type="text" class="form-control">
              </div>

              <div class="form-group checkbox checkbox-success">
                <input v-model="integration_info.is_active" v-bind:true-value="1" v-bind:false-value="0"
                       id="integration_info_is_active" type="checkbox">
                <label for="integration_info_is_active">{{ trans('messages.is_active') }}</label>
              </div>

              <div class="form-group checkbox checkbox-success">
                <input v-model="integration_info.is_works_all_time" v-bind:true-value="1" v-bind:false-value="0"
                       id="integration_info_is_works_all_time" type="checkbox">
                <label for="integration_info_is_works_all_time">{{ trans('integrations.is_works_all_time') }}</label>
              </div>
              <div v-show="integration_info.is_works_all_time === 0" class="form-group">
                @include('admin::parts.day_hour_picker')
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button v-show="action == 'create'" v-on:click="createIntegration"
                    id="create_integration_submit"
                    type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
              <span class="ladda-label">{{ trans('messages.create_submit') }}</span>
            </button>
            <button v-show="action == 'edit'" v-on:click="editIntegration"
                    id="edit_integration_submit"
                    type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
              <span class="ladda-label">{{ trans('messages.edit_submit') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    {{-- Listing of integrations --}}
    <div class="filters_panel_white">
      <button v-on:click="openCreateModal" type="button" class="btn btn-success btn-outline btn-sm m-b pull-right">
        {{ trans('messages.create_btn') }}
      </button>
    </div>
    <div class="table">
      <table v-if="integrations" class="table">
        <thead>
        <tr>
          <th>{{ trans('messages.id') }}</th>
          <th>{{ trans('messages.title') }}</th>
          <th>{{ trans('integrations.internal_api_key') }}</th>
          <th>{{ trans('integrations.integration_data') }}</th>
          <th>{{ trans('messages.information') }}</th>
          <th></th>
          <th>{{ trans('messages.created') }}</th>
          <th class="w125"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(integration, index) in integrations">
          <td>@{{ integration.id }}</td>
          <td>@{{ integration.title }}</td>
          <td>@{{ integration.internal_api_key }}</td>
          <td style="max-width: 200px;">
            <pre class="word-break">@{{ integration.integration_data }}</pre>
          </td>
          <td>@{{ integration.info }}</td>
          <td>
                <span v-show="integration.is_active == 0" class="label label-danger">
                     {{ trans('messages.is_inactive') }}
                </span>
          </td>
          <td>@{{ integration.created_at | datehour }}</td>
          <td>
            <div class="btn-group pull-right">
              <button type="button" class="btn btn-sm btn-default dropdown-toggle"
                      data-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-cog"></i>
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li @click="openEditModal(index)">
                  <a href="#">{{ trans('messages.edit_submit') }}</a>
                </li>
                <li class="divider"></li>
                <li @click="deleteIntegration(integration.id, index)">
                  <a href="#">{{ trans('messages.delete_btn') }}</a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</script>