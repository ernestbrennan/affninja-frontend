<div class="modal-body">
    <div class="alert alert-danger form_error_wrapper" id="reg_error_wrapper"></div>
    <btn-group-item active="publisher" @updated="onRegistrationUserRoleUpdated" class="m-b">
        <button class="btn btn-success btn-outline" data-id="publisher" type="button"
        >{{ trans('messages.publisher') }}</button>
        <button class="btn btn-success btn-outline" data-id="advertiser" type="button"
        >{{ trans('messages.advertiser') }}</button>
    </btn-group-item>
</div>

<div class="modal-footer">
    <button v-show="user_role === 'publisher'" @click="publisherRegister"
            class="btn btn-success ladda-button"
            id="publisher-reg-btn" data-style="zoom-out">
        <span class="ladda-label">{{ trans('form.sign_up') }}</span>
    </button>
    <button v-show="user_role === 'advertiser'" @click="advertiserRegister"
            class="btn btn-success ladda-button" id="advertiser-reg-btn"
            data-style="zoom-out">
        <span class="ladda-label">{{ trans('form.send_application') }}</span>
    </button>
</div>