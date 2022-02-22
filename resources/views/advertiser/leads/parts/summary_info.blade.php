<div class="hpanel panel-collapse">
  <div class="panel-heading hbuilt">
    <div class="panel-tools">
      <a class="showhide" id="toggle_summary_panel"><i class="fa fa-chevron-down"></i></a>
    </div>
    <span class="panel-title">{{ trans('statistics.lead_summary_data') }}</span>
  </div>
  <div class="panel-body" style="display: none">
    <div class="row">
      <div class="col-lg-6 col-md-8 col-sm-8 col-xs-10">
        <div class="row m-b">
          <div class="col-lg-2 col-md-2 col-sm-4 col-xs-2"></div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <i class="action_icon action_icon_total"
               data-toggle="tooltip"
               data-title="{{ trans('statistics.th_total_leads') }}"></i>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <i class="action_icon action_icon_check"
               data-toggle="tooltip"
               title="{{ trans('statistics.th_approved_count') }}"></i>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <i class="action_icon action_icon_wait"
               data-toggle="tooltip"
               title="{{ trans('statistics.th_held_count') }}"></i>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <i class="action_icon action_icon_cancell"
               data-toggle="tooltip"
               title="{{ trans('statistics.th_oncancel_payout') }}"></i>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <i class="action_icon action_icon_trash"
               data-toggle="tooltip"
               title="{{ trans('statistics.th_trashed_count') }}"></i>
          </div>
        </div>
        <div class="row m-b">
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">{{ trans('statistics.th_conversions') }}</div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <span @click="total.total_count ? setLeadStatus('all') : null"
                  :class="[total.total_count ? 'internal-link' : '']"
                  data-toggle="tooltip"
                  data-title="{{ trans('statistics.th_total_leads') }}"
            >@{{total.total_count}}</span>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <span @click="total.approved_count ? setLeadStatus('approved') : null"
                  :class="[total.approved_count ? 'internal-link' : '']"
                  data-toggle="tooltip"
                  title="{{ trans('statistics.th_approved_count') }}"
            >@{{total.approved_count}}</span>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <span @click="total.held_count ? setLeadStatus('new') : null"
                  :class="[total.held_count ? 'internal-link' : '']"
                  data-toggle="tooltip"
                  title="{{ trans('statistics.th_held_count') }}">@{{total.held_count}}</span>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <span @click="total.cancelled_count ? setLeadStatus('cancelled') : null"
                  :class="[total.cancelled_count ? 'internal-link' : '']"
                  data-toggle="tooltip"
                  title="{{ trans('statistics.th_oncancel_payout') }}">@{{total.cancelled_count}}</span>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
            <span @click="total.trashed_count ? setLeadStatus('trashed') : null"
                  :class="[total.trashed_count ? 'internal-link' : '']"
                  data-toggle="tooltip"
                  title="{{ trans('statistics.th_trashed_count') }}">@{{total.trashed_count}}</span>
          </div>
        </div>
        <div v-for="item1 in total.currencies" class="row" v-if="total.currencies.length">
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 nowrap"
          >{{ trans('messages.finance') }},
            <currency-sign-by-id :currency_id="item1.currency_id"></currency-sign-by-id>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right">
            <money :sum="item1.total_payout"></money>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right">
            <money :sum="item1.approved_payout"></money>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right">
            <money :sum="item1.held_payout"></money>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right">
            <money :sum="item1.cancelled_payout"></money>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-right">
            <money :sum="item1.trashed_payout"></money>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-4 col-sm-4 col-xs-2">
        <div class="row m-b">
          <div class="col-lg-2 col-md-3 col-sm-3 col-xs-2 text-center">
            <i class="action_icon action_icon_operator_green"
               data-toggle="tooltip"
               title="{{ trans('statistics.th_real_approve') }}"></i>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-3 col-xs-2 text-center">
            <i class="action_icon action_icon_operator_grey"
               data-toggle="tooltip"
               data-title="{{ trans('statistics.th_approve') }}"></i>
          </div>
        </div>
        <div class="row m-b">
          <div class="col-lg-2 col-md-3 col-sm-3 col-xs-2 text-center">
            <span data-toggle="tooltip"
                  title="{{ trans('statistics.th_real_approve') }}"
            >@{{total.real_approve | number_format }}%</span>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-3 col-xs-2 text-center">
            <span data-toggle="tooltip"
                  data-title="{{ trans('statistics.th_approve') }}"
            >@{{total.approve | number_format }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>