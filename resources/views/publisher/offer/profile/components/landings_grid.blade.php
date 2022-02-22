<div class="flow_landings_wrap flow_items_wrap">
  <ul v-if="landings.length" class="items_wrap" id="landings_wrap">
    <li v-for="landing in landings" class="flow_item selectable">
      <div class="preview_title">
        <a :href="landing.domains[0].host" class="nowrap" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>[@{{ landing.locale.code }}] @{{ landing.title }}
        </a>
      </div>
      <div @click="selected_landing = landing"
           :class="['preview_wrap',
           selected_landing.hash === landing.hash ? 'flow_item_selected ckech_image': '',
           !landing.has_thumb ? 'preview_no_image': ''
           ]">
        <div class="preview_overlay">
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
    <empty-list-message v-if="!landings.length"
                        message="{{ trans('messages.empty_list_landings') }}"></empty-list-message>
  </ul>
</div>