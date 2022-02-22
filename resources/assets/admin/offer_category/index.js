$(document).ready(function () {

	// Удаление категории
	$('.delete_offer_category_submit').on('click', function () {
		var offer_category_id = $(this).data('offer_category_id');

		swal({
			title: LANG.on_delete_msg,
			showCancelButton: true,
			confirmButtonText: LANG_MESSAGES.delete_it,
			cancelButtonText: LANG_MESSAGES.cancel,
			closeOnConfirm: true,
			closeOnCancel: true
		}, function (isConfirm) {

			if (isConfirm) {
				deleteOfferCategory(offer_category_id);
			}
		});
	});

	//Открытие модалки создания категории
	$('#create_offer_category_open_modal_btn').on('click', function () {
		showAjaxPreloader();

		httpRequest('/tools/offer_category/getCreateModal', 'GET', [], function (result) {
			$('body').append(result);

			hideAjaxPreloader();

			$('#create_offer_category_modal').modal();
		}, null);
	});

	// Создание категории
	$(document).on('click', '#create_offer_category_submit', function () {
		createOfferCategory();
	});


	// Получение модалки ред. категории
	$('.edit_offer_category_open_modal_btn').on('click', function () {
		var offer_category_id = $(this).data('offer_category_id') || '';
		if (offer_category_id == '') {
			console.error('Undefined offer_category hash');
			return false;
		}

		showAjaxPreloader();

		httpRequest('/tools/offer_category/getEditModal/' + offer_category_id, 'GET', [], function (result) {
			$('body').append(result);

			hideAjaxPreloader();

			$('#edit_offer_category_modal').modal();
		}, null);
	});

	// Удаление модалки при ее закрытии
	$(document).on('hidden.bs.modal', '#edit_offer_category_modal, #create_offer_category_modal', function () {
		$(this).remove();
	});

	// Ред. категории
	$(document).on('click', '#edit_offer_category_submit', function () {
		editOfferCategory();
	});
});

/**
 * Отправка запроса на доб. категории
 */
function createOfferCategory() {
	var params = $('#create_offer_category_form').getFormData();

	apiRequest('offer_category.create', 'POST', params, createOfferCategoryCallback, '#create_offer_category_submit');
}

/**
 * Callback доб. категории
 *
 * @param result
 * @returns {boolean}
 */
function createOfferCategoryCallback(result) {
	if (result.status_code != 202) {
		return false;
	}

	location.href = '/tools/offer_category';
}

/**
 * Ред. категории
 */
function editOfferCategory() {
	var params = $('#edit_offer_category_form').getFormData();

	apiRequest('offer_category.edit', 'POST', params, editOfferCategoryCallback, '#edit_offer_category_submit');
}

/**
 * Callback ред. категории
 *
 * @param result
 * @returns {boolean}
 */
function editOfferCategoryCallback(result) {
	if (result.status_code != 202) {
		return false;
	}

	location.href = '/tools/offer_category';
}

/**
 * Удаление категории
 *
 * @param offer_category_id
 */
function deleteOfferCategory(offer_category_id) {
	if (offer_category_id == '') {
		console.error('offer_category_id is undefined');
		return false;
	}
	apiRequest('offer_category.delete', 'POST', {offer_category_id: offer_category_id}, deleteOfferCategoryCallback, null);
}

/**
 * Callback удаления категории
 *
 * @param result
 * @returns {boolean}
 */
function deleteOfferCategoryCallback(result) {
	if (result.status_code != '202') {
		return false;
	}

	showMessage('success', result.message);

	$('.offer_category[data-offer_category_id=' + result.request.offer_category_id + ']').slideUp('300');
}