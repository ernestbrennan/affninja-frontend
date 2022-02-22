const regenerate_password = {
    methods: {
        changeUserPassword(user_id, target = null) {
            Swal.showSuccess(LANG_USERS.set_new_password_confirmation, LANG_USERS.set_password).then(() => {
                let ladda;
                if (!is_null(target)) {
                    ladda = LaddaPreloader.start(target);
                }

                api.post('/user.regeneratePassword', {user_id: user_id}).then(response => {
                    showMessage('success', response.data.message);
                    this.stopPreloader(ladda);
                }, () => {
                    this.stopPreloader(ladda);
                });
            }, () => {});
        },

        stopPreloader(ladda) {
            if (ladda !== undefined) {
                LaddaPreloader.stop(ladda);
            }
        }
    }
};