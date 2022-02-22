Vue.component('profile-form', {
    template: '#profile-form-tpl',
    data() {
        return {
            full_name: '',
            skype: '',
            telegram: '',
            timezone: '',
        };
    },
    mounted() {
       this.setFormFields();
    },

    methods: {
        changeProfile() {
            let params = {
                    full_name: this.full_name,
                    skype: this.skype,
                    telegram: this.telegram,
                    timezone: this.timezone
                },
                ladda = LaddaPreloader.start('#change_profile_submit');

            api.post('administrator.changeProfile', params).then(response => {

                showMessage('success', response.data.message);

                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        setFormFields() {
            let user = JSON.parse($('#user-info').val());
            this.full_name = user.profile.full_name;
            this.skype = user.profile.skype;
            this.telegram = user.profile.telegram;
            this.timezone = user.timezone;
        },
    },
});
