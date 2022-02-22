<div class="flow_landings_wrap flow_items_wrap">
  <ul class="items_wrap" id="landings_wrap">
    <li v-if="landings.length" v-for="(landing, index) in landings" class="landing flow_item">
      <div class="preview_title">
        <a :href="landing.domains[0].host" class="nowrap" target="_blank">
          <i class="fa fa-external-link relative t-2 m-r-xs"></i>[@{{ landing.locale.code }}] @{{ landing.title }}
        </a>
      </div>
      <div :class="['preview_wrap', !landing.has_thumb ? 'preview_no_image': '']">
        <div class="preview_overlay">
          <i data-selected="{{ trans('messages.selected') }}" data-cancel="{{ trans('messages.cancel_it') }}"></i>
        </div>
        <div class="preview_box">
          <vibrate-mobile-label :is_vibrate_on_mobile="landing.is_vibrate_on_mobile"></vibrate-mobile-label>
          <back-action-label :is_back_action="landing.is_back_action"></back-action-label>
          <back-call-label :is_back_call="landing.is_back_call"></back-call-label>
          <mobile-label :is_mobile="landing.is_mobile"></mobile-label>
          <responsive-label :is_responsive="landing.is_responsive"></responsive-label>
          <private-label :is_private="landing.is_private"></private-label>
          <inactive-label :is_active="landing.is_active" :only_icon="true"></inactive-label>

          <img v-if="landing.has_thumb" :src="landing.thumb_path | cdn_nocache" :alt="landing.title"
               class="preview_image">
          <div class="offer_item_action_btn_wrap">
            <button @click.stop="openLandingEditModal(index)"
                    class="btn btn-default btn-xs offer_item_action_btn" type="button">
              <i class="fa fa-pencil"></i>
            </button>
            <button @click.stop="openEntityDomainModal(landing)"
                    class="btn btn-default btn-xs offer_item_action_btn" type="button">
              www
            </button>
            <button v-show="landing.is_private == 1" @click.stop="openLandingPermissionModal(landing.hash)"
                    class="btn btn-xs btn-default offer_item_action_btn" type="button">
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
      <cr-epc-table :cr="landing.cr" :epc="landing.epc"></cr-epc-table>
    </li>
  </ul>
</div>