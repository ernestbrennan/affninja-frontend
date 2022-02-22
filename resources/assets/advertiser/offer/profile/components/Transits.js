Vue.component('transits', {
    template: '#transits-tpl',
    props: ['transits'],
    data() {
        return {
            CDN_HOST: CDN_HOST,
            list_type: localStorage.getItem('transits_list_type') || 'list',
        }
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