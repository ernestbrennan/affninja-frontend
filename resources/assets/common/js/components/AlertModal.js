Vue.component('alert-modal', {
    data: function () {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            title: '',
            accept_title: '',
            cancel_title: '',
            comment_title: '',
            type: 'accept',
            modal: null,
            description: '',
            callback: null,
        }
    },

    created() {
        bus.$on('alert-modal-success', (callback, title, accept_title,
                                        comment_title = LANG_MESSAGES.comment,
                                        cancel_title = LANG_MESSAGES.cancel) => {
            this.callback = callback;
            this.title = title;
            this.accept_title = accept_title;
            this.cancel_title = cancel_title;
            this.comment_title = comment_title;
            this.type = 'accept';
            this.openModal();
        });

        bus.$on('alert-modal-danger', (callback, title, accept_title,
                                       comment_title = LANG_MESSAGES.comment,
                                       cancel_title = LANG_MESSAGES.cancel) => {
            this.callback = callback;
            this.title = title;
            this.accept_title = accept_title;
            this.cancel_title = cancel_title;
            this.comment_title = comment_title;
            this.type = 'cancel';
            this.openModal();
        });
    },

    mounted() {
        this.modal = $('#accept-payment-modal');
    },

    methods: {
        openModal() {
            this.description = '';
            this.modal.modal();
        },

        accept() {
            this.modal.modal('hide');
            this.callback(true, this.description);
        },

        cancel() {
            this.modal.modal('hide');
            this.callback(false, this.description);
        },
    },

    template: `
    <div class="modal alert-modal fade" tabindex="-1" role="dialog" id="accept-payment-modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">{{ title }}</h4>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label class="control-label" for="description">
							{{ comment_title }}:
						</label>
						<textarea v-model="description" id="description" 
						          class="form-control" rows="3"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button v-if="type === 'accept'" @click="accept" class="btn btn-sm btn-success ladda-button"
					        id="user_blocker_submit" data-style="zoom-out">
						<span class="ladda-label">{{ accept_title }}</span>
					</button>
					
					<button v-if="type === 'cancel'" @click="accept" class="btn btn-sm btn-danger ladda-button"
					        id="user_blocker_submit" data-style="zoom-out">
						<span class="ladda-label">{{ accept_title }}</span>
					</button>
					
					<button @click="cancel" class="btn btn-default btn-outline btn-sm ladda-button cancel-btn"
					        id="user_blocker_submit" data-style="zoom-out">
						<span class="ladda-label">{{ cancel_title }}</span>
					</button>
				</div>
			</div>
		</div>
	</div>
    `,
});