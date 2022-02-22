<div class="table">
  <table v-if="transits.length" class="table table-condensed text-left table-light-td"
         id="transits-list-table">
    <thead>
    <tr>
      <th style="min-width: 90px;"></th>
      <th></th>
      <th class="w60">{{ trans('messages.ctr') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(transit, index) in transits" @click="selected_transit = transit" class="pointer">
      <td>
        <div class="radio display_i_b pointer m-b-none-i">
          <input @change="selected_transit = transit"
                 :id="'transit-radio' + index"
                 :checked="selected_transit.hash == transit.hash" name="transits-radio" type="radio">
          <label></label>
        </div>
        <a v-if="transit.hash" @click.stop :href="transit.domains[0].host" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>@{{ transit.title }}
        </a>
        <span v-else>@{{ transit.title }}</span>
      </td>
      <td class="text-right">
        <responsive-label :is_responsive="transit.is_responsive"></responsive-label>
        <mobile-label :is_mobile="transit.is_mobile"></mobile-label>
        <private-label :is_private="transit.is_private"></private-label>
      </td>
      <td v-if="transit.hash" class="text-center">@{{ transit.ctr }}%</td>
      <td v-else></td>
    </tr>
    </tbody>
  </table>
</div>