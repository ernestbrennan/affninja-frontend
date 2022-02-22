Vue.component('landings', {
    template: '#landings-component-template',
    props: ['locales', 'landings', 'targets', 'offer_id'],
    data: function () {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            new_landing: {},
            landing_info: {
                title: '',
                is_external: 0,
                offer_id: null,
                target_id: 0,
                is_active: 0,
                is_private: 0,
                is_responsive: 0,
                is_mobile: 0,
                is_advertiser_viewable: 0,
                is_address_on_success: 0,
                is_email_on_success: 0,
                is_custom_success: 0,
                is_back_action: 0,
                is_back_call: 0,
                is_vibrate_on_mobile: 0,
                locale_id: null,
                subdomain: '',
                order_page_landing_id: 0,
                use_foreign_order_page: 0,
                realpath: '',
                url: '',
            },
            external_macro: {
                clickid: false,
                offer_hash: false,
                publisher_hash: false,
            },
            action: null,
            landing_index: null,
            landing_settings_modal: null,
            landing_preview: null,
            show_use_foreign_order_page_setting: false,
            landings_path: null,
            list_type: localStorage.getItem('landings_list_type') || 'list',
            landing_edit_modal_just_open: false,
            selected_locale: {},
            active_landing_hash: null,
        }
    },

    mounted() {
        this.landing_settings_modal = $('#landing_settings_modal');
        this.landing_preview = $('#landing_preview');

        System.getLandingsPath().then(landings_path => this.landings_path = landings_path);
    },

    computed: {
        realpath: function () {
            return '/cod/' + this.landing_info.subdomain;
        }
    },

    watch: {
        'landing_info.use_foreign_order_page'() {
            if (this.landing_info.use_foreign_order_page === 0) {
                this.landing_info.order_page_landing_id = 0;
            }
        },
        'landing_info.subdomain'() {
            if (this.action === 'edit') {
                return;
            }

            this.landing_info.realpath = '/cod/' + this.landing_info.subdomain;
        },
        'external_macro.clickid'() {
            this.rebuildExternalLandingUrl();
        },
        'external_macro.offer_hash'() {
            this.rebuildExternalLandingUrl();
        },
        'external_macro.publisher_hash'() {
            this.rebuildExternalLandingUrl();
        },
        'selected_locale'() {
            if (is_null(this.selected_locale)) {
                return;
            }

            this.landing_info.locale_id = this.selected_locale.id;
        },
    },

    methods: {
        openLandingPermissionModal(landing_hash) {
            this.active_landing_hash = landing_hash;
            this.$refs['landing-permissions-modal'].openModal();
        },

        onListTypeUpdated(list_type) {
            this.list_type = list_type;
            localStorage.setItem('landings_list_type', list_type);
        },

        openLandingCreateModal() {
            this.action = 'create';

            this.refreshLandingInfo();

            this.external_macro.clickid = false;
            this.external_macro.offer_hash = false;
            this.external_macro.publisher_hash = false;

            this.clearPreview();

            this.landing_info.target_id = this.targets[0].id;

            this.selected_locale = _.find(this.locales, {id: this.targets[0].locale_id});

            if (this.targets[0].landing_type === 'internal') {
                this.landing_info.is_external = 0;
            } else if (this.targets[0].landing_type === 'external') {
                this.landing_info.is_external = 1;
            }

            this.landing_settings_modal.modal();
        },

        createLanding() {
            let params = _.clone(this.landing_info),
                ladda = LaddaPreloader.start('#landing_create_submit_btn');

            delete params.url;

            if (this.landing_info.is_external) {
                params = _.pick(this.landing_info, ['offer_id', 'target_id', 'title', 'is_active', 'is_private', 'locale_id',
                    'is_responsive', 'is_mobile', 'is_advertiser_viewable', 'is_external','is_back_action', 'is_back_call', 'is_vibrate_on_mobile', 'thumb_path', 'title', 'url']);
            }

            params.offer_hash = this.offer_hash;

            api.post('/landing.create', params).then(response => {

                this.$emit('landing-created', response.data.response);
                this.landing_settings_modal.modal('hide');
                this.clearPreview();

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);

            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        openLandingEditModal(index) {
            this.landing_index = index;
            this.action = 'edit';
            this.landing_edit_modal_just_open = true;
            let landing = this.landings[index],
                keys = _.without(_.keys(landing), 'publishers', 'locale', 'thumb_path', 'domains');
            this.landing_info = _.pick(landing, keys);

            this.selected_locale = _.find(this.locales, {id: this.landing_info.locale_id});

            if (this.landing_info.is_external) {
                Vue.set(this.landing_info, 'url', landing.domains[0].host);

                this.external_macro.clickid = this.landing_info.url.indexOf('clickid=') !== -1;
                this.external_macro.offer_hash = this.landing_info.url.indexOf('offer_hash=') !== -1;
                this.external_macro.publisher_hash = this.landing_info.url.indexOf('publisher_hash=') !== -1;
            }

            this.landing_info.realpath = landing.domains[0].realpath.replace(this.landings_path, '');

            Vue.set(this.landing_info, 'use_foreign_order_page', 0);

            if (this.landings[index].order_page_landing_id !== this.landings[index].id) {
                Vue.set(this.landing_info, 'use_foreign_order_page', 1);
            }

            this.landing_settings_modal.modal();
        },

        editLanding() {
            let params = _.clone(this.landing_info),
                ladda = LaddaPreloader.start('#landing_edit_submit_btn');

            delete params.url;

            if (this.landing_info.is_external) {
                params = _.pick(this.landing_info, ['id', 'offer_id', 'target_id', 'title', 'is_active', 'is_private',
                    'locale_id', 'is_responsive', 'is_mobile', 'is_advertiser_viewable',
                    'is_external', 'is_back_action', 'is_back_call', 'is_vibrate_on_mobile', 'thumb_path', 'title', 'url']);
            }

            api.post('/landing.edit', params).then(response => {

                this.$emit('landing-edited', this.landing_index, response.data.response);
                this.clearPreview();

                this.landing_settings_modal.modal('hide');
                LaddaPreloader.stop(ladda);
                showMessage('success', response.data.message);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        uploadLandingPreview(e) {
            let landing_info = this.landing_info;
            let data = new FormData(), file;

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
                success: function (result) {
                    landing_info.thumb_path = result.response.thumb_path;

                    showMessage('success', result.message);
                },
                error: function (result) {
                    showErrorsInAlert(JSON.parse(result.responseText));
                }
            });
        },

        clearPreview() {
            this.landing_preview.val('');
        },

        refreshLandingInfo() {
            this.landing_info = {
                title: '',
                is_external: 0,
                offer_id: this.offer_id,
                target_id: this.landing_info.target_id,
                is_active: 1,
                is_private: 0,
                is_responsive: 1,
                is_mobile: 0,
                is_advertiser_viewable: 1,
                is_address_on_success: 0,
                is_email_on_success: 0,
                is_custom_success: 0,
                is_back_action: 0,
                is_back_call: 0,
                is_vibrate_on_mobile: 0,
                locale_id: this.landing_info.locale_id,
                subdomain: '',
                order_page_landing_id: 0,
                use_foreign_order_page: 0,
                realpath: '/cod/',
                url: '',
            };
        },

        openEntityDomainModal(landing) {
            vm.openEntityDomainModal(landing, 'landing');
        },

        rebuildExternalLandingUrl() {
            let params = {};
            if (this.external_macro.clickid) {
                params.clickid = '{clickid}';
            }
            if (this.external_macro.offer_hash) {
                params.offer_hash = '{offer_hash}';
            }
            if (this.external_macro.publisher_hash) {
                params.publisher_hash = '{publisher_hash}';
            }

            let url = '';
            if (!empty(this.landing_info.url)) {
                try {
                    let url_info = new URL(this.landing_info.url);
                    url = url_info.origin + url_info.pathname
                } catch (e) {
                }
            }

            let qs = http_build_query(params, '', '&', false);
            if (!empty(qs)) {
                qs = '?' + qs;
            }

            this.landing_info.url = url + qs
        },
    }
});
