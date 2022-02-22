Vue.component('flow-groups', {
    template: '#flow_groups_tpl',
    props: ['flow_hash', 'group_hash'],
    components: {
        'multiselect': window.VueMultiselect.default
    },
    data: function () {
        return {
            flow_groups: [],
            action: null,
            selected_flow_group: {
                hash: '',
                title: '',
            },
            group_title: '',
            settings_modal: null,
        };
    },

    mounted: function () {
        this.getFlowLabels();
        this.settings_modal = $('#settings_modal')
    },

    methods: {
        updateSelected(flow_group) {
            let flow_group_hash = null;
            if (!is_null(flow_group)) {
                this.selected_flow_group = _.find(this.flow_groups, {hash: flow_group.hash});
                flow_group_hash = this.selected_flow_group.hash;
            }

            this.$emit('selected', flow_group_hash);
        },

        getFlowLabels() {
            api.get('/flow_groups.getList').then(response => {

                response.data.response.unshift(this.getDefaultFlowGroup());

                this.flow_groups = response.data.response;

                if (this.group_hash === undefined || empty(this.group_hash)) {
                    this.selected_flow_group = this.getDefaultFlowGroup();
                } else {
                    this.selected_flow_group = _.find(this.flow_groups, {hash: this.group_hash});
                }
            })
        },

        openSettingsModal(action) {
            if (this.selected_flow_group.hash === null && action === 'edit') {
                return;
            }

            this.action = action;

            switch (this.action) {
                case 'create':
                    this.group_title = '';
                    break;

                case 'edit':
                    this.group_title = this.selected_flow_group.title;
                    break;
            }

            this.settings_modal.modal()
        },

        createFlowGroup() {
            let ladda = LaddaPreloader.start('#create_flow_group_submit'),
                params = {
                    title: this.group_title,
                    flow_hash: this.flow_hash,
                };

            api.post('/flow_groups.create', params).then(response => {

                this.flow_groups.push(response.data.response);

                this.settings_modal.modal('hide');

                LaddaPreloader.stop(ladda);

            }, error => {
                LaddaPreloader.stop(ladda);
            });
        },

        editFlowGroup() {
            let ladda_handler = LaddaPreloader.start('#edit_flow_group_submit'),
                params = {
                    hash: this.selected_flow_group.hash,
                    title: this.group_title
                };

            api.post('/flow_groups.edit', params).then(response => {

                this.updateSelected(this.getDefaultFlowGroup());
                this.getFlowLabels();

                this.settings_modal.modal('hide');

                LaddaPreloader.stop(ladda_handler);
            }).catch(() => {
                LaddaPreloader.stop(ladda_handler);
            });
        },

        deleteCurrentFlowGroup() {
            if (this.selected_flow_group.hash === null) {
                return;
            }

            let hash = this.selected_flow_group.hash;

            Swal.show(LANG_FLOW_GROUPS.on_delete_msg + ' "' + this.selected_flow_group.title + '"?').then(() => {

                api.delete('/flow_groups.delete', {params: {hash: hash}}).then(response => {
                    this.updateSelected(this.getDefaultFlowGroup());
                    this.getFlowLabels();
                });
            }, () => {

            });
        },

        getDefaultFlowGroup() {
            return {
                hash: null,
                title: LANG_FLOW_GROUPS.dont_selected
            };
        }
    }
});
