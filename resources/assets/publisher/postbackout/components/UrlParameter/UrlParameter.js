/**
 * Методы для работы с URl
 *
 * @type {{}}
 */
UrlParameter = {

	getDateFrom: function () {
		var date_from = getUrlVars()['date_from'] || 'null';

		return (date_from == 'null' ? null : date_from)
	},

	getDateTo: function () {
		var date_to = getUrlVars()['date_to'] || 'null';

		return (date_to == 'null' ? null : date_to)
	},

	getFlowHashes: function () {
		var flow_hashes = getUrlVars()['flow_hashes'] || 'null';
		if (flow_hashes !== 'null') {
			flow_hashes = flow_hashes.split(',');
		}

		return (flow_hashes == 'null' ? [] : flow_hashes)
	},

	getLeadHash: function () {
		return getUrlVars()['lead_hash'] || '';
	},

	getPostbackhash: function () {
		return getUrlVars()['postback_hash'] || '';
	}
};