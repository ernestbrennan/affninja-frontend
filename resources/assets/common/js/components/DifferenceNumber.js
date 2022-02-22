Vue.component('difference', {
    props: ['difference'],
    data() {
        return {
            classname: ''
        }
    },
    created() {
        let difference = parseFloat(this.difference);
        if (difference < 0) {
            this.classname = 'red_t';
        } else if (difference > 0) {
            this.classname = 'green_t';
        } else {
            this.classname = 'grey_t';
        }
    },
    template: `<span :class="classname">{{ difference }}</span>`,
});
