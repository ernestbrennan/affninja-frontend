<template v-if="second.total_count && second.children.length && second.show_children"
          v-for="(third, third_index) in second.children">

  {{-- Third listing --}}
  <tr :key="'3' + first.id + second.id + third.id"
      class="tr_stat_inside tr_stat_inside_level_two third_level_tr">
    <td>
      <div @click="getFourthLevelReport(first, first_index, second, second_index, third, third_index, $event)"
           :class="['nowrap action_icon_arrow pointer', third.show_children ? 'open' : '']"
           v-html="third.title"></div>
    </td>
    <td data-column="real_approve">
      <span v-mute-zero="third.real_approve">@{{ third.real_approve | number_format }}%</span>
    </td>
    <td data-column="approve">
      <span v-mute-zero="third.approve">@{{ third.approve | number_format }}%</span>
    </td>
    <td data-column="total_count" class="nowrap">
      <div v-if="third.total_count">
        <a :href="getLeadLink(third, null, first, second)" class="pull-left" target="_blank"
        >@{{ third.total_count }}</a>
        <difference v-if="level_3_group_by === 'created_at' || level_3_group_by === 'processed_at'"
                    :difference="third.total_difference"
                    class="difference_number"
        ></difference>
      </div>
      <div v-else>
        <span v-mute-zero class="pull-left">@{{ third.total_count }}</span>
        <difference v-if="level_3_group_by === 'created_at' || level_3_group_by === 'processed_at'"
                    :difference="third.total_difference"
                    class="difference_number"
        ></difference>
      </div>
    </td>
    <td data-column="approved_count" class="nowrap">
      <div v-if="third.approved_count">
        <a :href="getLeadLink(third, 'approved', first, second)" class="pull-left" target="_blank"
        >@{{ third.approved_count }}</a>
        <difference v-if="level_3_group_by === 'created_at' || level_3_group_by === 'processed_at'"
                    :difference="third.approved_difference"
                    class="difference_number"
        ></difference>
      </div>
      <div v-else>
        <span v-mute-zero class="pull-left">@{{ third.approved_count }}</span>
        <difference
                v-if="level_3_group_by === 'created_at' || level_3_group_by === 'processed_at'"
                :difference="third.approved_difference"
                class="difference_number"
        ></difference>
      </div>
    </td>
    <td data-column="held_count" style="text-align: center">
      <a v-if="third.held_count" :href="getLeadLink(third, 'new', first, second)" target="_blank"
      >@{{ third.held_count }}</a>
      <span v-else v-mute-zero>@{{ third.held_count }}</span>
    </td>
    <td data-column="cancelled_count" style="text-align: center">
      <a v-if="third.cancelled_count" :href="getLeadLink(third, 'cancelled', first, second)" target="_blank"
      >@{{ third.cancelled_count }}</a>
      <span v-else v-mute-zero>@{{ third.cancelled_count }}</span>
    </td>
    <td data-column="trashed_count" style="text-align: center">
      <a v-if="third.trashed_count" :href="getLeadLink(third, 'trashed', first, second)" target="_blank"
      >@{{ third.trashed_count }}</a>
      <span v-else v-mute-zero>@{{ third.trashed_count }}</span>
    </td>
    <td data-column="rub_held_payout">
      <money :sum="third.rub_held_payout" v-mute-zero="third.rub_held_payout"></money>
    </td>
    <td data-column="rub_approved_payout">
      <money :sum="third.rub_approved_payout" v-mute-zero="third.rub_approved_payout"></money>
    </td>
    <td data-column="rub_profit">
      <money :sum="third.rub_profit" v-mute-zero="third.rub_profit"></money>
    </td>
    <td data-column="usd_held_payout">
      <money :sum="third.usd_held_payout" v-mute-zero="third.usd_held_payout"></money>
    </td>
    <td data-column="usd_approved_payout">
      <money :sum="third.usd_approved_payout" v-mute-zero="third.usd_approved_payout"></money>
    </td>
    <td data-column="usd_profit">
      <money :sum="third.usd_profit" v-mute-zero="third.usd_profit"></money>
    </td>
    <td data-column="eur_held_payout">
      <money :sum="third.eur_held_payout" v-mute-zero="third.eur_held_payout"></money>
    </td>
    <td data-column="eur_approved_payout">
      <money :sum="third.eur_approved_payout" v-mute-zero="third.eur_approved_payout"></money>
    </td>
    <td data-column="eur_profit">
      <money :sum="third.eur_profit" v-mute-zero="third.eur_profit"></money>
    </td>
  </tr>

  @include('admin::reports.parts.by_days_fourth_level')
</template>
