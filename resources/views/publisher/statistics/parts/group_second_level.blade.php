<template v-for="(second, second_index) in first.children">
  <tr :key="'2' + first.id + second.id"
      class="tr_stat_inside tr_stat_inside_level_one second_level_tr">
    <td>
      <div @click="getThirdLevelReport(first, first_index, second, second_index, $event)"
           :class="['nowrap action_icon_arrow pointer', second.show_children ? 'open' : '']">
        @{{ getTitle(level_2_group_by, second.title) }}
      </div>
    </td>

    {{-- Traffic --}}
    <td v-show="traffic.hits" data-column="hits">
      <span v-mute-zero="second.hits">@{{ second.hits }}</span>
    </td>
    <td v-show="traffic.unique_count" data-column="flow_hosts">
      <span v-mute-zero="second.flow_hosts">@{{ second.flow_hosts }}</span>
    </td>
    <td v-show="traffic.bot_count" data-column="bot_count">
      <span v-mute-zero="second.bot_count">@{{ second.bot_count }}</span>
    </td>
    <td v-show="traffic.safepage_count" data-column="safepage_count">
      <span v-mute-zero="second.safepage_count">@{{ second.safepage_count }}</span>
    </td>
    <td v-show="traffic.traffback_count" data-column="traffback_count">
      <span v-mute-zero="second.traffback_count">@{{ second.traffback_count }}</span>
    </td>

    {{-- Сoefficients --}}
    <td v-show="coefficient.cr" data-column="cr">
      <span v-mute-zero="second.cr">@{{ second.cr | number_format }}%</span>
    </td>
    <td v-show="coefficient.cr_unique" data-column="cr_unique">
      <span v-mute-zero="second.cr_unique">@{{ second.cr_unique | number_format }}%</span>
    </td>
    <td v-show="coefficient.epc" data-column="epc">
      <span v-mute-zero="second.epc">@{{ second.epc | number_format }}</span>
    </td>
    <td v-show="coefficient.epc_unique" data-column="epc_unique">
      <span v-mute-zero="second.epc_unique">@{{ second.epc_unique | number_format }}</span>
    </td>
    <td v-show="coefficient.real_approve" data-column="real_approve">
      <span v-mute-zero="second.real_approve">@{{ second.real_approve | number_format }}%</span>
    </td>
    <td v-show="coefficient.expected_approve" data-column="expected_approve">
      <span v-mute-zero="second.expected_approve">@{{ second.expected_approve | number_format }}%</span>
    </td>
    <td v-show="coefficient.approve" data-column="approve">
      <span v-mute-zero="second.approve">@{{ second.approve | number_format }}%</span>
    </td>

    {{-- Сonversions --}}
    <td v-show="conversion.total_leads" data-column="total_count" class="nowrap">
      <div v-if="second.total_count">
        <a :href="getLeadLink(second, null, first)" class="pull-left" target="_blank">@{{ second.total_count }}</a>
        <difference v-if="level_2_group_by === 'datetime'"
                    :difference="second.total_difference"
                    class="difference_number"
        ></difference>
      </div>
      <div v-else>
        <span v-mute-zero class="pull-left">@{{ second.total_count }}</span>
        <difference v-if="level_2_group_by === 'datetime'"
                    :difference="second.total_difference"
                    class="difference_number"
        ></difference>
      </div>
    </td>
    <td v-show="conversion.approved_count" data-column="approved_count" class="nowrap">
      <div v-if="second.approved_count">
        <a v-if="second.approved_count" :href="getLeadLink(second, 'approved', first)" class="pull-left" target="_blank"
        >@{{ second.approved_count }}</a>
        <difference v-if="level_2_group_by === 'datetime'"
                    :difference="second.approved_difference"
                    class="difference_number"
        ></difference>
      </div>
      <div v-else>
        <span v-mute-zero class="pull-left">@{{ second.approved_count }}</span>
        <difference
                v-if="level_2_group_by === 'datetime'"
                :difference="second.approved_difference"
                class="difference_number"
        ></difference>
      </div>
    </td>
    <td v-show="conversion.held_count" data-column="held_count" style="text-align: center">
      <a v-if="second.held_count" :href="getLeadLink(second, 'new', first)" target="_blank"
      >@{{ second.held_count }}</a>
      <span v-else v-mute-zero>@{{ second.held_count }}</span>
    </td>
    <td v-show="conversion.cancelled_count" data-column="cancelled_count" style="text-align: center">
      <a v-if="second.cancelled_count" :href="getLeadLink(second, 'cancelled', first)" target="_blank"
      >@{{ second.cancelled_count }}</a>
      <span v-else v-mute-zero>@{{ second.cancelled_count }}</span>
    </td>
    <td v-show="conversion.trashed_count" data-column="trashed_count" style="text-align: center">
      <a v-if="second.trashed_count" :href="getLeadLink(second, 'trashed', first)" target="_blank"
      >@{{ second.trashed_count }}</a>
      <span v-else v-mute-zero>@{{ second.trashed_count }}</span>
    </td>

    {{-- Finance --}}
    <td v-show="finance.total_payout" :data-column="getDataColumnTitle('total_payout')">
      <money :sum="second.total_payout" v-mute-zero="second.total_payout"></money>
    </td>
    <td v-show="finance.leads_payout" :data-column="getDataColumnTitle('leads_payout')">
      <money :sum="second.leads_payout" v-mute-zero="second.leads_payout"></money>
    </td>
    <td v-show="finance.onhold_payout" :data-column="getDataColumnTitle('onhold_payout')">
      <money :sum="second.onhold_payout" v-mute-zero="second.onhold_payout"></money>
    </td>
    <td v-show="finance.oncancel_payout" :data-column="getDataColumnTitle('oncancel_payout')">
      <money :sum="second.oncancel_payout" v-mute-zero="second.oncancel_payout"></money>
    </td>
    <td v-show="finance.ontrash_payout" :data-column="getDataColumnTitle('ontrash_payout')">
      <money :sum="second.ontrash_payout" v-mute-zero="second.ontrash_payout"></money>
    </td>
  </tr>

  <template v-if="second.children.length && second.show_children">
    @include('publisher::statistics.parts.group_third_level')
  </template>
</template>