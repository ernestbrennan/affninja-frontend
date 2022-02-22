require('../bootstrap');
require('./components/Balance.js')

$(document).ready(function () {
    setAppLocaleId();
    addLogoutListener();
    addLogoutAsUserListener();
});