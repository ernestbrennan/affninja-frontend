Vue.component('landings', {
    template: '#landings-tpl',
    props: ['landings'],
    data() {
        return {
            CDN_HOST: CDN_HOST,
            list_type: localStorage.getItem('landings_list_type') || 'list',
        }
    },

    mounted() {
        Vue.nextTick(() => {
            runTooltip();
        });
    },

    methods: {
        onListTypeUpdated(list_type) {
            this.list_type = list_type;
            localStorage.setItem('landings_list_type', list_type);
        },
    },
});