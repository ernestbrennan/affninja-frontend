let vm = new Vue({
    el: '#flow_profile',
    components: {
        'multiselect': window.VueMultiselect.default
    },
    mixins: [beforeunload_mixin],
    data: {
        // !!! Warning !!!
        // Lots of variables are set in template (flow/profile/edit.blade.php)

        CDN_HOST: CDN_HOST,
        LANG_FLOWS: LANG_FLOWS,
        LANG_MESSAGES: LANG_MESSAGES,
        target_geo_list: [],
        targets: [],
        flows: [],
        widgets: [],
        selected_flow: {},
        flow_info: {},
        offer_info: {},
        selected_target: {},

        // Check to show "input" if checkboxes are enabled
        is_tb: false,
        is_back_action: false,
        is_back_call: false,
        is_vibrate_on_mobile: false,

        // Clones for watching
        original_flow_info: {},

        flow_changed: false,
        is_created: false,
        landings_list_type: localStorage.getItem('landings_list_type') || 'list',
        transits_list_type: localStorage.getItem('transits_list_type') || 'list',
        landings_expanded_additional_settings: str_to_bool(localStorage.getItem('landings_expanded_additional_settings') || 'false'),
        transits_expanded_additional_settings: str_to_bool(localStorage.getItem('transits_expanded_additional_settings') || 'false'),
    },

    mounted() {
        $('#wrapper').addClass('m-b-65');

        runTooltip();
        if (this.landings_expanded_additional_settings) {
            $('#landing-additional-settings').collapse('show');
        }
        if (this.transits_expanded_additional_settings) {
            $('#transit-additional-settings').collapse('show');
        }
    },

    watch: {
        "landings_expanded_additional_settings"() {
            if (this.landings_expanded_additional_settings) {
                $('#landing-additional-settings').collapse('show');
            } else {
                $('#landing-additional-settings').collapse('hide');

            }
        },
        "transits_expanded_additional_settings"() {
            if (this.transits_expanded_additional_settings) {
                $('#transit-additional-settings').collapse('show');
            } else {
                $('#transit-additional-settings').collapse('hide');
            }
        },
        "is_tb"() {
            if (this.is_tb == 0) {
                this.flow_info.tb_url = '';
            }
        },
        "is_back_action"() {
            if (this.is_back_action == 0) {
                this.flow_info.back_action_sec = '';
            }
        },
        "is_back_call"() {
            if (this.is_back_call == 0) {
                this.flow_info.back_call_btn_sec = '';
                this.flow_info.back_call_form_sec = '';
            }
        },
        "is_vibrate_on_mobile"() {
            if (this.is_vibrate_on_mobile == 0) {
                this.flow_info.vibrate_on_mobile_sec = '';
            }
        },
        "flow_info.is_extra_flow"() {
            if (this.flow_info.is_extra_flow == 0) {
                this.flow_info.extra_flow_hash = null;
            }
        },
        'target_geo_list'() {
            this.$nextTick(() => {
                runTooltip();
            })
        },
        'flow_info.target_hash'(after, before) {
            if (before === undefined) {
                return;
            }

            if (before === '') {
                if (!this.selected_target.landings.length) {
                    this.flow_info.landings = [];
                }

                if (!this.selected_target.transits.length) {
                    this.flow_info.transits = [];
                }

                this.selected_target = _.find(this.targets, {hash: this.flow_info.target_hash});
                this.target_geo_list = this.selected_target.target_geo;
                return;
            }

            if (!this.selected_target.landings.length) {
                this.flow_info.landings = [];
            }

            if (!this.selected_target.transits.length) {
                this.flow_info.transits = [];
            }

            this.selected_target = _.find(this.targets, {hash: this.flow_info.target_hash});
            this.flow_info.landings = [];
            this.flow_info.transits = [];
        },
        'flow_info': {
            handler: function (after, before) {
                this.flow_changed = !_.isEqual(after, this.original_flow_info);
            },
            deep: true,
        },
        'flow_changed'() {
            if (this.flow_changed) {
                this.addOnBeforeunloadEvent(LANG_FLOWS.on_close_window);
            } else {
                this.removeOnBeforeunloadEvent();
            }
        },
        'flows'() {
            this.selected_flow = _.find(this.flows, {hash: this.flow_info.extra_flow_hash});
        },
        'selected_flow'() {
            Vue.set(this.flow_info, 'extra_flow_hash', _.get(this.selected_flow, 'hash', null));
        },
        'targets'(after, before) {
            if (!before.length && after.length) {
                this.targets.forEach(item => {
                    item.title = item.template.title + ' ' + item.label;
                });
            }
        },
    },

    methods: {
        onLandingsListTypeUpdated(list_type) {
            this.landings_list_type = list_type;
            localStorage.setItem('landings_list_type', list_type);
        },

        onTransitsListTypeUpdated(list_type) {
            this.transits_list_type = list_type;
            localStorage.setItem('transits_list_type', list_type);
        },

        onLandingsExpandedUpdated() {
            this.landings_expanded_additional_settings = !this.landings_expanded_additional_settings;
            localStorage.setItem('landings_expanded_additional_settings', this.landings_expanded_additional_settings);
        },

        onTransitsExpandedUpdated() {
            this.transits_expanded_additional_settings = !this.transits_expanded_additional_settings;
            localStorage.setItem('transits_expanded_additional_settings', this.transits_expanded_additional_settings);
        },

        obsectSize(object) {
            return Object.size(object);
        },

        cloneObjectsForCompare() {
            this.original_flow_info = _.cloneDeep(this.flow_info);
        },

        resetChangedData() {
            this.flow_changed = false;
        },

        getTargetGeoList(target) {
            if (!is_null(target)) {
                this.flow_info.target_hash = target.hash;
                this.target_geo_list = target.target_geo;
            }
        },

        toggleSelectedLanding(landing_hash) {
            let elem = this.$refs['landing-' + landing_hash][0];

            if (_.indexOf(this.flow_info.landings, landing_hash) === -1) {
                elem.classList.add('flow_item_selected');
                return this.flow_info.landings.push(landing_hash);
            }

            let index = _.indexOf(this.flow_info.landings, landing_hash);
            this.flow_info.landings.splice(index, 1);
            elem.classList.remove('flow_item_selected');
        },

        toggleSelectedTransit(transit_hash) {
            let elem = this.$refs['transit-' + transit_hash][0];

            if (_.indexOf(this.flow_info.transits, transit_hash) === -1) {
                elem.classList.add('flow_item_selected');
                return this.flow_info.transits.push(transit_hash);
            }

            elem.classList.remove('flow_item_selected');
            let index = _.indexOf(this.flow_info.transits, transit_hash);
            this.flow_info.transits.splice(index, 1);
        },

        openLinkModal() {
            this.$refs.link_modal.openForFlows(this.flow_info.hash);
        },

        updateGroupHash(group_hash) {
            this.flow_info.group_hash = group_hash;
        },

        editFlow() {
            let ladda = LaddaPreloader.start('#edit_flow_submit'),
                params = _.pick(this.flow_info, [
                    'hash', 'target_hash', 'group_hash', 'title', 'is_detect_bot', 'is_hide_target_list',
                    'is_noback', 'is_show_requisite', 'is_remember_landing', 'is_remember_transit', 'extra_flow_hash',
                    'tb_url', 'back_action_sec', 'back_call_btn_sec', 'back_call_form_sec', 'vibrate_on_mobile_sec',
                    'landings', 'transits'
                ]);

            params.offer_hash = this.offer_info.hash;

            api.post('/flow.edit', params).then(response => {
                this.flow_info.status = response.data.response.status;
                this.resetChangedData();
                this.cloneObjectsForCompare();

                LaddaPreloader.stop(ladda);
                showMessage('success', response.data.message, null, null);

                let title = this.flow_info.target_hash ?
                    LANG_FLOWS.edit_title + ' "' + this.flow_info.title + '" (' + this.offer_info.title + ')' :
                    LANG_FLOWS.create_title + ' "' + this.offer_info.title + '" ' + LANG_FLOWS.create_title_flow;

                setPageTitle(title);
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },
    }
});