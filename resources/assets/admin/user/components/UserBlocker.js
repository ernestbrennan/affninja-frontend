Vue.component('user-blocker', {
	template: '#user-blocker-component-template',
	data: function () {
		return {
			user_info: [],
			user_blocker_modal: null
		}
	},

	mounted() {
		this.user_blocker_modal = $('#user_blocker_modal');

		bus.$on('user-block', (user_info) => {
			this.user_info = user_info;
            this.openModalBlockUser();
		});
		bus.$on('user-block-without-modal', (user_info) => {
			this.user_info = user_info;
			this.blockUser();
		});
		bus.$on('user-unlock', (user_info, event = null) => {
            this.user_info = user_info;
            this.unlockUser(event);
		});
	},

	methods: {

		openModalBlockUser() {
			this.user_blocker_modal.modal();
		},

        blockUser(ladda_name = '#' + this.user_info.role + '_blocker_submit') {
			let ladda = LaddaPreloader.start(ladda_name),
                params = {
                    id: this.user_info.id,
                    reason_for_blocking: this.user_info.reason_for_blocking
                };

            api.post('/user.block', {}, {'params': params}).then(response => {
            	let user_info = response.data.response,
                    event_name = user_info.role + '-was-blocked';

                bus.$emit(event_name, user_info);

                LaddaPreloader.stop(ladda);
                this.user_blocker_modal.modal('hide');

            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        unlockUser(event = null) {
            let ladda,
                params = {id: this.user_info.id};

            if (!is_null(event)) {
                ladda = Ladda.create(event.target.closest('button'));
                ladda.start();
            }

            api.post('/user.unlock', {}, {'params': params}).then(response => {
                let user_info = response.data.response,
                    event_name = user_info.role + '-was-unlocked';

                bus.$emit(event_name, user_info);

                if (ladda !== undefined) {
                    ladda.stop();
                }
            }, (response) => {
				showMessage('error', response.data.message);
                if (ladda !== undefined) {
                    ladda.stop();
                }
			});
		},
	}
});