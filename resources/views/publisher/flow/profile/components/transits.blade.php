<div class="hpanel">
  <div class="panel-heading hbuilt">
    <btn-group-item :active="transits_list_type" @updated="onTransitsListTypeUpdated" class="pull-right m-r-xs">
      <button class="btn btn-default btn-outline btn-xs" data-id="list" type="button">
        <i class="fa fa-list-ul"></i></button>
      <button class="btn btn-default btn-outline btn-xs" data-id="grid" type="button">
        <i class="fa fa-th"></i></button>
    </btn-group-item>
    <span class="panel-title">{{ trans('flows.all_transits') }}</span>
  </div>
  <div :class="['panel-body',
                selected_target.transits && !selected_target.transits.length ? 'display-flex-center' : '']">
    <div class="row">
      <div class="col-xs-12">
        <empty-list-message v-if="selected_target.transits && !selected_target.transits.length"
                            :message="LANG_FLOWS.transits_not_found"
                            style="margin-bottom: 30px;"
        ></empty-list-message>
        <div v-else>
          <div v-show="transits_list_type === 'grid'" class="flow_items_wrap">
            <ul class="items_wrap" id="transits_wrap">
              <li v-for="transit in selected_target.transits"
                  v-show="flow_info.target_hash === selected_target.hash"
                  class="flow_item selectable">
                <div class="preview_title">
                  <a :href="transit.domain.host" target="_blank">
                    @{{ '[' + transit.locale.code + '] ' + transit.title }}
                  </a>
                </div>
                <div @click="toggleSelectedTransit(transit.hash)"
                     :ref="'transit-' + transit.hash"
                     :class="['preview_wrap',
                                 _.indexOf(flow_info.transits, transit.hash) !== -1 ? 'flow_item_selected' : '' ]">
                  <div class="preview_overlay">
                    <i :data-select="LANG_MESSAGES.select"
                       :data-selected="LANG_MESSAGES.selected"
                       :data-cancel="LANG_MESSAGES.cancel_it"></i>
                  </div>
                  <div class="preview_box">
                    <responsive-label :is_responsive="transit.is_responsive"></responsive-label>
                    <mobile-label :is_mobile="transit.is_mobile"></mobile-label>
                    <private-label :is_private="transit.is_private"></private-label>
                    <img :src="CDN_HOST + transit.thumb_path" :alt="transit.title" class="preview_image">
                  </div>
                </div>
                <ctr-table :ctr="transit.ctr"></ctr-table>
              </li>
            </ul>
          </div>
          <div v-show="transits_list_type === 'list'">
            <div class="table">
              <table class="table table-condensed text-left table-light-td">
                <thead>
                <tr>
                  <th class="w20"></th>
                  <th style="min-width: 90px;"></th>
                  <th></th>
                  <th class="w60">{{ trans('messages.ctr') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="transit in selected_target.transits"
                    v-show="flow_info.target_hash === selected_target.hash" :key="transit.hash"
                    @click="toggleSelectedTransit(transit.hash)"
                    class="pointer">
                  <td class="checkbox_td pointer">
                    <div class="checkbox checkbox-success">
                      <input :checked="_.indexOf(flow_info.transits, transit.hash) !== -1" type="checkbox">
                      <label></label>
                    </div>
                  </td>
                  <td>
                    <a @click.stop :href="transit.domain.host" target="_blank">
                      @{{ '[' + transit.locale.code + '] ' + transit.title }}
                    </a>
                  </td>
                  <td class="text-right">
                    <private-label :is_private="transit.is_private"></private-label>
                    <responsive-label :is_responsive="transit.is_responsive"></responsive-label>
                    <mobile-label :is_mobile="transit.is_mobile"></mobile-label>
                  </td>
                  <td class="text-center">@{{ transit.ctr }}%</td>
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