Vue.component('comebacker-audio', {
	template: '#comebacker-audio-component-template',
	props: ['comebacker_audio_list', 'locales'],
	data: function () {
		return {
			comebacker_audio_info: {},
			action: null,
			comebacker_audio_index: null,
			comebacker_audio_settings_modal: null
		}
	},

	mounted: function () {
		this.comebacker_audio_settings_modal = $('#comebacker_audio_settings_modal');
	},
	filters: {
		audioSrc: function (audio_path) {
			return CDN_HOST + audio_path + '?' + Math.random();
		}
	},

	methods: {

		openComebackerAudioEditModal: function (index) {
			this.comebacker_audio_index = index;
			this.action = 'edit';
			this.clearAudioInput();
			this.comebacker_audio_info = _.pick(this.comebacker_audio_list[index], [
				'id', 'hash', 'locale_id', 'title', 'created_at', 'updated_at'
			]);
			this.comebacker_audio_settings_modal.modal();
		},

		openComebackerAudioCreateModal: function () {
			this.action = 'create';
			this.clearAudioInput();
			this.comebacker_audio_info = {
				locale_id: this.locales[0].id
			};
			this.comebacker_audio_settings_modal.modal();
		},

		createComebackerAudio: function () {
			var self = this;
			var ladda_handler = LaddaPreloader.start('#create_comebacker_audio_submit');

			var params = this.comebacker_audio_info;
			api.post('/comebacker_audio.create', params).then(response => {

				vm.comebackerAudioCreatedEvent(response.data.response);

				$('#comebacker_audio_settings_modal').modal('hide');

				self.comebacker_audio_info = {};

				showMessage('success', response.data.message);
				LaddaPreloader.stop(ladda_handler);

			}, () => {
				LaddaPreloader.stop(ladda_handler);
			});
		},

		editComebackerAudio: function () {

			var ladda_handler = LaddaPreloader.start('#edit_comebacker_audio_submit');

			var params = this.comebacker_audio_info;
			api.post('/comebacker_audio.edit', params).then(response => {

				vm.comebackerAudioEditedEvent(this.comebacker_audio_index, response.data.response);

				$('#comebacker_audio_settings_modal').modal('hide');
				this.comebacker_audio_info = {};

				showMessage('success', response.data.message);
				LaddaPreloader.stop(ladda_handler);

			}, () => {
				LaddaPreloader.stop(ladda_handler);
			});
		},

		deleteComebackerAudio: function (id, index) {
			var params = {id: id};
			var self = this;

			swal({
				title: LANG_COMEBACKER_AUDIO.on_delete_msg,
				showCancelButton: true,
				confirmButtonText: LANG_MESSAGES.delete_it,
				cancelButtonText: LANG_MESSAGES.cancel,
				closeOnConfirm: true,
				closeOnCancel: true
			}, function (isConfirm) {

				if (isConfirm) {

					var ladda_handler = LaddaPreloader.start('#comebacker_audio_delete_submit-' + id);

					api.post('/comebacker_audio.delete', params).then(response => {

						vm.comebackerAudioDeletedEvent(index);

						$('#comebacker_audio_settings_modal').modal('hide');

						self.comebacker_audio_info = {};

						$('#comebacker_audio_preview').val('');

						showMessage('success', response.data.message);
						LaddaPreloader.stop(ladda_handler);

					}, () => {
						LaddaPreloader.stop(ladda_handler);
					});
				}
			});
		},

		uploadAudio: function (e) {
			var self = this;
			var data = new FormData(), file;
			file = e.target.files || e.dataTransfer.files;
			data.append('audio', file[0]);
			data.append('locale', app_locale_code);

			$.ajax({
				url: '/file.uploadAudio',
				data: data,
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				success: function (result) {

					self.comebacker_audio_info.audion_path = result.response.audion_path;

					showMessage('success', result.message);
				},
				error: function (result) {
					showErrorsInAlert(JSON.parse(result.responseText));
				}
			});
		},
		clearAudioInput: function () {
			$('#comebacker_audio_audio').val('');
		}
	}
});
