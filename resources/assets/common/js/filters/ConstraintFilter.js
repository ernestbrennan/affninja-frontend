Vue.component('constraint-filter', {
    data() {
        return {
            name: 'constraint',
            LANG_USERS: LANG_USERS,
            selected: {},
            options: [
                {title: LANG_USERS.more, value: 'more'},
                {title: LANG_USERS.less, value: 'less'},
            ],
        };
    },
    mixins: [filters_mixin],

    mounted() {
        let options = getVarsFromUrl(this.name);
        if (!options.length) {
            this.selected = this.options[0];
        } else {
            this.selected = _.find(this.options, {value: options[0]});
        }

        filters_bus.$emit(this.name + '-init', this.selected.value);
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', this.selected.value)
        }
    },

    template: `
        <div class="filter">
            <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
                {{ selected.title }}
            </button>
            <div v-show="is_open" class="filter_wrap_new">
                <select-item v-model="selected" :options="options" :multiple="false" 
                             :close_on_select="false" 
                             :allow_empty="false"
                             :hide_selected="true">
                </select-item>
            </div>
        </div>`
});
