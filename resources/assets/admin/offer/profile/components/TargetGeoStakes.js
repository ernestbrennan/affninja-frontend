Vue.component('target-geo-stakes-modal', {
    template: '#target_geo_stakes_tpl',
    props: {
        user_groups: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            target_geo_info: {},
            unassigned_groups_loading: false,
            groups_got_stakes: false,
            unassigned_groups: [],
            original_assigned_groups: [],
            assigned_groups: [],
            stakes: [],
            stakes_loading: false,
            modal: null,
            stakes_list_wrap: null,
            group_to_assign_stake: {}
        }
    },

    mounted() {
        this.modal = $('#target_geo_stakes_modal');
        this.modal.on('hidden.bs.modal', () => {
            this.groups_got_stakes = false;
        });

        this.stakes_list_wrap = $('#stakes_list');
    },

    watch: {
        'stakes_loading'(value) {
            if (value) {
                return ContentPreloader.show(this.stakes_list_wrap);
            }
            ContentPreloader.hide();
        },
        'stakes'(stakes) {
            this.assigned_groups.splice(0);
            this.unassigned_groups.splice(0);
            this.group_to_assign_stake = null;

            this.setUserGroupWithStakesAssigned(stakes);
        },
        'group_to_assign_stake'(group) {
            if (is_null(group)) {
                return;
            }

            this.addGroupToAssigned(group, this.target_geo_info.payout, this.target_geo_info.payout_currency_id);
            this.deleteGroupFromUnassigned(group);
        },
        'assigned_groups': {
            handler: function () {
                //
                // this.changes_unsaved = !_.isEqual(this.assigned_groups, this.original_assigned_groups);
            },
            deep: true,
        },
        'changes_unsaved'(changes_unsaved) {
            if (changes_unsaved) {
                this.addOnCloseAlert();
            } else {
                this.removeOnCloseAlert();
            }
        },
    },

    methods: {
        openModal(target_index, target_geo_index, target_geo_info) {
            if (target_index === undefined) {
                throw "Undefined target_index"
            }
            if (target_geo_index === undefined) {
                throw "Undefined target_geo_index"
            }
            if (target_geo_info === undefined) {
                throw "Undefined target_id"
            }

            this.target_index = target_index;
            this.target_geo_index = target_geo_index;
            this.target_geo_info = target_geo_info;

            this.getStakes(this.target_geo_info.id);

            this.modal.modal();
        },

        changeStakes() {
            let ladda = LaddaPreloader.start('#target_geo_clone_submit'),
                params = this.target_geo_info;

            api.post('/target_geo.clone', params).then(response => {

                vm.targetGeoCreatedEvent(this.target_index, response.data.response);
                this.modal.modal('hide');

                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);

            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        getStakes(target_geo_id) {
            this.stakes_loading = true;
            this.unassigned_groups_loading = true;

            UserGroupTargetGeo.getList(target_geo_id).then((user_groups) => {
                this.stakes = user_groups;

                this.$nextTick(() => {
                    this.stakes_loading = false;
                    this.unassigned_groups_loading = false;
                });
            });
        },

        setUserGroupWithStakesAssigned(stakes) {

            this.user_groups.map(group => {

                if (group.is_default) {
                    return this.addGroupToAssigned(
                        group,
                        this.target_geo_info.payout,
                        this.target_geo_info.payout_currency_id
                    );
                }

                let group_stake = _.find(stakes, {user_group_id: group.id});
                if (typeof group_stake === 'undefined') {
                    return this.addGroupToUnassigned(group);
                }

                this.addGroupToAssigned(group, group_stake.payout, group_stake.currency_id);
            });

            this.groups_got_stakes = true;
            this.original_assigned_groups = this.assigned_groups;
        },

        addGroupToUnassigned(group) {
            group.payout = this.target_geo_info.payout;
            group.currency_id = this.target_geo_info.payout_currency_id;
            this.unassigned_groups.push(group);
        },

        deleteGroupFromUnassigned(group) {
            let index = _.findIndex(this.unassigned_groups, {id: group.id});
            this.unassigned_groups.splice(index, 1);
        },

        addGroupToAssigned(group, payout, currency_id) {
            group.payout = payout;
            group.currency_id = currency_id;

            this.assigned_groups.push(group)
        },

        deleteGroupFromAssigned(group) {
            let index = _.findIndex(this.assigned_groups, {id: group.id});
            this.assigned_groups.splice(index, 1);

            this.addGroupToUnassigned(group, this.target_geo_info.payout, this.target_geo_info.payout_currency_id);
        },

        saveStakes() {
            let ladda = LaddaPreloader.start('#save_stakes_btn'),
                params = {
                    target_geo_id: this.target_geo_info.id,
                    stakes: this.getStakesParameterForRequest()
                };


            api.post('user_group_target_geo.sync', params).then(response => {
                this.modal.modal('hide');
                LaddaPreloader.stop(ladda);
                showMessage('success', response.data.message);

                // Update payout and currency_id of default target geo in root
                let default_target_geo = _.find(params.stakes, {is_default: 1});
                vm.onDefaultUserGroupPayoutChange(this.target_index, this.target_geo_index, {
                    payout: default_target_geo.payout,
                    payout_currency_id: default_target_geo.currency_id,
                });
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        getStakesParameterForRequest() {
            let stakes = [];
            this.assigned_groups.forEach(group => {
                stakes.push({
                    user_group_id: group.id,
                    is_default: group.is_default,
                    payout: group.payout,
                    currency_id: group.currency_id,
                });
            });

            return stakes;
        },

        addAlertOnModalClose() {
            // @todo add alert here
        },

        removeAlertOnModalClose() {
            // @todo remove alert here
        },
    }
});
