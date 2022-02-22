Vue.component('advertisers-select', {
    data() {
        return {
            LANG_MESSAGES: LANG_MESSAGES,
            advertisers: [],
            selected: [],
            loading: false,
        }
    },
    props: {
        value: {},

        multiple: {
            type: Boolean,
            default: false,
        },

        allow_empty: {
            type: Boolean,
            default: false,
        }
    },

    mounted() {
        if (this.multiple) {
            if (!Array.isArray(this.value)) {
                throw 'For multiple select :value must be an array';
            }
        } else if (Array.isArray(this.value)) {
            throw 'For single select :value cannot be an array';
        }

        let hashes = this.multiple ? this.value : [this.value];

        this.getAdvertisers(hashes).then(() => {
            let advertiser;

            if (this.multiple) {

                this.value.forEach(advertiser_hash => {

                    advertiser = _.find(this.advertisers, {hash: advertiser_hash});

                    if (advertiser !== undefined) {
                        this.selected.push(advertiser);
                    }
                });
            } else {
                this.selected = _.find(this.advertisers, {hash: this.value});
            }
        });
    },

    watch: {
        'value'() {
            if (this.multiple) {
                return;
            }

            this.getAdvertisers([this.value]).then(() => {
                this.selected = _.find(this.advertisers, {hash: this.value});
            });
        },

        'selected'() {
            if (this.multiple) {
                this.$emit('updated', _.map(this.selected, 'hash'));
            } else {
                this.$emit('updated', this.selected);
            }
        },
    },

    methods: {
        getAdvertisers(hashes = [], search = '') {
            return new Promise((resolve, reject) => {

                if (is_null(hashes) || !hashes.length && search.length < 2) {
                    return;
                }

                this.loading = true;

                User.getAdvertisers([], 'email', search, hashes).then(advertisers => {
                    this.advertisers = advertisers.data;

                    this.loading = false;
                    resolve();
                })
            });
        },

        onSearch(search) {
            this.advertisers.splice(0);

            this.getAdvertisers([], search);
        }
    },

    template: `
        <select-item 
            v-model="selected" 
            :options="advertisers" 
            :multiple="multiple" 
            track_by="hash" 
            label="email"
            :close_on_select="true" 
            :search="true" 
            :loading="loading"
            :allow_empty="allow_empty"
            @search-change="onSearch"
            :placeholder="LANG_MESSAGES.search">
        </select-item>`
});