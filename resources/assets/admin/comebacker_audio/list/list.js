var vm = new Vue({
	el: '#comebacker_audio_list',
	data: {
		comebacker_audio_list: [],
		locales: []
	},

	methods: {
		comebackerAudioCreatedEvent: function(comebacker_audio){
			this.comebacker_audio_list.unshift(comebacker_audio);
		},

		comebackerAudioEditedEvent: function(index, edited_comebacker_audio){
			_.assignIn(this.comebacker_audio_list[index], edited_comebacker_audio);
		},

		comebackerAudioDeletedEvent: function(index){
			this.comebacker_audio_list.splice(index, 1);
		},

        getPublishers: function () {
            User.getPublishers(['publisher']).then(publishers => {
                this.publishers = publishers;
            });
        }
	}
});