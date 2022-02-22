<div class="flow_landings_wrap flow_items_wrap">
  <ul v-if="landings.length" class="items_wrap" id="landings_wrap">
    <li v-for="landing in landings" class="flow_item">
      <div class="preview_title">
        <a :href="landing.domains[0].host" class="nowrap" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>[@{{ landing.locale.code }}] @{{ landing.title }}
        </a>
      </div>
      <div :class="['preview_wrap', !landing.has_thumb ? 'preview_no_image': '']">
        <div class="preview_box">
          <responsive-label :is_responsive="landing.is_responsive"></responsive-label>
          <mobile-label :is_mobile="landing.is_mobile"></mobile-label>
          <private-label :is_private="landing.is_private"></private-label>

          <img v-if="landing.has_thumb" :src="landing.thumb_path | cdn_nocache" :alt="landing.title"
               class="preview_image">
        </div>
      </div>
      <cr-epc-table :cr="landing.cr" :epc="landing.epc"></cr-epc-table>
    </li>
  </ul>
  <empty-list-message v-if="!landings.length"
                      message="{{ trans('messages.empty_list_landings') }}"></empty-list-message>
</div>