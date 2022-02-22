Vue.component('contact-form', {
    data: () => {
        return {
            LANG_FORM: LANG_FORM,

            name: '',
            email: '',
            message: '',

            name_error: false,
            email_error: false,
            message_error: false,

            success_messages: {},
            error_messages: {},

            loading: false,
            ladda: null,
        }
    },

    watch: {
        'loading'() {
            if (this.loading) {
                return this.ladda = LaddaPreloader.start('#contact-form-btn');
            }
            
            LaddaPreloader.stop(this.ladda);
        },
    },

    methods: {
        send() {
            if (!this.isValidFormFields(params)) {
                return false;
            }

            let params = _.pick(this, ['name', 'email', 'message']);

            this.loading = true;

            api.post('/promoQuestion', params).then(response => {
                this.sendCallback({msg: LANG_FORM.on_promo_question_success}, {});
            }, (response) => {
                if (response.response.data.status_code === 422) {
                    this.sendCallback({}, response.response.data.errors);
                }
            });
        },

        sendCallback(success_messages, error_massages) {
            this.success_messages = success_messages;
            this.error_messages = error_massages;
            this.loading = false;
        },

        refreshFormFields() {
            this.name = '';
            this.email = '';
            this.message = '';
        },

        isValidFormFields() {
            this.name_error = this.name === '';
            this.email_error = this.email === '';
            this.message_error = this.message === '';
            
            return !this.name_error && !this.email_error && !this.message_error;
        },
    },

    template: `
    <form class="form-horizontal contact-form">
        <div class="p-l p-r">
            <validation-success :messages="success_messages"></validation-success>     
            <validation-errors :messages="error_messages"></validation-errors> 
        </div>
        <div :class="['form-group', name_error ? 'has-error' : '']">
            <label for="contact-name" class="col-sm-3 control-label">Name</label>
            <div class="col-sm-9">
                <input v-model="name" class="form-control" id="contact-name"
                        placeholder="Your full name" value="">
            </div>
        </div>
        <div :class="['form-group', email_error ? 'has-error' : '']"">
            <label for="contact-email" class="col-sm-3 control-label">Email</label>
            <div class="col-sm-9">
                <input v-model="email" class="form-control" id="contact-email" placeholder="user@example.com">
            </div>
        </div>
        <div :class="['form-group', message_error ? 'has-error' : '']">
            <label for="contact-message" class="col-sm-3 control-label">Message</label>
            <div class="col-sm-9">
                <textarea v-model="message" class="form-control" rows="3" id="contact-message"
                          placeholder="Your message here..."></textarea>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-12">
                <button @click="send" type="button" data-spinner-color="#666" data-style="zoom-out" 
                        id="contact-form-btn" class="btn btn-success btn-sm ladda-button">
                    <span class="ladda-label">{{ LANG_FORM.send_message }}</span>
                </button>
            </div>
        </div>
    </form>
    `,
});