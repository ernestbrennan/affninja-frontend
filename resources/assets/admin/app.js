import {VueMaskDirective} from "v-mask";

require('../bootstrap');
window.UserAccount = require('./components/UserAccount.js').UserAccount;
window.Quill = require('quill');

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor);

$(document).ready(function () {
    setAppLocaleId();
    addLogoutListener();
});