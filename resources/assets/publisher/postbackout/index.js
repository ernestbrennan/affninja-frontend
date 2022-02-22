$(document).ready(function () {

	initDateParams();
	extendDatatable();

	//Получения списка офферов
	getPostbackoutLogs();


	//Хэндлер на главную кнопку "Применить"
	$('#filter_submit').on('click', function () {


        Filters.setFiltersInUrl('#filters', {
            date_from: UrlParameter.getDateFrom(),
            date_to: UrlParameter.getDateTo(),
        });
        // Вставляем значения из фильтров по хэшу постбека в лида в URL
        insertValueInUrl('postback_hash', cleanStrOfHash($('#postback_hash').val().trim() || ''));
        insertValueInUrl('lead_hash', cleanStrOfHash($('#lead_hash').val().trim() || ''));

		getPostbackoutLogs();
	});
});

/**
 * Инициализация параметров даты и вставка их в адресную строку
 */
function initDateParams() {

	var date_from = convertDateForReadableFormat(UrlParameter.getDateFrom()) || null;
	var date_to = convertDateForReadableFormat(UrlParameter.getDateTo()) || null;

	setDateFilter(date_from, date_to);
}

/**
 * Получение списка логов постбеков
 */
function getPostbackoutLogs() {
	var params = Filters.getData();

	//Проверка, что дата начала меньше чем дата окончания статистики
	if (validateTwoDate(new Date(params.date_from), new Date(params.date_to), '1_less_than_2') === false) {
		showMessage('error', LANG_FILTERS.incorrect_date);
		return false;
	}

	ContentPreloader.show('#postbackout_logs_table_wrap');

	apiRequest('postbackout.getList', 'GET', params, buildPostbackoutLogsHtml, '#filter_submit');
}

/**
 * Построение HTML списка исходящих постбеков
 *
 * @param result
 * @returns {boolean}
 */
function buildPostbackoutLogsHtml(result) {

	var template_data = {
		LANG_POSTBACKOUT: LANG_POSTBACKOUT,
		LANG_FILTERS: LANG_FILTERS,
		LANG_MESSAGES: LANG_MESSAGES,
		CDN_HOST: CDN_HOST,
		postbackout_logs: []
	};

	for (var item in result.response) {

		result.response[item].date = date('d.m.Y H:i', strtotime(result.response[item].created_at));

		template_data.postbackout_logs.push(result.response[item]);
	}

	renderTemplate(FlowParameter.template_path + 'list.hbs', template_data, '#postbackout_logs_table_wrap', {},
		function () {

			if (template_data.postbackout_logs.length > 0) {
				runDatepickerOnPostbackoutLogsTable();
			}

			runTooltip();
            ContentPreloader.hide();
        });
}

/**
 * Запуск dataTable на таблице логово постбеков
 */
function runDatepickerOnPostbackoutLogsTable() {
	let table = $('#postbackout_logs_table');

	table.DataTable({
		language: {
			paginate: {
				previous: "Пред.",
				next: "След."
			}
		},
		pageLength: 25,
		bLengthChange: false,
		bInfo: false,
		bFilter: false,
		columnDefs: [
			{targets: 0, type: 'title_de_date'},
			{targets: 'th_roi', type: 'title-numeric'}
		],
		aaSorting: [[0, "desc"]],
		drawCallback: function () {
			stylePagginationBtns();
		}
	});

	// Run fixed header
	table.floatThead({
		zIndex: 2,
		responsiveContainer: function ($table) {
			return $table.closest('.table-responsive');
		}
	});
}