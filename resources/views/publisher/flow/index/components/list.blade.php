<div class="relative">
  <table class="table table-hover table-condensed text-center table-light-td" id="flow_table">
    <thead>
    <tr>
      <th></th>
      <th>{{ trans('messages.offer') }}</th>
      <th>{{ trans('messages.24hours') }}</th>
      <th style="text-align: left">{{ trans('messages.transits') }}</th>
      <th style="text-align: left">{{ trans('messages.landings') }}</th>
      <th style="width: 72px">{{ trans('messages.created') }}</th>
      <th style="width: 50px"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="flow in flows" :key="flow.hash">
      <td class="text-left">
        <a class="flow-title" :href="flow.hash | flow_url">@{{ flow.title }}<span
                  v-if="flow.group" :style="{backgroundColor: flow.group.color}"
                  class="badge badge-sm m-l-xs pull-right m-t-xs"
                  data-toggle="tooltip" data-title="{{ trans('messages.group') }}"
          >@{{ flow.group.title }}</span>
          <i v-if="!flow.offer.is_publisher_active"
             class="fa fa-exclamation-triangle yellow_t"
             :title="LANG_FLOWS.offer_is_no_active"
             data-toggle="tooltip"></i>
        </a>
        <div>
          <span class="fs11 text-muted">ID: @{{ flow.hash }}</span>
        </div>
      </td>
      <td>
        <div class="pull-left text-left">
          <a v-if="flow.offer.is_publisher_active" class="pull-left" :href="'/offers/' + flow.offer.hash"
          >@{{ flow.offer.title }}</a>
          <template v-else>@{{ flow.offer.title }}</template>
        </div>
      </td>
      <td style="vertical-align: bottom">
        <flow-chart :id="'flow-chart-' + flow.hash" :day_statistics="flow.day_statistics"></flow-chart>
      </td>
      <td class="text-left">
        <template v-if="flow.transits.length <= 2">
          <div v-for="transit in flow.transits">[@{{ transit.locale.code }}] @{{ transit.title }}</div>
        </template>

        <template v-else>
          <div v-for="(transit, i) in flow.transits" v-if="i < 2">
            [@{{ transit.locale.code }}] @{{ transit.title }}
          </div>

          <div class="collapse" :id="'flow-transit-' + flow.hash" :data-id="'#flow-transit-button-' + flow.hash">
            <div v-for="(transit, i) in flow.transits" v-if="i >= 2">
              [@{{ transit.locale.code }}] @{{ transit.title }}
            </div>
          </div>

          <div :id="'flow-transit-button-' + flow.hash" class="show-more">
            <span :href="'#flow-transit-' + flow.hash"
                  class="internal-link" data-toggle="collapse">
              {{ trans('messages.show') }}
            </span>
          </div>
        </template>
      </td>
      <td class="text-left" style="max-width: 150px">
        <template v-if="flow.landings.length <= 2">
          <div v-for="landing in flow.landings">[@{{ landing.locale.code }}] @{{ landing.title }}</div>
        </template>

        <template v-else>
          <div v-for="(landing, i) in flow.landings" v-if="i < 2">
            [@{{ landing.locale.code }}] @{{ landing.title }}
          </div>

          <div :id="'flow-landing-' + flow.hash" :data-id="'#flow-landing-button-' + flow.hash" class="collapse">
            <div v-for="(landing, i) in flow.landings" v-if="i >= 2">
              [@{{ landing.locale.code }}] @{{ landing.title }}
            </div>
          </div>

          <div :id="'flow-landing-button-' + flow.hash" class="show-more">
            <span :href="'#flow-landing-' + flow.hash"
                  class="internal-link" data-toggle="collapse">
              {{ trans('messages.show') }}
            </span>
          </div>
        </template>
      </td>
      <td>@{{ flow.created_at | date }}</td>
      <td>
        <div class="btn-group">
          <button type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown"
                  aria-expanded="false">
            <i class="fa fa-cog"></i> <span class="caret"></span>
          </button>
          <ul class="dropdown-menu dropdown-right">
            <li>
              <a :href="flow.hash | flow_url">{{ trans('messages.edit') }}</a>
            </li>
            <li>
              <a @click="openLinkModal(flow)">
                {{ trans('messages.get_link') }}
              </a>
            </li>
            <li>
              <a @click="openCloneFlowModal(flow)">
                {{ trans('messages.clone') }}
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a @click="deleteFlow(flow)"> {{ trans('messages.hide') }}</a>
            </li>
          </ul>
        </div>

      </td>
    </tr>
    </tbody>
  </table>
</div>
<empty-list-message v-if="!flows.length && pagination.finished"
                    message="{!! trans('flows.on_get_list_not_found') !!}"></empty-list-message>
