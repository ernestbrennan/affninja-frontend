$(document).ready(function () {
	$(document).keydown(function (event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
	$(function () {
		var tab = getUrlVars()['tab'] || '';
		if (tab == '') {
			tab = 'profile';
			insertValueInUrl('tab', tab);

			// $('#' + tab + '_tab').tab('show');
		}

		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			var tab = $(this).data('tab');
			insertValueInUrl('tab', tab);
		});
	});

	//Обработчик на кнопе подтверждения изменения профиля
	$('#change_profile_submit').on('click', function () {
		changeProfile();
	});

	//Обработчик на кнопе подтверждения изменения пароля
	$('#change_password_submit').on('click', function () {
		changePassword();
	});
});

/**
 * Изменение параметров профиля пользователя
 */
function changeProfile() {
	var form = $('#change_profile_form');
    var params = {};

    params.full_name = $('#full_name').val();
    params.skype = $('#skype').val();
    params.telegram = $('#telegram').val();

    apiRequest('user.changeProfile', 'POST', params, changeProfileCallback, '#change_profile_submit');
}


/**
 * Callback изменения параметров профиля пользователя
 *
 * @param result
 */
function changeProfileCallback(result) {

	if (result.status_code != '202') {
		return false;
	}

	var form = $('#change_profile_form');
	form.children().removeClass('has-error');

	showMessage('success', result.message, null, null);
}

/**
 * Изменение пароля пользователя
 *
 * @returns {boolean}
 */
function changePassword() {
	var form = $('#change_password_form');
	var params = form.getFormData();

	//Валидация
	if (!changePasswordValidation(params)) {
		return false;
	}

	apiRequest('user.changePassword', 'POST', params, changePasswordCallback, '#change_password_submit');
}

/**
 * Валидация изменения профиля пользователя
 *
 * @param params
 * @returns {boolean}
 */
function changePasswordValidation(params) {
	var validation = true;
	var form = $('#change_password_form');

	//Старый пароль
	if (params.password == undefined || params.password == '') {
		form.find('[name=password]').parent().addClass('has-error');
		validation = false;
	} else {
		form.find('[name=password]').parent().removeClass('has-error');
	}

	//Новый пароль
	if (params.new_password == undefined || params.new_password == '') {
		form.find('[name=new_password]').parent().addClass('has-error');
		validation = false;
	} else {
		form.find('[name=new_password]').parent().removeClass('has-error');
	}

	//Повтор ногово пароля
	if (params.new_password_confirmation == undefined || params.new_password_confirmation == '') {
		form.find('[name=new_password_confirmation]').parent().addClass('has-error');
		validation = false;
	} else {
		form.find('[name=new_password_confirmation]').parent().removeClass('has-error');
	}

	return validation;
}
/**
 * Callback изменения пароля пользователя
 *
 * @param result
 */
function changePasswordCallback(result) {

	if (result.status_code != '202') {
		return false;
	}

	var form = $('#change_password_form');
	form.children().removeClass('has-error');
	//Чистка полей формы
	form.find('input').val('');

	showMessage('success', result.message, null, null);
}