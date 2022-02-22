<div class="modal fade" tabindex="-1" role="dialog" id="lead_status_modal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">{{ trans('statistics.integrations_history') }}</h4>
      </div>
      <div class="modal-body">
        <ul class="nav nav-tabs m-t-n m-b">
          <li class="active">
            <a data-toggle="tab" data-stat="false" href="#tab-status">
              {{ trans('statistics.statuses') }}
            </a>
          </li>
          <li>
            <a data-toggle="tab" data-stat="false" href="#tab-postback">
              {{ trans('postbacks.postback') }}
            </a>
          </li>
        </ul>
        <div id="tab-content-status-wrap">
          <div class="tab-content">
            <div id="tab-status" class="tab-pane active">
              <table class="table table-bordered table-striped table-condensed"
                     id="status-list-table">
                <thead>
                <tr>
                  <th style="width: 38px">{{ trans('messages.date') }}</th>
                  <th>{{ trans('messages.integration') }}</th>
                  <th>{{ trans('messages.external_key') }}</th>
                  <th>{{ trans('messages.sub_status') }}</th>
                  <th>{{ trans('messages.status') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(log, index) in status_logs" :key="index">
                  <td :data-title="strtotime(log.created_at)" class="text-left">
                    @{{ log.created_at | datetime }}
                  </td>
                  <td>
                    <span v-if="log.integration">@{{ log.integration.title }}</span>
                  </td>
                  <td>@{{ log.external_key }}</td>
                  <td>
                    <lead-substatus-trans :sub_status_id="log.sub_status_id"></lead-substatus-trans>
                  </td>
                  <td :style="getLeadStatusTdStyle(log)">@{{ log.status | lead_status }}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div id="tab-postback" class="tab-pane">
              <table class="table table-bordered table-striped table-condensed"
                     id="postback-list-table">
                <thead>
                <tr>
                  <th style="width: 38px">{{ trans('messages.date') }}</th>
                  <th>{{ trans('statistics.th_parameters') }}</th>
                  <th>{{ trans('messages.answer') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(postback, index) in postbackin_logs" :key="index">
                  <td :data-title="strtotime(postback.created_at)" class="text-left">
                    @{{ postback.created_at | datetime }}
                  </td>
                  <td>
                    <span class="break-all">@{{ buildUrlParams(postback.request_array) }}</span>
                  </td>
                  <td>@{{ postback.response }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>