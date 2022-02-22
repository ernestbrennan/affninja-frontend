var SmallPreloader = {
    show(selector) {
        let id = str_rand(8) + time();
        let parent = $(selector);

        if (!parent.find('.fa-spinner').length) {
            parent.append(' <i id="' + id + '" class="fa fa-spinner fa-spin" aria-hidden="true"></i>');
        }

        return id;
    },
    hide(id) {
        $('#' + id).remove();
    }
};