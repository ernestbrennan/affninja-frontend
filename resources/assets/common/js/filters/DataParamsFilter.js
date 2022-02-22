Vue.component('data-params-filter', {
    mixins: [filters_mixin],
    data() {
        return {
            name1: 'data1',
            name2: 'data2',
            name3: 'data3',
            name4: 'data4',

            LANG_FILTERS: LANG_FILTERS,
            SEARCH_MSG: LANG_MESSAGES.search,
            LANG_STATISTICS: LANG_STATISTICS,
            DEFAULT_TITLE: LANG_MESSAGES.not_specified,

            data1: [],
            data2: [],
            data3: [],
            data4: [],

            data1_fields: [],
            data2_fields: [],
            data3_fields: [],
            data4_fields: [],

            data1_fields_loading: false,
            data2_fields_loading: false,
            data3_fields_loading: false,
            data4_fields_loading: false,
        };
    },

    computed: {
        selected_count() {
            return this.data1.length + this.data2.length + this.data3.length + this.data4.length;
        },
    },

    mounted() {
        this.initDataParams();
    },

    watch: {
        'data1'() {
            filters_bus.$emit(this.name1 + '-updated', this.getFiltersValues(this.data1));
        },
        'data2'() {
            filters_bus.$emit(this.name2 + '-updated', this.getFiltersValues(this.data2));
        },
        'data3'() {
            filters_bus.$emit(this.name3 + '-updated', this.getFiltersValues(this.data3));
        },
        'data4'() {
            filters_bus.$emit(this.name4 + '-updated', this.getFiltersValues(this.data4));
        },
    },

    methods: {
        initDataParams() {
            let data1 = this.setTitles(getVarsFromUrl('data1')),
                data2 = this.setTitles(getVarsFromUrl('data2')),
                data3 = this.setTitles(getVarsFromUrl('data3')),
                data4 = this.setTitles(getVarsFromUrl('data4'));

            this.data1 = _.clone(data1);
            this.data1_fields = _.clone(data1);
            this.data2 = _.clone(data2);
            this.data2_fields = _.clone(data2);
            this.data3 = _.clone(data3);
            this.data3_fields = _.clone(data3);
            this.data4 = _.clone(data4);
            this.data4_fields = _.clone(data4);

            filters_bus.$emit(this.name1 + '-init', this.getFiltersValues(this.data1));
            filters_bus.$emit(this.name2 + '-init', this.getFiltersValues(this.data2));
            filters_bus.$emit(this.name3 + '-init', this.getFiltersValues(this.data3));
            filters_bus.$emit(this.name4 + '-init', this.getFiltersValues(this.data4));
        },

        setTitles(values) {
            return values.map(item => {
                if (item === 'empty') {
                    return {title: this.DEFAULT_TITLE}
                }

                return {title: item}
            });
        },

        getFiltersValues(values) {
            if (!values.length) {
                return null;
            }

            return values.map(item => {
                if (item.title === this.DEFAULT_TITLE) {
                    return 'empty';
                }

                return item.title;
            })
        },

        getDataFields(search, type) {
            this[type + '_fields'].splice(0);

            if (search.length < 2) {
                return;
            }

            this[type + '_fields_loading'] = true;

            let params = {
                search: search,
                type: type,
            };

            api.get('/user.getSourceList', {params: params}).then(response => {
                this[type + '_fields'] = response.data.response;

                this[type + '_fields_loading'] = false;
            }, () => {
                this[type + '_fields_loading'] = false;
            });
        },

        onFilterApply() {
            this.is_open = !this.is_open;

            filters_bus.$emit('filters-applies');
        },
    },

    template: `
    <div class="filter group_filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button">
            {{ LANG_FILTERS.data_parameter }} 
            <b v-show="selected_count" @click.stop="is_open = !is_open">{{ selected_count }}</b>
        </button>
        <div v-show="is_open" class="filter_overlay in-shadow"></div>
        <div v-show="is_open"
             class="filter_wrap_new no-in-shadow" 
             style="width: auto; maxWidth: initial; left: 81px;">
            <div class="clearfix">
                <div class="filter" style="width: 155px; margin-bottom: 0">
                    <label class="control-label">{{ LANG_STATISTICS.th_data1 }}:</label>
                    <select-item 
                        v-model="data1"
                        :options="data1_fields"
                        track_by="title"
                        :multiple="true" 
                        :close_on_select="false" 
                        :allow_empty="true"
                        :search="true"
                        :loading="data1_fields_loading"
                        @search-change="getDataFields($event, 'data1')"
                        :placeholder="SEARCH_MSG"
                        :hide_selected="true"
                        :preserve_search="true"
                        :clear_on_select="false"
                        class="multiselect-sm"
                    ></select-item>
                </div>
                <div class="filter" style="width: 155px; margin-bottom: 0">
                    <label class="control-label">{{ LANG_STATISTICS.th_data2 }}:</label>
                    <select-item 
                        v-model="data2"
                        :options="data2_fields"
                        track_by="title"
                        :multiple="true" 
                        :close_on_select="false" 
                        :allow_empty="true"
                        :search="true"
                        :loading="data2_fields_loading"
                        @search-change="getDataFields($event, 'data2')"
                        :placeholder="SEARCH_MSG"
                        :hide_selected="true"
                        :preserve_search="true"
                        :clear_on_select="false"
                        class="multiselect-sm"
                    ></select-item>
                </div>
                <div class="filter" style="width: 155px; margin-bottom: 0">
                    <label class="control-label">{{ LANG_STATISTICS.th_data3 }}:</label>
                    <select-item 
                        v-model="data3"
                        :options="data3_fields"
                        track_by="title"
                        :multiple="true" 
                        :close_on_select="false" 
                        :allow_empty="true"
                        :search="true"
                        :loading="data3_fields_loading"
                        @search-change="getDataFields($event, 'data3')"
                        :placeholder="SEARCH_MSG"
                        :hide_selected="true"
                        :preserve_search="true"
                        :clear_on_select="false"
                        class="multiselect-sm"
                    ></select-item>
                </div>
                <div class="filter" style="width: 155px; margin-bottom: 0">
                    <label class="control-label">{{ LANG_STATISTICS.th_data4 }}:</label>
                    <select-item 
                        v-model="data4"
                        :options="data4_fields"
                        track_by="title"
                        :multiple="true" 
                        :close_on_select="false" 
                        :allow_empty="true"
                        :search="true"
                        :loading="data4_fields_loading"
                        @search-change="getDataFields($event, 'data4')"
                        :placeholder="SEARCH_MSG"
                        :hide_selected="true"
                        :preserve_search="true"
                        :clear_on_select="false"
                        class="multiselect-sm"
                    ></select-item>
                </div>
                <div class="filter" style="margin-bottom: 0; margin-top: 23px;">
                    <button @click="onFilterApply"
                            class="btn btn-success btn-outline btn-sm ladda-button btn-filter"
                            type="button">
                        {{ LANG_FILTERS.apply }}
                    </button>
                </div>
            </div>
        </div>
    </div>`
});
