/**
 * Параметры статистики
 *
 * @type {{}}
 */
let StatParameter = {
	prev_stat_type: null,
	template_path: '/common/handlebars/statistics/',
	template_path_modal: '/admin/statistics/templates/',
	active_ajax_for_inside_tr_stat: false,
	active_ajax_for_stat: false,
    stat_page: 1,
    stat_finished: false,

	setPrevStatType: function (prev_stat_type) {

		if (!prev_stat_type) {
			throw 'Specify prev stat type';
		}
		this.prev_stat_type = prev_stat_type;
	},
	getPrevStatType: function () {
		return this.prev_stat_type;
	}
};