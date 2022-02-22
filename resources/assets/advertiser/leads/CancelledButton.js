Vue.component('cancelled-btn', {
    props: ['lead_hashes', 'btn_size'],
    data: function () {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            btn_id: null,
            cancellation: null,
            options: [
                {id: 1, title: LANG_MESSAGES.reason_not_order},
                {id: 2, title: LANG_MESSAGES.reason_find_cheap},
                {id: 3, title: LANG_MESSAGES.reason_bad_delivery},
                {id: 4, title: LANG_MESSAGES.reason_invalid_data},
                {id: 5, title: LANG_MESSAGES.reason_double},
                {id: 6, title: LANG_MESSAGES.reason_invalid_geo},
                {id: 7, title: LANG_MESSAGES.reason_no_delivery},
                {id: 8, title: LANG_MESSAGES.reason_advice_good},
                {id: 9, title: LANG_MESSAGES.reason_advice_back},
                {id: 10, title: LANG_MESSAGES.reason_sub_unable_week},
                {id: 11, title: LANG_MESSAGES.reason_change_geo},
                {id: 12, title: LANG_MESSAGES.reason_other_reason},
                {id: 13, title: LANG_MESSAGES.reason_advice_preorder},
                {id: 14, title: LANG_MESSAGES.reason_test},
                {id: 15, title: LANG_MESSAGES.reason_reason_expresive},
                {id: 16, title: LANG_MESSAGES.reason_change_mind},
                {id: 17, title: LANG_MESSAGES.reason_not_provide_data},
                {id: 18, title: LANG_MESSAGES.reason_not_speak},
                {id: 19, title: LANG_MESSAGES.reason_not_suport_geo},
                {id: 20, title: LANG_MESSAGES.reason_invalid_limit},
            ],
        }
    },

    created() {
        // We need 'a' because of selector cant start with number
        this.btn_id = 'a' + this._uid + str_rand(8);
    },

    watch: {
        'cancellation'() {
            if (this.cancellation) {
                this.ladda = LaddaPreloader.start('#' + this.btn_id);
            } else {
                LaddaPreloader.stop(this.ladda)
            }
        }
    },

    methods: {
        changeStatus(sub_status_id) {
            if (!this.lead_hashes.length) {
                return;
            }

            this.cancellation = true;

            let params = {
                action: 'cancel',
                hashes: this.lead_hashes,
                sub_status_id: sub_status_id,
            };

            api.post('/lead.bulkEdit', params).then(response => {
                showMessage('success', response.data.message);

                bus.$emit('leads-updated', response.data.response);
                this.cancellation = false;
            });
        },
    },

    template: `
        <div class="btn-group" role="group">
            <button :class="['btn btn-sm btn-danger dropdown-toggle ladda-button', btn_size ? btn_size : '']"
                    :id="btn_id"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-style="zoom-out">
                <span class="ladda-label">{{ LANG_MESSAGES.cancel_it }} <span class="caret"></span></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-right">
                <li v-for="option in options" @click.prevent="changeStatus(option.id)">
                    <a href="#">{{ option.title }}</a>
                </li>
            </ul>
        </div>
    `,
});