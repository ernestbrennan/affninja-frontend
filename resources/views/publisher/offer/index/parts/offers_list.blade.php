<div>
  <table v-if="offers.length" class="table table-condensed text-center table-light-td" id="flow_table">
    <thead>
    <tr>
      <th class="w135"></th>
      <th>{{ trans('messages.offer') }}</th>
      <th class="w-xl">{{ trans('messages.target') }}</th>
      <th class="w150"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="offer in offers" :key="offer.hash" class="offer">
      <td>
        <div class="preview small-preview">
          <img :src="CDN_HOST + offer.thumb_path" :alt="offer.title">
          <div class="labels text-right">
            <private-label :is_private="offer.is_private"></private-label>
            <offer-labels :labels="offer.labels"></offer-labels>
          </div>
        </div>
      </td>
      <td class="text-left w150">
        <div>
          <a class="offer_list_title" :href="'/offers/' + offer.hash" v-html="offer.title"></a>
        </div>
      </td>
      <td class="text-left">
        <div v-if="offer.targets.length" v-for="target in offer.targets" :key="target.hash">
          <div class="offer_target_title">
            <target-title :label="target.label"
                          :title="target.template.title"
                          class="link_dotted"
                          data-toggle="collapse"
                          :data-target="'.target-' + target.hash"
            ></target-title>
          </div>
          <div :class="[ target.hash == offer.targets[0].hash ? 'in' : '', 'collapse p-l-sm', 'target-' + target
          .hash]" class="offer">
            <div v-for="(target_geo, index) in target.target_geo" :key="index"
                 :class="[{'hidden-target-geo': index > 2 }, {'no-borders toggle-border': index == 2},
                                     {'no-borders': index === (target.target_geo.length - 1)}]"
                 class="offer_target_geo_wrap clearfix"
                 :style="{display: index > 2 ? 'none' : 'block'}">
              <target-geo-item :target_geo="target_geo" :show_coefficients="true"></target-geo-item>
            </div>
            <div class="show-more" v-show="target.target_geo.length > 3">
              <span @click="toggleTargetGeoVisibility(target.hash)"
                    :class="'btn-toggle-' + target.hash" class="closed internal-link btn-toggle">
                {{ trans('messages.show_all') }} <i class="fa fa-chevron-down"></i>
              </span>
            </div>
          </div>
        </div>
      </td>
      <td class="text-left">
        <offer-countries :targets="offer.targets" :title="offer.title"></offer-countries>
      </td>
    </tr>
    </tbody>
  </table>
  <empty-list-message v-if="!offers.length && pagination.finished"
                      message="{{ trans('offers.on_get_list_not_found') }}"></empty-list-message>
  <preloader v-show="offers.length && pagination.loading && !pagination.finished"></preloader>
</div>