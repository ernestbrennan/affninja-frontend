var HlBox = {
	addEvent: function () {
		$(document).on('click', '.hl_box_toggler', function () {

			var target_selector = $(this).data('target'),
				target = $(target_selector);

			if (target.hasClass('hidden')) {

				target.removeClass('hidden');

			} else {

				target.addClass('hidden');
			}
		});

		$(document).on('click', '.hl_box_close', function (e) {
			$(this).closest('.hl_box').addClass('hidden');

			e.preventDefault();
		});

		$('body').on('click', function (e) {
			$('.hl_box').each(function () {
				//the 'is' for buttons that trigger popups
				//the 'has' for icons within a button that triggers a popup
				if (!$(this).is(e.target) && $(this).has(e.target).length === 0) {
					$(this).addClass('hidden');
				}
			});
		});
	}
};