<div class="hpanel panel-collapse m-b">
  <div class="panel-heading hbuilt">
    <div class="panel-tools">
      <a class="showhide" id="toggle_summary_panel"><i class="fa fa-chevron-down"></i></a>
    </div>
    <span class="panel-title">{{ trans('statistics.lead_summary_data') }}</span>
  </div>
  <div class="panel-body" style="display: none">
    <div class="row">
      <div class="col-lg-7 col-md-8 col-sm-12 col-xs-12">
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
        <div v-for="currency_info in currencies_info" class="row">
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">{{ trans('messages.finance') }},
            <currency-sign-by-id :currency_id="currency_info.currency_id"></currency-sign-by-id>
          </div>
          <div class="nowrap col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <table class="display-flex-right text-right">
              <tbody>
              <tr>
                <td>
                  <i class="fa fa-arrow-up red_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money class="m-l-xs"
                         data-toggle="tooltip"
                         data-title="{{ trans('finance.publisher.withdraw') }}"
                         :sum="total[currency_info.title + 'total_payout']">
                  </money>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-arrow-down green_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money class="m-l-xs"
                         data-toggle="tooltip"
                         data-title="{{ trans('statistics.profit') }}"
                         :sum="total[currency_info.title + 'total_profit']">
                  </money>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="nowrap col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <table class="display-flex-right text-right">
              <tbody>
              <tr>
                <td>
                  <i class="fa fa-arrow-up red_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money class="m-l-xs"
                         data-toggle="tooltip"
                         data-title="{{ trans('finance.publisher.withdraw') }}"
                         :sum="total[currency_info.title + 'approved_payout']">
                  </money>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-arrow-down green_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money class="m-l-xs"
                         data-toggle="tooltip"
                         data-title="{{ trans('statistics.profit') }}"
                         :sum="total[currency_info.title + 'approved_profit']">
                  </money>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="nowrap col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <table class="display-flex-right text-right">
              <tbody>
              <tr>
                <td>
                  <i class="fa fa-arrow-up red_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money class="m-l-xs"
                         data-toggle="tooltip"
                         data-title="{{ trans('finance.publisher.withdraw') }}"
                         :sum="total[currency_info.title + 'held_payout']">
                  </money>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-arrow-down green_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money class="m-l-xs"
                         data-toggle="tooltip"
                         data-title="{{ trans('statistics.profit') }}"
                         :sum="total[currency_info.title + 'held_profit']">
                  </money>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="nowrap col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <table class="display-flex-right text-right">
              <tbody>
              <tr>
                <td>
                  <i class="fa fa-arrow-up red_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money class="m-l-xs"
                         data-toggle="tooltip"
                         data-title="{{ trans('finance.publisher.withdraw') }}"
                         :sum="total[currency_info.title + 'cancelled_payout']">
                  </money>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-arrow-down green_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money class="m-l-xs"
                         data-toggle="tooltip"
                         data-title="{{ trans('statistics.profit') }}"
                         :sum="total[currency_info.title + 'cancelled_profit']">
                  </money>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="nowrap col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <table class="display-flex-right text-right">
              <tbody>
              <tr>
                <td>
                  <i class="fa fa-arrow-up red_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money class="m-l-xs"
                         data-toggle="tooltip"
                         data-title="{{ trans('finance.publisher.withdraw') }}"
                         :sum="total[currency_info.title + 'trashed_payout']">
                  </money>
                </td>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-arrow-down green_t" aria-hidden="true"></i>
                </td>
                <td>
                  <money class="m-l-xs"
                         data-toggle="tooltip"
                         data-title="{{ trans('statistics.profit') }}"
                         :sum="total[currency_info.title + 'trashed_profit']">
                  </money>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-lg-5 col-md-4 col-md-offset-0 col-sm-12 col-sm-offset-2 col-xs-12 col-xs-offset-2">
        <div class="row m-b">
          <div class="col-lg-2 col-md-3 col-sm-2 col-xs-2 text-center">
            <i class="action_icon action_icon_operator_green"
               data-toggle="tooltip"
               data-title="{{ trans('statistics.th_real_approve') }}"></i>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-2 col-xs-2 text-center">
            <i class="action_icon action_icon_operator_orange"
               data-toggle="tooltip"
               data-title="{{ trans('statistics.th_expected_approve') }}"></i>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-2 col-xs-2 text-center">
            <i class="action_icon action_icon_operator_grey"
               data-toggle="tooltip"
               data-title="{{ trans('statistics.th_approve') }}"></i>
          </div>
        </div>
        <div class="row m-b">
          <div class="col-lg-2 col-md-3 col-sm-2 col-xs-2 text-center">
            @{{ total.real_approve | number_format }}%
          </div>
          <div class="col-lg-2 col-md-3 col-sm-2 col-xs-2 text-center">
            @{{ total.expected_approve | number_format }}%
          </div>
          <div class="col-lg-2 col-md-3 col-sm-2 col-xs-2 text-center">
            @{{ total.approve | number_format }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</div>