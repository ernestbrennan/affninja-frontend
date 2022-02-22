require('../bootstrap');

window.UserAccount = require('./components/UserAccount.js').UserAccount;
import {VueMaskDirective} from 'v-mask'

let ls = require('local-storage');

Vue.directive('mask', VueMaskDirective);

$(document).ready(function () {
    setAppLocaleId();
    addLogoutListener();
    addLogoutAsUserListener();

    runTooltip();
});