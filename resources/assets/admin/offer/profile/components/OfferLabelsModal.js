Vue.component('offer-labels-modal', {
    template: '#offer-labels-modal-tpl',
    props: {
        offer_id: {
            type: Number
        },
        assigned_labels: {
            type: Array
        }
    },

    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_OFFERS: LANG_OFFERS,
            modal: null,
            labels: [],
            labels_loading: false,
        }
    },

    mounted() {
        this.getOfferLabels();

        this.modal = $('#offer-labels-modal');
    },

    watch: {
        'labels_loading'() {
            return this.labels_loading ? ContentPreloader.show('#labels-content') : ContentPreloader.hide();
        }
    },

    methods: {
        openModal() {
            this.modal.modal();
        },

        getOfferLabels() {
            this.labels_loading = true;

            api.get('/offer_labels.getList').then(response => {
                let assigned_label;
                response.data.response.forEach(label => {

                    assigned_label = _.find(this.assigned_labels, {id: label.id});

                    if (assigned_label !== undefined) {
                        label.assigned = true;
                        label.availability = assigned_label.pivot.available_at === null ? 'is_not_limited' : 'limited';
                        label.available_at = assigned_label.pivot.available_at;
                    } else {
                        label.assigned = false;
                        label.availability = 'is_not_limited';
                        label.available_at = moment().add(7, 'days').format('YYYY-MM-DD HH:mm:ss');
                    }

                    this.labels.push(label);
                });

                this.$nextTick(() => {
                    this.labels_loading = false;
                })
            })
        },

        syncLabels() {
            let ladda = LaddaPreloader.start('#sync-assigned-labels'),
                params = {
                    id: this.offer_id,
                    labels: this.getFormattedLabelsFroSync(),
                };

            api.post('/offer.syncLabels', params).then(response => {

                this.$emit('offer-labels-edited', response.data.response);

                LaddaPreloader.stop(ladda);

                showMessage('success', response.data.message);
                this.modal.modal('hide');
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        getFormattedLabelsFroSync() {
            let assigned_labels = _.filter(this.labels, {assigned: true}),
                labels = [];

            assigned_labels.forEach(label => {
                labels.push({
                    label_id: label.id,
                    available_at: label.availability === 'limited' ? label.available_at : null,
                });
            });

            return labels;
        }
    },
});
