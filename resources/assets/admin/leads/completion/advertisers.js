let vm = new Vue({
    el: '#advertisers',
    data: {
        LANG_USERS: LANG_USERS,
        LANG_LEADS: LANG_LEADS,
        advertisers: [],
        advertisers_loading: false,
    },
    mounted() {
        this.getAdvertisers();
    },
    watch: {
        'advertisers_loading'() {
            if (this.advertisers_loading) {
                ContentPreloader.show('#advertisers');
            } else {
                ContentPreloader.hide();
            }
        },
    },
    methods: {
        getAdvertisers() {
            this.advertisers_loading = true;

            User.getAdvertisersWithUncompletedLeads(['profile']).then(advertisers => {
                this.advertisers = advertisers;
                this.advertisers_loading = false;
            });
        },
    }
});