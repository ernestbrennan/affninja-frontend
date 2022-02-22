let PreviewUploader = {
    upload(e) {
        return new Promise((resolve, reject) => {
            let self = this, data = new FormData(), file;

            file = e.target.files || e.dataTransfer.files;
            data.append('preview', file[0]);
            data.append('locale', app_locale_code);

            $.ajax({
                url: API_HOST + '/file.uploadImage',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (result) {
                    resolve(result);
                },
                error: function (result) {
                    showErrorsInAlert(JSON.parse(result.responseText));
                }
            });
        });
    },
};