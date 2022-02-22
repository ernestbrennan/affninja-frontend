Vue.component('multiselect', {
    props: [],
    data: function () {
        return {
            entity_id: null,
            entity_type: null,
            selected_entities_ids: [],
            entities: [],
            entities_list: null,
            multiselect_modal: null,
            multi_select_was_ititialized: false,
            modal_header: ''
        }
    },

    mounted: function () {
        this.entities_list = this.getEntitiesListEl();
        this.multiselect_modal = $('#multiselect_modal');
    },

    watch: {
        selected_entities_ids: function () {
            var self = this;
            Vue.nextTick(function () {
                if (self.multi_select_was_ititialized) {
                    self.entities_list.multiSelect("destroy");
                    self.entities_list = self.getEntitiesListEl();
                }
                self.init();
            });
        },
        entities: function () {
            var self = this;
            Vue.nextTick(function () {
                if (self.multi_select_was_ititialized) {
                    self.entities_list.multiSelect("destroy");
                    self.entities_list = self.getEntitiesListEl();
                }
                self.init();
            });
        }
    },

    methods: {

        getEntitiesListEl: function () {
            return $("#entities_list");
        },

        openModal: function (entity_id, entity_type, selected_entities_ids, entities, modal_header) {
            if (!entity_id)
                throw "entity_id is required";

            if (!entity_type)
                throw "entity_type is required";

            if (entities instanceof Array === false || entities.length < 1)
                throw "entities must be an array and has at least 1 element";

            this.entity_id = entity_id;
            this.entity_type = entity_type;
            this.selected_entities_ids = selected_entities_ids;
            this.entities = entities;
            this.modal_header = modal_header;

            this.multiselect_modal.modal();
        },

        submitForm: function () {
            this.$emit('edited', {
                entity_id: this.entity_id,
                entity_type: this.entity_type,
                entities: this.entities_list.val() || []
            });

            this.multiselect_modal.modal('hide');
        },

        init: function () {
            this.multi_select_was_ititialized = true;
            this.entities_list.multiSelect({
                keepOrder: true,
                selectableHeader: "<input type='text' class='form-control' placeholder='" + LANG_MESSAGES.search + "'>",
                selectionHeader: "<input type='text' class='form-control' placeholder='" + LANG_MESSAGES.search + "'>",
                afterInit: function (ms) {
                    var that = this,
                        $selectableSearch = that.$selectableUl.prev(),
                        $selectionSearch = that.$selectionUl.prev(),
                        selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
                        selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

                    that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                        .on('keydown', function (e) {
                            if (e.which === 40) {
                                that.$selectableUl.focus();
                                return false;
                            }
                        });

                    that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                        .on('keydown', function (e) {
                            if (e.which == 40) {
                                that.$selectionUl.focus();
                                return false;
                            }
                        });
                },
                afterSelect: function () {
                    this.qs1.cache();
                    this.qs2.cache();
                },
                afterDeselect: function () {
                    this.qs1.cache();
                    this.qs2.cache();
                }
            });
        }
    },
    template: `
    <div class="modal fade" tabindex="-1" role="dialog" id="multiselect_modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span>&times;</span>
                    </button>
                    <h4 class="modal-title">{{ modal_header }}</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <select v-if="entities" id="entities_list" multiple="multiple">
                            <option v-for="entity in entities" :value="entity.id"
                                    :selected="selected_entities_ids.indexOf(entity.id) >= 0">{{ entity.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button v-on:click="submitForm"
                            class="btn btn-sm btn-success ladda-button" id="multiselect_submit"
                            data-style="zoom-out">
                        <span class="ladda-label">${LANG_MESSAGES.save}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>`
});
