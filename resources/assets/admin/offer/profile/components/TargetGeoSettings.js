Vue.component('target-geo-settings', {
	template: '#target-geo-settings-component-template',
	props: ['offer', 'countries', 'currencies', 'integrations'],
	data: function () {
		return {
			action: null,
			target_geo_info: {},
			target_id: null,
			target_index: null,
			target_geo_index: null,
			transit_settings_modal: null,
		}
	},

	mounted: function () {
		this.target_geo_settings_modal = $('#target_geo_settings_modal');
	},

	methods: {
		onCountryChanged: function (country_id) {
			this.target_geo_info.country_id = country_id;
		},
		onPriceCurrencyChanged: function (currency_id) {
			this.target_geo_info.price_currency_id = currency_id;
		},

		/**
		 * Сброс свойства target_geo_info в состояние по умолчанию
		 */
		setTargetGeoInfoByDefault: function () {
			this.target_geo_info = {
				payout: '0.00',
				price: '0.00',
				old_price: '0.00',
				payout_currency_id: CURRENCY_USD_ID,
				price_currency_id: 1,
				country_id: 1,
				hold_time: 180,
				is_default: 0,
				is_active: 0
			};
		},

		openCreateModal: function (offer, target_id, target_index) {

            if (offer === undefined) {
                throw "Undefined offer"
            }
            if (target_id === undefined) {
                throw "Undefined target_id"
            }
            if (target_index === undefined) {
                throw "Undefined target_index"
            }

			this.action = 'create';
			this.offer = offer;
			this.target_id = target_id;
			this.target_index = target_index;
			this.setTargetGeoInfoByDefault();

			this.target_geo_settings_modal.modal();
		},

		openEditModal: function (target_index, target_geo_index, target_geo_info) {
			if (target_index === undefined) {
				throw "Undefined target_index"
			}
			if (target_geo_index === undefined) {
				throw "Undefined target_geo_index"
			}
			if (target_geo_info === undefined) {
				throw "Undefined target_id"
			}

			this.action = 'edit';
			this.target_index = target_index;
			this.target_geo_index = target_geo_index;
			this.target_geo_info = _.assign({}, target_geo_info);
			this.target_geo_settings_modal.modal();
		},

		createTargetGeo: function () {
			var self = this,
				ladda_handler = LaddaPreloader.start('#target_geo_create_submit'),
				params = this.target_geo_info;

			params.offer_id = this.offer.id;
			params.target_id = this.target_id;

			api.post('/target_geo.create', params).then(response => {

				vm.targetGeoCreatedEvent(this.target_index, response.data.response);
				self.target_geo_settings_modal.modal('hide');
				self.setTargetGeoInfoByDefault();

				showMessage('success', response.data.message);
				LaddaPreloader.stop(ladda_handler);

			}, () => {
				LaddaPreloader.stop(ladda_handler);
			});
		},

		editTargetGeo: function () {
			let ladda = LaddaPreloader.start('#target_geo_edit_submit'),
				params = _.pick(this.target_geo_info, [
					'id', 'offer_id', 'target_id', 'country_id', 'price_currency_id', 'price', 'old_price', 'hold_time',
					'is_default', 'is_active', 'target_geo_rule_sort_type'
				]);

			api.post('/target_geo.edit', params).then(response => {

				vm.targetGeoEditedEvent(this.target_index, this.target_geo_index, response.data.response);
                this.target_geo_settings_modal.modal('hide');
                this.setTargetGeoInfoByDefault();

				showMessage('success', response.data.message);
				LaddaPreloader.stop(ladda);
			}, () => {
				LaddaPreloader.stop(ladda);
			});
		},

        deleteTargetGeo: function (target_index, target_geo_index, target_geo_id) {
            let params = {id: target_geo_id}, ladda;

            Swal.show(LANG_TARGET_GEO.on_delete_msg).then(() => {

                ladda = LaddaPreloader.start('#target_geo_delete_submit');
                api.post('/target_geo.delete', params).then(response => {

                    vm.targetGeoDeletedEvent(target_index, target_geo_index);

                    this.target_geo_settings_modal.modal('hide');

                    showMessage('success', response.data.message);
                    LaddaPreloader.stop(ladda);

                }, () => {
                    LaddaPreloader.stop(ladda);
                });
            }, () => {

            });
		}
	}
});
