let filters_mixin = {
    data() {
        return {
            is_open: false,
        };
    },

    created() {
        filters_bus.$on('filter-opened', (opened_filter_name) => {
            if (this.name !== opened_filter_name) {
                this.is_open = false;
            }
        });
    },

    watch: {
        'is_open'() {
            if (this.is_open) {
                filters_bus.$emit('filter-opened', this.name);
            }
        },
    },
};
