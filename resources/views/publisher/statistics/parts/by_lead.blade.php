<script type="text/x-template" id="stat_by_leads_tpl">
  <div>
    <lead-click-parameter-modal ref="lead-click-parameter-modal"></lead-click-parameter-modal>
    <div v-show="leads.length" class="hpanel panel-collapse">
      <div class="panel-heading hbuilt">
        <div class="panel-tools">
          <a class="showhide" id="toggle_summary_panel"><i class="fa fa-chevron-down"></i></a>
        </div>
        <span class="panel-title">{{ trans('statistics.lead_summary_data') }}</span>
      </div>
      <div class="panel-body" style="display: none">
        <div class="row">
          <div class="col-lg-6 col-md-7 col-sm-9 col-xs-9">
            <div class="row m-b">
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <i class="action_icon action_icon_total"
                   data-toggle="tooltip"
                   data-title="{{ trans('statistics.th_total_leads') }}"></i>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <i class="action_icon action_icon_check"
                   data-toggle="tooltip"
                   data-title="{{ trans('statistics.th_approved_count') }}"></i>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <i class="action_icon action_icon_wait"
                   data-toggle="tooltip"
                   data-title="{{ trans('statistics.th_held_count') }}"></i>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <i class="action_icon action_icon_cancell"
                   data-toggle="tooltip"
                   data-title="{{ trans('statistics.th_oncancel_payout') }}"></i>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <i class="action_icon action_icon_trash"
                   data-toggle="tooltip"
                   data-title="{{ trans('statistics.th_trashed_count') }}"></i>
              </div>
            </div>
            <div class="row m-b">
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">{{ trans('statistics.th_conversions') }}</div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
							<span @click="total.total_count ? setLeadStatus('all') : null"
                    :class="[total.total_count ? 'internal-link' : '']">
								@{{total.total_count}}
							</span>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
							<span @click="total.approved_count ? setLeadStatus('approved') : null"
                    :class="[total.approved_count ? 'internal-link' : '']">@{{total.approved_count}}</span>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
							<span @click="total.held_count ? setLeadStatus('new') : null"
                    :class="[total.held_count ? 'internal-link' : '']">@{{total.held_count}}</span>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
							<span @click="total.cancelled_count ? setLeadStatus('cancelled') : null"
                    :class="[total.cancelled_count ? 'internal-link' : '']">@{{total.cancelled_count}}</span>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
							<span @click="total.trashed_count ? setLeadStatus('trashed') : null"
                    :class="[total.trashed_count ? 'internal-link' : '']">@{{total.trashed_count}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 nowrap">{{ trans('messages.finance') }}</div>
              <div class="nowrap col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <table class="margin_auto text-right">
                  <tbody>
                  <tr>
                    <td>
                      <money class="m-l-xs"
                             :sum="total.total_payout" :currency_id="currency_id">
                      </money>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <money :sum="total.approved_payout" :currency_id="currency_id"></money>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <money :sum="total.held_payout" :currency_id="currency_id"></money>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <money :sum="total.cancelled_payout" :currency_id="currency_id"></money>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <money :sum="total.trashed_payout" :currency_id="currency_id"></money>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-5 col-sm-12 col-xs-12">
            <div class="row m-b">
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-4 text-center">
                <i class="action_icon action_icon_operator_green"
                   data-toggle="tooltip"
                   data-title="{{ trans('statistics.th_real_approve') }}"></i>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-3 text-center">
                <i class="action_icon action_icon_operator_orange"
                   data-toggle="tooltip"
                   data-title="{{ trans('statistics.th_expected_approve') }}"></i>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <i class="action_icon action_icon_operator_grey"
                   data-toggle="tooltip"
                   data-title="{{ trans('statistics.th_approve') }}"></i>
              </div>
            </div>
            <div class="row m-b">
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-4 text-center">
                <span>@{{ total.real_approve | number_format }}%</span>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-3 col-xs-3 text-center">
                <span>@{{ total.expected_approve | number_format }}%</span>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                @{{ total.approve | number_format }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <table v-show="leads.length > 0"
           class="table table-hover table-striped table-bordered table-condensed table-light-td"
           id="stat_by_lead">
      <thead>
      <tr>
        <th data-column="initialized_at" style="width: 43px;">
                <span data-toggle="tooltip"
                      data-title="{{ trans('statistics.th_date_click') }}">
                    Click
                </span>
        </th>
        <th data-column="created_at" style="width: 43px;">
                <span data-toggle="tooltip"
                      data-title="{{ trans('statistics.th_date_lead') }}">
                    Lead
                </span>
        </th>
        <th>{{ trans('statistics.th_promo') }}</th>
        <th>{{ trans('messages.information') }}</th>
        <th style="width: 180px;">{{ trans('messages.offer') }}</th>
        <th>{{ trans('messages.geo') }}</th>
        <th style="width: 120px;">{{ trans('messages.status') }}</th>
        <th><span>{{ trans('messages.finance') }}</span></th>
      </tr>
      </thead>
      <tbody v-show="leads.length > 0">
      <tr v-for="lead in leads">
        <td class="text-right">
          <div>
                    <span @click="openLeadClickParameterModal(lead)" class="internal-link"
                          :data-lead_hash="lead.hash">
                        @{{ lead.initialized_at | date }}
                    </span>
            <br>
            <span @click="openLeadClickParameterModal(lead)" class="internal-link text-muted"
                  :data-lead_hash="lead.hash">
                        @{{ lead.initialized_at | dateformat('H:i') }}
                    </span>
          </div>
        </td>
        <td>
          <div>
            @{{lead.created_at | date }}<br>
            <span class="text-muted">@{{ lead.created_at | dateformat('H:i') }}</span>
          </div>
        </td>
        <td class="text-left">
          <div class="m-b-xs" v-if="lead.origin == 'api'">{{ trans('statistics.api_lead') }}</div>
          <div v-else>
            <div v-if="lead.flow" class="m-b-xs">
              <a class="nowrap" :href="'/tools/flows/' + lead.flow.hash">
                @{{ lead.flow.title | truncate(20) }}
              </a>
            </div>
            <div class="fs11">
        		<span v-if="lead.transit !== null" class="nowrap"
                  data-toggle="tooltip"
                  data-title="{{ trans('flows.transit_page') }}">
							[@{{ lead.transit.locale.code }}] @{{lead.transit.title}} →
						</span>
              <span class="nowrap"
                    data-toggle="tooltip"
                    data-title="{{ trans('flows.landing_page') }}">
							[@{{ lead.landing.locale.code }}] @{{lead.landing.title}}
						</span>
            </div>
          </div>
        </td>
        <td class="text-left">
          <div class="m-b-4 display_i_b"
               data-toggle="tooltip"
               data-title="{{ trans('messages.lead_hash_title') }}">
            #@{{lead.hash}}
          </div>
          <hr style="margin: 1px;"/>
          <div>@{{lead.order.name}}</div>

          <div v-show="lead.order.phone" class="nowrap m-t-xs">
                    <span v-if="lead.order.number_type === 'MOBILE'">
                        <i :class="{green_t: lead.is_valid_phone, red_t: !lead.is_valid_phone}"
                           class="fa fa-mobile green_t fs15" aria-hidden="true"
                           data-toggle="tooltip"
                           data-title="{{ trans('statistics.number_type_mobile') }}"></i>
                    </span>
            <span v-if="lead.order.number_type === 'FIXED_LINE'">
                        <i :class="{green_t: lead.is_valid_phone, red_t: !lead.is_valid_phone}"
                           class="fa fa-phone green_t" aria-hidden="true"
                           data-toggle="tooltip"
                           data-title="{{ trans('statistics.number_type_fixed_line') }}"></i>
                    </span>
            <span v-if="lead.order.number_type === 'UNKNOWN'">
                       <i :class="{green_t: lead.is_valid_phone, red_t: !lead.is_valid_phone}"
                          class="fa fa-phone"
                          data-toggle="tooltip"
                          data-title="{{ trans('statistics.number_type_unknown') }}" aria-hidden="true"></i>
                    </span>
            <span>
                       @{{lead.order.phone}}
                    </span>
          </div>
        </td>
        <td class="text-left">
          <div class="m-b-xs">
            <a :href="'/offers/' + lead.offer.hash">
              @{{lead.offer.title}}
            </a>
          </div>
          <div class="nowrap">
            <country-flag v-if="lead.country" :country="lead.country" :small="true"
            ></country-flag>
            <target-title :label="lead.target.label"
                          :title="lead.target.template.title"
                          class="fs11" data-toggle="tooltip" data-title="{{ trans('messages.target') }}"
            ></target-title>
          </div>
        </td>
        <td>
          <div class="text-left nowrap" v-if="lead.ip_country">
            <country-flag v-if="lead.ip_country" :small="true" :country="lead.ip_country"
            ></country-flag>
            <span>@{{lead.ip}}</span>
          </div>
          <div class="fs11 text-left">
            <span v-if="lead.city != null">@{{lead.city.title}}</span>
          </div>
          <div class="text-right">
                    <span v-if="lead.transit_traffic_type === 'noback'"
                          data-toggle="tooltip"
                          data-title='{{ trans('statistics.noback_title') }}'>
                        <i class="pe pe-7s-left-arrow"></i>
                    </span>
            <span v-if="lead.transit_traffic_type === 'comeback'"
                  data-toggle="tooltip"
                  data-title='{{ trans('statistics.comeback_title') }}'>
                        <i class="pe pe-7s-back"></i>
                    </span>
            <span v-if="lead.is_extra_flow === 1"
                  data-toggle="tooltip"
                  data-title='{{ trans('statistics.lead_is_extra_flow') }}'>
                        <i class="pe pe-7s-repeat"></i>
                    </span>
            <img v-if="lead.browser == 'facebook'" class="w15" src="/images/facebook.svg" alt="Facebook"
                 data-toggle="tooltip"
                 data-title="{{ trans('statistics.facebook_lead') }}">
            <img v-if="lead.browser == 'instagram'" class="w15" src="/images/instagram.svg" alt="Instagram"
                 data-toggle="tooltip"
                 data-title="{{ trans('statistics.instagram_lead') }}">
            <span v-if="isMobile(lead)"
                  data-toggle="tooltip"
                  data-title='{{ trans('statistics.lead_is_mobile') }}'>
                        <i class="pe pe-7s-phone"></i>
                    </span>
          </div>
        </td>
        <td :style="getLeadStatusTdStyle(lead)">
          <div class="nowrap"><b> @{{ lead.status | lead_status }} </b></div>
          <div v-if="lead.sub_status_id">
            <lead-substatus-trans :sub_status_id="lead.sub_status_id"></lead-substatus-trans>
          </div>
          <div>
            <span class="text-muted fs11">@{{lead.sub_status}}</span>
          </div>
          <span v-if="lead.is_hold == 1 && lead.status == 'approved'"
                class="text-muted fs11">
                    {{ trans('statistics.on_hold_at') }} @{{ lead.hold_at | datehour }}
		        </span>
        </td>
        <td>
          <money :sum="lead.payout" :currency_id="lead.currency_id"></money>
        </td>
      </tr>
      </tbody>
    </table>
    <empty-list-message v-show="!leads.length && pagination.finished" message="{{ trans('statistics.stat_is_empty') }}"
    ></empty-list-message>
    <div class="m-t" id="scroll_progress_wrap"></div>
  </div>
</script>