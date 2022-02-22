import 'babel-polyfill'

window.$ = window.jQuery = require('jquery');
require('bootstrap');
window._ = require('lodash');
window.Handlebars = require('../../node_modules/handlebars/dist/handlebars.min.js');
window.Clipboard = require('clipboard');
window.io = require('socket.io-client');
window.Ladda = require('ladda');
window.toastr = require('toastr');
window.select2 = require('select2');
window.moment = require('moment');
require('moment-timezone');
window.Chart = require('../../node_modules/chart.js/dist/Chart.min.js');
window.UAParser = require('ua-parser-js')

window.Vue = require('vue');
import Multiselect from 'vue-multiselect'

window.VueMultiselect = {
    default: Multiselect
};


let DataTable = require('datatables.net');
// jQuery access
$.fn.dataTable = DataTable;

// Provide access to the host jQuery object (circular reference)
DataTable.$ = $;

// Legacy aliases
$.fn.dataTableSettings = DataTable.settings;
$.fn.dataTableExt = DataTable.ext;

// With a capital `D` we return a DataTables API instance rather than a
// jQuery object
$.fn.DataTable = function ( opts ) {
    return $(this).dataTable( opts ).api();
};

// All properties that are available to $.fn.dataTable should also be
// available on $.fn.DataTable
$.each( DataTable, function ( prop, val ) {
    $.fn.DataTable[ prop ] = val;
} );

require('../../resources/assets/common/plugins/datatables/uikit/dataTables.uikit.js');

require('sweetalert');
require('moment');
require('floatthead');
require('jquery-inview');
require('jquery-numeric');
require('bootstrap-datepicker');
require('eonasdan-bootstrap-datetimepicker');
require('select2');
require('../../resources/assets/common/plugins/select2.custom/select2.js');

