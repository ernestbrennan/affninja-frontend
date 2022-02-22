<div class="table">
  <table v-if="transits.length" class="table table-condensed text-left table-light-td"
         id="transits_list_table">
    <thead>
    <tr>
      <th style="min-width: 90px;"></th>
      <th class="w100"></th>
      <th class="w60">{{ trans('messages.ctr') }}</th>
      <th class="w50"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(transit, index) in transits" :key="transit.hash">
      <td>
        <a :href="transit.domains[0].host" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>@{{ transit.title }}
        </a>
      </td>
      <td class="text-right">
        <responsive-label :is_responsive="transit.is_responsive"></responsive-label>
        <mobile-label :is_mobile="transit.is_mobile"></mobile-label>
        <private-label :is_private="transit.is_private"></private-label>
        <inactive-label :is_active="transit.is_active" :only_icon="true"></inactive-label>
      </td>
      <td class="text-center">@{{ transit.ctr }}%</td>
      <td>
        <div class="btn-group pull-right">
          <button type="button" class="btn btn-xs btn-default dropdown-toggle"
                  data-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-cog"></i>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li @click.prevent="openTransitEditModal(index)">
              <a href="#">{{ trans('messages.edit') }}</a>
            </li>
            <li @click.prevent="openEntityDomainModal(transit)">
              <a href="#">{{ trans('domains.domains') }}</a>
            </li>
            <li v-show="transit.is_private === 1" @click.prevent="openTransitPermissionModal(transit.hash)">
              <a href="#">{{ trans('users.user_permissions') }}</a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</div>
