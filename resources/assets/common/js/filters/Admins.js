Vue.component('admins-select', {
    mixins: [filters_mixin],
    props: {
        value: {},
        multiple: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            LANG_FILTERS: LANG_FILTERS,
            LANG_MESSAGES: LANG_MESSAGES,
            admins: [],
            selected: {},
            loading: false,
        };
    },
    mounted() {
        if (_.get(this.value, 'hash') !== undefined) {
            this.getAdmins('', [this.value.hash]);
        }
    },
    watch: {
        'value'() {
            this.selected = this.value;
        }
    },
    methods: {

        getAdmins(search = '', hashes = []) {

            if (empty(search) && !hashes.length) {
                return;
            }

            this.loading = true;

            User.getAdmins(search, hashes).then(admins => {

                this.admins = admins.data;

                this.$nextTick(() => {
                    this.loading = false;
                })
            })
        },

        onSearch(search) {
            this.admins.splice(0);

            this.getAdmins(search);
        },

        updateSelected(value) {
            this.$emit('input', value)
        },
    },

    template: `
        <select-item v-model="selected" :options="admins" :multiple="multiple" track_by="id" label="email"
            :search="true" 
            :loading="loading" 
            @input="updateSelected"
            v-on:search-change="onSearch"
            :placeholder="LANG_MESSAGES.search">
        </select-item>`
});
