$(document).ready(function () {

	$('#gen_api_key').on('click', function () {
		generateApiKey();
	});

	$(document).on('click', '#regenerate_api_key', function () {
		regenerateApiKey();
	});

    initClipboard();
});

/**
 * Генерация API ключа
 */
function generateApiKey() {

	apiRequest('user.genApiKey', 'POST', {}, function (result) {

		if (result.status_code != 202) {
			showMessage('error', result.message)
			return false;
		}

		var template_data = {
			LANG_MESSAGES: LANG_MESSAGES,
			LANG_API: LANG_API,
			api_key: result.response.api_key
		};

		renderTemplate('/publisher/api/templates/gen_api_key.hbs', template_data, '#api_key_wrap', {}, function () {
		});

	}, '#gen_api_key');

}

/**
 * Перегенерация API ключа
 */
function regenerateApiKey() {

	apiRequest('user.genApiKey', 'POST', {}, function (result) {

		if (result.status_code != 202) {
			showMessage('error', result.message)
			return false;
		}

		$('#api_key').val(result.response.api_key);

	}, '#regenerate_api_key');

}