Vue.component('targets', {
    template: '#targets-component-template',
    props: ['locales', 'countries', 'currencies', 'integrations', 'targets', 'offer_info', 'user_groups'],
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            action: null,
            target_index: null,
            target_info: {},
            target_geo_info: {},
            target_settings_modal: null,
            selected_locale: null,
            templates: [],
            selected_template: {},
            types: [
                {title: 'CPA', value: 'CPA'},
                {title: 'CPL', value: 'CPL'},
            ],
            selected_type: {},
            privacy_types: [
                {title: LANG_OFFERS.target_available_only, value: 1},
                {title: LANG_OFFERS.target_available_all, value: 0},
            ],
            selected_privacy: {},
            landing_types: [
                {title: LANG_OFFERS.internal, value: 'internal'},
                {title: LANG_OFFERS.external, value: 'external'},
            ],
            selected_landing_type: {},
            selected_target: {},
            init_targets: false,
            active_target_hash: null,
            templates_loading: false,
        }
    },

    created() {
        this.getTargetTemplates();

        bus.$on('open-target-create-modal', () => {
            this.openTargetCreateModal();
        });
    },

    mounted() {
        this.target_settings_modal = $('#target_settings_modal');
    },

    watch: {
        'selected_type'() {
            if (this.selected_type.value !== 'CPL') {
                this.target_info.is_autoapprove = 0;
            }

            this.target_info.type = this.selected_type.value;
        },

        'selected_locale'() {
            this.target_info.locale_id = this.selected_locale.id;
        },

        'selected_template'() {
            this.target_info.target_template_id = this.selected_template.id;
        },

        'selected_landing_type'() {
            this.target_info.landing_type = this.selected_landing_type.value;
        },

        'selected_privacy'() {
            this.target_info.is_private = this.selected_privacy.value;
        },

        'targets'() {
            this.targets.map((target, index) => {
                target.title = `[${target.label}] ${target.template.title}`;
                target.index = index;
            });

            if (!this.init_targets) {
                this.init_targets = true;
                let selected_target = _.find(this.targets, {hash: localStorage.getItem('active_target_hash')});
                this.selected_target = selected_target || this.targets[0] || {};
            }

            if (!this.targets.length) {
                this.selected_target = {};
            }
        },

        'selected_target'() {
            if (!Object.size(this.selected_target)) {
                return;
            }

            this.active_target_hash = this.selected_target.hash;
            this.$emit('selected-target-updated', this.selected_target);
        },

        'active_target_hash'() {
            localStorage.setItem('active_target_hash', this.active_target_hash);
            this.selected_target = _.find(this.targets, {hash: this.active_target_hash});
        },
    },

    methods: {
        localeUpdated(locale_id) {
            this.target_info.locale_id = locale_id;
        },

        openTargetGeoCreateModal(target_index, target_geo_index) {
            vm.openTargetGeoCreateModal(target_index, target_geo_index);
        },

        openTargetPermissionsModal() {
            this.$parent.openTargetPermissionsModal();
        },

        openTargetCreateModal() {
            this.action = 'create';
            this.selected_locale = this.locales[0];
            this.selected_template = this.templates[0] || {};
            this.selected_type = this.types[0];
            this.selected_landing_type = this.landing_types[0];

            this.target_info = {
                is_active: 0,
                is_default: 0,
                is_autoapprove: 0,
                is_private: 0,
                label: '',
                locale_id: this.selected_locale.id,
                target_template_id: this.selected_template.id,
                type: this.selected_type.value,
                landing_type: this.selected_landing_type.value,
            };

            this.selected_privacy = this.privacy_types[0] || {};

            this.target_settings_modal.modal();
        },

        createTarget() {
            let params = _.pick(this.target_info, ['locale_id', 'target_template_id', 'is_active', 'is_default', 'is_autoapprove',
                    'type', 'landing_type', 'label', 'is_private']),
                ladda_handler = LaddaPreloader.start('#target_create_submit');

            params.offer_id = this.offer_info.id;

            api.post('/target.create', params).then(response => {
                let target = response.data.response;
                target.landings = [];
                target.transits = [];

                target.publishers = [];
                target.user_groups = [];

                vm.targetCreatedEvent(target);
                this.selected_target = target;

                this.target_settings_modal.modal('hide');
                this.target_info = {};

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda_handler);

                this.selected_target = response.data.response;
            }, () => {
                LaddaPreloader.stop(ladda_handler);
            });
        },

        openTargetEditModal(target_index) {
            this.action = 'edit';
            this.target_index = target_index;
            this.target_info = _.assign({}, this.targets[target_index]);
            this.selected_locale = _.find(this.locales, {id: this.target_info.locale_id});
            this.selected_type = _.find(this.types, {value: this.target_info.type});
            this.selected_privacy = _.find(this.privacy_types, {value: this.target_info.is_private});
            this.selected_landing_type = _.find(this.landing_types, {value: this.target_info.landing_type});

            let template = _.find(this.templates, {id: this.target_info.target_template_id});
            this.selected_template = template;
            Vue.set(this.target_info, 'template', template);

            this.target_settings_modal.modal();
        },

        editTarget() {
            let ladda = LaddaPreloader.start('#target_edit_submit'),
                params = _.pick(this.target_info, ['id', 'offer_id', 'locale_id', 'target_template_id', 'is_active',
                    'is_autoapprove', 'is_default', 'type', 'label', 'is_private']);

            api.post('/target.edit', params).then(response => {
                let target = response.data.response;

                target.landings = this.selected_target.landings;
                target.transits = this.selected_target.transits;

                if (this.target_info.is_private) {
                    target.publishers = this.selected_target.publishers;
                    target.user_groups = this.selected_target.user_groups;
                } else {
                    target.publishers = [];
                    target.user_groups = [];
                }

                this.selected_target = target;
                vm.targetEditedEvent(this.target_index, target);

                this.target_settings_modal.modal('hide');
                this.target_info = {};

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        deleteTarget(target_index, target_id) {

            Swal.show(LANG_TARGETS.on_delete_msg).then(() => {

                let ladda = LaddaPreloader.start('#target_delete_submit');

                api.post('/target.delete', {id: target_id}).then(response => {

                    vm.targetDeletedEvent(target_index);

                    if (this.targets.length) {
                        this.selected_target = this.targets[0];
                        this.$emit('selected-target-updated', this.selected_target);
                    }

                    this.target_settings_modal.modal('hide');
                    showMessage('success', response.data.message);
                    LaddaPreloader.stop(ladda);
                }, () => {
                    LaddaPreloader.stop(ladda);
                });

            }, () => {
            });
        },

        getTargetTemplates() {
            this.templates_loading = true;

            TargetTemplates.getList(['translations']).then((result) => {
                this.templates = result;
                this.templates_loading = false;
            });
        },
    }
});