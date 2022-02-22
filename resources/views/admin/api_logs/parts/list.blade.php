<table v-if="api_logs.length" class="table table-hover table-striped table-bordered table-condensed">
  <thead>
  <tr>
    <th>{{ trans('messages.date') }}</th>
    <th>{{ trans('messages.user') }}</th>
    <th>{{ trans('messages.administrator') }}</th>
    <th>{{ trans('messages.ip') }}</th>
    <th>{{ trans('messages.device') }}</th>
    <th>{{ trans('messages.method') }}</th>
    <th>{{ trans('messages.request') }}</th>
    <th>{{ trans('messages.response') }}</th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="api_log in api_logs">
    <td>@{{ api_log.created_at | datehour }}</td>
    <td>
      <enter-in-user-cabinet
              v-if="api_log.user.role !== 'administrator'"
              :email="api_log.user.email"
              :hash="api_log.user.hash">
      </enter-in-user-cabinet>
      <span v-else>@{{ api_log.user.email }}</span>
    </td>
    <td>@{{ api_log.admin !== null ? api_log.admin.email : '' }}</td>
    <td>@{{ api_log.ip }}</td>
    <td>
      <device :user_agent="api_log.user_agent"></device>
    </td>
    <td>@{{ api_log.api_method }}</td>
    <td style="max-width: 200px;">
      <pre class="word-break">@{{ api_log.request_method }} @{{ api_log.request}}</pre>
    </td>
    <td style="max-width: 200px;">
      <pre class="word-break">@{{ api_log.response }}</pre>
    </td>
  </tr>
  </tbody>
</table>
<div id="scroll-preloader-container"></div>
<preloader v-show="api_logs.length && pagination.loading && !pagination.finished"></preloader>
<empty-list-message v-if="!api_logs.length" message="{{ trans('messages.is_empty') }}"
></empty-list-message>