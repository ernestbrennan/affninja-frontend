Vue.component('publisher-reg-form', {
    data: () => {
        return {
            LANG_FORM: LANG_FORM,
            LANG_MESSAGES: LANG_MESSAGES,

            email: '',
            password: '',

            email_error: false,
            password_error: false,
            grecaptcha_error: false,

            show_password: false,

            success_messages: {},
            error_messages: {},

            rules_and_policy: 1,

            ladda: null,
            loading: false,
        }
    },

    watch: {
        'loading'() {
            if (this.loading) {
                return this.ladda = LaddaPreloader.start('#publisher-reg-btn');
            }

            LaddaPreloader.stop(this.ladda);
        },
    },

    methods: {
        generatePassword() {
            this.password = str_rand(8);
            this.show_password = true;
        },

        publisherRegister() {
            if (!this.isValidFormFields()) {
                return;
            }

            let params = _.pick(this, ['email', 'password']);
            params.user_role = 'publisher';
            params['g-recaptcha-response'] = grecaptcha.getResponse();

            this.loading = true;

            api.post('/registration', params).then(response => {
                location.href = 'http://my.' + MAIN_DOMAIN;
            }, response => {
                if (response.response.data.status_code === 422) {
                    this.error_messages = response.response.data.errors;
                    this.loading = false;
                }
            });
        },

        isValidFormFields() {
            this.email_error = this.email === '';
            this.password_error = this.password === '';
            this.grecaptcha_error = grecaptcha.getResponse() === '';

            return !this.email_error && !this.password_error && !this.grecaptcha_error;
        },
    },

    template: `
            <div class="form-body text-left">
                <validation-success :messages="success_messages"></validation-success>     
                <validation-errors :messages="error_messages"></validation-errors>
                <div :class="['form-group', email_error ? 'has-error' : '']">
                    <label class="control-label" for="regPublisherEmail">{{ LANG_FORM.email }}</label>
                    <input v-model="email" :title="LANG_FORM.email" class="form-control" id="regPublisherEmail"
                           readonly onfocus="this.removeAttribute('readonly')">
                </div>
                <div :class="['form-group', password_error ? 'has-error' : '']">
                    <label class="control-label" for="regPublisherPassword">{{ LANG_FORM.password }}</label>
                    <div class="input-group">
                        <input v-model="password" class="form-control" :type="show_password ? 'text' : 'password'"
                               :title="LANG_FORM.password" id="regPublisherPassword"
                               readonly onfocus="this.removeAttribute('readonly')">
                        <span class="input-group-btn">
                            <button @click="show_password = !show_password" class="btn btn-default" id="toggle-password" type="button">
                                <i :class="['fa', show_password ? 'fa-eye' : 'fa-eye-slash']" id="hide-show-password"></i>
                            </button>
                            <button @click="generatePassword" class="btn btn-default">
                                {{ LANG_MESSAGES.generate }}
                            </button>
                        </span>
                    </div>
                </div>
                <div :class="['form-group grecaptcha-container', grecaptcha_error ? 'has-error' : '']">
                    <div class="g-recaptcha" data-sitekey="6LfCDEUUAAAAALxYgpKIxM7fAG6Mnnmio3iKFH9R"></div>            
                </div>
                <div class="form-group">
                    <div class="checkbox checkbox-success checkbox-center checkbox-rules">
                        <input v-model="rules_and_policy" :true-value="1" :false-value="0" id="rules_and_policy" 
                               type="checkbox" name="rules_and_policy" disabled>
                        <label for="rules_and_policy">By clicking "Sign up", you accept  
                            <!--<a target="_blank" href="/public">"-->
                            offer conditions
                            <!--"</a> -->
                            and 
                            <!--<a target="_blank" href="/rules">"-->
                            system rules
                            <!--"</a>-->
                            </label>
                    </div>
                </div>
                <button @click="publisherRegister" type="button" 
                        data-spinner-color="#666" data-style="zoom-out" 
                        id="publisher-reg-btn" class="btn btn-success btn-sm ladda-button">
                    <span class="ladda-label">{{ LANG_FORM.sign_up }}</span>
                </button>
            </div>
    `,
});