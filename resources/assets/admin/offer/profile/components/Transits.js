Vue.component('transits', {
    template: '#transits-component-template',
    props: ['locales', 'transits', 'targets', 'offer_id'],
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            transit_info: {
                offer_id: null,
                is_active: 0,
                is_private: 0,
                is_responsive: 0,
                is_mobile: 0,
                is_advertiser_viewable: 0,
                locale_id: null,
                title: '',
                subdomain: '',
                target_id: null,
                realpath: '/transit/',
            },
            action: null,
            transit_index: null,
            transit_settings_modal: null,
            transit_preview: null,
            landings_path: null,
            list_type: localStorage.getItem('transits_list_type') || 'list',
            selected_locale: {},
            active_transit_hash: null,
        }
    },

    mounted() {
        this.transit_settings_modal = $('#transit_settings_modal');
        this.transit_preview = $('#transit_preview');

        System.getLandingsPath().then(landings_path => this.landings_path = landings_path);
    },

    watch: {
        'transit_info.subdomain'() {
            if (this.action === 'edit') {
                return;
            }

            this.transit_info.realpath = '/transit/' + this.transit_info.subdomain;
        },

        'selected_locale'() {
            if (is_null(this.selected_locale)) {
                return;
            }

            this.transit_info.locale_id = this.selected_locale.id;
        },
    },

    methods: {
        openTransitPermissionModal(transit_hash) {
            this.active_transit_hash = transit_hash;
            this.$refs['transit-permissions-modal'].openModal();
        },

        onListTypeUpdated(list_type) {
            this.list_type = list_type;
            localStorage.setItem('transits_list_type', list_type);
        },

        refreshTransitData() {
            this.transit_info = {
                offer_id: this.offer_id,
                is_active: 1,
                is_private: 0,
                target_id: 0,
                is_responsive: 1,
                is_mobile: 0,
                locale_id: null,
                is_advertiser_viewable: 1,
                subdomain: '',
                title: '',
                order_page_landing_id: 0,
                use_foreign_order_page: 0,
                realpath: '/transit/',
            };
        },

        openTransitCreateModal() {
            this.action = 'create';
            this.refreshTransitData();

            this.transit_info.target_id = this.targets[0].id;
            this.selected_locale = _.find(this.locales, {id: this.targets[0].locale_id});
            this.transit_info.locale_id = this.selected_locale.id;

            $('#transit_preview').val('');
            this.transit_settings_modal.modal();
        },

        createTransit() {
            let ladda = LaddaPreloader.start('#transit_create_submit_btn'),
                params = this.transit_info;

            params.offer_id = this.offer_id;

            api.post('/transit.create', params).then(response => {
                this.$emit('transit-created', response.data.response);
                this.transit_settings_modal.modal('hide');
                this.clearPreview();

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        openTransitEditModal(index) {
            this.transit_index = index;
            this.action = 'edit';

            let transit = this.transits[index];

            this.transit_info = _.pick(transit, [
                'id', 'hash', 'locale_id', 'offer_id', 'target_id', 'title', 'subdomain',
                'is_active', 'is_private', 'is_responsive', 'is_mobile', 'is_advertiser_viewable'
            ]);

            this.selected_locale = _.find(this.locales, {id: this.transit_info.locale_id});
            this.transit_info.realpath = transit.domains[0].realpath.replace(this.landings_path, '');

            this.transit_settings_modal.modal();
        },

        editTransit() {
            let ladda_handler = LaddaPreloader.start('#transit_edit_submit_btn'),
                params = this.transit_info;

            params.offer_id = this.offer_id;

            api.post('/transit.edit', params).then(response => {
                this.$emit('transit-edited', this.transit_index, response.data.response);
                this.transit_settings_modal.modal('hide');
                this.clearPreview();

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda_handler);
            }, () => {
                LaddaPreloader.stop(ladda_handler);
            });
        },

        uploadTransitPreview(e) {
            let data = new FormData(), file, self = this;
            file = e.target.files || e.dataTransfer.files;
            data.append('preview', file[0]);
            data.append('locale', app_locale_code);

            $.ajax({
                url: API_HOST + '/file.uploadImage',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success(result) {
                    self.transit_info.thumb_path = result.response.thumb_path;

                    showMessage('success', result.message);
                },
                error(result) {
                    showErrorsInAlert(JSON.parse(result.responseText));
                }
            });
        },

        clearPreview() {
            this.transit_preview.val('');
        },

        openEntityDomainModal(transit) {
            vm.openEntityDomainModal(transit, 'transit');
        },
    }
});
