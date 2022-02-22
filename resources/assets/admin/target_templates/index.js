new Vue({
    el: '#templates',
    data: {
        LANG_TEMPLATES: LANG_TEMPLATES,
        templates: [],
        template: {
            title: '',
            title_en: '',
        },
        changed_template_index: null,
        loading: false,
        preloader: null,
    },

    computed: {
        can_create_template() {
            return this.template.title.length > 0 && this.template.title_en.length > 0;
        },
    },

    created() {
        this.getTemplates();
    },

    watch: {
        'loading'() {
            if (this.loading) {
                return this.preloader = ContentPreloader.show('#target-templates-wrap');
            }

            ContentPreloader.hide(this.preloader);
        },
    },

    methods: {
        createTemplate() {
            let ladda = LaddaPreloader.start('#create-template-submit');

            TargetTemplates.create(this.template.title, this.template.title_en).then(data => {
                this.refreshTemplateInfo();
                this.templates.unshift(data.response);

                showMessage('success', data.message);
                LaddaPreloader.stop(ladda);
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        refreshTemplateInfo() {
            this.template = {
                title: '',
                title_en: '',
            };
        },

        editTemplate(template) {
            let ladda = LaddaPreloader.start('#edit-template-submit-' + template.id);

            TargetTemplates.edit(template.id, template.title, template.translations[0].title).then(data => {
                showMessage('success', data.message);

                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        getTemplates() {
            this.loading = true;

            TargetTemplates.getList(['translations']).then((result) => {
                this.templates = result;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
    },
});