const on_scroll_mixin = {
    methods: {
        onScroll(e, callback) {
            if (e.target.scrollHeight - e.target.clientHeight <= e.target.scrollTop + 50 && activeAjax == false) {
                callback();
            }
        },
    },
};