Vue.component('landings', {
    template: '#landings-tpl',
    props: ['landings'],
    data() {
        return {
            CDN_HOST: CDN_HOST,
            landing_info: null,
            list_type: localStorage.getItem('landings_list_type') || 'list',
            selected_landing: null,
        }
    },

    watch: {
        'landings': {
            deep: true,
            immediate: true,
            handler() {
                this.selected_landing = this.landings[0];
            },
        },

        'selected_landing': {
            immediate: true,
            handler() {
                this.$emit('selected-landing-updated', this.selected_landing);
            },
        },
    },

    mounted() {
        this.selected_landing = this.landings[0];

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