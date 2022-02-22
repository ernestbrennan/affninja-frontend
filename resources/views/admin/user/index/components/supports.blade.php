<script type="text/x-template" id="supports-component-template">
  <div>
    <div class="filters_panel_white">
      <button @click="createSupport" class="btn btn-outline btn-success btn-sm pull-right" type="button"
      >{{ trans('messages.create_btn') }}</button>
    </div>
    <div class="table-responsive" id="supports_list_table">
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
        <tr v-for="support in supports">
          <td>@{{ support.id }}</td>
          <td>@{{ support.hash }}</td>
          <td>
            <gravatar :email="support.email"></gravatar>
            <enter-in-user-cabinet :email="support.email" :hash="support.hash"></enter-in-user-cabinet>
          </td>
          <td>
            <button @click="removeTooltipDiv(); changeUserPassword(support.id, '#support-' + support.hash)"
                    :title="LANG_USERS.set_new_password"
                    class="btn btn-xs btn-info ladda-button"
                    :id="'support-' + support.hash"
                    data-toggle="tooltip" data-spinner-color="#666" data-style="zoom-out">
              <span class="ladda-label"><i class="fa fa-refresh"></i></span>
            </button>
          </td>
          <td>
            <div class="display-flex-rigth-center">
              <button @click="blockSupport(support)" v-show="support.status === 'active'"
                      :title="LANG_USERS.block_btn" data-toggle="tooltip" id="support_blocker_submit"
                      class="btn btn-danger btn-xs ladda-button" data-style="zoom-out">
                <span class="ladda-label"><i class="fa fa-lock"></i></span>
              </button>
              <button @click.stop="unlockSupport(support, $event)"
                      v-show="support.status === 'locked'"
                      :title="LANG_USERS.unblock_btn"
                      id="support_blocker_submit"
                      class="btn btn-success btn-xs ladda-button"
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
