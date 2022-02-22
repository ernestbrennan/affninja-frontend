const Swal = {

    show(title, btn_title = LANG_MESSAGES.delete_it, text = '') {
        return this._show(title, btn_title, text, 'error-alert');
    },

    showSuccess(title, btn_title = LANG_MESSAGES.delete_it, text = '') {
        return this._show(title, btn_title, text, 'success-alert');
    },

    _show(title, btn_title, text, custom_class){
        return new Promise((resolve, reject) => {
            swal({
                title: title,
                text: text,
                showCancelButton: true,
                confirmButtonText: btn_title,
                cancelButtonText: LANG_MESSAGES.cancel,
                closeOnConfirm: true,
                closeOnCancel: true,
                customClass: custom_class,
            }, function (confirmed) {
                if (confirmed) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }
};