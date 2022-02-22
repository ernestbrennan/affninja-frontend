<script type="text/x-template" id="target-geo-info-component-template">
  <div>
    <table v-show="target_geo_list.length" class="table table-th-left table-striped table-condensed table-hover">
      <thead>
      <tr>
        <th style="width: 79px;">{{ trans('messages.id') }}</th>
        <th class="w115">{{ trans('messages.country') }}</th>
        <th class="w125">
        <span data-toggle="tooltip" title="{{ trans('offers.payout_for_group') }}"
        >{{ trans('messages.publisher_payout') }}</span>
        </th>
        <th class="w130">
          <span data-toggle="tooltip" title="{{ trans('messages.on_landing') }}">{{ trans('messages.price') }}</span>
        </th>
        <th class="w130">
          <span data-toggle="tooltip"
                title="{{ trans('messages.on_landing') }}">{{ trans('messages.old_price') }}</span>
        </th>
        <th class="w105">{{ trans('messages.hold') }}</th>
        <th class="w180"></th>
        <th class="w165"></th>
        <th style="width: 47px"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(target_geo, index) in target_geo_list">
        <td>@{{ target_geo.hash }}</td>
        <td>
          <img :src="'{{ env('CDN_HOST') }}' + target_geo.country.thumb_path"
               :alt="target_geo.country.title" class="flag"> @{{ target_geo.country.title }}
        </td>
        <td>
          <money :sum="target_geo.payout" :currency_id="target_geo.payout_currency_id"></money>
        </td>
        <td><span v-html="target_geo.price + target_geo.price_currency.sign"></span></td>
        <td><span v-html="target_geo.old_price + target_geo.price_currency.sign"></span></td>
        <td><span v-html="target_geo.hold_time + '{{ trans('messages.minutes_sm') }}'"></span></td>
        <td>
        <span v-show="landing_type === 'internal'"
              @click="openTargetGeoRulesModalEvent(target_index, index, target_geo.id, target_geo.target_geo_rules, target_geo.target_geo_rule_sort_type)"
              class="pointer link_dotted">
        {{ trans('target_geo.show_rules') }} (@{{ target_geo.target_geo_rules.length }})
        </span>
          <span v-show="target_geo.target_geo_rules.length < 1 && landing_type === 'internal'" class="red_t">
        {{ trans('target_geo.rules_not_found') }}
        </span>
          <template v-if="landing_type === 'external'">
             <span @click="openIntegrationsModal(target_geo)"
                   class="pointer link_dotted"
             >{{ trans('messages.integration') }}</span>
            <span v-if="target_geo.integration === null" class="red_t">{{ trans('messages.not_configured') }}</span>
          </template>
        </td>
        <td>
          <default-label :is_default="target_geo.is_default"></default-label>
          <inactive-label :is_active="target_geo.is_active"></inactive-label>
        </td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-default dropdown-toggle btn-xs" data-toggle="dropdown"
                    aria-expanded="false">
              <i class="fa fa-cog"></i> <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-right">
              <li>
                <a @click.prevent="openTargetGeoEditModal(index)" href="#">{{ trans('messages.edit') }}</a>
              </li>
              <li>
                <a @click.prevent="openTargetGeoStakesModal(index)" href="#">{{ trans('messages.payouts') }}</a>
              </li>
              <li>
                <a @click.prevent="openTargetGeoCloneModal(index)" href="#">{{ trans('messages.clone') }}</a>
              </li>
            </ul>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <empty-list-message v-if="!target_geo_list.length"
                        message="{{ trans('target_geo.not_found') }}"></empty-list-message>
  </div>
</script>