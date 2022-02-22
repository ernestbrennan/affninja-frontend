const toggle_target_geo_visibility = {
    methods: {
        toggleTargetGeoVisibility(target_hash) {
            let toggle_btn = '.btn-toggle-' + target_hash,
                wraper = $(".target-" + target_hash),
                html = LANG_MESSAGES.hide + ' ' + '<i class="fa fa-chevron-up"></i>';

            $(toggle_btn).toggleClass('closed');

            if ($(toggle_btn).hasClass('closed')) {
                html = LANG_MESSAGES.show_all + ' ' + '<i class="fa fa-chevron-down"></i>';
            }

            $(toggle_btn).html(html);
            wraper.find('.toggle-border').toggleClass('no-borders');
            wraper.find('.hidden-target-geo').slideToggle('fast');
        }
    }
}