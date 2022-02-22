Vue.component('profile-form', {
    template: '#profile-form-tpl',
    data() {
        return {
            profile: USER_INFO.profile,
            timezone: '',
            selected_data_type: {},
            data_params_fields: [
                {title: LANG_MESSAGES.data_options, value: 'data'},
                {title: LANG_MESSAGES.utm_options, value: 'utm'},
            ],
        };
    },

    mounted() {
        this.timezone = USER_INFO.timezone;
        this.selected_data_type = _.find(this.data_params_fields, {value: USER_INFO.profile.data_type})
            || this.data_params_fields[0];
    },

    watch: {
        'selected_data_type'() {
            Vue.set(this.profile, 'data_type', _.get(this.selected_data_type, 'value', null));
        },
    },

    methods: {
        changeProfile() {
            let ladda = LaddaPreloader.start('#change_profile_submit'),
                params = _.pick(this.profile, ['full_name', 'skype', 'phone', 'telegram', 'data_type']);

            params.timezone = this.timezone;

            api.post('publisher.changeProfile', params).then(response => {

                showMessage('success', response.data.message);

                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },
    },
});
