Vue.component('login-form', {
    data() {
        return {
            LANG_FORM: LANG_FORM,
            LANG_MESSAGES: LANG_MESSAGES,

            recovery_email: '',

            password_error: false,
            email_error: '',
            recovery_email_error: '',

            success_messages: {},
            error_messages: {},

            login_loading: false,
            recovery_loading: false,

            ladda: null,
            is_forgot_form_visible: false,
        }
    },

    watch: {
        'login_loading'() {
            if (this.login_loading) {
                return this.ladda = LaddaPreloader.start('#login_submit');
            }
            LaddaPreloader.stop(this.ladda);
        },

        'recovery_loading'() {
            if (this.recovery_loading) {
                return this.ladda = LaddaPreloader.start('#recovery_submit');
            }
            LaddaPreloader.stop(this.ladda);
        },

        'is_forgot_form_visible'() {
            this.error_messages = {};
        },
    },

    methods: {
        login() {
            if (!this.isValidLoginFields()) {
                return;
            }

            let params = {
                email: $('#login_email_input').val(),
                password: $('#login_password_input').val(),
                remember: $('#login_remember_input').prop('checked') ? 1 : 0,
            };

            this.login_loading = true;

            api.post('/login', params).then(response => {
                window.location.href = response.data.response.dashboard_url;
            }, response => {
                if (response.response.data.status_code === 422) {
                    this.loginCallback({}, response.response.data.errors);
                }

                if (response.response.data.status_code === 401) {
                    this.loginCallback({}, {msg: response.response.data.message});
                }
            });
        },

        loginCallback(success_messages, error_massages) {
            this.success_messages = success_messages;
            this.error_messages = error_massages;
            this.login_loading = false;
        },

        isValidLoginFields() {
            this.email_error = $('#login_email_input').val() === '';
            this.password_error = $('#login_password_input').val() === '';

            return !this.email_error && !this.password_error;
        },

        recoveryPassword() {
            if (this.isValidRecoveryEmail()) {
                return;
            }

            this.recovery_loading = true;

            api.post('/recoveryPasswordSend', {email: this.recovery_email}).then(response => {
                this.recoveryPasswordCallback({msg: response.data.message}, {});
                this.is_forgot_form_visible = false;
            }, response => {
                if (response.response.data.status_code === 422) {
                    this.recoveryPasswordCallback({}, response.response.data.errors);
                }
            });
        },

        recoveryPasswordCallback(success_messages, error_massages) {
            this.success_messages = success_messages;
            this.error_messages = error_massages;
            this.recovery_loading = false;
        },

        isValidRecoveryEmail() {
            return this.recovery_email_error = this.recovery_email === '';
        },
    },

    template: `
    <div class="form-body text-left">
        <validation-success :messages="success_messages"></validation-success>     
        <validation-errors :messages="error_messages"></validation-errors>
                
        <div v-show="!is_forgot_form_visible">
            <form>
                <div :class="['form-group', email_error ? 'has-error' : '']">
                    <label class="control-label" for="login_email_input">{{ LANG_FORM.email }}</label>
                    <input class="form-control" id="login_email_input" name="email"
                           placeholder="" required="" value="">
                </div>
                <div :class="['form-group', password_error ? 'has-error' : '']">
                    <label class="control-label" for="login_password_input">{{ LANG_FORM.password }}</label>
                    <input @keydown.enter="login" class="form-control" id="login_password_input" type="password" name="password"
                           placeholder="" required="" value="">
                </div>
                <div class="checkbox checkbox-success">
                    <input id="login_remember_input" type="checkbox" name="remember">
                    <label for="login_remember_input">{{ LANG_FORM.remember_me }}</label>
                </div>
            </form>
        </div>
                
        <div v-show="is_forgot_form_visible">
            <div :class="['form-group', recovery_email_error ? 'has-error' : '']">
                <label class="control-label" for="recovery_email">{{ LANG_FORM.email }}</label>
                <input v-model="recovery_email" class="form-control" id="recovery_email" name="email">
            </div>
        </div>
        
        <div v-show="!is_forgot_form_visible">
            <button @click="login" class="btn btn-success btn-sm ladda-button m-l-none" 
                    id="login_submit" data-style="zoom-out">
                <span class="ladda-label">{{ LANG_FORM.login }}</span>
            </button>
            <button @click="is_forgot_form_visible = true" class="btn btn-default btn-sm pull-right">
                {{ LANG_FORM.forgot_password }}
            </button>
        </div>      
        
        <div v-show="is_forgot_form_visible" class="m-t">
            <button @click="recoveryPassword" class="btn btn-success btn-sm ladda-button" 
                    id="recovery_submit" data-style="zoom-out">
                <span class="ladda-label">{{ LANG_FORM.reset }}</span>
            </button>
            <button @click="is_forgot_form_visible = false" class="btn btn-default btn-sm pull-right">
                {{ LANG_FORM.cancel }}</button>
        </div>
    </div>      
    `,
});