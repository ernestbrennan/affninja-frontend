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
    <tr v-for="(landing, index) in landings" @click="selected_landing = landing" class="pointer">
      <td>
        <div class="radio display_i_b pointer m-b-none-i">
          <input @change="selected_landing = landing"
                 :id="'landing-radio' + index"
                 :checked="selected_landing.hash == landing.hash" name="landings-radio" type="radio">
          <label></label>
        </div>
        <a @click.stop :href="landing.domains[0].host" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>@{{ landing.title }}
        </a>
      </td>
      <td class="text-right">
        <private-label :is_private="landing.is_private"></private-label>
        <responsive-label :is_responsive="landing.is_responsive"></responsive-label>
        <mobile-label :is_mobile="landing.is_mobile"></mobile-label>
        <back-call-label :is_back_call="landing.is_back_call"></back-call-label>
        <back-action-label :is_back_action="landing.is_back_action"></back-action-label>
        <vibrate-mobile-label :is_vibrate_on_mobile="landing.is_vibrate_on_mobile"></vibrate-mobile-label>
      </td>
      <td class="text-center">@{{ landing.cr }}%</td>
      <td class="text-center">@{{ landing.epc }}</td>
    </tr>
    </tbody>
  </table>
</div>