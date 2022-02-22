Vue.component('profile-form', {
    template: '#profile-form-tpl',
    data() {
        return {
            full_name: '',
            phone: '',
            skype: '',
            telegram: '',
            timezone: '',
            whatsapp: '',
            interface_locale: '',
            locale: [{
                value: 'ru',
                title: 'Русский'
            },
            // {
            //     value: 'en',
            //     title: 'English'
            // }
            ],
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
                    phone: this.phone,
                    timezone: this.timezone,
                    whatsapp: this.whatsapp,
                    interface_locale: this.interface_locale.value
                },
                ladda = LaddaPreloader.start('#change_profile_submit');

            api.post('/advertiser.changeProfile', params).then(response => {

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
            this.phone = user.profile.phone;
            this.whatsapp = user.profile.whatsapp;
            this.interface_locale = _.find(this.locale, {value: user.locale});
            this.timezone = user.timezone;

        },
    },
});
