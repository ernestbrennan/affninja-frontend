const AjaxPreloader = {
    show: function () {
        $('body').append(`<div id="ajax_preloader">
            <div class="ajax_preloader_content">
            <img src="/images/loading-bars.svg" alt="Loading">
            </div>
            </div>`
        );
        $('#ajax_preloader').fadeIn();
    },
    hide: function () {
        $('#ajax_preloader').remove();
    }
};
