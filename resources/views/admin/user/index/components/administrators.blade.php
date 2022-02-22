<script type="text/x-template" id="administrators-tpl">
  <div>
    <div class="filters_panel_white">
      <button @click="createAdministrator" class="btn btn-outline btn-success btn-sm pull-right" type="button"
      >{{ trans('messages.create_btn') }}</button>
    </div>
    <div class="table-reponsivse" id="administrators-table-wrap">
      <table class="table table-bordered table-striped table-condensed">
        <thead>
        <tr>
          <th class="w40">@{{ LANG_MESSAGES.id }}</th>
          <th class="w75">@{{ LANG_MESSAGES.hash }}</th>
          <th>@{{ LANG_MESSAGES.email }}</th>
          <th>@{{ LANG_MESSAGES.skype }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="administrator in administrators">
          <td>@{{ administrator.id }}</td>
          <td>@{{ administrator.hash }}</td>
          <td>
            <span>@{{ administrator.email }}</span>
          </td>
          <td>@{{ administrator.profile.skype }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</script>
