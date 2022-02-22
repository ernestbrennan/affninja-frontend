Vue.component('active-sessions', {
    template: '#active-sessions-tpl',
    data() {
        return {
            sessions: [],
            tokens_loading: false,
        };
    },

    created() {
        this.getAllSessions();
    },

    watch: {
        'tokens_loading'() {
            this.$nextTick(() => {
                if (this.tokens_loading) {
                    return ContentPreloader.show('#active_sessions_wrapper');
                }
                ContentPreloader.hide();
            });
        }
    },

    methods: {
        getAllSessions() {
            this.tokens_loading = true;

            api.get('/auth_token.getList').then(response => {

                response.data.response.forEach(session => {
                    this.sessions.push(session);
                });

                this.tokens_loading = false;

                this.$nextTick(() => {
                    runPopover();
                });
            })
        },

        deactivate(hash, index) {
            let ladda = LaddaPreloader.start(`#session-deactivate-${hash}`);

            api.delete('/auth_token.deleteByHash', {params: {hash}}).then((response) => {
                this.sessions.splice(index, 1);

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda)
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        deactivateAll() {
            Swal.show(LANG_AUTH_TOKENS.deactivate_question, LANG_MESSAGES.deactivate).then(() => {
                let ladda = LaddaPreloader.start('#session-deactivate-all');
                api.delete('/auth_token.deleteExceptCurrenToken').then((response) => {
                    this.sessions = this.sessions.filter(session => session.is_current);
                    LaddaPreloader.stop(ladda)
                });
            }, () => {
                LaddaPreloader.stop(ladda)
            });
        },

    },
});
