var UserLoginer = {
    login(user_hash) {
        api.post('/auth.loginAsUser', {user_hash: user_hash}).then(response => {
            if (response.data.status_code !== 202) {
                return alert(LANG_USERS.on_enter_in_user_cabinet_error);
            }

            window.open(response.data.response.dashboard_url);
        });
        return false;
    },
    logout() {
        api.post('/logout').then(() => {
            location.href = location.protocol + "//" + MAIN_DOMAIN;
        });
    }
};