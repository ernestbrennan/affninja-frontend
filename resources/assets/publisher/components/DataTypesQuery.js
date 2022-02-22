Vue.component('data-types-query', {
    props: {
        value: {
            type: String,
            required: true,
        },

        data_type: {
            type: String,
            required: true,
            validator(value) {
                if (value !== 'data' && value !== 'utm') {
                    throw 'Undefined data_type!';
                }

                return true;
            },
        },
    },
    data() {
        return {
            data_params: ['clickid', 'data1', 'data2', 'data3', 'data4'],
            utm_params: ['clickid', 'utm_content', 'utm_medium', 'utm_source', 'utm_campaign'],
            params: {
                clickid: '',
                param1: '',
                param2: '',
                param3: '',
                param4: '',
            },
        }
    },

    computed: {
        query: {
            get() {
                let params = {}, i = 0;

                for (let key in this.params) {
                    if (this.params[key].length) {
                        params[this.getParamTitle(i)] = this.params[key];
                    }

                    i++;
                }

                return http_build_query(params, '', '&', false);
            },
            set(value) {
            },
        },
    },

    watch: {
        'value'() {
            if (this.value === '') {
                this.refreshParams();
            }
        },

        'query'() {
            this.$emit('input', this.query);
        },
    },

    methods: {
        getParamTitle(i) {
            return this[this.data_type + '_params'][i];
        },

        refreshParams() {
            this.params = {
                clickid: '',
                param1: '',
                param2: '',
                param3: '',
                param4: '',
            };
        },
    },

    template: `
    <div class="row">
        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 m-b">
            <label for="clickid">{{ getParamTitle(0) }}:</label>
            <input v-model="params.clickid" class="form-control url_parameter" id="clickid"/>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 m-b">
            <label for="param1">{{ getParamTitle(1) }}:</label>
            <input v-model="params.param1" class="form-control url_parameter" id="param1"/>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 m-b">
            <label for="param2">{{ getParamTitle(2) }}:</label>
            <input v-model="params.param2" class="form-control url_parameter" id="param2"/>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 m-b">
            <label for="param3"">{{ getParamTitle(3) }}:</label>
            <input v-model="params.param3" class="form-control url_parameter" id="param3"/>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 m-b">
            <label for="param4">{{ getParamTitle(4) }}:</label>
            <input v-model="params.param4" class="form-control url_parameter" id="param4"/>
        </div>
    </div>`,
});