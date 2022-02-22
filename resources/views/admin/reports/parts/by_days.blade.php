<script type="text/x-template" id="by_days_tpl">
  <div>
    <vue-datatable v-on:sorting-updated="onDatatableChangeSort" ref="datatable"></vue-datatable>

    <table class="table table-bordered table-highlight stat_table" id="by_days_table">
      <thead>
      <tr class="stat_table_head_top_tr">
        <th style="width: 75px;"></th>

        <th colspan="2" class="stat_table__title">
        <span class="stat_table_title_wrap">
          <span class="stat_table_top_title">{{ trans('statistics.th_coefficients') }}</span>
          <span class="table_th_border_circle"></span>
        </span>
        </th>

        <th colspan="5" class="stat_table__title">
        <span class="stat_table_title_wrap">
          <span class="stat_table_top_title">{{ trans('statistics.th_conversions') }}</span>
          <span class="table_th_border_circle"></span>
        </span>
        </th>

        <th colspan="3" class="stat_table__title">
        <span class="stat_table_title_wrap">
          <span class="stat_table_top_title">{{ trans('messages.finance') }}, <span class="rubl">о</span></span>
          <span class="table_th_border_circle"></span>
        </span>
        </th>

        <th colspan="3" class="stat_table__title">
        <span class="stat_table_title_wrap">
          <span class="stat_table_top_title">{{ trans('messages.finance') }}, $</span>
          <span class="table_th_border_circle"></span>
        </span>
        </th>

        <th colspan="3" class="stat_table__title">
        <span class="stat_table_title_wrap">
          <span class="stat_table_top_title">{{ trans('messages.finance') }}, €</span>
          <span class="table_th_border_circle"></span>
        </span>
        </th>
      </tr>
      <tr>
        <th data-column="title"></th>

        <th class="stat_approve_th" data-column="real_approve" style="width: 35px;">
          <i class="action_icon action_icon_operator_green" data-toggle="tooltip"
             title="{{ trans('statistics.th_real_approve') }}"></i>
        </th>

        <th class="stat_approve_th" data-column="approve" style="width: 35px;">
          <i class="action_icon action_icon_operator_grey" data-toggle="tooltip"
             title="{{ trans('statistics.th_approve') }}"></i>
        </th>

        <th data-column="total_count" style="width: 80px;">
          <i class="action_icon action_icon_total" data-toggle="tooltip"
             title="{{ trans('statistics.th_total_leads') }}"></i>
        </th>

        <th data-column="approved_count" style="width: 80px;">
          <i class="action_icon action_icon_check" data-toggle="tooltip"
             title="{{ trans('statistics.th_approved_count') }}"></i>
        </th>

        <th data-column="held_count" style="width: 35px;">
          <i class="action_icon action_icon_wait" data-toggle="tooltip"
             title="{{ trans('statistics.th_held_count') }}"></i>
        </th>

        <th data-column="cancelled_count" style="width: 35px;">
          <i class="action_icon action_icon_cancell" data-toggle="tooltip"
             title="{{ trans('statistics.th_cancelled_count') }}"></i>
        </th>

        <th data-column="trashed_count" style="width: 35px;">
          <i class="action_icon action_icon_trash" data-toggle="tooltip"
             title="{{ trans('statistics.th_trashed_count') }}"></i>
        </th>

        <th data-column="rub_held_payout" style="width: 75px">
          <i class="action_icon action_icon_wait" data-toggle="tooltip"
             title="{{ trans('statistics.th_onhold_payout') }}"></i>
        </th>

        <th data-column="rub_approved_payout" style="width: 75px">
          <i class="action_icon action_icon_check" data-toggle="tooltip"
             title="{{ trans('statistics.th_leads_payout') }}"></i>
        </th>
        <th data-column="rub_profit" style="width: 75px">
          <i aria-hidden="true" class="fa fa-arrow-down green_t" data-toggle="tooltip"
             title="{{ trans('statistics.th_profit') }}"></i>
        </th>
        <th data-column="usd_held_payout" style="width: 75px">
          <i class="action_icon action_icon_wait" data-toggle="tooltip"
             title="{{ trans('statistics.th_onhold_payout') }}"></i>
        </th>

        <th data-column="usd_approved_payout" style="width: 75px">
          <i class="action_icon action_icon_check" data-toggle="tooltip"
             title="{{ trans('statistics.th_leads_payout') }}"></i>
        </th>
        <th data-column="usd_profit" style="width: 75px">
          <i aria-hidden="true" class="fa fa-arrow-down green_t" data-toggle="tooltip"
             title="{{ trans('statistics.th_profit') }}"></i>
        </th>
        <th data-column="eur_held_payout" style="width: 75px">
          <i class="action_icon action_icon_wait" data-toggle="tooltip"
             title="{{ trans('statistics.th_onhold_payout') }}"></i>
        </th>

        <th data-column="eur_approved_payout" style="width: 75px">
          <i class="action_icon action_icon_check" data-toggle="tooltip"
             title="{{ trans('statistics.th_leads_payout') }}"></i>
        <th data-column="eur_profit" style="width: 75px">
          <i aria-hidden="true" class="fa fa-arrow-down green_t" data-toggle="tooltip"
             title="{{ trans('statistics.th_profit') }}"></i>
        </th>
      </tr>
      </thead>
      <tbody v-show="rows.length">
      <template v-for="(first, first_index) in rows">
        <tr :key="'1' + first_index + first.id" class="first_level_tr">
          <td>
            <div @click="getSecondLevelReport(first, first_index, $event)"
                 :class="['nowrap action_icon_arrow pointer', first.show_children ? 'open' : '']"
                 v-html="">@{{ first.title }}
            </div>
          </td>
          <td data-column="real_approve">
            <span v-mute-zero="first.real_approve">@{{ first.real_approve | number_format }}%</span>
          </td>
          <td data-column="approve">
            <span v-mute-zero="first.approve">@{{ first.approve | number_format }}%</span>
          </td>
          <td data-column="total_count" class="nowrap">
            <div v-if="first.total_count">
              <a :href="getLeadLink(first)" class="pull-left" target="_blank">@{{ first.total_count }}</a>
              <difference v-if="level_1_group_by === 'created_at' || level_1_group_by === 'processed_at'"
                          :difference="first.total_difference"
                          class="difference_number"
              ></difference>
            </div>
            <div v-else>
              <span v-mute-zero class="pull-left">@{{ first.total_count }}</span>
              <difference v-if="level_1_group_by === 'created_at' || level_1_group_by === 'processed_at'"
                          :difference="first.total_difference"
                          class="difference_number"
              ></difference>
            </div>
          </td>
          <td data-column="approved_count" class="nowrap">
            <template v-if="first.approved_count">
              <a :href="getLeadLink(first, 'approved')" class="pull-left" target="_blank"
              >@{{ first.approved_count }}</a>
              <difference v-if="level_1_group_by === 'created_at' || level_1_group_by === 'processed_at'"
                          :difference="first.approved_difference"
                          class="difference_number"
              ></difference>
            </template>
            <template v-else>
              <span v-mute-zero class="pull-left">@{{ first.approved_count }}</span>
              <difference v-if="level_1_group_by === 'created_at' || level_1_group_by === 'processed_at'"
                          :difference="first.approved_difference"
                          class="difference_number"
              ></difference>
            </template>
          </td>
          <td data-column="held_count" style="text-align: center">
            <a v-if="first.held_count" target="_blank" :href="getLeadLink(first, 'new')"
            >@{{ first.held_count }}</a>
            <span v-else v-mute-zero>@{{ first.held_count }}</span>
          </td>
          <td data-column="cancelled_count" style="text-align: center">
            <a v-if="first.cancelled_count" :href="getLeadLink(first, 'cancelled')" target="_blank"
            >@{{ first.cancelled_count }}</a>
            <span v-else v-mute-zero>@{{ first.cancelled_count }}</span>
          </td>
          <td data-column="trashed_count" style="text-align: center">
            <a v-if="first.trashed_count" :href="getLeadLink(first, 'trashed')" target="_blank"
            >@{{ first.trashed_count }}</a>
            <span v-else v-mute-zero>@{{ first.trashed_count }}</span>
          </td>
          <td data-column="rub_held_payout">
            <money :sum="first.rub_held_payout" v-mute-zero="first.rub_held_payout"></money>
          </td>
          <td data-column="rub_approved_payout">
            <money :sum="first.rub_approved_payout" v-mute-zero="first.rub_approved_payout"></money>
          </td>
          <td data-column="rub_profit">
            <money :sum="first.rub_profit" v-mute-zero="first.rub_profit"></money>
          </td>
          <td data-column="usd_held_payout">
            <money :sum="first.usd_held_payout" v-mute-zero="first.usd_held_payout"></money>
          </td>
          <td data-column="usd_approved_payout">
            <money :sum="first.usd_approved_payout" v-mute-zero="first.usd_approved_payout"></money>
          </td>
          <td data-column="usd_profit">
            <money :sum="first.usd_profit" v-mute-zero="first.usd_profit"></money>
          </td>
          <td data-column="eur_held_payout">
            <money :sum="first.eur_held_payout" v-mute-zero="first.eur_held_payout"></money>
          </td>
          <td data-column="eur_approved_payout">
            <money :sum="first.eur_approved_payout" v-mute-zero="first.eur_approved_payout"></money>
          </td>
          <td data-column="eur_profit">
            <money :sum="first.eur_profit" v-mute-zero="first.eur_profit"></money>
          </td>
        </tr>

        @include('admin::reports.parts.by_days_second_level')

      </template>
      </tbody>
      <tfoot v-if="rows.length" class="total-footer">
      <tr>
        <td><b>{{ trans('statistics.total') }}</b></td>
        <td data-column="real_approve">
          <span v-mute-zero="total.real_approve">@{{ total.real_approve | number_format }}%</span>
        </td>
        <td data-column="approve">
          <span v-mute-zero="total.approve">@{{ total.approve | number_format }}%</span>
        </td>
        <td data-column="total_count" style="text-align: left">
          <a v-if="total.total_count" :href="getLeadLink(null)" target="_blank">@{{ total.total_count }}</a>
          <span v-else v-mute-zero>@{{ total.total_count }}</span>
        </td>
        <td data-column="approved_count" style="text-align: left">
          <a v-if="total.approved_count" :href="getLeadLink(null, 'approved')" target="_blank"
          >@{{ total.approved_count }}</a>
          <span v-else v-mute-zero>@{{ total.approved_count }}</span>
        </td>
        <td data-column="held_count" style="text-align: center">
          <a v-if="total.held_count" :href="getLeadLink(null, 'new')" target="_blank">@{{ total.held_count }}</a>
          <span v-else v-mute-zero>@{{ total.held_count }}</span>
        </td>
        <td data-column="cancelled_count" style="text-align: center">
          <a v-if="total.cancelled_count" :href="getLeadLink(null, 'cancelled')" target="_blank"
          >@{{ total.cancelled_count }}</a><span v-else v-mute-zero>@{{ total.cancelled_count }}</span>
        </td>
        <td data-column="trashed_count" style="text-align: center">
          <a v-if="total.trashed_count" :href="getLeadLink(null, 'trashed')" target="_blank">@{{ total.trashed_count
            }}</a>
          <span v-else v-mute-zero>@{{ total.trashed_count }}</span>
        </td>
        <td data-column="rub_held_payout">
          <money :sum="total.rub_held_payout" v-mute-zero="total.rub_held_payout"></money>
        </td>
        <td data-column="rub_approved_payout">
          <money :sum="total.rub_approved_payout" v-mute-zero="total.rub_approved_payout"></money>
        </td>
        <td data-column="rub_profit">
          <money :sum="total.rub_profit" v-mute-zero="total.rub_profit"></money>
        </td>
        <td data-column="usd_held_payout">
          <money :sum="total.usd_held_payout" v-mute-zero="total.usd_held_payout"></money>
        </td>
        <td data-column="usd_approved_payout">
          <money :sum="total.usd_approved_payout" v-mute-zero="total.usd_approved_payout"></money>
        </td>
        <td data-column="usd_profit">
          <money :sum="total.usd_profit" v-mute-zero="total.usd_profit"></money>
        </td>
        <td data-column="eur_held_payout">
          <money :sum="total.eur_held_payout" v-mute-zero="total.eur_held_payout"></money>
        </td>
        <td data-column="eur_approved_payout">
          <money :sum="total.eur_approved_payout" v-mute-zero="total.eur_approved_payout"></money>
        </td>
        <td data-column="eur_profit">
          <money :sum="total.eur_profit" v-mute-zero="total.eur_profit"></money>
        </td>
      </tr>
      </tfoot>
    </table>
    <empty-list-message v-show="!rows.length" message="{{ trans('statistics.stat_is_empty') }}"
    ></empty-list-message>
  </div>
</script>
