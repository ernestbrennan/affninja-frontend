<table class="table table-bordered table-highlight stat_table">
  <thead>
  <tr class="stat_table_head_top_tr">
    <th style="width: 75px;"></th>

    <th v-show="traffic.hits || traffic.unique_count || traffic.bot_count
             || traffic.safepage_count || traffic.traffback_count"
        :colspan="traffic.hits + traffic.unique_count + traffic.bot_count
             + traffic.safepage_count + traffic.traffback_count"
        class="stat_table__title">
      <span class="stat_table_title_wrap">
        <span class="stat_table_top_title">{{ trans('statistics.th_traffic') }}</span>
        <span class="table_th_border_circle"></span>
      </span>
    </th>

    <th v-show="coefficient.cr || coefficient.cr_unique || coefficient.epc || coefficient.epc_unique
             || coefficient.real_approve || coefficient.expected_approve || coefficient.approve"
        :colspan="coefficient.cr + coefficient.cr_unique + coefficient.epc + coefficient.epc_unique
             + coefficient.real_approve + coefficient.expected_approve + coefficient.approve"
        class="stat_table__title">
      <span class="stat_table_title_wrap">
        <span class="stat_table_top_title">{{ trans('statistics.th_coefficients') }}</span>
        <span class="table_th_border_circle"></span>
      </span>
    </th>

    <th v-show="conversion.total_leads || conversion.approved_count || conversion.held_count
             || conversion.cancelled_count || conversion.trashed_count"
        :colspan="conversion.total_leads + conversion.approved_count + conversion.held_count
             + conversion.cancelled_count + conversion.trashed_count"
        class="stat_table__title">
      <span class="stat_table_title_wrap">
        <span class="stat_table_top_title">{{ trans('statistics.th_conversions') }}</span>
        <span class="table_th_border_circle"></span>
      </span>
    </th>

    <th v-show="finance.total_payout || finance.onhold_payout || finance.leads_payout
             || finance.oncancel_payout || finance.ontrash_payout"
        :colspan="finance.total_payout + finance.onhold_payout + finance.leads_payout
             + finance.oncancel_payout + finance.ontrash_payout"
        class="stat_table__title">
      <span class="stat_table_title_wrap">
        <span class="stat_table_top_title">
          {{ trans('messages.finance') }}, <currency-sign-by-id :currency_id="currency_id"></currency-sign-by-id>
        </span>
        <span class="table_th_border_circle"></span>
      </span>
    </th>
  </tr>
  <tr>
    <th data-column="title"></th>

    {{--Traffic--}}
    <th v-show="traffic.hits" data-column="hits" style="width: 35px;">
      <span data-toggle="tooltip" title="{{ trans('statistics.th_hits') }}">
        {{ trans('statistics.th_hits') }}
      </span>
    </th>

    <th v-show="traffic.unique_count" data-column="flow_hosts" style="width: 35px;">
      <span data-toggle="tooltip" title="{{ trans('statistics.th_unique_count') }}">
        {{ trans('statistics.th_unique_count') }}
      </span>
    </th>

    <th v-show="traffic.bot_count" data-column="bot_count" style="width: 35px;">
      <span data-toggle="tooltip" title="{{ trans('statistics.th_bot_count') }}">
        {{ trans('statistics.th_bot_count') }}
      </span>
    </th>

    <th v-show="traffic.safepage_count" data-column="safepage_count" style="width: 35px;">
      <span data-toggle="tooltip" title="{{ trans('statistics.th_safepage_count') }}">
        {{ trans('statistics.th_safepage_count') }}
      </span>
    </th>

    <th v-show="traffic.traffback_count" data-column="traffback_count" style="width: 35px;">
      <span data-toggle="tooltip" title="{{ trans('statistics.th_traffback_count') }}">
        {{ trans('statistics.th_traffback_count') }}
      </span>
    </th>

    {{--Сoefficients--}}
    <th v-show="coefficient.cr" data-column="cr">
      <span data-toggle="tooltip" title="{{ trans('statistics.th_cr_title') }}">
        {{ trans('statistics.th_cr') }}
      </span>
    </th>

    <th v-show="coefficient.cr_unique" data-column="cr_unique">
      <span data-toggle="tooltip" title="{{ trans('statistics.th_cr_unique_title') }}">
        {{ trans('statistics.th_cr_unique') }}
      </span>
    </th>

    <th v-show="coefficient.epc" data-column="epc">
      <span data-toggle="tooltip" title="{{ trans('statistics.th_epc_title') }}">
        {{ trans('statistics.th_epc') }}
      </span>
    </th>

    <th v-show="coefficient.epc_unique" data-column="epc_unique">
      <span data-toggle="tooltip" title="{{ trans('statistics.th_epc_unique_title') }}">
        {{ trans('statistics.th_epc_unique') }}
      </span>
    </th>

    <th v-show="coefficient.real_approve" class="stat_approve_th" data-column="real_approve" style="width: 35px;">
      <i class="action_icon action_icon_operator_green" data-toggle="tooltip"
         title="{{ trans('statistics.th_real_approve') }}"></i>
    </th>

    <th v-show="coefficient.expected_approve" class="stat_approve_th" data-column="expected_approve" style="width: 35px;">
      <i class="action_icon action_icon_operator_orange" data-toggle="tooltip"
         title="{{ trans('statistics.th_expected_approve') }}"></i>
    </th>

    <th v-show="coefficient.approve" class="stat_approve_th" data-column="approve" style="width: 35px;">
      <i class="action_icon action_icon_operator_grey" data-toggle="tooltip"
         title="{{ trans('statistics.th_approve') }}"></i>
    </th>

    {{--Сonversions--}}
    <th v-show="conversion.total_leads" data-column="total_count" style="width: 80px;">
      <i class="action_icon action_icon_total" data-toggle="tooltip"
         title="{{ trans('statistics.th_total_leads') }}"></i>
    </th>

    <th v-show="conversion.approved_count" data-column="approved_count" style="width: 80px;">
      <i class="action_icon action_icon_check" data-toggle="tooltip"
         title="{{ trans('statistics.th_approved_count') }}"></i>
    </th>

    <th v-show="conversion.held_count" data-column="held_count" style="width: 35px;">
      <i class="action_icon action_icon_wait" data-toggle="tooltip"
         title="{{ trans('statistics.th_held_count') }}"></i>
    </th>

    <th v-show="conversion.cancelled_count" data-column="cancelled_count" style="width: 35px;">
      <i class="action_icon action_icon_cancell" data-toggle="tooltip"
         title="{{ trans('statistics.th_cancelled_count') }}"></i>
    </th>

    <th v-show="conversion.trashed_count" data-column="trashed_count" style="width: 35px;">
      <i class="action_icon action_icon_trash" data-toggle="tooltip"
         title="{{ trans('statistics.th_trashed_count') }}"></i>
    </th>

    {{--Finance --}}
    <th v-show="finance.total_payout" :data-column="getDataColumnTitle('total_payout')" style="width: 75px">
      <i class="action_icon action_icon_total" data-toggle="tooltip"
         title="{{ trans('statistics.th_total_payout') }}"></i>
    </th>

    <th v-show="finance.leads_payout" :data-column="getDataColumnTitle('leads_payout')" style="width: 75px">
      <i class="action_icon action_icon_check" data-toggle="tooltip"
         title="{{ trans('statistics.th_leads_payout') }}"></i>
    </th>

    <th v-show="finance.onhold_payout" :data-column="getDataColumnTitle('onhold_payout')" style="width: 75px">
      <i class="action_icon action_icon_wait" data-toggle="tooltip"
         title="{{ trans('statistics.th_onhold_payout') }}"></i>
    </th>

    <th v-show="finance.oncancel_payout" :data-column="getDataColumnTitle('oncancel_payout')" style="width: 75px">
      <i class="action_icon action_icon_cancell" data-toggle="tooltip"
         title="{{ trans('statistics.th_oncancel_payout') }}"></i>
    </th>

    <th v-show="finance.ontrash_payout" :data-column="getDataColumnTitle('ontrash_payout')" style="width: 75px">
      <i class="action_icon action_icon_trash" data-toggle="tooltip"
         title="{{ trans('statistics.th_ontrash_payout') }}"></i>
    </th>
  </tr>
  </thead>
  <tbody v-show="rows.length">
  <template v-for="(first, first_index) in rows">
    <tr :key="'1' + first_index + first.id" class="first_level_tr">
      {{--First column--}}
      <td>
        <div @click="getSecondLevelReport(first, first_index, $event)"
             :class="['nowrap action_icon_arrow pointer', first.show_children ? 'open' : '']">
          @{{ getTitle(level_1_group_by, first.title) }}
        </div>
      </td>

      {{--Traffic--}}
      <td v-show="traffic.hits" data-column="hits">
        <span v-mute-zero="first.hits">@{{ first.hits }}</span>
      </td>
      <td v-show="traffic.unique_count" data-column="flow_hosts">
        <span v-mute-zero="first.flow_hosts">@{{ first.flow_hosts }}</span>
      </td>
      <td v-show="traffic.bot_count" data-column="bot_count">
        <span v-mute-zero="first.bot_count">@{{ first.bot_count }}</span>
      </td>
      <td v-show="traffic.safepage_count" data-column="safepage_count">
        <span v-mute-zero="first.safepage_count">@{{ first.safepage_count }}</span>
      </td>
      <td v-show="traffic.traffback_count" data-column="traffback_count">
        <span v-mute-zero="first.traffback_count">@{{ first.traffback_count }}</span>
      </td>

      {{--Coefficients--}}
      <td v-show="coefficient.cr" data-column="cr">
        <span v-mute-zero="first.cr">@{{ first.cr | number_format }}%</span>
      </td>
      <td v-show="coefficient.cr_unique" data-column="cr_unique">
        <span v-mute-zero="first.cr_unique">@{{ first.cr_unique | number_format }}%</span>
      </td>
      <td v-show="coefficient.epc" data-column="epc">
        <span v-mute-zero="first.epc">@{{ first.epc | number_format }}</span>
      </td>
      <td v-show="coefficient.epc_unique" data-column="epc_unique">
        <span v-mute-zero="first.epc_unique">@{{ first.epc_unique | number_format }}</span>
      </td>
      <td v-show="coefficient.real_approve" data-column="real_approve">
        <span v-mute-zero="first.real_approve">@{{ first.real_approve | number_format }}%</span>
      </td>
      <td v-show="coefficient.expected_approve" data-column="expected_approve">
        <span v-mute-zero="first.expected_approve">@{{ first.expected_approve | number_format }}%</span>
      </td>
      <td v-show="coefficient.approve" data-column="approve">
        <span v-mute-zero="first.approve">@{{ first.approve | number_format }}%</span>
      </td>

      {{--Сonversions--}}
      <td v-show="conversion.total_leads" data-column="total_count" class="nowrap">
        <div v-if="first.total_count">
          <a :href="getLeadLink(first)" class="pull-left" target="_blank">@{{ first.total_count }}</a>
          <difference v-if="level_1_group_by === 'datetime'"
                      :difference="first.total_difference"
                      class="difference_number"
          ></difference>
        </div>
        <div v-else>
          <span v-mute-zero class="pull-left">@{{ first.total_count }}</span>
          <difference v-if="level_1_group_by === 'datetime'"
                      :difference="first.total_difference"
                      class="difference_number"
          ></difference>
        </div>
      </td>
      <td v-show="conversion.approved_count" data-column="approved_count" class="nowrap">
        <template v-if="first.approved_count">
          <a :href="getLeadLink(first, 'approved')" class="pull-left" target="_blank"
          >@{{ first.approved_count }}</a>
          <difference v-if="level_1_group_by === 'datetime'"
                      :difference="first.approved_difference"
                      class="difference_number"
          ></difference>
        </template>
        <template v-else>
          <span v-mute-zero class="pull-left">@{{ first.approved_count }}</span>
          <difference v-if="level_1_group_by === 'datetime'"
                      :difference="first.approved_difference"
                      class="difference_number"
          ></difference>
        </template>
      </td>
      <td v-show="conversion.held_count" data-column="held_count" style="text-align: center">
        <a v-if="first.held_count" target="_blank" :href="getLeadLink(first, 'new')"
        >@{{ first.held_count }}</a>
        <span v-else v-mute-zero>@{{ first.held_count }}</span>
      </td>
      <td v-show="conversion.cancelled_count" data-column="cancelled_count" style="text-align: center">
        <a v-if="first.cancelled_count" :href="getLeadLink(first, 'cancelled')" target="_blank"
        >@{{ first.cancelled_count }}</a>
        <span v-else v-mute-zero>@{{ first.cancelled_count }}</span>
      </td>
      <td v-show="conversion.trashed_count" data-column="trashed_count" style="text-align: center">
        <a v-if="first.trashed_count" :href="getLeadLink(first, 'trashed')" target="_blank"
        >@{{ first.trashed_count }}</a>
        <span v-else v-mute-zero>@{{ first.trashed_count }}</span>
      </td>

      {{-- Finance --}}
      <td v-show="finance.total_payout" :data-column="getDataColumnTitle('total_payout')">
        <money :sum="first.total_payout" v-mute-zero="first.total_payout"></money>
      </td>
      <td v-show="finance.leads_payout" :data-column="getDataColumnTitle('leads_payout')">
        <money :sum="first.leads_payout" v-mute-zero="first.leads_payout"></money>
      </td>
      <td v-show="finance.onhold_payout" :data-column="getDataColumnTitle('onhold_payout')">
        <money :sum="first.onhold_payout" v-mute-zero="first.onhold_payout"></money>
      </td>
      <td v-show="finance.oncancel_payout" :data-column="getDataColumnTitle('oncancel_payout')">
        <money :sum="first.oncancel_payout" v-mute-zero="first.oncancel_payout"></money>
      </td>
      <td v-show="finance.ontrash_payout" :data-column="getDataColumnTitle('ontrash_payout')">
        <money :sum="first.ontrash_payout" v-mute-zero="first.ontrash_payout"></money>
      </td>
    </tr>

    <template v-if="first.children.length && first.show_children">
      @include('publisher::statistics.parts.group_second_level')
    </template>

  </template>
  </tbody>
  <tfoot v-if="rows.length" class="total-footer">
  <tr>
    <td><b>{{ trans('statistics.total') }}</b></td>

    {{--Traffic--}}
    <td v-show="traffic.hits" data-column="hits">
      <span v-mute-zero="total.hits">@{{ total.hits }}</span>
    </td>
    <td v-show="traffic.unique_count" data-column="flow_hosts">
      <span v-mute-zero="total.flow_hosts">@{{ total.flow_hosts }}</span>
    </td>
    <td v-show="traffic.bot_count" data-column="bot_count">
      <span v-mute-zero="total.bot_count">@{{ total.bot_count }}</span>
    </td>
    <td v-show="traffic.safepage_count" data-column="safepage_count">
      <span v-mute-zero="total.safepage_count">@{{ total.safepage_count }}</span>
    </td>
    <td v-show="traffic.traffback_count" data-column="traffback_count">
      <span v-mute-zero="total.traffback_count">@{{ total.traffback_count }}</span>
    </td>

    {{--Coefficients--}}
    <td v-show="coefficient.cr" data-column="cr">
      <span v-mute-zero="total.cr">@{{ total.cr | number_format }}%</span>
    </td>
    <td v-show="coefficient.cr_unique" data-column="cr_unique">
      <span v-mute-zero="total.cr_unique">@{{ total.cr_unique | number_format }}%</span>
    </td>
    <td v-show="coefficient.epc" data-column="epc">
      <span v-mute-zero="total.epc">@{{ total.epc | number_format }}</span>
    </td>
    <td v-show="coefficient.epc_unique" data-column="epc_unique">
      <span v-mute-zero="total.epc_unique">@{{ total.epc_unique | number_format }}</span>
    </td>
    <td v-show="coefficient.real_approve" data-column="real_approve">
      <span v-mute-zero="total.real_approve">@{{ total.real_approve | number_format }}%</span>
    </td>
    <td v-show="coefficient.expected_approve" data-column="expected_approve">
      <span v-mute-zero="total.expected_approve">@{{ total.expected_approve | number_format }}%</span>
    </td>
    <td v-show="coefficient.approve" data-column="approve">
      <span v-mute-zero="total.approve">@{{ total.approve | number_format }}%</span>
    </td>

    {{--Сonversions--}}
    <td v-show="conversion.total_leads" data-column="total_count" style="text-align: left">
      <a v-if="total.total_count" :href="getLeadLink(null)" target="_blank">@{{ total.total_count }}</a>
      <span v-else v-mute-zero>@{{ total.total_count }}</span>
    </td>
    <td v-show="conversion.approved_count" data-column="approved_count" style="text-align: left">
      <a v-if="total.approved_count" :href="getLeadLink(null, 'approved')" target="_blank"
      >@{{ total.approved_count }}</a>
      <span v-else v-mute-zero>@{{ total.approved_count }}</span>
    </td>
    <td v-show="conversion.held_count" data-column="held_count" style="text-align: center">
      <a v-if="total.held_count" :href="getLeadLink(null, 'new')" target="_blank">@{{ total.held_count }}</a>
      <span v-else v-mute-zero>@{{ total.held_count }}</span>
    </td>
    <td v-show="conversion.cancelled_count" data-column="cancelled_count" style="text-align: center">
      <a v-if="total.cancelled_count" :href="getLeadLink(null, 'cancelled')" target="_blank"
      >@{{ total.cancelled_count }}</a><span v-else v-mute-zero>@{{ total.cancelled_count }}</span>
    </td>
    <td v-show="conversion.trashed_count" data-column="trashed_count" style="text-align: center">
      <a v-if="total.trashed_count" :href="getLeadLink(null, 'trashed')" target="_blank">@{{
        total.trashed_count
        }}</a>
      <span v-else v-mute-zero>@{{ total.trashed_count }}</span>
    </td>

    {{-- Finance --}}
    <td v-show="finance.total_payout" :data-column="getDataColumnTitle('total_payout')">
      <money :sum="total.total_payout" v-mute-zero="total.total_payout"></money>
    </td>
    <td v-show="finance.leads_payout" :data-column="getDataColumnTitle('leads_payout')">
      <money :sum="total.leads_payout" v-mute-zero="total.leads_payout"></money>
    </td>
    <td v-show="finance.onhold_payout" :data-column="getDataColumnTitle('onhold_payout')">
      <money :sum="total.onhold_payout" v-mute-zero="total.onhold_payout"></money>
    </td>
    <td v-show="finance.oncancel_payout" :data-column="getDataColumnTitle('oncancel_payout')">
      <money :sum="total.oncancel_payout" v-mute-zero="total.oncancel_payout"></money>
    </td>
    <td v-show="finance.ontrash_payout" :data-column="getDataColumnTitle('ontrash_payout')">
      <money :sum="total.ontrash_payout" v-mute-zero="total.ontrash_payout"></money>
    </td>
  </tr>
  </tfoot>
</table>

<empty-list-message v-show="!rows.length" message="{{ trans('statistics.stat_is_empty') }}"
></empty-list-message>
