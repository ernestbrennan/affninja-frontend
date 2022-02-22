Vue.component('transits', {
    template: '#transits-tpl',
    props: ['transits'],
    data() {
        return {
            CDN_HOST: CDN_HOST,
            transit_info: null,
            list_type: localStorage.getItem('transits_list_type') || 'list',
            selected_transit: null,
        }
    },

    watch: {
        'transits': {
            deep: true,
            immediate: true,
            handler() {
                this.selected_transit = this.transits[0];
            },
        },

        'selected_transit': {
            immediate: true,
            handler() {
                this.$emit('selected-transit-updated', this.selected_transit);
            },
        },
    },

    mounted() {
        this.selected_transit = this.transits[0];

        Vue.nextTick(() => {
            runTooltip();
        });
    },

    methods: {
        onListTypeUpdated(list_type) {
            this.list_type = list_type;
            localStorage.setItem('transits_list_type', list_type);
        },
    },
});