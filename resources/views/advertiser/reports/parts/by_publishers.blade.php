<script type="text/x-template" id="by_publishers_tpl">
  <div>
    <table class="table table-striped stat_table table-bordered table-highlight dataTable" id="by_publishers_table">
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
        <th v-for="currency_id in existing_currencies" colspan="2" class="stat_table__title">
        <span class="stat_table_title_wrap">
          <span class="stat_table_top_title">{{ trans('messages.finance') }},
            <currency-sign-by-id :currency_id="currency_id"></currency-sign-by-id>
          </span>
          <span class="table_th_border_circle"></span>
        </span>
        </th>
      </tr>
      <tr>
        <th data-column="id">
        <span class="stat_table_title_wrap">
          <span class="stat_table_top_title">{{ trans('statistics.th_publisher') }}</span>
        </span>
        </th>

        <th class="stat_approve_th" data-column="real_approve">
          <i class="action_icon action_icon_operator_green" data-toggle="tooltip"
             title="{{ trans('statistics.th_real_approve') }}"></i>
        </th>

        <th class="stat_approve_th" data-column="approve">
          <i class="action_icon action_icon_operator_grey" data-toggle="tooltip"
             title="{{ trans('statistics.th_approve') }}"></i>
        </th>

        <th data-column="total_count">
          <i class="action_icon action_icon_total" data-toggle="tooltip"
             title="{{ trans('statistics.th_total_leads') }}"></i>
        </th>

        <th data-column="approved_count">
          <i class="action_icon action_icon_check" data-toggle="tooltip"
             title="{{ trans('statistics.th_approved_count') }}"></i>
        </th>

        <th data-column="held_count">
          <i class="action_icon action_icon_wait" data-toggle="tooltip"
             title="{{ trans('statistics.th_held_count') }}"></i>
        </th>

        <th data-column="cancelled_count">
          <i class="action_icon action_icon_cancell" data-toggle="tooltip"
             title="{{ trans('statistics.th_cancelled_count') }}"></i>
        </th>

        <th data-column="trashed_count">
          <i class="action_icon action_icon_trash" data-toggle="tooltip"
             title="{{ trans('statistics.th_trashed_count') }}"></i>
        </th>
        <template v-for="currency_id in existing_currencies">
          <th :data-column="findCurrencyCodeById(currency_id) + '_held_payout'">
            <i class="action_icon action_icon_wait" data-toggle="tooltip"
               title="{{ trans('statistics.th_onhold_payout') }}"></i>
          </th>

          <th :data-column="findCurrencyCodeById(currency_id) + '_approved_payout'">
            <i class="action_icon action_icon_check" data-toggle="tooltip"
               title="{{ trans('statistics.th_leads_payout') }}"></i>
          </th>
        </template>
      </tr>
      </thead>
      <tbody v-show="publishers.length">
      <tr v-for="publisher in publishers">
        <td>
          <div v-if="publisher.publisher_email">@{{ publisher.publisher_email }}</div>
          <div>@{{ publisher.id }}</div>
        </td>
        <td>
          <span :class="publisher.real_approve == 0 ? 'highlight-zero':''">@{{ publisher.real_approve | number_format }}%</span>
        </td>
        <td>
          <span :class="publisher.approve == 0 ? 'highlight-zero':''">@{{ publisher.approve | number_format }}%</span>
        </td>
        <td>
          <span class="highlight-zero" v-if="publisher.total_count === 0">@{{ publisher.total_count }}</span>
          <span v-else><a target="blank" :href="getLeadLink(publisher.id)">@{{ publisher.total_count }}</a></span>
        </td>

        <td>
          <span class="highlight-zero" v-if="publisher.approved_count === 0">@{{ publisher.approved_count }}</span>
          <span v-else>
          <a target="blank" :href="getLeadLink(publisher.id, 'approved')"
          >@{{ publisher.approved_count }}</a>
        </span>
        </td>
        <td>
          <span class="highlight-zero" v-if="publisher.held_count === 0">@{{ publisher.held_count }}</span>
          <span v-else>
          <a target="blank" :href="getLeadLink(publisher.id, 'new')"
          >@{{ publisher.held_count }}</a>
        </span>
        </td>

        <td>
          <span class="highlight-zero" v-if="publisher.cancelled_count === 0">@{{ publisher.cancelled_count }}</span>
          <span v-else>
          <a target="blank" :href="getLeadLink(publisher.id, 'cancelled')"
          >@{{ publisher.cancelled_count }}</a>
        </span>
        </td>
        <td>
          <span class="highlight-zero" v-if="publisher.trashed_count === 0">@{{ publisher.trashed_count }}</span>
          <span v-else>
          <a target="blank" :href="getLeadLink(publisher.id, 'trashed')"
          >@{{ publisher.trashed_count }}</a>
        </span>
        </td>
        <template v-for="currency_id in existing_currencies">
          <td>
            <span :class="publisher[findCurrencyCodeById(currency_id) + '_held_payout'] == 0 ? 'highlight-zero':''">
              <money :sum="publisher[findCurrencyCodeById(currency_id) + '_held_payout']"></money>
            </span>
          </td>
          <td>
            <span :class="publisher[findCurrencyCodeById(currency_id) + '_approved_payout'] == 0 ? 'highlight-zero':''">
              <money :sum="publisher[findCurrencyCodeById(currency_id) + '_approved_payout']"></money>
            </span>
          </td>
        </template>
      </tr>
      </tbody>
      <tfoot v-if="publishers.length" class="total-footer">
      <tr>
        <td><b>{{ trans('statistics.total') }}</b></td>
        <td>
          <span :class="total.real_approve == 0 ? 'highlight-zero':''">@{{ total.real_approve | number_format }}%</span>
        </td>
        <td>
          <span :class="total.approve == 0 ? 'highlight-zero':''">@{{ total.approve | number_format }}%</span>
        </td>
        <td>
          <span v-if="total.total_count === 0" class="highlight-zero">@{{ total.total_count }}</span>
          <span v-else><a target="blank" :href="getLeadLink(null, null)">@{{ total.total_count }}</a></span>
        </td>
        <td>
          <span v-if="total.approved_count === 0" class="highlight-zero">@{{ total.approved_count }}</span>
          <span v-else>
          <a target="blank" :href="getLeadLink(null, 'approved')"
          >@{{ total.approved_count }}</a>
        </span>
        </td>
        <td>
          <span v-if="total.held_count === 0" class="highlight-zero">@{{ total.held_count }}</span>
          <span v-else>
          <a target="blank" :href="getLeadLink(null, 'new')">@{{ total.held_count }}</a>
        </span>
        </td>
        <td>
          <span v-if="total.cancelled_count === 0" class="highlight-zero">@{{ total.cancelled_count }}</span>
          <span v-else>
          <a target="blank" :href="getLeadLink(null, 'cancelled')">@{{ total.cancelled_count }}</a>
        </span>
        </td>
        <td>
          <span v-if="total.trashed_count === 0" class="highlight-zero">@{{ total.trashed_count }}</span>
          <span v-else>
          <a target="blank" :href="getLeadLink(null, 'trashed')">@{{ total.trashed_count }}</a>
        </span>
        </td>
        <template v-for="currency_id in existing_currencies">
          <td>
            <span :class="total[findCurrencyCodeById(currency_id) + '_held_payout'] == 0 ? 'highlight-zero':''">
              <money :sum="total[findCurrencyCodeById(currency_id) + '_held_payout']"></money>
            </span>
          </td>
          <td>
            <span :class="total[findCurrencyCodeById(currency_id) + '_approved_payout']? 'highlight-zero':''">
              <money :sum="total[findCurrencyCodeById(currency_id) + '_approved_payout']"></money>
            </span>
          </td>
        </template>
      </tr>
      </tfoot>
    </table>
    <empty-list-message v-show="!publishers.length" message="{{ trans('statistics.stat_is_empty') }}"
    ></empty-list-message>
  </div>
</script>
