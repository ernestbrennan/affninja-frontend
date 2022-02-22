<div class="table">
  <table v-if="landings.length" class="table table-condensed text-left table-light-td"
         id="landings_list_table">
    <thead>
    <tr>
      <th style="min-width: 90px;"></th>
      <th class="w100"></th>
      <th class="w60">{{ trans('messages.cr') }}</th>
      <th class="w60">{{ trans('messages.epc') }}</th>
      <th class="w50"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(landing, index) in landings" :key="landing.hash">
      <td>
        <a :href="landing.domains[0].host" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>@{{ landing.title }}
        </a>
      </td>
      <td class="text-right">
        <inactive-label :is_active="landing.is_active" :only_icon="true"></inactive-label>
        <private-label :is_private="landing.is_private"></private-label>
        <responsive-label :is_responsive="landing.is_responsive"></responsive-label>
        <mobile-label :is_mobile="landing.is_mobile"></mobile-label>
        <back-call-label :is_back_call="landing.is_back_call"></back-call-label>
        <back-action-label :is_back_action="landing.is_back_action"></back-action-label>
        <vibrate-mobile-label :is_vibrate_on_mobile="landing.is_vibrate_on_mobile"></vibrate-mobile-label>
      </td>
      <td class="text-center">@{{ landing.cr }}%</td>
      <td class="text-center">@{{ landing.epc }}</td>
      <td>
        <div class="btn-group pull-right">
          <button type="button" class="btn btn-xs btn-default dropdown-toggle"
                  data-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-cog"></i>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li @click.prevent="openLandingEditModal(index)">
              <a href="#">{{ trans('messages.edit') }}</a>
            </li>
            <li @click.prevent="openEntityDomainModal(landing)">
              <a href="#">{{ trans('domains.domains') }}</a>
            </li>
            <li v-show="landing.is_private === 1" @click.prevent="openLandingPermissionModal(landing.hash)">
              <a href="#">{{ trans('users.user_permissions') }}</a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</div>
