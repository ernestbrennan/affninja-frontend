Vue.component('lead-click-parameter-modal', {
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_STATISTICS: LANG_STATISTICS,
            LANG_FILTERS: LANG_FILTERS,

            lead: {},
            modal: null,
            additional_parameters_not_found: false,
        }
    },

    watch: {
        'lead'() {
            if (!Object.size(this.lead)) {
                return;
            }

            if (
                this.lead.data1 == ''
                && this.lead.data2 == ''
                && this.lead.data3 == ''
                && this.lead.data4 == ''
                && this.lead.clickid == ''
                && this.lead.user_agent == ''
                && this.lead.referer == ''
                && this.lead.browser_locale == '') {
                this.additional_parameters_not_found = true;
            } else {
                this.additional_parameters_not_found = false;
            }
        },
    },

    mounted() {
        this.modal = $('#lead_click_parameter_modal');
    },

    methods: {
        openModal(lead) {
            this.lead = lead;
            this.modal.modal();
        },
    },

    template: `
        <div class="modal fade" tabindex="-1" role="dialog" id="lead_click_parameter_modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{ LANG_STATISTICS.click_parameters }}</h4>
                    </div>
                    <div class="modal-body">
                        <template v-if="lead">
                            <div v-if="lead.data1" class="form-group">
                                <b>{{ LANG_FILTERS.data1 }}:</b> {{ lead.data1 }}
                            </div>
                            <div v-if="lead.data2" class="form-group">
                                <b>{{ LANG_FILTERS.data2 }}:</b> {{ lead.data2 }}
                            </div>
                            <div v-if="lead.data3" class="form-group">
                                <b>{{ LANG_FILTERS.data3 }}:</b> {{ lead.data3 }}
                            </div>
                            <div v-if="lead.data4" class="form-group">
                                <b>{{ LANG_FILTERS.data4 }}:</b> {{ lead.data4 }}
                            </div>
                            <div v-if="lead.clickid" class="form-group">
                                <b>{{ LANG_FILTERS.clickid }}:</b> {{ lead.clickid }}
                            </div>
                            <div v-if="lead.browser_locale" class="form-group">
                                <b>{{ LANG_FILTERS.browser_locale }}:</b> {{ lead.browser_locale }}
                            </div>
                            <div v-if="lead.user_agent" class="form-group">
                                <b>{{ LANG_FILTERS.user_agent }}:</b> <span class="break-all">{{ lead.user_agent }}</span>
                            </div>
                            <div v-if="lead.referer" class="form-group">
                                <b>{{ LANG_FILTERS.referer }}:</b> <span class="break-all">{{ lead.referer }}</span>
                            </div>
                        </template>
                        <empty-list-message v-show="additional_parameters_not_found" 
                                            :message="LANG_STATISTICS.additional_parameters_not_found"
                                            class="m-t-none m-b-none"
                        ></empty-list-message>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default pull-right"
                                data-dismiss="modal">{{ LANG_MESSAGES.close }}</button>
                    </div>
                </div>
            </div>
        </div>
    `
});
