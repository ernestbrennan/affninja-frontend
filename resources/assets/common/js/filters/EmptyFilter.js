Vue.component('empty-filter', {
    props: {
        name: {
            type: String
        },
        wrapper_width: {
            type: String,
            default: 'auto'
        }
    },
    data() {
        return {};
    },
    mixins: [filters_mixin],


    template: `<div class="filter">
      <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button"
      v-html="name"></button>
      <div v-show="is_open" class="filter_wrap_new" :style="{ width: wrapper_width, maxWidth: 'initial' }">
        <slot></slot>
      </div>
    </div>`
});
