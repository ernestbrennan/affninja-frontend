<script type="text/x-template" id="managers-component-template">
  <div>
    <div class="filters_panel_white">
      <button @click="createManager" class="btn btn-outline btn-success btn-sm pull-right" type="button"
      >{{ trans('messages.create_btn') }}</button>
    </div>
    <div class="table-responsive" id="managers_list_table">
      <table class="table table-bordered table-striped table-condensed">
        <thead>
        <tr>
          <th class="w40">@{{ LANG_MESSAGES.id }}</th>
          <th class="w75">@{{ LANG_MESSAGES.hash }}</th>
          <th>@{{ LANG_MESSAGES.email }}</th>
          <th class="w35"></th>
          <th class="w35"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="manager in managers">
          <td>@{{ manager.id }}</td>
          <td>@{{ manager.hash }}</td>
          <td>
            <gravatar :email="manager.email"></gravatar>
            <enter-in-user-cabinet :email="manager.email" :hash="manager.hash"></enter-in-user-cabinet>
          </td>
          <td>
            <button @click="removeTooltipDiv(); changeUserPassword(manager.id, '#manager-' + manager.hash)"
                    :title="LANG_USERS.set_new_password"
                    class="btn btn-xs btn-info ladda-button"
                    :id="'manager-' + manager.hash"
                    data-toggle="tooltip" data-spinner-color="#666" data-style="zoom-out">
              <span class="ladda-label"><i class="fa fa-refresh"></i></span>
            </button>
          </td>
          <td>
            <div class="display-flex-rigth-center">
              <button @click="blockManager(manager)" v-show="manager.status === 'active'"
                      :title="LANG_USERS.block_btn" data-toggle="tooltip" id="manager_blocker_submit"
                      class="btn btn-danger btn-xs ladda-button" data-style="zoom-out">
                <span class="ladda-label"><i class="fa fa-lock"></i></span>
              </button>
              <button @click.stop="unlockManager(manager, $event)"
                      v-show="manager.status === 'locked'"
                      :title="LANG_USERS.unblock_btn"
                      class="btn btn-success btn-xs ladda-button"
                      id="manager_blocker_submit"
                      data-toggle="tooltip" data-style="zoom-out">
                <span class="ladda-label"><i class="fa fa-unlock"></i></span>
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="scroll-preloader-container"></div>
  </div>
</script>
