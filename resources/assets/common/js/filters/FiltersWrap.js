Vue.component('filters-wrap', {
    props: {
        filters: {
            required: true,
            type: Array,
        }
    },
    data() {
        return {
            LANG_FILTERS: LANG_FILTERS,
            LANG_MESSAGES: LANG_MESSAGES,
            is_open: false,
            filters_values: [],
            filters_count: 0,
        };
    },

    created() {
        filters_bus.$on('filter-opened', (opened_filter_name) => {
            if (opened_filter_name === 'close_all_filters') {
                this.is_open = false;
            }
        });

        this.filters.forEach(item => {
            filters_bus.$on(item + '-init', value => {
                if (_.find(this.filters_values, {item: item}) === undefined) {
                    this.filters_values.push({item, value});
                }
            });

            filters_bus.$on(item + '-updated', value => {
                let filter = _.find(this.filters_values, {item: item});
                filter.value = value;
            });
        });
    },

    watch: {
        'filters_values': {
            deep: true,
            handler() {
                let filters_count = this.filters_values.filter(item => item.value.length);
                this.filters_count = filters_count.length;
            }
        },
    },

    methods: {
        onApplyClick() {
            this.is_open = !this.is_open;
            filters_bus.$emit('filters-applies');
        },
    },

    template: `
        <div class="filter filters_wrap">
            <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
                {{ LANG_FILTERS.group_filter }}  
                <b @click="is_open = !is_open" v-show="filters_count">{{ filters_count }}</b>
            </button>
            <div v-show="is_open" class="filter_overlay in-shadow"></div>
            <div v-show="is_open" 
                class="filter_wrap_new no-in-shadow"
                :style="{ width: 'auto', maxWidth: 'initial', paddingBottom: '2px' }">
                <div class="clearfix">

                    <slot></slot>  
              
                    <div class="filter">
                        <button @click="onApplyClick" 
                                class="btn btn-success btn-outline btn-sm ladda-button btn-filter"
                                type="button">
                            {{ LANG_FILTERS.apply }}
                        </button>
                    </div>
                </div>
            </div>
        </div>`
});
