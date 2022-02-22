Vue.component('fast-link-modal', {
    props: {
        targets: {
            type: Array,
            required: true,
        },
        offer_hash: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_OFFERS: LANG_OFFERS,

            selected_target: {},
            selected_landing: null,
            selected_transit: null,

            transits: [],
            empty_transit_item: {
                title: LANG_STATISTICS.transit_is_undefined,
                hash: null,
            },

            base_link: '',
            query: '',
            data_type: App.user.profile.data_type,

            modal: null,
            flow_hash: null,

            can_set_inner_transit_and_landing: false,
            target_change: false,
            flow_created: null,
            loading: false,
        }
    },

    computed: {
        fast_link: {
            get() {
                return this.query ? this.base_link + '&' + this.query : this.base_link;
            },
            set(value) {
            },
        },
    },

    created() {
        bus.$on('open-fast-link-modal', (selected_target, selected_landing, selected_transit) => {
            this.openModal(selected_target, selected_landing, selected_transit);
        });
    },

    mounted() {
        this.modal = $('#fast_link_modal');

        this.modal.on('hidden.bs.modal', () => {
            this.flow_created = false;
            this.can_set_inner_transit_and_landing = false;
            this.query = '';
        });

        initClipboard();
    },

    watch: {
        'targets': {
            immediate: true,
            handler() {
                this.targets.forEach(target => {
                    target.title = `${target.template.title} ${target.label}`;
                });
            }
        },

        'selected_target'() {
            this.target_change = true;
            this.transits.splice(0);
            this.transits.push(this.empty_transit_item);
            this.transits = this.transits.concat(this.selected_target.transits);

            if (!this.can_set_inner_transit_and_landing) {
                return;
            }

            this.selected_transit = this.empty_transit_item;
            this.selected_landing = this.selected_target.landings[0];

            if (this.flow_created) {
                this.editVirtualFlow();
            }
        },

        'selected_landing'() {
            if (this.flow_created && !this.target_change) {
                this.editVirtualFlow();
            }
        },

        'selected_transit'() {
            if (this.flow_created && !this.target_change) {
                this.editVirtualFlow();
            }
        },
    },

    methods: {
        openModal(selected_target, selected_landing, selected_transit) {
            this.can_set_inner_transit_and_landing = false;

            this.selected_target = selected_target;
            this.selected_landing = selected_landing;
            this.selected_transit = selected_transit;

            this.modal.modal();

            this.createVirtualFlow();
        },

        createVirtualFlow() {
            let params = {
                offer_hash: this.offer_hash,
                landing_hash: this.selected_landing.hash,
            };

            let transit_hash = _.get(this.selected_transit, 'hash', null);

            if (!is_null(transit_hash)) {
                params.transit_hash = _.get(this.selected_transit, 'hash');
            }

            this.loading = true;

            api.post('/flow.createVirtual', params).then((response) => {
                this.base_link = response.data.response.fast_link;
                this.flow_hash = response.data.response.flow_hash;
                this.flow_created = true;
                this.can_set_inner_transit_and_landing = true;
                this.target_change = false;

                this.loading = false;
            }, () => {
                this.loading = false;
            });
        },

        editVirtualFlow() {
            let params = {
                flow_hash: this.flow_hash,
                landing_hash: this.selected_landing.hash,
            };

            let transit_hash = _.get(this.selected_transit, 'hash', null);

            if (!is_null(transit_hash)) {
                params.transit_hash = _.get(this.selected_transit, 'hash');
            }

            this.loading = true;

            api.post('/flow.editVirtual', params).then(() => {
                this.loading = false;
                this.target_change = false;
            }, () => {
                this.loading = false;
            });
        },
    },
    template: `
    <div class="modal fade" role="dialog" id="fast_link_modal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span>×</span></button>
                    <h4 class="modal-title">{{ LANG_OFFERS.fast_link }}</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 m-b">
                                <label>{{ LANG_MESSAGES.target }}:</label>
                                <select-item
                                    v-model="selected_target"
                                    :options="targets"
                                    track_by="hash">
                                </select-item>    
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 m-b">
                                <label>{{ LANG_MESSAGES.transit }}:</label>
                                <select-item
                                    v-model="selected_transit"
                                    :options="transits"
                                    :disabled="!transits.length"
                                    track_by="hash">
                                </select-item>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 m-b">
                                <label>{{ LANG_MESSAGES.landing }}:</label>
                                <select-item
                                    v-model="selected_landing"
                                    :options="selected_target.landings"
                                    :disabled="!selected_target && !selected_target.landings.length"
                                    track_by="hash">
                                </select-item>    
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <data-types-query v-model="query" :data_type="data_type"></data-types-query>
                    </div>
                </div>
                <div class="modal-footer">
                    <label>{{ LANG_MESSAGES.traffic_link }}:</label>
                    <div class="input-group">
                        <input v-model="fast_link" :readonly="loading" class="form-control" id="fast_offer_link">
                        <span class="input-group-btn">
                            <button v-show="!loading" type="button" class="btn btn-default copy_to_clipboard"
                                    style="padding: 6px 12px;"
                                    data-clipboard-demo="" data-clipboard-target="#fast_offer_link"
                                    :data-title="LANG_OFFERS.copy_link"
                                    data-toggle="tooltip">
                                <img class="clippy" src="/images/clippy.svg" width="13"
                                     :alt="LANG_OFFERS.copy_link">
                            </button>
                            <button v-show="loading" type="button" class="btn btn-default btn-loading" 
                                style="padding: 6px 12px; cursor: default;">
                                <img class="clippy" src="/images/ring.gif" width="13">
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
});