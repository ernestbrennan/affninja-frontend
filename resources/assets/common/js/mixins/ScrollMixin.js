const scroll_mixin = {
    data() {
        return {
            pagination: {
                page: 1,
                per_page: 10,
                loading: false,
                finished: false
            },
        }
    },

    mounted() {
        let onscroll_callback = _.get(this, 'onscroll_callback');
        if (_.get(this, 'onscroll_callback') === undefined) {

        }
    },

    methods: {
        onScroll(e) {
            let wrapper = e.target,
                list = wrapper.firstElementChild,
                scroll_top = wrapper.scrollTop,
                wrapper_height = wrapper.offsetHeight,
                list_height = list.offsetHeight,
                diff_height = list_height = wrapper_height;

            if (!this.pagination.loading && true) {
                this.page += 1;
                this.onscroll_callback();
            }
        },

        refreshState() {
            this.pagination.page = 1;
            this.pagination.finished = false;
        },
    },
};