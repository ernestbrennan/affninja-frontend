<div class="hpanel hpanel-white-footer">
  <div class="panel-heading hbuilt">
    <btn-group-item :active="landings_list_type" @updated="onLandingsListTypeUpdated" class="pull-right m-r-xs">
      <button class="btn btn-default btn-outline btn-xs" data-id="list" type="button">
        <i class="fa fa-list-ul"></i></button>
      <button class="btn btn-default btn-outline btn-xs" data-id="grid" type="button">
        <i class="fa fa-th"></i></button>
    </btn-group-item>
    <span class="panel-title">{{ trans('flows.all_landings') }}</span>
  </div>
  <div :class="['panel-body',
                selected_target.landings && !selected_target.landings.length ? 'display-flex-center' : '']">
    <div class="row">
      <div class="col-xs-12">
        <empty-list-message v-if="selected_target.landings && !selected_target.landings.length"
                            :message="LANG_FLOWS.landings_not_found"
                            style="margin-bottom: 30px;"
        ></empty-list-message>
        <div v-show="landings_list_type === 'grid'" class="flow_items_wrap">
          <ul class="items_wrap" id="landings_wrap">
            <li v-for="landing in selected_target.landings"
                v-show="flow_info.target_hash === selected_target.hash"
                class="flow_item selectable">

              <div class="preview_title">
                <a :href="landing.domain.host" target="_blank"
                >@{{ '[' + landing.locale.code + '] ' + landing.title }}</a>
              </div>
              <div @click="toggleSelectedLanding(landing.hash)"
                   :ref="'landing-' + landing.hash"
                   :class="['preview_wrap',
                            _.indexOf(flow_info.landings, landing.hash) !== -1 ? 'flow_item_selected' : '',
                            !landing.has_thumb ? 'preview_no_image': '']">
                <div class="preview_overlay">
                  <i :data-select="LANG_MESSAGES.select"
                     :data-selected="LANG_MESSAGES.selected"
                     :data-cancel="LANG_MESSAGES.cancel_it"></i>
                </div>
                <div class="preview_box">
                  <vibrate-mobile-label :is_vibrate_on_mobile="landing.is_vibrate_on_mobile"></vibrate-mobile-label>
                  <back-action-label :is_back_action="landing.is_back_action"></back-action-label>
                  <back-call-label :is_back_call="landing.is_back_call"></back-call-label>
                  <mobile-label :is_mobile="landing.is_mobile"></mobile-label>
                  <responsive-label :is_responsive="landing.is_responsive"></responsive-label>
                  <private-label :is_private="landing.is_private"></private-label>

                  <img v-if="landing.has_thumb" :src="landing.thumb_path | cdn_nocache" :alt="landing.title"
                       class="preview_image">
                </div>
              </div>
              <cr-epc-table :cr="landing.cr" :epc="landing.epc"></cr-epc-table>
            </li>
          </ul>
        </div>
        <div v-show="landings_list_type === 'list'">
          <div class="table">
            <table class="table table-condensed text-left table-light-td">
              <thead>
              <tr>
                <th class="w20"></th>
                <th style="min-width: 90px;"></th>
                <th></th>
                <th class="w60">{{ trans('messages.cr') }}</th>
                <th class="w60">{{ trans('messages.epc') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="landing in selected_target.landings"
                  v-show="flow_info.target_hash === selected_target.hash" :key="landing.hash"
                  @click="toggleSelectedLanding(landing.hash)"
                  class="pointer">
                <td class="checkbox_td pointer">
                  <div class="checkbox checkbox-success">
                    <input :checked="_.indexOf(flow_info.landings, landing.hash) !== -1" type="checkbox">
                    <label></label>
                  </div>
                </td>
                <td>
                  <a @click.stop :href="landing.domain.host" target="_blank"
                  >@{{ '[' + landing.locale.code + '] ' + landing.title }}</a>
                </td>
                <td class="text-right">
                  <private-label :is_private="landing.is_private"></private-label>
                  <responsive-label :is_responsive="landing.is_responsive"></responsive-label>
                  <mobile-label :is_mobile="landing.is_mobile"></mobile-label>
                  <back-call-label :is_back_call="landing.is_back_call"></back-call-label>
                  <back-action-label :is_back_action="landing.is_back_action"></back-action-label>
                  <vibrate-mobile-label :is_vibrate_on_mobile="landing.is_vibrate_on_mobile"></vibrate-mobile-label>
                </td>
                <td class="text-center">@{{ landing.cr }}%</td>
                <td class="text-center">@{{ landing.epc }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>