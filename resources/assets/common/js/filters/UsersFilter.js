Vue.component('users-filter', {
    data() {
        return {
            name: 'user_hashes',
            FILTER_TITLE: LANG_MESSAGES.user,
            SEARCH_MSG: LANG_MESSAGES.search,
            selected: [],
            users: [],
            url_values: [],
            loading: false,
        };
    },
    mixins: [filters_mixin],

    mounted() {
        this.url_values = getVarsFromUrl(this.name) || [];
        filters_bus.$emit(this.name + '-init', this.url_values);

        this.getUsers(this.url_values);
    },

    watch: {
        'selected'() {
            filters_bus.$emit(this.name + '-updated', _.map(this.selected, 'hash'))
        }
    },

    methods: {
        getUsers(hashes = [], search = '') {
            if (!hashes.length && search.length < 2) {
                return;
            }

            this.loading = true;

            User.getList([], hashes, search).then(users => {

                this.users = users;

                let index;
                this.users.forEach(user => {

                    index = this.url_values.indexOf(user.hash);

                    if (index !== -1 && _.findIndex(this.selected, {value: user.hash}) === -1) {
                        this.selected.push(user)
                    }
                });
                this.url_values.splice(0);
                this.loading = false;
            })
        },

        onSearch(search) {
            this.users.splice(0);
            this.getUsers([], search);
        }
    },

    template: `
    <div class="filter">
        <button @click="is_open = !is_open" class="btn btn-sm btn-select" type="button"> 
            {{ FILTER_TITLE }} <b v-if="selected.length"> {{ selected.length }}</b>
        </button>
        <div v-show="is_open" class="filter_wrap_new">
        <select-item v-model="selected" 
                     :options="users" 
                     :multiple="true" 
                     track_by="hash" 
                     label="email"
                     :close_on_select="false"
                     :search="true"
                     :loading="loading"
                     :hide_selected="true"
                     :allow_empty="true"
                     :clear_on_select="false"
                     @search-change="onSearch"
                     :placeholder="SEARCH_MSG">
        </select-item>
        </div>
    </div>`
});
