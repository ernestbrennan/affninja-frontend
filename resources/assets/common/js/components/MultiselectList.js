Vue.component('multiselect-list', {
    props: ['entity_id', 'entity_type', 'selected_entities_ids', 'entities'],
    data: function () {
        return {
            entities_list: [],
            multi_select_was_ititialized: false,
        }
    },

    mounted: function () {
        this.entities_list = this.getEntitiesListEl();
    },

    watch: {
        'selected_entities_ids'() {
            let self = this;

            Vue.nextTick(function () {
                if (self.multi_select_was_ititialized) {
                    self.entities_list.multiSelect("destroy");
                    self.entities_list = self.getEntitiesListEl();
                }
                self.init();
            });
        },
        
        'entities'() {
            let self = this;

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

        onEdited() {
            this.$emit('edited', {
                entity_id: this.entity_id,
                entity_type: this.entity_type,
                entities: this.entities_list.val() || [],
            });
        },

        init: function () {
            let self = this;

            this.multi_select_was_ititialized = true;
            this.entities_list.multiSelect({
                keepOrder: true,
                selectableHeader: "<input type='text' class='form-control' placeholder='" + LANG_MESSAGES.search + "'>",
                selectionHeader: "<input type='text' class='form-control' placeholder='" + LANG_MESSAGES.search + "'>",
                afterInit(ms) {
                    let that = this,
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
                afterSelect() {
                    self.onEdited();
                    this.qs1.cache();
                    this.qs2.cache();
                },
                afterDeselect() {
                    self.onEdited();
                    this.qs1.cache();
                    this.qs2.cache();
                }
            });
        },
    },
    template: `
        <select v-if="entities" id="entities_list" multiple="multiple">
            <option v-for="entity in entities" :value="entity.id"
                    :selected="selected_entities_ids.indexOf(entity.id) >= 0">{{ entity.text }}
            </option>
        </select>`
});
