Vue.component('show-more', {
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
        };
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    },
    template: `
        <div class="text-center">
            <a @click.prevent="onClick" href="#">
                <i class="fa fa-chevron-down"></i><span class="internal-link">{{ LANG_MESSAGES.show_more }}</span>
            </a>
        </div>`,
});