<ul class="list-group aside-list-group">
  <li @click="labelUpdated(0)"
      :class="['list-group-item pointer list-header', label_id === 0 ? 'active' : '']">
    {{ trans('offers.all_labels') }}
  </li>
  <li v-for="label in labels" @click="labelUpdated(label.id)"
      :class="['list-group-item pointer nowrap', label.id === label_id ? 'active' : '']">
    @{{ label.title }}
    <span v-if="label.offers_count"
          class="badge badge-sm badge-success m-t-xxs">
        @{{ label.offers_count }}
      </span>
  </li>
</ul>

<ul class="list-group aside-list-group">
  <li @click="categoryUpdated(null)"
      :class="['list-group-item pointer list-header', category_id === null ? 'active' : '']">
    {{ trans('filters.all_offer_categories') }}
  </li>
  <li v-for="category in categories" @click="categoryUpdated(category.id)"
      :class="['list-group-item pointer', category.id === category_id ? 'active' : '']">
    @{{ category.title }}
    <span v-if="category.offers_count"
          class="badge badge-sm badge-success m-t-xxs">@{{ category.offers_count }}</span>
  </li>
</ul>