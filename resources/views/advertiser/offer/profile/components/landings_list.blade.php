<div class="table">
  <table v-if="landings.length" class="table table-condensed text-left table-light-td"
         id="landings-list-table">
    <thead>
    <tr>
      <th style="min-width: 90px;"></th>
      <th></th>
      <th class="w60">{{ trans('messages.cr') }}</th>
      <th class="w60">{{ trans('messages.epc') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(landing, index) in landings">
      <td>
        <a :href="landing.domains[0].host" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>@{{ landing.title }}
        </a>
      </td>
      <td class="text-right">
        <responsive-label :is_responsive="landing.is_responsive"></responsive-label>
        <mobile-label :is_mobile="landing.is_mobile"></mobile-label>
        <private-label :is_private="landing.is_private"></private-label>
      </td>
      <td class="text-center">@{{ landing.cr }}%</td>
      <td class="text-center">@{{ landing.epc }}</td>
    </tr>
    </tbody>
  </table>
  <empty-list-message v-if="!landings.length"
                      message="{{ trans('messages.empty_list_landings') }}"></empty-list-message>
</div>