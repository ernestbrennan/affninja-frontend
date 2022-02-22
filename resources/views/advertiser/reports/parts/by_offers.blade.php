<script type="text/x-template" id="by_offers_tpl">
  <div>
    <table class="table table-striped stat_table table-bordered table-highlight dataTable" id="by_offers_table">
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
        <th data-column="id" style="width: 180px">
        <span class="stat_table_title_wrap">
          <span class="stat_table_top_title">{{ trans('messages.offer') }}</span>
        </span>
        </th>

        <th class="offer_approve_th" data-column="real_approve" style="width: 35px;">
          <i class="action_icon action_icon_operator_green" data-toggle="tooltip"
             title="{{ trans('statistics.th_real_approve') }}"></i>
        </th>

        <th class="offer_approve_th" data-column="approve" style="width: 35px;">
          <i class="action_icon action_icon_operator_grey" data-toggle="tooltip"
             title="{{ trans('statistics.th_approve') }}"></i>
        </th>

        <th data-column="total_count" style="width: 35px;">
          <i class="action_icon action_icon_total" data-toggle="tooltip"
             title="{{ trans('statistics.th_total_leads') }}"></i>
        </th>

        <th data-column="approved_count" style="width: 35px;">
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
      <tbody v-show="offers.length">
      <template v-for="(offer, offer_index) in offers">
        <tr :key="offer.id + offer.type">
          <td :id="'title-td-offer-' + offer.id">
            <div @click="toggleTargetsVisibility(offer, offer_index)"
                 :class="['action_icon_arrow pointer nowrap', offer.show_targets ? 'open' : '']"
                 v-html="offer.offer_title"></div>
          </td>
          <td>
            <span :class="offer.real_approve == 0 ? 'highlight-zero':''">@{{ offer.real_approve | number_format }}%</span>
          </td>
          <td>
            <span :class="offer.approve == 0 ? 'highlight-zero':''">@{{ offer.approve | number_format }}%</span>
          </td>
          <td>
            <span class="highlight-zero" v-if="offer.total_count === 0">@{{ offer.total_count }}</span>
            <span v-else><a target="_blank" :href="getLeadLink(offer)">@{{ offer.total_count }}</a></span>
          </td>

          <td>
            <span class="highlight-zero" v-if="offer.approved_count === 0">@{{ offer.approved_count }}</span>
            <span v-else>
              <a target="blank" :href="getLeadLink(offer, 'approved')">@{{ offer.approved_count }}</a>
            </span>
          </td>
          <td>
            <span class="highlight-zero" v-if="offer.held_count === 0">@{{ offer.held_count }}</span>
            <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'new')"
          >@{{ offer.held_count }}</a>
        </span>
          </td>
          <td>
            <span class="highlight-zero" v-if="offer.cancelled_count === 0">@{{ offer.cancelled_count }}</span>
            <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'cancelled')"
          >@{{ offer.cancelled_count }}</a>
        </span>
          </td>
          <td>
            <span class="highlight-zero" v-if="offer.trashed_count === 0">@{{ offer.trashed_count }}</span>
            <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'trashed')"
          >@{{ offer.trashed_count }}</a>
        </span>
          </td>
          <template v-for="currency_id in existing_currencies">
            <td>
            <span :class="offer[findCurrencyCodeById(currency_id) + '_held_payout'] == 0 ? 'highlight-zero':''">
              <money :sum="offer[findCurrencyCodeById(currency_id) + '_held_payout']"></money>
            </span>
            </td>
            <td>
            <span :class="offer[findCurrencyCodeById(currency_id) + '_approved_payout'] == 0 ? 'highlight-zero':''">
              <money :sum="offer[findCurrencyCodeById(currency_id) + '_approved_payout']"></money>
            </span>
            </td>
          </template>
        </tr>

        {{-- Targets listing --}}
        <template v-if="offer.total_count && offer.targets.length && offer.show_targets"
                  v-for="(target, target_index) in offer.targets"
        >
          <tr :key="target.id + target.type"
              class="tr_stat_inside tr_stat_inside_level_one">
            <td :id="'title-td-target-' + target.id">
              <div @click="toggleTargetGeoVisibility(target, offer_index, target_index)"
                   :class="['action_icon_arrow pointer nowrap', target.show_target_geo ? 'open' : '']"
                   v-html="target.target_title"></div>
            </td>
            <td>
              <span :class="target.real_approve == 0 ? 'highlight-zero':''">@{{ target.real_approve | number_format }}%</span>
            </td>
            <td>
              <span :class="target.approve == 0 ? 'highlight-zero':''">@{{ target.approve | number_format }}%</span>
            </td>
            <td>
              <span class="highlight-zero" v-if="target.total_count === 0">@{{ target.total_count }}</span>
              <span v-else><a target="_blank" :href="getLeadLink(offer)">@{{ target.total_count }}</a></span>
            </td>

            <td>
              <span class="highlight-zero" v-if="target.approved_count === 0">@{{ target.approved_count }}</span>
              <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'approved')"
          >@{{ target.approved_count }}</a>
        </span>
            </td>
            <td>
              <span class="highlight-zero" v-if="target.held_count === 0">@{{ target.held_count }}</span>
              <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'new')"
          >@{{ target.held_count }}</a>
        </span>
            </td>

            <td>
              <span class="highlight-zero" v-if="target.cancelled_count === 0">@{{ target.cancelled_count }}</span>
              <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'cancelled')"
          >@{{ target.cancelled_count }}</a>
        </span>
            </td>
            <td>
              <span class="highlight-zero" v-if="target.trashed_count === 0">@{{ target.trashed_count }}</span>
              <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'trashed')"
          >@{{ target.trashed_count }}</a>
        </span>
            </td>
            <template v-for="currency_id in existing_currencies">
              <td>
            <span :class="target[findCurrencyCodeById(currency_id) + '_held_payout'] == 0 ? 'highlight-zero':''">
              <money :sum="target[findCurrencyCodeById(currency_id) + '_held_payout']"></money>
            </span>
              </td>
              <td>
            <span :class="target[findCurrencyCodeById(currency_id) + '_approved_payout'] == 0 ? 'highlight-zero':''">
              <money :sum="target[findCurrencyCodeById(currency_id) + '_approved_payout']"></money>
            </span>
              </td>
            </template>
          </tr>

          {{-- Target geo listing --}}
          <tr v-if="target.show_target_geo"
              v-for="target_geo in target.target_geo"
              :key="target_geo.id + target_geo.type"
              class="tr_stat_inside tr_stat_inside_level_two">
            <td>
              <country-flag :country="{code: target_geo.country_code, title: target_geo.country_title}"
                            :small="true"></country-flag>
              @{{ target_geo.country_title }}
            </td>
            <td>
              <span :class="target_geo.real_approve == 0 ? 'highlight-zero':''">@{{ target_geo.real_approve | number_format }}%</span>
            </td>
            <td>
              <span :class="target_geo.approve == 0 ? 'highlight-zero':''">@{{ target_geo.approve | number_format }}%</span>
            </td>
            <td>
              <a target="_blank" :href="getLeadLink(offer, null, target_geo.country_id)"
              >@{{ target_geo.total_count }}</a>
            </td>

            <td>
              <span class="highlight-zero"
                    v-if="target_geo.approved_count === 0">@{{ target_geo.approved_count }}</span>
              <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'approved', target_geo.country_id)"
          >@{{ target_geo.approved_count }}</a>
        </span>
            </td>
            <td>
              <span class="highlight-zero" v-if="target_geo.held_count === 0">@{{ target_geo.held_count }}</span>
              <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'new', target_geo.country_id)"
          >@{{ target_geo.held_count }}</a>
        </span>
            </td>

            <td>
              <span class="highlight-zero"
                    v-if="target_geo.cancelled_count === 0">@{{ target_geo.cancelled_count }}</span>
              <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'cancelled', target_geo.country_id)"
          >@{{ target_geo.cancelled_count }}</a>
        </span>
            </td>
            <td>
              <span class="highlight-zero" v-if="target_geo.trashed_count === 0">@{{ target_geo.trashed_count }}</span>
              <span v-else>
          <a target="_blank" :href="getLeadLink(offer, 'trashed', target_geo.country_id)"
          >@{{ target_geo.trashed_count }}</a>
        </span>
            </td>
            <template v-for="currency_id in existing_currencies">
              <td>
            <span :class="target_geo[findCurrencyCodeById(currency_id) + '_held_payout'] == 0 ? 'highlight-zero':''">
              <money :sum="target_geo[findCurrencyCodeById(currency_id) + '_held_payout']"></money>
            </span>
              </td>
              <td>
            <span :class="target_geo[findCurrencyCodeById(currency_id) + '_approved_payout'] == 0 ? 'highlight-zero':''">
              <money :sum="target_geo[findCurrencyCodeById(currency_id) + '_approved_payout']"></money>
            </span>
              </td>
            </template>
          </tr>
        </template>
      </template>
      </tbody>
      <tfoot v-if="offers.length" class="total-footer">
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
          <span v-else><a target="_blank" :href="getLeadLink(null, null)">@{{ total.total_count }}</a></span>
        </td>
        <td>
          <span v-if="total.approved_count === 0" class="highlight-zero">@{{ total.approved_count }}</span>
          <span v-else>
          <a target="_blank" :href="getLeadLink(null, 'approved')"
          >@{{ total.approved_count }}</a>
        </span>
        </td>
        <td>
          <span v-if="total.held_count === 0" class="highlight-zero">@{{ total.held_count }}</span>
          <span v-else>
          <a target="_blank" :href="getLeadLink(null, 'new')">@{{ total.held_count }}</a>
        </span>
        </td>
        <td>
          <span v-if="total.cancelled_count === 0" class="highlight-zero">@{{ total.cancelled_count }}</span>
          <span v-else>
          <a target="_blank" :href="getLeadLink(null, 'cancelled')">@{{ total.cancelled_count }}</a>
        </span>
        </td>
        <td>
          <span v-if="total.trashed_count === 0" class="highlight-zero">@{{ total.trashed_count }}</span>
          <span v-else>
          <a target="_blank" :href="getLeadLink(null, 'trashed')">@{{ total.trashed_count }}</a>
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
    <empty-list-message v-show="!offers.length" message="{{ trans('statistics.stat_is_empty') }}"
    ></empty-list-message>
  </div>
</script>
