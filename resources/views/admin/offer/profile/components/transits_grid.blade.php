<div class="flow_transits_wrap flow_items_wrap">
  <ul class="items_wrap" id="transits_wrap">
    <li v-if="transits.length" v-for="(transit, index) in transits" class="transit flow_item">
      <div class="preview_title">
        <a :href="transit.domains[0].host" class="nowrap" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>[@{{ transit.locale.code }}] @{{ transit.title }}
        </a>
      </div>
      <div class="preview_wrap">
        <div class="preview_overlay">
          <i data-selected="{{ trans('messages.selected') }}"
             data-cancel="{{ trans('messages.cancel_it') }}"></i>
        </div>
        <div class="preview_box">
          <responsive-label :is_responsive="transit.is_responsive"></responsive-label>
          <mobile-label :is_mobile="transit.is_mobile"></mobile-label>
          <private-label :is_private="transit.is_private"></private-label>
          <inactive-label :is_active="transit.is_active" :only_icon="true"></inactive-label>

          <img :src="transit.thumb_path | cdn_nocache"
               :alt="transit.title"
               class="preview_image">
          <div class="offer_item_action_btn_wrap">
            <button @click.stop="openTransitEditModal(index)" type="button"
                    class="btn btn-default btn-xs offer_item_action_btn">
              <i class="fa fa-pencil"></i>
            </button>
            <button @click.stop="openEntityDomainModal(transit)"
                    class="btn btn-default btn-xs offer_item_action_btn" type="button">
              www
            </button>
            <button v-show="transit.is_private == 1"
                    @click.stop="openTransitPermissionModal(transit.hash)"
                    type="button" class="btn btn-xs btn-default offer_item_action_btn">
              <i class="fa fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
      <ctr-table :ctr="transit.ctr"></ctr-table>
    </li>
  </ul>
</div>