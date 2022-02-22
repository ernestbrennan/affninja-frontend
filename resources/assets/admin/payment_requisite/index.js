$(document).ready(function () {

	// Обработчик на кнопке "Удалить"
	$('.delete_payment_requisite_submit').on('click', function () {
		var payment_requisite_hash = $(this).data('payment_requisite_hash');

		swal({
			title: LANG.on_delete_msg,
			showCancelButton: true,
			confirmButtonText: LANG_MESSAGES.delete_it,
			cancelButtonText: LANG_MESSAGES.cancel,
			closeOnConfirm: true,
			closeOnCancel: true
		}, function (isConfirm) {

			if (isConfirm) {
				deletePaymentRequsite(payment_requisite_hash);
			}
		});
	});

	// Обработчик на кнопке "Подтвердить"
	$('.verify_payment_requisite_submit').on('click', function () {
		var payment_requisite_hash = $(this).data('payment_requisite_hash');

		verifyPaymentRequisite(payment_requisite_hash);
	});


	// Обработчик на checkbox установки реквизита как первичного
	$('.set_primary_payment_requisite_submit').on('change', function () {
		var payment_requisite_hash = $(this).data('payment_requisite_hash');
		var payment_requisite_currency_id = $(this).data('payment_requisite_currency_id');
		var payment_requisite_user_id = $(this).data('payment_requisite_user_id');

		setPrimaryPaymentRequisite(payment_requisite_hash, payment_requisite_currency_id, payment_requisite_user_id);
	});
});

/**
 * Подтверждение платежного реквизита
 *
 * @param payment_requisite_hash
 */
function verifyPaymentRequisite(payment_requisite_hash) {
	var params = {payment_requisite_hash: payment_requisite_hash};

	apiRequest('requisite.verify', 'POST', params, verifyPaymentRequisiteCallback,
		'#verify_payment_requisite_submit-' + payment_requisite_hash);
}

/**
 * Callback подтверждения реквизита
 *
 * @param result
 * @returns {boolean}
 */
function verifyPaymentRequisiteCallback(result) {
	var IS_VERIFIED = 1;
	if (result.status_code != '202') {
		return false;
	}

	$('#verify_payment_requisite_submit-' + result.request.payment_requisite_hash)
		.replaceWith(getVefifiedButton(result.request.payment_requisite_hash, IS_VERIFIED));

	showMessage('success', result.message);
}

/**
 * Удаление платежного реквизита
 *
 * @param payment_requisite_hash
 */
function deletePaymentRequsite(payment_requisite_hash) {
	if (payment_requisite_hash == '') {
		console.error('payment_requisite_hash is undefined');
		return false;
	}

	apiRequest('requisite.delete', 'POST', {payment_requisite_hash: payment_requisite_hash}, deletePaymentRequsiteCallback,
		'#delete_payment_requisite_submit-' + payment_requisite_hash);
}

/**
 * Callback удаления платежного реквизита
 *
 * @param result
 * @returns {boolean}
 */
function deletePaymentRequsiteCallback(result) {
	if (result.status_code != '202') {
		return false;
	}

	showMessage('success', result.message);

	$('.payment_requisite[data-payment_requisite_hash=' + result.request.payment_requisite_hash + ']').slideUp('300');
}

/**
 * Установка платежного реквизита как основного у пользователя
 *
 * @param payment_requisite_hash
 * @param payment_requisite_currency_id
 * @param payment_requisite_user_id
 */
function setPrimaryPaymentRequisite(payment_requisite_hash, payment_requisite_currency_id, payment_requisite_user_id) {

	var params = {
		payment_requisite_hash: payment_requisite_hash,
		payment_requisite_currency_id: payment_requisite_currency_id,
		payment_requisite_user_id: payment_requisite_user_id
	};

	apiRequest('requisite.setPrimary', 'POST', params, setPrimaryPaymentRequisiteCallback, null);
}

/**
 * Callback установки подтверждения реквизита  как основного у пользователя
 *
 * @param result
 * @returns {boolean}
 */
function setPrimaryPaymentRequisiteCallback(result) {

	if (result.status_code != '202') {
		return false;
	}

	// Все чекбоксы, которые принадлежат пользователю по конкретной валюте
	var checkboxes = $('.set_primary_payment_requisite_submit[data-payment_requisite_user_id=' +
		result.request.payment_requisite_user_id + '][data-payment_requisite_currency_id=' +
		result.request.payment_requisite_currency_id + ']');

	checkboxes.each(function () {
		// Если текущий чекбокс это тот, который отвечает за реквизит, установленный как основной - отмечаем его
		if ($(this).data('payment_requisite_hash') == result.request.payment_requisite_hash) {
			$(this).prop('checked', true).prop('disabled', true);
		} else {
			$(this).prop('checked', false).prop('disabled', false);
		}

	});


	showMessage('success', result.message);
}

function getVefifiedButton(payment_requisite_hash, payment_requisite_is_verified) {
	switch (payment_requisite_is_verified) {
		case 1:
			return '<span class="green badge">' + LANG_MESSAGES.is_verified + '</span>';

		case 0:
			return '<button class="btn btn-sm btn-default verify_payment_requisite_submit ladda-button"' +
				' data-style="zoom-out" data-payment_requisite_hash="' + payment_requisite_hash + '"' +
				' id="verify_payment_requisite_submit-' + payment_requisite_hash + '"><span class="ladda-label">' +
				'<i class="fa fa-check" aria-hidden="true"></i> ' + LANG_MESSAGES.verify_it + '</span></button>';

		default:
			return '-';
	}

}