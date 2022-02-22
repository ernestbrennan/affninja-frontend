<div class="flow_transits_wrap flow_items_wrap">
  <ul v-if="transits.length" class="items_wrap" id="transits_wrap">
    <li v-for="transit in transits" class="flow_item selectable">
      <div class="preview_title">
        <a v-if="transit.locale" :href="transit.domains[0].host" class="nowrap" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>[@{{ transit.locale.code }}] @{{ transit.title }}
        </a>
        <span v-else class="nowrap">@{{ transit.title }}</span>
      </div>
      <div @click="selected_transit = transit"
           :class="['preview_wrap', selected_transit.hash === transit.hash ? 'flow_item_selected ckech_image': '']">
        <div class="preview_overlay">

        </div>
        <div :class="['preview_box', !transit.hash ? 'preview_no_image' : '']">
          <responsive-label :is_responsive="transit.is_responsive"></responsive-label>
          <mobile-label :is_mobile="transit.is_mobile"></mobile-label>
          <private-label :is_private="transit.is_private"></private-label>
          <img v-if="transit.hash" class="preview_image" :src="CDN_HOST + transit.thumb_path" :alt="transit.title">
        </div>
      </div>
      <ctr-table v-if="transit.hash" :ctr="transit.ctr"></ctr-table>
    </li>
    <empty-list-message v-if="!transits.length"
                        message="{{ trans('messages.empty_list_transits') }}"></empty-list-message>
  </ul>
</div>