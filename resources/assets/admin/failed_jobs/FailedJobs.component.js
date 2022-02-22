Vue.component('failed-jobs', {
    template: '#failed_jobs_tpl',
    data() {
        return {
            failed_jobs: []
        }
    },
    mounted() {
        this.getFailedJobs();
    },
    methods: {

        getFailedJobs() {
            ContentPreloader.show('#failed_jobs_table_wrap');

            api.get('/failed_jobs.getList').then(response => {
                this.failed_jobs = response.data.response;
                this.$nextTick(() => {
                    ContentPreloader.hide();
                });
            });
        },

        deleteFailedJob(failed_job_id, index) {
            let params = {id: failed_job_id},
                ladda = LaddaPreloader.start('#delete-' + failed_job_id);

            api.post('/failed_jobs.delete', params).then(response => {

                this.failed_jobs.splice(index, 1);
                decrementNavbarCount('/tools', '/tools/failed_jobs');

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        retryJob(id, index) {
            let params = {id: id},
                ladda = LaddaPreloader.start('#restore-' + id);

            api.post('/failed_jobs.retry', params).then(response => {

                this.failed_jobs.splice(index, 1);
                decrementNavbarCount('/tools', '/tools/failed_jobs');

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);

            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        retryAll() {
            Swal.show(LANG_MESSAGES.retry_all + '?', LANG_MESSAGES.restore).then(() => {
                let ladda = LaddaPreloader.start('#retry-all');

                api.post('/failed_jobs.retry', {id: 'all'}).then(response => {

                    this.failed_jobs = [];
                    refreshNavbarCount('/tools', '/tools/failed_jobs');

                    showMessage('success', response.data.message);
                    LaddaPreloader.stop(ladda);
                }, () => {
                    LaddaPreloader.stop(ladda);
                });
            }, () => {

            });
        },

        parseJobName(payload) {
            let json_payload = JSON.parse(payload);
            return json_payload.displayName;
        },

        parseException(payload) {
            let exception = payload.split('Stack trace')[0];
            return exception;
        },

        parseLeadId(payload) {
            let matched = /lead_id\\";i:(\d+)/ig.exec(payload);
            return matched === null ? '' : matched[1];
        }
    },
});
