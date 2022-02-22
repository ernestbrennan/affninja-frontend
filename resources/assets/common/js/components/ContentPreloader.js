var ContentPreloader = {
    show(selector) {
        let container = $(selector);
        container.addClass('preloader');
        return container;
    },
    hide(preloader = false) {
        if (!preloader || !preloader instanceof jQuery) {
            preloader = $('.preloader');
        }
        preloader.removeClass('preloader');
    }
};