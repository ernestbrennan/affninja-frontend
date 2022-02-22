Vue.component('link-modal', {
    data() {
        return {
            LANG_DOMAINS: LANG_DOMAINS,
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_FILTERS: LANG_FILTERS,
            domains: [],
            flow_hash: null,
            selected_domain: {},
            modal: null,
            page: null,
            disabled_url: true,
            data_type: App.user.profile.data_type,
            query: '',
        };
    },

    computed: {
        url: {
            get() {
                if (is_null(this.selected_domain)) {
                    return '';
                }

                if (this.selected_domain.host === undefined) {
                    return '';
                }

                let url = this.selected_domain.host + '/';

                if (
                    (this.selected_domain.entity_type === 'tds'
                        || (isset(this.selected_domain.flow) && this.selected_domain.flow.hash !== this.flow_hash))
                    && this.page === 'flows'
                ) {
                    url += '?flow_hash=' + this.flow_hash;
                    return (this.query !== '' ? url + '&' + this.query : url);
                }

                return (this.query !== '' ? url + '?' + this.query : url);
            },
            set(value) {
            }
        }
    },

    mounted() {
        this.modal = $('#flow_link_modal');

        initClipboard();
    },

    methods: {
        openForFlows(flow_hash = null) {
            this.flow_hash = flow_hash;

            this.query = '';

            this.page = 'flows';

            this.getDomains().then(() => {
                this.disabled_url = false;
            });

            this.modal.modal();
        },

        openForDomains(domain = null) {
            this.selected_domain = domain;

            this.query = '';

            this.page = 'domains';
            this.disabled_url = false;

            this.modal.modal();
        },

        // open(flow_hash = null, domain = null) {
        //     this.flow_hash = flow_hash;
        //     this.selected_domain = domain;
        //
        //     this.query = '';
        //
        //     if (is_null(domain)) {
        //         this.initForFlows();
        //     } else {
        //         this.initForDomain();
        //     }
        //
        //     this.modal.modal();
        // },

        getDomains() {
            return new Promise((resolve, reject) => {

                let params = {
                    with_system: 1,
                    with_public: 1,
                    with: ['flow'],
                    flow_hash: this.flow_hash,
                    entity_types: ['tds', 'flow'],
                };

                api.get('/domain.getList', {params: params}).then(response => {
                    this.domains = response.data.response;

                    if (response.data.response.length) {
                        this.selected_domain = this.domains[0];
                    }
                    resolve();
                });
            });
        },
    },

    template: `<div class="modal fade" role="dialog" id="flow_link_modal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span>×</span></button>
                    <h4 class="modal-title">{{ LANG_DOMAINS.getting_link }}</h4>
                </div>
                <div class="modal-body">
                    <div v-show="page === 'flows'" class="form-group">
                        <label for="domain_tds">{{ LANG_DOMAINS.choose_domain }}:</label>
                        <select-item v-model="selected_domain"
                                     :options="domains"
                                     :disabled="!domains.length"
                                     track_by="hash"
                                     label="domain">
                        </select-item>
                    </div>
                    <div class="form-group">
                        <data-types-query v-model="query" :data_type="data_type"></data-types-query>
                    </div>
                </div>
                <div class="modal-footer">
                    <label>{{ LANG_MESSAGES.traffic_link }}:</label>
                    <div class="input-group">
                        <input v-model="url" :disabled="disabled_url"
                               class="form-control" id="computed_flow_url">
                        <span class="input-group-btn">
							<button type="button" class="btn btn-default copy_to_clipboard"
                                    style="padding: 6px 12px;"
                                    data-clipboard-demo="" data-clipboard-target="#computed_flow_url"
                                    :data-title="LANG_MESSAGES.copy_to_clipboard"
                                    data-toggle="tooltip">
							    <img class="clippy" src="/images/clippy.svg" width="13"
                                     :alt="LANG_MESSAGES.copy_to_clipboard">
							</button>
						</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`
});