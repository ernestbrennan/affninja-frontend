Vue.component('offer-countries', {
    props: {
        targets: {
            required: true,
            type: Array,
            default: [],
        },
    },

    computed: {
        countries() {
            let countries = [];

            this.targets.forEach(target => {
                let target_geo_items = _.get(target, 'target_geo', []);

                target_geo_items.forEach(target_geo => {
                    let match = _.find(countries, {code: target_geo.country.code});
                    if (match === undefined) {
                        countries.push({
                            code: target_geo.country.code,
                            title: target_geo.country.title,
                        });
                    }
                });
            });

            return countries;
        }
    },

    template: `
    <div>
        <div class="nowrap" v-for="(country, index) in countries" :key="index">
            <div class="display_i_b" v-once >
                <span :class="['country', 'country_' + country.code]"></span> {{ country.title }}
            </div>
        </div>
    </div>`
});