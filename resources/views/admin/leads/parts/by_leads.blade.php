<script type="text/x-template" id="stat_by_leads_tpl">
  <div>
    @include('admin::leads.parts.status_modal')
    <lead-click-parameter-modal ref="lead-click-parameter-modal"></lead-click-parameter-modal>

    <div v-show="leads.length > 0">
      @include('admin::leads.parts.summary_info')

      <vue-datatable v-on:sorting-updated="onDatatableChangeSort" ref="datatable"></vue-datatable>
      <table v-show="leads.length > 0"
             class="table table-hover table-striped table-bordered table-condensed table-light-td" id="stat_by_lead">
        <thead>
        <tr>
          <th data-column="initialized_at" style="width: 43px;">
            <div data-toggle="tooltip"
                 data-title="{{ trans('statistics.th_date_click') }}">
              Click
            </div>
          </th>
          <th data-column="created_at" style="width: 43px;">
            <div data-toggle="tooltip"
                 data-title="{{ trans('statistics.th_date_lead') }}">
              Lead
            </div>
          </th>
          <th>{{ trans('statistics.th_promo') }}</th>
          <th>{{ trans('messages.information') }}</th>
          <th style="width: 180px;">{{ trans('messages.offer') }}</th>
          <th>{{ trans('messages.geo') }}</th>
          <th style="width: 120px;">{{ trans('messages.status') }}</th>
          <th>{{ trans('messages.finance') }}</th>
          <th></th>
        </tr>
        </thead>
        <tbody v-show="leads.length > 0">
        <tr v-for="(lead, index) in leads">
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
            <div class="m-b-xs">
              <enter-in-user-cabinet :email="lead.publisher.email"
                                     :hash="lead.publisher.hash"></enter-in-user-cabinet>
            </div>
            <hr class="hr-margin"/>
            <div v-show="lead.origin == 'api'">{{ trans('statistics.api_lead') }}</div>
            <div class="fs11" v-show="lead.origin !== 'api'">
              <div class="p-t-3">
                <span v-if="lead.flow" data-toggle="tooltip" title="{{ trans('messages.flow') }}">@{{lead.flow.title}}</span>
              </div>
              <div class="m-t-xs">
                        <span v-if="lead.transit !== null" class="nowrap"
                              data-toggle="tooltip"
                              data-title="{{ trans('flows.transit_page') }}">
                            [@{{ lead.transit.locale.code }}] @{{lead.transit.title}} →
                        </span>
                <span v-if="lead.landing !== null" class="nowrap"
                      data-toggle="tooltip"

                      data-title="{{ trans('flows.landing_page') }}">
                            [@{{ lead.landing.locale.code }}] @{{lead.landing.title}}
                        </span>
              </div>
            </div>
          </td>

          <td class="text-left">
            <div class="m-b-4 display_i_b">
              <div data-toggle="popover"
                   :data-content="'{{ trans('messages.lead_hash_and_ID') }}' + ': ' + lead.id">
                #@{{lead.hash}}
              </div>
            </div>
            <hr class="hr-margin"/>
            <div>@{{lead.order.name}}</div>
            <div v-show="lead.order.phone" class="nowrap m-t-xs">
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
              <span v-if="lead.order.number_type === 'MOBILE'">
                        <i :class="{green_t: lead.is_valid_phone, red_t: !lead.is_valid_phone}"
                           class="fa fa-mobile green_t fs15" aria-hidden="true"
                           data-toggle="tooltip"
                           data-title="{{ trans('statistics.number_type_mobile') }}"></i>
                    </span>
              @{{lead.order.phone}}
            </div>
            <div>
                    <span v-if="lead.type !== 'cod'"
                          class="link_dotted open_order_info_modal m-r-xs"
                          :data-order_id="lead.order_id"
                          :data-lead_type="lead.type">
                        <i class="fa fa-shopping-cart"
                           aria-hidden="true"
                           data-toggle="tooltip"

                           data-title="{{ trans('statistics.online_lead_params') }}"></i>
                    </span>
              <span v-if="lead.order.is_first_email_notified === 1"
                    class="link_dotted pointer open_lead_reminder_visits_modal m-r-xs" :data-lead_id="lead.id">
                        <i class="fa fa-envelope-o" aria-hidden="true"
                           data-toggle="tooltip"

                           title='{{ trans('statistics.order_is_first_email_notified') }}'></i>
                    </span>
            </div>
          </td>

          <td class="text-left">
            <template v-if="lead.advertiser && lead.advertiser.email !== null">
              <div class="m-b-xs">
                <enter-in-user-cabinet :email="lead.advertiser.email"
                                       :hash="lead.advertiser.hash"
                ></enter-in-user-cabinet>
              </div>
              <hr class="hr-margin"/>
            </template>
            <div>
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
            <div class="text-left nowrap" v-if="lead.ip_country !== null">
              <country-flag :small="true" :country="lead.ip_country"
              ></country-flag>
              <span>@{{lead.ip}}</span>
            </div>
            <div class="text-left fs11">
              <span v-if="lead.city != null">@{{lead.city.title}}</span>
            </div>
            <div class="text-right">
                    <span v-if="lead.transit_traffic_type === 'noback'"
                          data-toggle="tooltip"
                          title='{{ trans('statistics.noback_title') }}'>
                         <i class="pe pe-7s-left-arrow"></i>
                    </span>
              <span v-if="lead.transit_traffic_type === 'comeback'"
                    data-toggle="tooltip"
                    title='{{ trans('statistics.comeback_title') }}'>
                        <i class="pe pe-7s-back"></i>
                    </span>
              <span v-if="lead.is_extra_flow === 1"
                    data-toggle="tooltip"
                    title='{{ trans('statistics.lead_is_extra_flow') }}'>
                        <i class="pe pe-7s-repeat"></i>
                    </span>
              <span v-if="lead.origin === 'email'"
                    data-toggle="tooltip"
                    title='{{ trans('statistics.lead_origin_email') }}'>
                        <i class="pe pe-7s-mail"></i>
                    </span>
              <span v-if="lead.is_autogenerated === 1"
                    data-toggle="tooltip"
                    title='{{ trans('statistics.autogenerated_lead') }}'>
                        <i class="pe pe-7s-tools"></i>
                    </span>
              <img v-if="lead.browser == 'facebook'" class="w15" src="/images/facebook.svg" alt="Facebook"
                   data-toggle="tooltip"
                   title="{{ trans('statistics.facebook_lead') }}">
              <img v-if="lead.browser == 'instagram'" class="w15" src="/images/instagram.svg" alt="Instagram"
                   data-toggle="tooltip"
                   title="{{ trans('statistics.instagram_lead') }}">
              <span v-if="isMobile(lead)"
                    data-toggle="tooltip"
                    title='{{ trans('statistics.lead_is_mobile') }}'>
                        <i class="pe pe-7s-phone"></i>
                    </span>
            </div>
          </td>

          <td :style="getLeadStatusTdStyle(lead)">
            <div>
                    <span @click="openLeadStatusInfoModal(lead.hash)" class="nowrap custom_tooltip pointer"
                          data-toggle="custom_tooltip" data-html="true"
                          :title="getStatusLog(lead)">
                        <b>@{{ lead.status | lead_status }}</b>
                    </span>
            </div>
            <div v-if="lead.sub_status_id" class="fs11">
              <lead-substatus-trans :sub_status_id="lead.sub_status_id"></lead-substatus-trans>
            </div>
            <div v-if="lead.sub_status">
              <span class="text-muted fs11">@{{  lead.sub_status }}</span>
            </div>
            <div v-if="lead.status == 'approved' && lead.is_hold">
                    <span class="text-muted fs11">
                        {{ trans('statistics.on_hold_at') }} @{{ lead.hold_at | datehour }}
                    </span>
            </div>
            <hr v-if="lead.origin_lead_hash || lead.is_integrated" class="hr-margin"/>
            <div v-if="lead.is_integrated">
              {{--<i v-if="lead.offer.type === 'cod'" class="fa fa-headphones"></i>--}}
              <span v-if="lead.type === 'online'">@{{ getIntegrationTitle(lead)  }}</span>
              <span v-else
                    data-toggle="popover"
                    :data-content="'{{ trans('messages.external_key_title') }}: ' + lead.external_key"
              >@{{ getIntegrationTitle(lead)  }}</span>
              <span v-if="getAdditionalSalesCount(lead.order.products_array)"
                    data-toggle="tooltip" data-title="{{ trans('statistics.additional_sales') }}">
                        @{{ ' (+' + getAdditionalSalesCount(lead.order.products_array) + ')' }}
                    </span>
            </div>
            <div v-if="lead.origin_lead_hash">
              <a :href="getOriginLeadUrl(lead)" target="_blank"
                 data-toggle="tooltip"
                 title="{{ trans('messages.origin_lead_hash_title') }}">
                #@{{lead.origin_lead_hash}}
              </a>
            </div>
            {{--<div v-if="lead.payment_method">--}}
            {{--<img :src="CDN_HOST + lead.payment_method.template.thumb_path"--}}
            {{--:alt="lead.payment_method.template.title" height="15">--}}
            {{--</div>--}}
          </td>

          <td>
            <table class="pull-right">
              <tbody>
              <tr data-toggle="tooltip"

                  data-title="{{ trans('finance.publisher.withdraw') }}">
                <td>
                  <i class="fa fa-arrow-up red_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money :sum="lead.payout" :currency_id="lead.currency_id"></money>
                </td>
              </tr>
              <tr data-toggle="tooltip" data-title="{{ trans('statistics.profit') }}">
                <td>
                  <i class="fa fa-arrow-down green_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money :sum="lead.profit" :currency_id="lead.currency_id"></money>
                </td>
              </tr>
              </tbody>
            </table>
          </td>
          <td>
            <div class="btn-group">
              <template v-if="lead.type !== 'online'">
                <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown"
                        aria-expanded="false">
                  <i class="fa fa-cog"></i> <span class="caret"></span>
                </button>
              </template>
              <ul class="dropdown-menu pull-right">
                <li>
                  <a @click.prevent="openTargetGeoRulesModal(lead)" href="#"
                  >{{ trans('statistics.integrate') }}</a>
                </li>

                <li class="divider"></li>

                <li v-if="lead.status !== 'approved' && lead.is_integrated">
                  <a @click.prevent="changeStatus(lead, 'approve', index)" href="#"
                  >{{ trans('messages.approve') }}</a>
                </li>

                <li v-if="lead.status !== 'cancelled' && lead.is_integrated">
                  <a @click.prevent="changeStatus(lead, 'cancel', index)" href="#"
                  >{{ trans('messages.cancel') }}</a>
                </li>

                <li v-if="lead.status !== 'trashed' && lead.is_integrated">
                  <a @click.prevent="changeStatus(lead, 'trash', index)" href="#"
                  >{{ trans('messages.trash') }}</a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <h5 v-show="leads.length === 0 && !leads_loading"
        class="text-center m-t">{{ trans('statistics.leads_not_found') }}</h5>

    <div class="modal fade" tabindex="-1" role="dialog" id="target_geo_rules_modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span>&times;</span>
            </button>
            <h4 class="modal-title">{{ trans('statistics.integration_rules_list_title') }}</h4>
          </div>
          <div class="modal-body">
            <div v-for="rule in target_geo_rules" class="list-group-item pointer clearfix">
              <i class="fa fa-cogs"></i> @{{ rule.integration.title }}

              <i class="fa fa-user-circle-o m-l-sm"></i> @{{ rule.advertiser.email }}

              <button @click="integrateLead(rule.id)" class="btn btn-xs btn-success pull-right ladda-button"
                      :id="'integrate_lead-' + rule.id" data-style="zoom-out">
                            <span class="ladda-label">
                                <i class="fa fa-check"></i> {{ trans('statistics.integrate') }}
                            </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>