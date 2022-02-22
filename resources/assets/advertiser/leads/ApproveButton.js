Vue.component('approved-btn', {
    props: ['lead_hashes'],
    data: function () {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            approving: false,
            btn_id: null,
            ladda: null,
        }
    },

    created() {
        // We need 'a' because of selector cant start with number
        this.btn_id = 'a' + this._uid + str_rand(8);
    },

    watch: {
        'approving'() {
            if (this.approving) {
                this.ladda = LaddaPreloader.start('#' + this.btn_id);
            } else {
                LaddaPreloader.stop(this.ladda)
            }
        }
    },

    methods: {
        changeStatus() {
            if (!this.lead_hashes.length) {
                return;
            }
            this.approving = true;

            let params = {
                action: 'approve',
                hashes: this.lead_hashes,
                sub_status_id: 0,
            };

            api.post('/lead.bulkEdit', params).then(response => {
                showMessage('success', response.data.message);

                bus.$emit('leads-updated', response.data.response);
                this.approving = false
            });
        },
    },

    template: `
        <button @click="changeStatus" :id="btn_id"
                class="btn btn-sm btn-success ladda-button" data-style="zoom-out">
                <span class="ladda-label">{{ LANG_MESSAGES.approve }}</span></button>
    `,
});