Vue.component('advertiser-reg-modal', {
    data: () => {
        return {
            LANG_FORM: LANG_FORM,
            LANG_MESSAGES: LANG_MESSAGES,

            email: '',
            phone: '',
            contacts: '',
            geo: '',

            email_error: false,
            phone_error: false,
            contacts_error: false,
            geo_error: false,

            success_messages: {},
            error_messages: {},

            ladda: null,
            loading: false,
        }
    },

    mounted() {
        this.modal = $('#advertiser_reg_modal');
    },

    watch: {
        'loading'() {
            if (this.loading) {
                return this.ladda = LaddaPreloader.start('#advertiser-reg-btn');
            }

            LaddaPreloader.stop(this.ladda);
        },
    },

    methods: {
        openModal() {
            this.clearFormMessages();
            this.modal.modal();
        },

        clearFormMessages() {
            this.success_messages = {};
            this.error_messages = {};
        },

        advertiserRegister() {
            if (!this.isValidFormFields()) {
                return;
            }

            let params = _.pick(this, ['email', 'phone', 'contacts', 'geo']);
            params.user_role = 'advertiser';

            this.loading = true;

            api.post('/registration', params).then(response => {
                this.advertiserRegisterCallback({msg: LANG_FORM.on_advertiser_reg_success}, {});
            }, (response) => {
                if (response.response.data.status_code === 422) {
                    this.advertiserRegisterCallback({}, response.response.data.errors);
                }
            });
        },

        advertiserRegisterCallback(success_messages, error_massages) {
            this.success_messages = success_messages;
            this.error_messages = error_massages;
            this.loading = false;
        },

        isValidFormFields() {
            this.email_error = this.email === '';
            this.phone_error = this.phone === '';
            this.contacts_error = this.contacts === '';
            this.geo_error = this.geo === '';

            return !this.email_error && !this.phone_error && !this.contacts_error && !this.geo_error;
        },
    },

    template: `
    <div class="modal fade" tabindex="-1" role="dialog" id="advertiser_reg_modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					    <span aria-hidden="true">&times;</span>
				    </button>
                    <h4 class="modal-title">{{ LANG_FORM.advertiser_application }}</h4>
                </div>
                <div class="modal-body">
                    <validation-success :messages="success_messages"></validation-success>     
                    <validation-errors :messages="error_messages"></validation-errors>
                    <div :class="['form-group', email_error ? 'has-error' : '']">
                        <label class="control-label" for="regAdvertiserEmail">
                            {{ LANG_FORM.email }}
                    </label>
                        <input v-model="email" :title="LANG_FORM.email" id="regAdvertiserEmail" ref="email" class="form-control"
                               readonly onfocus="this.removeAttribute('readonly')">
                    </div>
                    <div :class="['form-group', phone_error ? 'has-error' : '']">
                        <label class="control-label" for="regAdvertiserPhone">
                            {{ LANG_MESSAGES.phone }}
                        </label>
                        <input v-model="phone" :title="LANG_MESSAGES.phone" id="regAdvertiserPhone" class="form-control"
                               readonly onfocus="this.removeAttribute('readonly')">
                    </div>
                    <div :class="['form-group', contacts_error ? 'has-error' : '']">
                        <label class="control-label" for="regAdvertiserContacts">
                            {{ LANG_FORM.contacts }}
                        </label>
                        <textarea v-model="contacts" class="form-control" id="regAdvertiserContacts" rows="4"
                                  :title="LANG_FORM.contacts" readonly onfocus="this.removeAttribute('readonly')"></textarea>
                    </div>
                    <div :class="['form-group', geo_error ? 'has-error' : '']">
                        <label class="control-label" for="regAdvertiserGeo">
                            {{ LANG_FORM.geo }}
                        </label>
                        <textarea v-model="geo" class="form-control" id="regAdvertiserGeo" rows="4"
                                  :title="LANG_FORM.geo" readonly onfocus="this.removeAttribute('readonly')"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="advertiserRegister" type="button" data-spinner-color="#666" data-style="zoom-out" 
                            id="advertiser-reg-btn" class="btn btn-success btn-sm ladda-button">
                        <span class="ladda-label">{{ LANG_FORM.send_application }}</span>
                    </button>
                </div>
            </div>
        </div>  
    </div>   
    `,
});