<template v-if="first.total_count && first.children.length && first.show_children"
          v-for="(second, second_index) in first.children"
>
  <tr :key="'2' + first.id + second.id"
      class="tr_stat_inside tr_stat_inside_level_one second_level_tr">
    <td>
      <div @click="getThirdLevelReport(first, first_index, second, second_index, $event)"
           :class="['nowrap action_icon_arrow pointer', second.show_children ? 'open' : '']"
           v-html="second.title"></div>
    </td>
    <td data-column="real_approve">
      <span v-mute-zero="second.real_approve">@{{ second.real_approve | number_format }}%</span>
    </td>
    <td data-column="approve">
      <span v-mute-zero="second.approve">@{{ second.approve | number_format }}%</span>
    </td>
    <td data-column="total_count" class="nowrap">
      <div v-if="second.total_count">
        <a :href="getLeadLink(second, null, first)" class="pull-left" target="_blank">@{{ second.total_count }}</a>
        <difference v-if="level_2_group_by === 'created_at' || level_2_group_by === 'processed_at'"
                    :difference="second.total_difference"
                    class="difference_number"
        ></difference>
      </div>
      <div v-else>
        <span v-mute-zero class="pull-left">@{{ second.total_count }}</span>
        <difference v-if="level_2_group_by === 'created_at' || level_2_group_by === 'processed_at'"
                    :difference="second.total_difference"
                    class="difference_number"
        ></difference>
      </div>
    </td>
    <td data-column="approved_count" class="nowrap">
      <div v-if="second.approved_count">
        <a v-if="second.approved_count" :href="getLeadLink(second, 'approved', first)" class="pull-left" target="_blank"
        >@{{ second.approved_count }}</a>
        <difference v-if="level_2_group_by === 'created_at' || level_2_group_by === 'processed_at'"
                    :difference="second.approved_difference"
                    class="difference_number"
        ></difference>
      </div>
      <div v-else>
        <span v-mute-zero class="pull-left">@{{ second.approved_count }}</span>
        <difference
                v-if="level_2_group_by === 'created_at' || level_2_group_by === 'processed_at'"
                :difference="second.approved_difference"
                class="difference_number"
        ></difference>
      </div>
    </td>
    <td data-column="held_count" style="text-align: center">
      <a v-if="second.held_count" :href="getLeadLink(second, 'new', first)" target="_blank"
      >@{{ second.held_count }}</a>
      <span v-else v-mute-zero>@{{ second.held_count }}</span>
    </td>
    <td data-column="cancelled_count" style="text-align: center">
      <a v-if="second.cancelled_count" :href="getLeadLink(second, 'cancelled', first)" target="_blank"
      >@{{ second.cancelled_count }}</a>
      <span v-else v-mute-zero>@{{ second.cancelled_count }}</span>
    </td>
    <td data-column="trashed_count" style="text-align: center">
      <a v-if="second.trashed_count" :href="getLeadLink(second, 'trashed', first)" target="_blank"
      >@{{ second.trashed_count }}</a>
      <span v-else v-mute-zero>@{{ second.trashed_count }}</span>
    </td>
    <td data-column="rub_held_payout">
      <money :sum="second.rub_held_payout" v-mute-zero="second.rub_held_payout"></money>
    </td>
    <td data-column="rub_approved_payout">
      <money :sum="second.rub_approved_payout" v-mute-zero="second.rub_approved_payout"></money>
    </td>
    <td data-column="rub_profit">
      <money :sum="second.rub_profit" v-mute-zero="second.rub_profit"></money>
    </td>
    <td data-column="usd_held_payout">
      <money :sum="second.usd_held_payout" v-mute-zero="second.usd_held_payout"></money>
    </td>
    <td data-column="usd_approved_payout">
      <money :sum="second.usd_approved_payout" v-mute-zero="second.usd_approved_payout"></money>
    </td>
    <td data-column="usd_profit">
      <money :sum="second.usd_profit" v-mute-zero="second.usd_profit"></money>
    </td>
    <td data-column="eur_held_payout">
      <money :sum="second.eur_held_payout" v-mute-zero="second.eur_held_payout"></money>
    </td>
    <td data-column="eur_approved_payout">
      <money :sum="second.eur_approved_payout" v-mute-zero="second.eur_approved_payout"></money>
    </td>
    <td data-column="eur_profit">
      <money :sum="second.eur_profit" v-mute-zero="second.eur_profit"></money>
    </td>
  </tr>

  @include('admin::reports.parts.by_days_third_level')

</template>