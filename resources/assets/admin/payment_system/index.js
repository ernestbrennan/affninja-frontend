new Vue({
    el: '#payment_systems',
    data: {
        payment_systems: [],
        payment_system: [],
        publishers: {},
        edit_payment_system_modal: null,
        LANG_MESSAGES: null
    },
    mounted() {
        this.LANG_MESSAGES = LANG_MESSAGES;
        this.getPaymentSystems();
        this.getPublishers();
        this.edit_payment_system_modal = $('#edit_payment_system_modal')
    },

    watch: {
        'payment_systems': function(){
            this.$nextTick(function () {
                runTooltip();
            });
        }
    },
    
    methods: {
        getPaymentSystems() {
            ContentPreloader.show('#payment_systems');
            
            PaymentSystem.getList(['publishers']).then(payment_systems => {
                this.payment_systems = payment_systems;
                
                this.$nextTick(() => {
                    ContentPreloader.hide();
                });
            });
        },
        
        openEditModal(payment_system) {
            this.payment_system = _.assign({}, payment_system);
            
            this.edit_payment_system_modal.modal();
        },
        
        editPaymentSystem(payment_system) {
            let params = this.payment_system,
                ladda = LaddaPreloader.start('#edit_payment_system');
            
            api.post('/payment_system.edit', params).then(response => {
                
                let index = _.findIndex(this.payment_systems, {id: response.data.response.id});
                this.payment_systems.splice(index, 1, response.data.response);
                
                this.edit_payment_system_modal.modal('hide');
                
                showMessage('success', response.data.message);
                LaddaPreloader.stop(ladda);
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },
        
        openPublisherPrivacyModal(payment_system) {
            // Получаем идентификаторы паблишеров, которым доступная платежная система
            let publisher_ids = getIds(payment_system.publishers);
            // Добавляем свойсво text, нужное для компонента
            let processed_publishers = _.forEach(this.publishers, function (item, key) {
                item.text = item.email;
            });
            this.$refs.multiselect.openModal(
                payment_system.id,
                'payment_system',
                publisher_ids,
                processed_publishers,
                LANG_PAYMENT_SYSTEMS.modal_publisher_privacy_header
            );
        },
        
        onPublisherPrivacyUpdated(params) {
            api.post('/payment_system.syncPublishers', {id: params.entity_id, publishers: params.entities})
                .then(response => {
                    let index = _.findIndex(this.payment_systems, {id: params.entity_id});

                    showMessage('success', response.data.message);
                    _.assignIn(this.payment_systems[index], response.data.response)
                });
        },
        
        getPublishers: function () {
            User.getPublishers().then(publishers => {
                this.publishers = publishers.data;
            });
        },
    },
});
