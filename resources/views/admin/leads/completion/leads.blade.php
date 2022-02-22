@extends('admin::app', [
'title' => trans('leads.leads_to_complete') .  ' ' . $advertiser['email'],
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  <div id="leads">

    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-7 col-xs-7">
        <div id="leads-wrap" class="table-responsive">
          <table class="table table-stripped table-bordered table-condensed" id="leads-table">
            <thead>
            <tr>
              <th>@{{ LANG_MESSAGES.date }}</th>
              <th>@{{ LANG_MESSAGES.publisher_sm }}</th>
              <th>@{{ LANG_MESSAGES.publisher_payout }}</th>
              <th>@{{ LANG_MESSAGES.advertiser_sm }}</th>
              <th>@{{ LANG_MESSAGES.offer }}</th>
              <th>@{{ LANG_MESSAGES.geo }}</th>
              <th class="checkbox_td pointer">
                {{--<div class="checkbox checkbox-success">--}}
                {{--<input @click="all_selected = !all_selected" type="checkbox" id="all_selected">--}}
                {{--<label for="all_selected"></label>--}}
                {{--</div>--}}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="lead in leads"
                @click.stop="addLeadToComplete(lead)"
                :class="[
                      'pointer',
                      'no-user-select',
                      leadHasDifferentCurrency(lead) ? 'hidden': ''
                      ]">
              <td :data-sort="lead.created_at">@{{ lead.created_at | datehour }}</td>
              <td class="text-left">
                <enter-in-user-cabinet
                        :email="lead.publisher.email"
                        :hash="lead.publisher.hash"
                ></enter-in-user-cabinet>
              </td>
              <td :data-title="lead.payout">
                <money :sum="lead.payout" :currency_id="lead.currency_id"></money>
              </td>
              <td>
                <money :sum="lead.advertiser_payout" :currency_id="lead.advertiser_currency_id"></money>
              </td>
              <td class="text-left">
                <a :href="'/offers/' + lead.offer.hash" target="_blank">@{{lead.offer.title}}</a>
              </td>
              <td class="text-left">
                <div class="nowrap">
                  <country-flag v-if="lead.country" :country="lead.country" :small="true"></country-flag>
                  <target-title :label="lead.target.label"
                                :title="lead.target.template.title"
                                class="fs11" data-toggle="tooltip" data-title="{{ trans('messages.target') }}"
                  ></target-title>
                </div>
              </td>
              <td class="checkbox_td">
                <div class="checkbox checkbox-success">
                  <input @change.stop="addLeadToComplete(lead, $event)"
                         :id="'lead' + lead.id"
                         :checked="_.findIndex(leads_to_complete, {id: lead.id}) != -1"
                         type="checkbox"
                  ><label :for="'lead' + lead.id"></label>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          <empty-list-message v-if="!leads.length" :message="LANG_LEADS.empty_сomp_leads"></empty-list-message>
        </div>
      </div>

      <div class="col-lg-4 col-md-4 col-sm-5 col-xs-5">
        <div class="row">
          <div class="col-xs-6 border-right">
            <div class="row m-b">
              <div :style="'visibility: ' + (publisher_currency_id ? 'visible' : 'hidden')"
                   class="col-xs-12">
                1<span v-html="publisher_currency_sign"></span> = @{{ rate }}<span
                        v-html="advertiser_currency_sign"></span>
                <br>
                1<span v-html="advertiser_currency_sign"></span> = @{{ reverse_rate }}<span
                        v-html="publisher_currency_sign"></span>
              </div>
            </div>
            <input v-model="rate" class="form-control" id="rate" type="number">

            <div class="row m-t">
              <div class="col-xs-7">
                <label for="month">{{ trans('messages.month') }}</label>
                <select v-model="month" class="form-control" id="month">
                  <option value="01">{{ trans('messages.january') }}</option>
                  <option value="02">{{ trans('messages.february') }}</option>
                  <option value="03">{{ trans('messages.march') }}</option>
                  <option value="04">{{ trans('messages.april') }}</option>
                  <option value="05">{{ trans('messages.may') }}</option>
                  <option value="06">{{ trans('messages.june') }}</option>
                  <option value="07">{{ trans('messages.july') }}</option>
                  <option value="08">{{ trans('messages.august') }}</option>
                  <option value="09">{{ trans('messages.september') }}</option>
                  <option value="10">{{ trans('messages.october') }}</option>
                  <option value="11">{{ trans('messages.november') }}</option>
                  <option value="12">{{ trans('messages.december') }}</option>
                </select>
              </div>
              <div class="col-xs-5 p-l-none">
                <label for="year">{{ trans('messages.year') }}</label>
                <select v-model="year" class="form-control" id="year">
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2019">2020</option>
                </select>
              </div>
            </div>
            <button @click="completeLeads"
                    :disabled="!leads_to_complete.length"
                    class="btn btn-sm btn-success ladda-button m-t"
                    id="complete_leads"
                    data-style="zoom-out">
              <span class="ladda-label">{{ trans('leads.complete') }}</span>
            </button>
          </div>
          <div class="col-xs-6">
            <table>
              <tbody>
              <tr>
                <td><b>{{ trans('messages.available') }}:</b></td>
                <td class="text-right">
                  <b>
                    <money :sum="advertiser_balance" :currency_id="advertiser_currency_id" class="m-l"></money>
                  </b>
                </td>
              </tr>
              <tr>
                <td><b>Total:</b></td>
                <td class="text-right">
                  <b>
                    <money :sum="total_advertiser_charge" :currency_id="advertiser_currency_id" class="m-l"></money>
                  </b>
                </td>
              </tr>
              <tr>
                <td><b>{{ trans('messages.publisher_payout') }}:</b></td>
                <td class="text-right">
                  <b>
                    <money :sum="total_publisher_payout" :currency_id="advertiser_currency_id" class="m-l"></money>
                  </b>
                </td>
              </tr>
              <tr>
                <td><b>{{ trans('messages.profit') }}:</b></td>
                <td class="text-right">
                  <b>
                    <money :sum="profit" :currency_id="advertiser_currency_id" class="m-l"></money>
                  </b>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_LEADS = {!! json_encode(Lang::get('leads')) !!};
      LANG_USERS = {!! json_encode(Lang::get('users')) !!};
      let ADVERTISER = {!! json_encode($advertiser) !!};
  </script>
  <script src="/admin/leads/completion/leads/build.js?{{ Config::get('app.version') }}"></script>
@endsection