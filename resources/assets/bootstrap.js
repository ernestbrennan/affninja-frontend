import currencies from './common/js/configs/currencies'
window.currencies = currencies;

// Raven
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
Raven.config(SENTRY_DSN).addPlugin(RavenVue, Vue).install();
if (typeof App !== 'undefined' && typeof App.user.hash !== 'undefined') {
    Raven.setUserContext({
        email: App.user.hash + '@affninja.com'
    });
}

// jQuery AJAX
window.$.ajaxSetup({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true
});

window.api = require('axios');
window.api.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
};
window.api.defaults.withCredentials = true;
window.api.defaults.baseURL = API_HOST;
window.api.interceptors.request.use(function (config) {
    switch (config.method) {
        case 'post':
            if (config.data === undefined) {
                config.data = {};
            }
            config.data.locale = app_locale_code;
            break;

        case 'delete':
        case 'get':
            if (config.params === undefined) {
                config.params = {};
            }
            config.params.locale = app_locale_code;
            break;
    }

    return config;
});

window.api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    let response = Object.assign({}, error);
    try {
        let response = Object.assign({}, error);
        if (Object.size(response)) {
            let response = Object.assign({}, error).response.data;

            if (response.status_code === 401 && !isLoginRequest(error)) {
                return location.reload();
            }
            if (Object.size(response.errors) && !isPromo()) {
                showErrorsInAlert(response, null);
            }
        }

    } catch (e) {
        console.error(e);
    }

    function isLoginRequest(error) {
        return error.request.responseURL.indexOf('login') !== -1;
    }

    function isPromo() {
        return MAIN_DOMAIN === location.host;
    }

    return Promise.reject(response);
});
