<tr v-for="fourth in third.children" :key="'4' + first.id + second.id + third.id + fourth.id"
    class="tr_stat_inside tr_stat_inside_level_fourth fourth_level_tr">
  <td>@{{ getTitle(level_4_group_by, fourth.title) }}</td>

  {{-- Traffic --}}
  <td v-show="traffic.hits" data-column="hits">
    <span v-mute-zero="fourth.hits">@{{ fourth.hits }}</span>
  </td>
  <td v-show="traffic.unique_count" data-column="flow_hosts">
    <span v-mute-zero="fourth.flow_hosts">@{{ fourth.flow_hosts }}</span>
  </td>
  <td v-show="traffic.bot_count" data-column="bot_count">
    <span v-mute-zero="fourth.bot_count">@{{ fourth.bot_count }}</span>
  </td>
  <td v-show="traffic.safepage_count" data-column="safepage_count">
    <span v-mute-zero="fourth.safepage_count">@{{ fourth.safepage_count }}</span>
  </td>
  <td v-show="traffic.traffback_count" data-column="traffback_count">
    <span v-mute-zero="fourth.traffback_count">@{{ fourth.traffback_count }}</span>
  </td>

  {{-- Сoefficients --}}
  <td v-show="coefficient.cr" data-column="cr">
    <span v-mute-zero="fourth.cr">@{{ fourth.cr | number_format }}%</span>
  </td>
  <td v-show="coefficient.cr_unique" data-column="cr_unique">
    <span v-mute-zero="fourth.cr_unique">@{{ fourth.cr_unique | number_format }}%</span>
  </td>
  <td v-show="coefficient.epc" data-column="epc">
    <span v-mute-zero="fourth.epc">@{{ fourth.epc | number_format }}</span>
  </td>
  <td v-show="coefficient.epc_unique" data-column="epc_unique">
    <span v-mute-zero="fourth.epc_unique">@{{ fourth.epc_unique | number_format }}</span>
  </td>
  <td v-show="coefficient.real_approve" data-column="real_approve">
    <span v-mute-zero="fourth.real_approve">@{{ fourth.real_approve | number_format }}%</span>
  </td>
  <td v-show="coefficient.expected_approve" data-column="expected_approve">
    <span v-mute-zero="fourth.expected_approve">@{{ fourth.expected_approve | number_format }}%</span>
  </td>
  <td v-show="coefficient.approve" data-column="approve">
    <span v-mute-zero="fourth.approve">@{{ fourth.approve | number_format }}%</span>
  </td>

  {{-- Сonversions --}}
  <td v-show="conversion.total_leads" data-column="total_count" class="nowrap">
    <div v-if="fourth.total_count">
      <a :href="getLeadLink(fourth, null, first, second, third)" class="pull-left" target="_blank">@{{
        fourth.total_count }}</a>
      <difference v-if="level_4_group_by === 'datetime'"
                  :difference="fourth.total_difference"
                  class="difference_number"
      ></difference>
    </div>
    <div v-else>
      <span v-mute-zero class="pull-left">@{{ fourth.total_count }}</span>
      <difference v-if="level_4_group_by === 'datetime'"
                  :difference="fourth.total_difference"
                  class="difference_number"
      ></difference>
    </div>
  </td>
  <td v-show="conversion.approved_count" data-column="approved_count" class="nowrap">
    <div v-if="fourth.approved_count">
      <a :href="getLeadLink(fourth, 'approved', first, second, third)" class="pull-left" target="_blank"
      >@{{ fourth.approved_count }}</a>
      <difference v-if="level_4_group_by === 'datetime'"
                  :difference="fourth.approved_difference"
                  class="difference_number"
      ></difference>
    </div>
    <div v-else>
      <span v-mute-zero class="pull-left">@{{ fourth.approved_count }}</span>
      <difference v-if="level_4_group_by === 'datetime'"
                  :difference="fourth.approved_difference"
                  class="difference_number"
      ></difference>
    </div>
  </td>
  <td v-show="conversion.held_count" data-column="held_count" style="text-align: center">
    <a v-if="fourth.held_count" :href="getLeadLink(fourth, 'new', first, second, third)" target="_blank"
    >@{{ fourth.held_count }}</a>
    <span v-else v-mute-zero>@{{ fourth.held_count }}</span>
  </td>
  <td v-show="conversion.cancelled_count" data-column="cancelled_count" style="text-align: center">
    <a v-if="fourth.cancelled_count" :href="getLeadLink(fourth, 'cancelled', first, second, third)" target="_blank"
    >@{{ fourth.cancelled_count }}</a>
    <span v-else v-mute-zero>@{{ fourth.cancelled_count }}</span>
  </td>
  <td v-show="conversion.trashed_count" data-column="trashed_count" style="text-align: center">
    <a v-if="fourth.trashed_count" :href="getLeadLink(fourth, 'trashed', first, second, third)" target="_blank"
    >@{{ fourth.trashed_count }}</a>
    <span v-else v-mute-zero>@{{ fourth.trashed_count }}</span>
  </td>

  {{-- Finance --}}
  <td v-show="finance.total_payout" :data-column="getDataColumnTitle('total_payout')">
    <money :sum="fourth.total_payout" v-mute-zero="fourth.total_payout"></money>
  </td>
  <td v-show="finance.leads_payout" :data-column="getDataColumnTitle('leads_payout')">
    <money :sum="fourth.leads_payout" v-mute-zero="fourth.leads_payout"></money>
  </td>
  <td v-show="finance.onhold_payout" :data-column="getDataColumnTitle('onhold_payout')">
    <money :sum="fourth.onhold_payout" v-mute-zero="fourth.onhold_payout"></money>
  </td>
  <td v-show="finance.oncancel_payout" :data-column="getDataColumnTitle('oncancel_payout')">
    <money :sum="fourth.oncancel_payout" v-mute-zero="fourth.oncancel_payout"></money>
  </td>
  <td v-show="finance.ontrash_payout" :data-column="getDataColumnTitle('ontrash_payout')">
    <money :sum="fourth.ontrash_payout" v-mute-zero="fourth.ontrash_payout"></money>
  </td>
</tr>