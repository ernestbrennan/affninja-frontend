<script type="text/x-template" id="sms_integrations_tpl">
  <div>
    {{-- Integrations settings modal --}}
    <div v-if="integration_info" id="sms_integration_settings_modal" class="modal fade" role="dialog"
         tabindex="-1">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" v-show="action == 'create'">{{ trans('integrations.create_header') }}</h4>
            <h4 class="modal-title" v-show="action == 'edit'">{{ trans('integrations.edit_header') }}</h4>
          </div>
          <div class="modal-body">
            <form id="sms_integration_settings_form">
              <div class="form-group">
                <label class="control-label" for="sms_integration_title">{{ trans('messages.title') }}:</label>
                <input v-model="integration_info.title" class="form-control" id="sms_integration_title"
                       type="text">
              </div>
              <div class="form-group">
                <label class="control-label" id="email_labeladditional_data" for="sms_integration_extra">
                  {{ trans('integrations.integration_data') }}:</label>
                <textarea v-model="integration_info.extra" id="sms_integration_extra" rows="5"
                          class="form-control"></textarea>
              </div>

              <div class="form-group">
                <label class="control-label" for="integration_info">
                  {{ trans('integrations.info') }}:
                </label>
                <input v-model.lazy="integration_info.info" id="integration_info" type="text" class="form-control">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button v-show="action == 'create'" v-on:click="createIntegration"
                    id="create_sms_integration_submit"
                    type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
              <span class="ladda-label">{{ trans('messages.create_submit') }}</span>
            </button>
            <button v-show="action == 'edit'" v-on:click="editIntegration"
                    id="edit_sms_integration_submit"
                    type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
              <span class="ladda-label">{{ trans('messages.edit_submit') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    {{-- Listing of integrations --}}
    <div class="filters_panel_white">
      <button @click="openCreateModal" type="button" class="btn btn-success btn-outline btn-sm m-b pull-right">
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
            <pre class="word-break">@{{ integration.extra }}</pre>
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