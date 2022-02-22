Vue.component('offer-sources-modal', {
    props: ['offer_id', 'offer_sources', 'offer_offer_sources'],
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            LANG_OFFERS: LANG_OFFERS,

            original_offer_offer_source_ids: [],
            offer_offer_source_ids: [],
            is_changed: false,
            data_initialized: false,
            modal: null,
            select_all: false,
            all_offer_source_ids: []
        }
    },

    created() {
        bus.$on('open-offer-sources-modal', () => {
            this.openModal();
        });
    },

    mounted() {
        this.modal = $('#offer-sources-modal');
    },

    watch: {
        "offer_offer_source_ids"() {

            let original_sources = _.clone(this.original_offer_offer_source_ids).sort(),
                new_sources = _.clone(this.offer_offer_source_ids).sort(),
                all_sources = _.clone(this.all_offer_source_ids).sort();

            this.is_changed = !_.isEqual(original_sources, new_sources);
            this.select_all = _.isEqual(all_sources, new_sources);
        },

        "offer_sources"() {
            this.all_offer_source_ids = this.offer_sources.map(offer_source => offer_source.id);
        }
    },

    methods: {
        openModal() {
            this.initOfferOfferSourceIds();
            this.modal.modal();
        },

        initOfferOfferSourceIds() {
            if (!this.offer_offer_sources.length) {
                return;
            }

            let processed = _.keyBy(this.offer_offer_sources, 'id');

            processed = _.keys(processed);
            processed = _.map(processed, function (key) {
                return parseInt(key);
            });

            this.original_offer_offer_source_ids = processed;
            this.offer_offer_source_ids = processed;
        },

        editOfferSources() {
            let ladda = LaddaPreloader.start('#edit_offer_offer_sources'),
                params = {
                    id: this.offer_id,
                    offer_sources: this.offer_offer_source_ids,
                };

            api.post('/offer.syncOfferSources', params).then(response => {

                this.$emit('offer-source-edited', response.data.response);

                LaddaPreloader.stop(ladda);

                showMessage('success', response.data.message);
                this.modal.modal('hide');
            }, () => {
                LaddaPreloader.stop(ladda);
            });
        },

        toggleAll() {
            this.offer_offer_source_ids = this.select_all ? this.all_offer_source_ids : [];
        }
    },

    template: `
    <div class="modal fade" id="offer-sources-modal" role="dialog" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="font-light">{{ LANG_OFFERS.offer_sources }}</h4>
                </div>
                <div class="modal-body p-b-none-i">
                    <div v-if="offer_sources && offer_offer_sources">
                        <div class="checkbox checkbox-success">
                            <input @change="toggleAll" v-model="select_all" type="checkbox" id="select-all" >
                            <label for="select-all">{{ LANG_OFFERS.select_all }}</label>
                        </div>
                        <hr />
                        <div v-for="source in offer_sources" class="checkbox checkbox-success">
                            <input v-model="offer_offer_source_ids"
                                   :id="'source-' + source.id"
                                   :value="source.id"
                                   type="checkbox"
                            ><label :for="'source-' + source.id">{{ source.title }}</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button :disabled="!is_changed" 
                            @click="editOfferSources"
                            class="btn btn-sm btn-success ladda-button" 
                            id="edit_offer_offer_sources" 
                            data-style="zoom-out">
                        <span class="ladda-label">{{ LANG_MESSAGES.save }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>`,
});
