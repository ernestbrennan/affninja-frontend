<script type="text/x-template" id="active-sessions-tpl">
  <div id="active_sessions_tab" class="tab-pane">
    <div class="session_tab_wrapper" id="active_sessions_wrapper">
      <div class="row">
        <div class="col-xs-12" v-if="sessions.length">

          <button @click="deactivateAll"
                  :disabled="sessions.length === 1"
                  class="btn btn-danger btn-sm btn-outline m-b-sm pull-right ladda-button"
                  id="session-deactivate-all"
                  data-spinner-color="#666"
                  data-style="zoom-out">
            <span class="ladda-label">{{ trans('auth_tokens.deactivate_all') }} </span></button>

          <table class="table text-left table-light-td">
            <thead>
            <tr>
              <th></th>
              <th class="w80">{{ trans('messages.ip') }}</th>
              <th class="w120">{{ trans('auth_tokens.created_at') }}</th>
              <th class="w100">{{ trans('auth_tokens.last_activity') }}</th>
              <th class="w50"></th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(session,index) in sessions"
                  :key="session.hash"
                  :style="[session.is_current ? {'height':'37px' } : {} ]"
              >
                <td>
                  <device :user_agent="session.user_agent"></device>
                  <span v-if="session.is_current" class="label label-success pull-right">
                    {{ trans('auth_tokens.current_session') }}
                  </span>
                </td>
                <td> @{{ session.ip }}</td>
                <td> @{{ session.created_at | datehour }}</td>
                <td> @{{ session.last_activity | datehour }}</td>
                <td>
                  <button v-if="!session.is_current"
                          @click="deactivate(session.hash, index)"
                          :id="'session-deactivate-' + session.hash"
                          class="btn btn-danger btn-xs btn-outline ladda-button"
                          data-spinner-color="#666"
                          data-style="zoom-out"
                  ><span class="ladda-label">{{ trans('messages.deactivate') }}</span></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <empty-list-message v-show="!sessions.length"  message="{{ trans('messages.no_active_sessions') }}"
        ></empty-list-message>
      </div>
    </div>
  </div>
</script>
