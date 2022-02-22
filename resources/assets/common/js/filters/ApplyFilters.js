Vue.component('apply-filters', {
    data() {
        return {
            LANG_FILTERS: LANG_FILTERS,
            ladda: null
        };
    },

    created() {
        filters_bus.$on('apply-filter-start', () => {
            this.startLoading();
        });
        filters_bus.$on('apply-filter-stop', () => {
            LaddaPreloader.stop(this.ladda);
        });
    },

    methods: {
        emitClickEvent() {
            this.startLoading();
            filters_bus.$emit('filters-applies');
        },

        startLoading() {
            this.ladda = LaddaPreloader.start('#apply_filters');
        }
    },

    template: `<div class="filter">
      <button @click="emitClickEvent" class="btn btn-success btn-outline btn-sm ladda-button btn-filter"
       type="button" data-spinner-color="#666" data-style="zoom-out" id="apply_filters"
      ><span class="ladda-label">{{ LANG_FILTERS.apply }}</span></button>
    </div>`
});
