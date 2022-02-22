<template v-for="(third, third_index) in second.children">
  <tr :key="'3' + first.id + second.id + third.id"
      class="tr_stat_inside tr_stat_inside_level_two third_level_tr">
    <td>
      <div @click="getFourthLevelReport(first, first_index, second, second_index, third, third_index, $event)"
           :class="['nowrap action_icon_arrow pointer', third.show_children ? 'open' : '']">
        @{{ getTitle(level_3_group_by, third.title) }}
      </div>
    </td>

    {{-- Traffic --}}
    <td v-show="traffic.hits" data-column="hits">
      <span v-mute-zero="third.hits">@{{ third.hits }}</span>
    </td>
    <td v-show="traffic.unique_count" data-column="flow_hosts">
      <span v-mute-zero="third.flow_hosts">@{{ third.flow_hosts }}</span>
    </td>
    <td v-show="traffic.bot_count" data-column="bot_count">
      <span v-mute-zero="third.bot_count">@{{ third.bot_count }}</span>
    </td>
    <td v-show="traffic.safepage_count" data-column="safepage_count">
      <span v-mute-zero="third.safepage_count">@{{ third.safepage_count }}</span>
    </td>
    <td v-show="traffic.traffback_count" data-column="traffback_count">
      <span v-mute-zero="third.traffback_count">@{{ third.traffback_count }}</span>
    </td>

    {{-- Сoefficients --}}
    <td v-show="coefficient.cr" data-column="cr">
      <span v-mute-zero="third.cr">@{{ third.cr | number_format }}%</span>
    </td>
    <td v-show="coefficient.cr_unique" data-column="cr_unique">
      <span v-mute-zero="third.cr_unique">@{{ third.cr_unique | number_format }}%</span>
    </td>
    <td v-show="coefficient.epc" data-column="epc">
      <span v-mute-zero="third.epc">@{{ third.epc | number_format }}</span>
    </td>
    <td v-show="coefficient.epc_unique" data-column="epc_unique">
      <span v-mute-zero="third.epc_unique">@{{ third.epc_unique | number_format }}</span>
    </td>
    <td v-show="coefficient.real_approve" data-column="real_approve">
      <span v-mute-zero="third.real_approve">@{{ third.real_approve | number_format }}%</span>
    </td>
    <td v-show="coefficient.expected_approve" data-column="expected_approve">
      <span v-mute-zero="third.expected_approve">@{{ third.expected_approve | number_format }}%</span>
    </td>
    <td v-show="coefficient.approve" data-column="approve">
      <span v-mute-zero="third.approve">@{{ third.approve | number_format }}%</span>
    </td>

    {{-- Сonversions --}}
    <td v-show="conversion.total_leads" data-column="total_count" class="nowrap">
      <div v-if="third.total_count">
        <a :href="getLeadLink(third, null, first, second)" class="pull-left" target="_blank"
        >@{{ third.total_count }}</a>
        <difference v-if="level_3_group_by === 'datetime'"
                    :difference="third.total_difference"
                    class="difference_number"
        ></difference>
      </div>
      <div v-else>
        <span v-mute-zero class="pull-left">@{{ third.total_count }}</span>
        <difference v-if="level_3_group_by === 'datetime'"
                    :difference="third.total_difference"
                    class="difference_number"
        ></difference>
      </div>
    </td>
    <td v-show="conversion.approved_count" data-column="approved_count" class="nowrap">
      <div v-if="third.approved_count">
        <a :href="getLeadLink(third, 'approved', first, second)" class="pull-left" target="_blank"
        >@{{ third.approved_count }}</a>
        <difference v-if="level_3_group_by === 'datetime'"
                    :difference="third.approved_difference"
                    class="difference_number"
        ></difference>
      </div>
      <div v-else>
        <span v-mute-zero class="pull-left">@{{ third.approved_count }}</span>
        <difference
                v-if="level_3_group_by === 'datetime'"
                :difference="third.approved_difference"
                class="difference_number"
        ></difference>
      </div>
    </td>
    <td v-show="conversion.held_count" data-column="held_count" style="text-align: center">
      <a v-if="third.held_count" :href="getLeadLink(third, 'new', first, second)" target="_blank"
      >@{{ third.held_count }}</a>
      <span v-else v-mute-zero>@{{ third.held_count }}</span>
    </td>
    <td v-show="conversion.cancelled_count" data-column="cancelled_count" style="text-align: center">
      <a v-if="third.cancelled_count" :href="getLeadLink(third, 'cancelled', first, second)" target="_blank"
      >@{{ third.cancelled_count }}</a>
      <span v-else v-mute-zero>@{{ third.cancelled_count }}</span>
    </td>
    <td v-show="conversion.trashed_count" data-column="trashed_count" style="text-align: center">
      <a v-if="third.trashed_count" :href="getLeadLink(third, 'trashed', first, second)" target="_blank"
      >@{{ third.trashed_count }}</a>
      <span v-else v-mute-zero>@{{ third.trashed_count }}</span>
    </td>

    {{-- Finance --}}
    <td v-show="finance.total_payout" :data-column="getDataColumnTitle('total_payout')">
      <money :sum="third.total_payout" v-mute-zero="third.total_payout"></money>
    </td>
    <td v-show="finance.leads_payout" :data-column="getDataColumnTitle('leads_payout')">
      <money :sum="third.leads_payout" v-mute-zero="third.leads_payout"></money>
    </td>
    <td v-show="finance.onhold_payout" :data-column="getDataColumnTitle('onhold_payout')">
      <money :sum="third.onhold_payout" v-mute-zero="third.onhold_payout"></money>
    </td>
    <td v-show="finance.oncancel_payout" :data-column="getDataColumnTitle('oncancel_payout')">
      <money :sum="third.oncancel_payout" v-mute-zero="third.oncancel_payout"></money>
    </td>
    <td v-show="finance.ontrash_payout" :data-column="getDataColumnTitle('ontrash_payout')">
      <money :sum="third.ontrash_payout" v-mute-zero="third.ontrash_payout"></money>
    </td>
  </tr>

  <template v-if="third.show_children" >
    @include('publisher::statistics.parts.group_fourth_level')
  </template>
</template>
