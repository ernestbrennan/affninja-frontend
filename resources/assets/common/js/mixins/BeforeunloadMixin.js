let beforeunload_mixin = {
    data() {
        return {
            beforeunload_mixin_text: '',
        }
    },
    methods: {
        addOnBeforeunloadEvent(text) {
            this.beforeunload_mixin_text = text;
            window.addEventListener("beforeunload", this.handler);
        },

        removeOnBeforeunloadEvent() {
            window.removeEventListener("beforeunload", this.handler);
        },

        handler(e) {
            e = e || window.event;

            // For IE and Firefox prior to version 4
            if (e) {
                e.returnValue = this.beforeunload_mixin_text;
            }

            // For Safari
            return this.beforeunload_mixin_text;
        },
    },
};