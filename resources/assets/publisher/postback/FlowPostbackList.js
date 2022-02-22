Vue.component('flow-postback-list', {
    template: '#flow-postback-list-tpl',
    props: ['flow_info'],
    mixins: [beforeunload_mixin],
    data() {
        return {
            postbacks: [],
            action: null,
            modal: null,
            tokens: {
                offer_hash: 0,
                flow_hash: 0,
                landing_hash: 0,
                transit_hash: 0,
                clickid: 0,
                ip: 0,
                data1: 0,
                data2: 0,
                data3: 0,
                data4: 0,
                unixtime: 0,
                type: 0,
                currency: 0,
                payout: 0,
                payout_usd: 0,
                lead_hash: 0,
            },
            origin_tokens: {},
            postback: {
                url: '',
                on_lead_add: 0,
                on_lead_approve: 0,
                on_lead_cancel: 0,
                hash: '',
            },
            origin_postback: {},
            postback_changed: false,
            modal_submit: false,
        };
    },

    mounted: function () {
        this.modal = $('#postback-settings-modal');
        $(this.modal).on('hide.bs.modal', this.onCloseModal);
    },

    watch: {
        'postbacks'() {
            this.$nextTick(() => {
                runTooltip();
            })
        },
        'tokens': {
            handler: function () {
                this.setPostbackChangeState(!_.isEqual(this.origin_tokens, this.tokens));
            },
            deep: true,
        },
        'postback': {
            handler: function () {
                this.setPostbackChangeState(!_.isEqual(this.origin_postback, this.postback));
            },
            deep: true,
        },
        'flow_info'() {
            this.getPostbackList();
        },
    },

    methods: {
        getPostbackList() {
            let params = {
                flow_hash: this.flow_info.hash,
            };

            api.get('/postback.getList', {params: params}).then(response => {
                this.postbacks = response.data.response;
            });
        },

        setPostbackChangeState(is_change) {
            if (is_change) {
                this.postback_changed = true;
                return this.removeOnBeforeunloadEvent();
            }

            this.postback_changed = false;
            this.addOnBeforeunloadEvent(LANG_FLOWS.on_close_window);
        },

        clearModalData() {
            this.postback = {
                url: '',
                on_lead_add: 0,
                on_lead_approve: 0,
                on_lead_cancel: 0,
                hash: '',
            };

            this.modal_submit = false;

            for (token in this.tokens) {
                this.tokens[token] = 0;
            }
        },

        openPostbackCreateModal() {
            this.action = 'create';
            this.clearModalData();

            this.origin_postback = _.clone(this.postback);
            this.origin_tokens = _.clone(this.tokens);

            this.setPostbackChangeState(false);
            this.modal.modal();
        },

        openPostbackEditModal(postback) {
            this.action = 'edit';
            this.clearModalData();

            this.postback  = _.assign({}, postback);

            // Init this.tokens
            this.setTokensFromUrl();

            this.origin_postback = _.clone(this.postback);
            this.origin_tokens = _.clone(this.tokens);

            this.setPostbackChangeState(false);
            this.modal.modal();
        },

        onCloseModal(e) {
            if (this.postback_changed && !this.modal_submit) {

                this.forbidHideModal(e);

                Swal.showSuccess(LANG_POSTBACKS.on_unsaved_changes, LANG_MESSAGES.save).then(() => {

                    this.modal.modal('hide');

                    switch (this.action) {
                        case 'create':
                            this.createPostback();
                            break;

                        case 'edit':
                            this.editPostback();
                            break;

                        default:
                            throw 'Unknown action';
                    }
                }, () => {

                });
            }
        },

        forbidHideModal(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        },

        setTokensFromUrl() {
            for (let token in this.tokens) {
                if (this.postback.url.indexOf(token) !== -1) {
                    this.tokens[token] = 1;
                }
            }
        },

        setToken(value, token) {
            let params_obj = {}, curr_label, param_str, URI,
                postback_url_val = this.postback.url;

            value === 0 ? this.tokens[token] = 1 : this.tokens[token] = 0;

            for (let key in this.tokens) {
                curr_label = key;

                postback_url_val = postback_url_val.replace(token + '={' + token + '}', '');

                if (value === 0) {
                    params_obj[token] = '{' + token + '}';
                }
            }

            param_str = http_build_query(params_obj, '', '&', false);

            if (postback_url_val.indexOf('?') !== -1) {
                URI = postback_url_val + '&' + param_str;
            } else {
                URI = postback_url_val + '?' + param_str;
            }

            //Убираем колизии
            URI = URI.replace(/&+/, '&');
            URI = URI.replace('/&', '?');
            URI = URI.replace('/?&', '?');
            URI = URI.replace('?&', '?');
            URI = URI.replace(/&$/, '');
            URI = URI.replace(/\?$/, '');
            URI = URI.replace(/\&&/, '&');
            URI = URI.replace(/\&$/, '');

            this.postback.url = URI;
        },

        createPostback() {
            this.modal_submit = true;

            let ladda = LaddaPreloader.start('#create_postback'),
                params = _.clone(this.postback);

            params.flow_hash = this.flow_info.hash;

            api.post('/postback.create', params).then(response => {
                this.postbacks.unshift(response.data.response);
                this.modal.modal('hide');

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
                this.setPostbackChangeState(false);
            }, response => {
                LaddaPreloader.stop(ladda);
            });
        },

        editPostback() {
            this.modal_submit = true;

            let ladda = LaddaPreloader.start('#edit_postback'),
                params = _.clone(this.postback);

            removeTooltipDiv();

            params.postback_hash = this.postback.hash;
            delete params.hash;

            api.post('/postback.edit', params).then(response => {
                let index = _.findIndex(this.postbacks, {hash: response.data.response.hash});

                this.postbacks.splice(index, 1, response.data.response);
                this.modal.modal('hide');

                showMessage('success', response.data.message, null, null);
                LaddaPreloader.stop(ladda);
                this.setPostbackChangeState(false);
            }, response => {
                LaddaPreloader.stop(ladda);
            });
        },

        deletePostback(postback) {
            let params = {
                postback_hash: postback.hash,
            };

            Swal.show(LANG_POSTBACKS.on_delete_msg).then(() => {
                api.post('/postback.delete', params)
                    .then(response => {
                        let index = _.findIndex(this.postbacks, {hash: postback.hash});
                        this.postbacks.splice(index, 1);

                        showMessage('success', response.data.message);
                        removeTooltipDiv();
                    });
            }, () => {
                removeTooltipDiv();
            });
        },
    },
});