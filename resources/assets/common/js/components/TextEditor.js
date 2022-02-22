Vue.component('text-editor', {
    props: {
        value: {
            type: String,
        },
    },
    data() {
        return {
            content: null,
            settings: {
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{'header': 1}, {'header': 2}],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'script': 'sub'}, {'script': 'super'}],
                        [{'indent': '-1'}, {'indent': '+1'}],
                        [{'direction': 'rtl'}],
                        [{'size': ['small', false, 'large', 'huge']}],
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],
                        [{'font': []}],
                        [{'color': []}, {'background': []}],
                        [{'align': []}],
                        ['clean'],
                        ['link', 'image', 'video']
                    ],
                    history: {
                        delay: 1000,
                        maxStack: 50,
                        userOnly: false
                    },
                    imageDrop: true,
                    imageResize: {
                        displayStyles: {
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white'
                        },
                        modules: ['Resize', 'DisplaySize', 'Toolbar']
                    },
                },
                placeholder: '',
            },
        };
    },

    watch: {
        value: {
            immediate: true,
            handler(value) {
                this.content = value;
            },
        },
    },

    methods: {
        onChange(e) {
            this.$emit('input', e.html)
        },
    },

    template: `<quill-editor :content="content" @change="onChange($event)" :options="settings"></quill-editor>`
});