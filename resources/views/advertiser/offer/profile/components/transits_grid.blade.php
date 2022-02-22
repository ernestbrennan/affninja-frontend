<div class="flow_transits_wrap flow_items_wrap">
  <ul v-if="transits.length" class="items_wrap" id="transits_wrap">
    <li v-for="transit in transits" class="flow_item">
      <div class="preview_title">
        <a v-if="transit.locale" :href="transit.domains[0].host" class="nowrap" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>[@{{ transit.locale.code }}] @{{ transit.title }}
        </a>
        <span v-else class="nowrap">@{{ transit.title }}</span>
      </div>
      <div class="preview_wrap">
        <div class="preview_box">
          <responsive-label :is_responsive="transit.is_responsive"></responsive-label>
          <mobile-label :is_mobile="transit.is_mobile"></mobile-label>
          <private-label :is_private="transit.is_private"></private-label>

          <img v-if="transit.hash && transit.thumb_path" class="preview_image"
               :src="CDN_HOST + transit.thumb_path"
               :alt="transit.title">
        </div>
      </div>
      <ctr-table :ctr="transit.ctr"></ctr-table>
    </li>
  </ul>
  <empty-list-message v-if="!transits.length"
                      message="{{ trans('messages.empty_list_transits') }}"></empty-list-message>
</div>