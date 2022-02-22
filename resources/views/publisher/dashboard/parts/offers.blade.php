<h3>{{ trans('offers.index_title') }}</h3>
<ul class="nav nav-tabs m-b">
  <li :class="[offer_type === 'hot' ? 'active' : '']">
    <a @click="offer_type = 'hot'">
      {{ trans('offers.tab_hot_offers') }}
      <span id="quantity_hot_offers"><b v-html="count_hot_offers"></b></span>
    </a>
  </li>
  <li :class="[offer_type === 'new' ? 'active' : '']">
    <a @click="offer_type = 'new'">
      {{ trans('offers.tab_new_offers') }}
      <span id="quantity_new_offers"><b v-html="count_new_offers"></b></span>
    </a>
  </li>
</ul>
<div v-show="offer_type === 'hot'" @scroll="onScroll($event, reloadOffers)" class="hpanel overflow"
     id="hot_offers_list_wrap">
  <hot-offers @hot-offers-count-updated="updateHotOffersCount"
              ref="hot_offers"></hot-offers>
</div>
<div v-show="offer_type === 'new'" @scroll="onScroll($event, reloadOffers)" class="hpanel overflow"
     id="new_offers_list_wrap">
  <new-offers @new-offers-count-updated="updateNewOffersCount"
              ref="new_offers"></new-offers>
</div>

<script id="hot_offers_list_tpl" type="text/x-template">
  @include('publisher::dashboard.parts.offers_list')
</script>

<script id="new_offers_list_tpl" type="text/x-template">
  @include('publisher::dashboard.parts.offers_list')
</script>