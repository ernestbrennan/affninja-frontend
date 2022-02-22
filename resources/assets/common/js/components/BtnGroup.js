Vue.component('btn-group-item', {
    props: ['active'],
    data() {
        return {
            buttons: null,
        }
    },

    mounted() {
        this.init();
    },

    watch: {
        'active'() {
            if (is_null(this.buttons)) {
                return;
            }

            this.buttons.removeClass('active').filter('[data-id="' + this.active + '"]').addClass('active');
        },
    },

    methods: {
        init() {
            let self = this;

            return new Promise((resolve) => {
                this.$nextTick(() => {
                    this.buttons = $(this.$el.children);

                    this.buttons.filter('[data-id="' + this.active + '"]').addClass('active');
                    this.buttons.on('click', function () {
                        self.buttons.removeClass('active');
                        $(this).addClass('active');
                        self.$emit('updated', $(this).data('id'));
                    });

                    resolve();
                });
            })
        },
    },

    template: `
        <div class="btn-group" role="group">
            <slot></slot>
        </div>`,
});