<div class="page-tools-container">
  <filters></filters>
  <div class="text-right display_i_b m-b buttons-right-container">
    <approved-btn v-show="selected_leads.length" :lead_hashes="selected_leads"
                  style="margin-right: 3px;"></approved-btn>
    <cancelled-btn v-show="selected_leads.length" :lead_hashes="selected_leads"></cancelled-btn>
  </div>
</div>
@include('advertiser::leads.parts.summary_info')

<div id="leads_table_wrap">
  <table v-show="leads.length"
         class="table table-hover table-striped table-bordered table-condensed table-light-td"
         id="leads_table">
    <thead>
    <tr>
      <th @click="selectAllLeads" class="w30 checkbox_th pointer" style="min-width: 30px;">
        <div class="checkbox checkbox-success m-n">
          <input type="checkbox" :checked="all_leads_selected">
          <label></label>
        </div>
      </th>
      <th data-column="created_at" style="width: 40px;">{{ trans('messages.created') }}</th>
      <th data-column="processed_at" style="width: 40px;">{{ trans('messages.updated') }}</th>
      <th>{{ trans('messages.lead_hash_title') }}</th>
      <th style="width: 180px">{{ trans('messages.offer') }}</th>
      <th>{{ trans('statistics.th_publisher') }}</th>
      <th style="width:105px;">{{ trans('leads.client') }}</th>
      <th>{{ trans('statistics.history') }}</th>
      <th style="width: 80px;"></th>
      <th style="width: 80px;"></th>
      <th>{{ trans('statistics.th_finance') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="lead in leads">
      <td @click="toggleLeadSelection(lead)" class="checkbox_td pointer">
        <div v-if="lead.type === 'cod'" class="checkbox checkbox-success">
          <input type="checkbox" :checked="_.indexOf(selected_leads, lead.hash) !== -1">
          <label></label>
        </div>
      </td>
      <td class="text-right">
        <div :title="lead.created_at">
          @{{lead.created_at | date }}<br>
          <span class="text-muted">@{{ lead.created_at | dateformat('H:i') }}</span>
        </div>
      </td>
      <td class="text-right">
        <div v-if="lead.processed_at === null">-</div>
        <div v-else :title="lead.processed_at">
          @{{lead.processed_at | date}}<br>
          <span class="text-muted">@{{lead.processed_at | dateformat('H:i') }}</span>
        </div>
      </td>
      <td class="text-left">
        @{{lead.hash}}
      </td>
      <td class="text-left">
        <div v-if="lead.offer !== null" class="m-b-xs">
          <a :href="'/offer/' + lead.offer.hash" target="_blank">
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
      <td class="text-left">
        <div v-if="_.get(lead.publisher, 'email', false)">@{{ _.get(lead.publisher, 'email') }}</div>
        #@{{ lead.publisher.hash }}
      </td>
      <td class="text-left">
        <div v-show="lead.order.phone" class="nowrap">
          <span>
            <i :class="[
                'fa',
                lead.order.number_type === 'MOBILE'? 'fa-mobile': 'fa-phone',
                lead.is_valid_phone? 'green_t': '',
                !lead.is_valid_phone? 'red_t': '']"
               data-toggle="tooltip"
               :data-title="getPhoneIconTitle(lead.order.number_type)"></i>
          </span>
          <span>@{{lead.order.phone}}</span>
        </div>
        <div>@{{lead.order.name}}</div>
        <hr v-if="lead.country" style="margin:1px 0;"/>
        <div class="m-t-xs nowrap">
          <country-flag v-if="lead.ip_country" :country="lead.ip_country" :small="true"
          ></country-flag>
          <span data-toggle="tooltip">@{{ lead.ip }}</span>
        </div>
        <div v-if="lead.city != null">@{{lead.city.title}}</div>
      </td>
      <td class="text-right" :style="getLeadStatusTdStyle(lead)">
        <div>
                        <span class="nowrap custom_tooltip pointer"
                              data-toggle="custom_tooltip" data-html="true"
                              :title="getStatusLog(lead)">
                            <b>@{{ lead.status | lead_status }}</b>
                        </span>
        </div>
        <div v-if="lead.sub_status_id">
          <lead-substatus-trans :sub_status_id="lead.sub_status_id"></lead-substatus-trans>
        </div>
        <div v-if="lead.sub_status">
          <span class="text-muted fs11">@{{lead.sub_status}}</span>
        </div>
      </td>
      <td>
        <approved-btn v-if="lead.type === 'cod'" :lead_hashes="[lead.hash]" class="btn-xs"></approved-btn>
      </td>
      <td>
        <cancelled-btn v-if="lead.type === 'cod'" :lead_hashes="[lead.hash]" btn_size="btn-xs"></cancelled-btn>
      </td>
      <td>
        <money :sum="lead.advertiser_payout" :currency_id="lead.advertiser_currency_id"></money>
      </td>
    </tr>
    </tbody>
  </table>
  <div id="scroll-preloader-container"></div>
  <empty-list-message v-if="!leads.length && !leads_loading" message="{{ trans('statistics.stat_is_empty') }}"
  ></empty-list-message>
</div>