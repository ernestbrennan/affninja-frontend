let vm = new Vue({
    el: '#flows',
    data: {
        LANG_FLOWS: LANG_FLOWS,
        flows: [],
        offers: [],
        active_flow: {},
        clone_flow: {
            title: '',
            clone_postbacks: 0
        },
        pagination: {
            per_page: 20,
            page: 1,
            finished: false
        },
        selected_offer: {},
        clone_modal: null,
        offers_loading: false,
    },

    components: {
        'multiselect': window.VueMultiselect.default
    },

    created() {
        this.getFlows();
        this.getOffers();
    },

    mounted() {
        let self = this;

        Filters.init();

        $(document).on('click', '#filters_submit', function (e) {
            if (activeAjax) {
                e.stopPropagation();
                return false;
            }
            Filters.setFiltersInUrl('#filters');

            self.reloadFlows();
        });

        this.clone_modal = $('#clone_modal');

        callOnEnter('.filter_search', function () {
            self.reloadFlows();
        });

        $(document).on('show.bs.collapse', function (e) {
            let button_id = $(e.target).data('id');

            if (button_id) {
                $(button_id).slideUp(300);
            }
        });
    },

    watch: {
        'offers'() {
            Vue.nextTick(function () {
                runTooltip();
            });
        },
        'flows'() {
            Vue.nextTick(function () {
                runTooltip();
            });
        },
    },

    methods: {
        getLeadsCount(statistics) {
            let count = _.sumBy(statistics, function (o) {
                return parseInt(o.leads)
            });
            return count ? count : '-'
        },

        getApprovedLeadsCount(statistics) {
            let count = _.sumBy(statistics, function (o) {
                return parseInt(o.approved_leads)
            });
            return count ? count : '-'
        },

        openLinkModal(flow) {
            this.$refs.link_modal.openForFlows(flow.hash);
        },

        reloadFlows() {
            this.flows = [];
            this.getFlows();
        },

        getFlows() {
            ContentPreloader.show('#flows');
            let ladda = LaddaPreloader.start('#filters_submit');

            let params = Filters.getData();
            params.with = ['offer', 'day_statistics', 'transits.locale', 'landings.locale', 'group'];

            api.get('/flow.getList', {params: params}).then(response => {
                this.flows = response.data.response;
                if (this.flows.length < 1) {
                    this.pagination.finished = true;
                }

                ContentPreloader.hide();
                LaddaPreloader.stop(ladda);
            })
        },

        createFlow() {
            if (!Object.size(this.selected_offer)) {
                return;
            }
            let ladda = LaddaPreloader.start('#create_flow');
            api.post('/flow.create', {offer_hash: this.selected_offer.hash}).then(response => {
                location.href = '/tools/flows/' + response.data.response.hash;
            }, () => {
                LaddaPreloader.stop(ladda)
            });
        },

        deleteFlow(flow) {
            Swal.show(LANG_FLOWS.on_delete_msg, LANG_MESSAGES.hide).then(() => {

                api.post('/flow.delete', {flow_hash: flow.hash})
                    .then(response => {
                        let index = _.findIndex(this.flows, {hash: flow.hash});
                        this.flows.splice(index, 1);

                        showMessage('success', response.data.message)
                    })
                    .catch(error => {
                        // Если это ошибка наличия связей в домена
                        if (isset(error.errors.reason)) {
                            showRelationError(error);
                        }
                    });
            }, () => {
            });
        },

        /**
         * Отображение алерта с ошибкой при попытке удалить поток, если он связан с доменом через лендинги/транзитки
         * @param response
         */
        showRelationError(response) {

            let domains = '', item, error;
            for (item in response.errors.domain) {
                domains += '- ' + error.errors.domain[item] + '<br>';
            }

            error = error.errors.reason[0] + '<br>' + domains;

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut",
                "extendedTimeOut": 0,
                "hideDuration": "0",
                "timeOut": "0",
            };
            toastr.error(error, error.message);
        },

        openCloneFlowModal(flow) {
            this.active_flow = flow;
            this.clone_flow.title = 'New ' + flow.title;
            this.clone_modal.modal();
        },

        cloneFlow(callback_action) {
            let params = this.clone_flow;
            params.flow_hash = this.active_flow.hash;

            api.post('/flow.clone', params)
                .then(response => {
                    switch (callback_action) {
                        case 'clone':
                            let relations = ['offer', 'day_statistics', 'transits.locale', 'landings.locale', 'group'];

                            this.getFlowByHash(response.data.response.hash, relations).then(response => {
                                this.flows.unshift(response.data.response);
                            });

                            // Скрываем и удаляем модалку клонировая потока
                            this.clone_modal.modal('hide');

                            showMessage('success', response.data.message);
                            break;

                        case 'clone_and_open':
                            location.href = '/tools/flows/' + response.data.response.hash;
                            break;

                        default:
                            throw 'Unknown callback action type';
                    }
                });
        },

        getFlowByHash(flow_hash, relations = []) {
            return new Promise((resolve, reject) => {
                api.get('/flow.getByHash', {params: {flow_hash: flow_hash, with: relations}})
                    .then(response => resolve(response))
            });
        },

        getOffers() {
            let params = {
                with_already_added: 1,
            };

            this.offers_loading = true;
            api.get('/offer.getList', {params: params}).then(response => {
                this.offers = _.orderBy(response.data.response, ['already_added'], ['desc']);

                this.$nextTick(() => {
                    this.offers_loading = false;
                })
            });
        },
    },
});