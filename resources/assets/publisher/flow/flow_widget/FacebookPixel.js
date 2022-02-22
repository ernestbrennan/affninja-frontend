Vue.component('facebook-pixel', {
    template: '#facebook_pixel_component',
    components: {
        'multiselect': window.VueMultiselect.default
    },
    data: function () {
        return {
            facebook_pixel_modal: null,
            facebook_pixel_info: {
                flow_hash: null,
                flow_widget_id: null,
                attributes: {
                    id: '',
                    TransitPageView: 0,
                    LandingPageView: 0,
                    LandingViewContent: 0,
                    SuccessPageView: 0,
                    SuccessPurchase: 0,
                    init_by_image: 0,
                    send_purchase_payout: 0,
                },
            },
            action: null,
            show_transit_events: false,
            show_landing_events: false,
            show_success_events: false,
            selected_pages: [],
            available_pages: [],
            available_events: [],

            original_attributes: {},
            original_selected_pages: {},
            attributes_changed: false,
            selected_pages_changed: false,
            modal_submit: false,
        }
    },

    computed: {
        facebook_changed: {
            get() {
                return this.attributes_changed || this.selected_pages_changed;
            },
            set() {
            },
        },
    },

    mounted() {
        let self = this;
        this.facebook_pixel_modal = $('#facebook_pixel_modal');

        $(this.facebook_pixel_modal).on('hide.bs.modal', function (event) {
            self.onCloseModal(event, self.facebook_pixel_modal);
        });

        this.facebook_pixel_modal.on('hidden.bs.modal', function () {
            self.action = null;
        });
        runPopover();

        $(document).on('shown.bs.popover', function (e) {
            $('.popover').on('mouseleave', function () {
                $('.popover').remove();
            });
        });
    },

    watch: {
        'selected_pages': {
            handler: function () {
                this.selected_pages_changed = !_.isEqual(this.selected_pages, this.original_selected_pages);

                if (_.findIndex(this.selected_pages, {id: 'Transit'}) !== -1) {
                    this.show_transit_events = true;
                } else {
                    this.show_transit_events = false;
                    this.facebook_pixel_info.attributes.TransitPageView = 0;
                }

                if (_.findIndex(this.selected_pages, {id: 'Landing'}) !== -1) {
                    this.show_landing_events = true;
                } else {
                    this.show_landing_events = false;
                    this.facebook_pixel_info.attributes.LandingPageView = 0;
                    this.facebook_pixel_info.attributes.LandingViewContent = 0;
                    this.facebook_pixel_info.attributes.LandingLead = 0;
                }

                if (_.findIndex(this.selected_pages, {id: 'Success'}) !== -1) {
                    this.show_success_events = true;
                } else {
                    this.show_success_events = false;
                    this.facebook_pixel_info.attributes.SuccessPageView = 0;
                    this.facebook_pixel_info.attributes.SuccessPurchase = 0;
                }
            },
            deep: true,
        },
        'facebook_pixel_info.attributes.SuccessPurchase': function () {
            if (this.facebook_pixel_info.attributes.SuccessPurchase === 0) {
                this.facebook_pixel_info.attributes.send_purchase_payout = 0;
            }
        },
        'facebook_pixel_info.attributes': {
            handler: function () {
                this.attributes_changed = !_.isEqual(this.facebook_pixel_info.attributes, this.original_attributes);
            },
            deep: true,
        },
    },

    methods: {
        onCloseModal(e, modal) {
            if ((this.attributes_changed && !this.modal_submit) ||
                (this.selected_pages_changed && !this.modal_submit)) {
                this.forbidHideModal(e);

                Swal.showSuccess(LANG_POSTBACKS.on_unsaved_changes, LANG_MESSAGES.save).then(() => {
                    this.attributes_changed = false;
                    modal.modal('hide');

                    switch (this.action) {
                        case 'create':
                            this.createWidget();
                            break;

                        case 'edit':
                            this.editWidget();
                            break;

                        default:
                            throw 'Unknown action';
                    }
                }, () => {
                    this.modal_submit = true;
                    this.facebook_pixel_modal.modal('hide');
                });
            }
        },

        fbPixelPagesUpdated(selected_pages) {
            this.selected_pages = selected_pages || [];
        },

        openCreateModal(widget, flow_hash) {
            this.action = 'create';
            this.setAvailablePages();

            this.selected_pages = [];
            this.facebook_pixel_info.flow_hash = flow_hash;
            this.facebook_pixel_info.flow_widget_id = widget.id;
            this.facebook_pixel_info.attributes.id = '';
            this.facebook_pixel_info.attributes.TransitPageView = 0;
            this.facebook_pixel_info.attributes.LandingPageView = 0;
            this.facebook_pixel_info.attributes.LandingViewContent = 0;
            this.facebook_pixel_info.attributes.LandingLead = 0;
            this.facebook_pixel_info.attributes.SuccessPageView = 0;
            this.facebook_pixel_info.attributes.SuccessPurchase = 0;
            this.facebook_pixel_info.attributes.init_by_image = 0;
            this.facebook_pixel_info.attributes.send_purchase_payout = 0;

            this.original_attributes = _.clone(this.facebook_pixel_info.attributes);
            this.original_selected_pages = _.clone(this.selected_pages);
            this.modal_submit = false;
            this.facebook_pixel_modal.modal();
        },

        createWidget() {
            this.modal_submit = true;

            let ladda = LaddaPreloader.start('#create_flow_widget');

            this.$parent.createWidget(this.facebook_pixel_info).then(() => {
                LaddaPreloader.stop(ladda);
                this.facebook_pixel_modal.modal('hide');

                this.attributes_changed = false;
                this.selected_pages_changed = false;
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        openEditModal(widget) {
            this.action = 'edit';
            this.setAvailablePages();
            this.facebook_pixel_info.hash = widget.hash;
            _.assign(this.facebook_pixel_info.attributes, widget.attributes_array);
            this.getSelectedPages(widget.attributes_array);

            this.original_attributes = _.clone(this.facebook_pixel_info.attributes);
            this.original_selected_pages = _.clone(this.selected_pages);
            this.modal_submit = false;
            this.facebook_pixel_modal.modal();
        },

        editWidget() {
            this.modal_submit = true;

            let ladda = LaddaPreloader.start('#edit_flow_widget'),
                params = {
                    hash: this.facebook_pixel_info.hash,
                    attributes: this.facebook_pixel_info.attributes,
                };

            this.$parent.editWidget(params).then(response => {
                LaddaPreloader.stop(ladda);
                this.facebook_pixel_modal.modal('hide');

                this.attributes_changed = false;
                this.selected_pages_changed = false;
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },

        setAvailablePages() {
            this.available_pages = [
                {id: 'Transit', text: LANG_FLOWS.transit_page},
                {id: 'Landing', text: LANG_FLOWS.landing_page},
                {id: 'Success', text: LANG_FLOWS.success_page},
            ];
            this.available_events = [
                'TransitPageView', 'LandingPageView', 'LandingViewContent', 'LandingLead', 'SuccessPageView',
                'SuccessPurchase'
            ];
        },

        getSelectedPages(attributes_array) {
            let selected_events = _.keys(
                _.pickBy(attributes_array, (value, key) => {
                    return key !== 'id' && value === 1
                })
            );

            let pages = [];

            if (_.includes(selected_events, 'TransitPageView')) {
                this.show_transit_events = true;
                pages.push({id: 'Transit', text: LANG_FLOWS.transit_page});
            } else {
                this.show_transit_events = false;
            }

            if (_.includes(selected_events, 'LandingPageView') || _.includes(selected_events, 'LandingViewContent')) {
                this.show_landing_events = true;
                pages.push({id: 'Landing', text: LANG_FLOWS.landing_page});
            } else {
                this.show_landing_events = false;
            }

            if (_.includes(selected_events, 'SuccessPageView')
                || _.includes(selected_events, 'SuccessPurchase')
            ) {
                this.show_success_events = true;
                pages.push({id: 'Success', text: LANG_FLOWS.success_page});
            } else {
                this.show_success_events = false;
            }

            this.selected_pages = pages;
        },

        forbidHideModal(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        },
    }
});
