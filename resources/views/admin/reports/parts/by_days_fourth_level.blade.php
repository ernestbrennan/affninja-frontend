{{-- fourth listing --}}
<tr v-if="third.show_children" v-for="fourth in third.children"
    :key="'4' + first.id + second.id + third.id + fourth.id"
    class="tr_stat_inside tr_stat_inside_level_fourth fourth_level_tr">
  <td>@{{ fourth.title }}</td>
  <td data-column="real_approve">
    <span v-mute-zero="fourth.real_approve">@{{ fourth.real_approve | number_format }}%</span>
  </td>
  <td data-column="approve">
    <span v-mute-zero="fourth.approve">@{{ fourth.approve | number_format }}%</span>
  </td>
  <td data-column="total_count" class="nowrap">
    <div v-if="fourth.total_count">
      <a :href="getLeadLink(fourth, null, first, second, third)" class="pull-left" target="_blank">@{{
        fourth.total_count }}</a>
      <difference v-if="level_3_group_by === 'created_at' || level_3_group_by === 'processed_at'"
                  :difference="fourth.total_difference"
                  class="difference_number"
      ></difference>
    </div>
    <div v-else>
      <span v-mute-zero class="pull-left">@{{ fourth.total_count }}</span>
      <difference v-if="level_3_group_by === 'created_at' || level_3_group_by === 'processed_at'"
                  :difference="fourth.total_difference"
                  class="difference_number"
      ></difference>
    </div>
  </td>
  <td data-column="approved_count" class="nowrap">
    <div v-if="fourth.approved_count">
      <a :href="getLeadLink(fourth, 'approved', first, second, third)" class="pull-left" target="_blank"
      >@{{ fourth.approved_count }}</a>
      <difference v-if="level_3_group_by === 'created_at' || level_3_group_by === 'processed_at'"
                  :difference="fourth.approved_difference"
                  class="difference_number"
      ></difference>
    </div>
    <div v-else>
      <span v-mute-zero class="pull-left">@{{ fourth.approved_count }}</span>
      <difference
              v-if="level_3_group_by === 'created_at' || level_3_group_by === 'processed_at'"
              :difference="fourth.approved_difference"
              class="difference_number"
      ></difference>
    </div>
  </td>
  <td data-column="held_count" style="text-align: center">
    <a v-if="fourth.held_count" :href="getLeadLink(fourth, 'new', first, second, third)" target="_blank"
    >@{{ fourth.held_count }}</a>
    <span v-else v-mute-zero>@{{ fourth.held_count }}</span>
  </td>
  <td data-column="cancelled_count" style="text-align: center">
    <a v-if="fourth.cancelled_count" :href="getLeadLink(fourth, 'cancelled', first, second, third)" target="_blank"
    >@{{ fourth.cancelled_count }}</a>
    <span v-else v-mute-zero>@{{ fourth.cancelled_count }}</span>
  </td>
  <td data-column="trashed_count" style="text-align: center">
    <a v-if="fourth.trashed_count" :href="getLeadLink(fourth, 'trashed', first, second, third)" target="_blank"
    >@{{ fourth.trashed_count }}</a>
    <span v-else v-mute-zero>@{{ fourth.trashed_count }}</span>
  </td>
  <td data-column="rub_held_payout">
    <money :sum="fourth.rub_held_payout" v-mute-zero="fourth.rub_held_payout"></money>
  </td>
  <td data-column="rub_approved_payout">
    <money :sum="fourth.rub_approved_payout" v-mute-zero="fourth.rub_approved_payout"></money>
  </td>
  <td data-column="rub_profit">
    <money :sum="fourth.rub_profit" v-mute-zero="fourth.rub_profit"></money>
  </td>
  <td data-column="usd_held_payout">
    <money :sum="fourth.usd_held_payout" v-mute-zero="fourth.usd_held_payout"></money>
  </td>
  <td data-column="usd_approved_payout">
    <money :sum="fourth.usd_approved_payout" v-mute-zero="fourth.usd_approved_payout"></money>
  </td>
  <td data-column="usd_profit">
    <money :sum="fourth.usd_profit" v-mute-zero="fourth.usd_profit"></money>
  </td>
  <td data-column="eur_held_payout">
    <money :sum="fourth.eur_held_payout" v-mute-zero="fourth.eur_held_payout"></money>
  </td>
  <td data-column="eur_approved_payout">
    <money :sum="fourth.eur_approved_payout" v-mute-zero="fourth.eur_approved_payout"></money>
  </td>
  <td data-column="eur_profit">
    <money :sum="fourth.eur_profit" v-mute-zero="fourth.eur_profit"></money>
  </td>
</tr>