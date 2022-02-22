const STOPPED = 'stopped';

Vue.component('requisites', {
    template: '#requisites-tpl',
    data: function () {
        return {
            wmr: {
                purse: '',
            },
            wmz: {
                purse: '',
            },
            wme: {
                purse: '',
            },
            paxum: {
                email: '',
            },
            epayments: {
                ewallet: '',
            },
            swift: {
                card_number: '',
                expires: {
                    month: '',
                    year: '',
                },
                card_holder: '',
                phone: '',
                document: '',
                tax_id: '',
                birthday: '',
                country: '',
                street: '',
            },
            payment_systems: [],
            show_webmoney_rub: false,
            show_webmoney_usd: false,
            show_webmoney_eur: false,
            show_paxum_rub: false,
            show_paxum_usd: false,
            show_paxum_eur: false,
            show_epayments_rub: false,
            show_epayments_usd: false,
            show_epayments_eur: false,
            show_swift_rub: false,
            show_swift_usd: false,
            show_swift_eur: false,
        };
    },
    
    mounted() {
        this.getRequisites();
    },
    
    methods: {
        getRequisites() {
            ContentPreloader.show('#requisites');
            api.get('/payment_requisites.getList').then(response => {
                this.setRequisites(response.data.response);
            });
        },
        
        setRequisites(payment_systems) {
            
            let payment_system;
            
            for (payment_system of payment_systems) {
                
                switch (payment_system.id) {
                    case WEBMONEY_RUB:
                        this.wmr = this.getWebmoneyRequisite(payment_system);
                        this.show_webmoney_rub = true;
                        break;
                    
                    case WEBMONEY_USD:
                        this.wmz = this.getWebmoneyRequisite(payment_system);
                        this.show_webmoney_usd = true;
                        break;
                    
                    case WEBMONEY_EUR:
                        this.wme = this.getWebmoneyRequisite(payment_system);
                        this.show_webmoney_eur = true;
                        break;
                    
                    case PAXUM_RUB:
                        this.paxum = this.getPaxumRequisite(payment_system);
                        this.show_paxum_rub = true;
                        break;
                    
                    case PAXUM_USD:
                        this.paxum = this.getPaxumRequisite(payment_system);
                        this.show_paxum_usd = true;
                        break;
                    
                    case PAXUM_EUR:
                        this.paxum = this.getPaxumRequisite(payment_system);
                        this.show_paxum_eur = true;
                        break;
                    
                    case EPAYMENTS_RUB:
                        this.epayments = this.getEpaymentsRequisite(payment_system);
                        this.show_epayments_rub = true;
                        break;
                    
                    case EPAYMENTS_USD:
                        this.epayments = this.getEpaymentsRequisite(payment_system);
                        this.show_epayments_usd = true;
                        break;
                    
                    case EPAYMENTS_EUR:
                        this.epayments = this.getEpaymentsRequisite(payment_system);
                        this.show_epayments_eur = true;
                        break;
                    //
                    // case 'swift':
                    //     if (!Object.size(payment_systems[payment_system])) {
                    //         continue;
                    //     }
                    //     this.swift.card_number = payment_systems[payment_system].card_number;
                    //     this.swift.expires.month = payment_systems[payment_system].expires.slice(0, 2);
                    //     this.swift.expires.year = payment_systems[payment_system].expires.slice(3);
                    //     this.swift.card_holder = payment_systems[payment_system].card_holder;
                    //     this.swift.phone = payment_systems[payment_system].phone;
                    //     this.swift.document = payment_systems[payment_system].document;
                    //     this.swift.tax_id = payment_systems[payment_system].tax_id;
                    //     this.swift.birthday = date('d.m.Y', strtotime(payment_systems[payment_system].birthday));
                    //     this.swift.country = payment_systems[payment_system].country;
                    //     this.swift.street = payment_systems[payment_system].street;
                    //     break;
                }
            }
            
            this.$nextTick(() => {
                ContentPreloader.hide();
            })
        },
        
        editRequisites() {
            let ladda = LaddaPreloader.start('#edit_requisites');
            let params = {
                wmr: this.wmr.purse || '',
                wmz: this.wmz.purse || '',
                wme: this.wme.purse || '',
                paxum: this.paxum.email || '',
                epayments: this.epayments.ewallet || '',
                card_number: this.swift.card_number.replace(/ /g, ''),
                expires: this.swift.expires.month + '/' + this.swift.expires.year,
                card_holder: this.swift.card_holder,
                phone: this.swift.phone,
                document: this.swift.document,
                tax_id: this.swift.tax_id,
                birthday: this.swift.birthday === '' ? '' : date('Y-m-d', strtotime(this.swift.birthday)),
                country: this.swift.country,
                street: this.swift.street,
            };
            
            api.post('/payment_requisites.edit', params).then(response => {
                ladda.stop();
                showMessage('success', response.data.message);
            }).catch(() => {
                ladda.stop();
            });
        },
        
        getWebmoneyRequisite(payment_system) {
            let requisite = _.get(payment_system, 'webmoney_requisite', this.getDefaultWebmoneyRequisite());
            if (is_null(requisite)) {
                requisite = this.getDefaultWebmoneyRequisite();
            }
            return requisite;
        },
        getDefaultWebmoneyRequisite() {
            return {
                purse: '',
                is_editable: 1,
            };
        },
    
        getPaxumRequisite(payment_system) {
            let requisite = _.get(payment_system, 'paxum_requisite', this.getDefaultPaxumRequisite());
            if (is_null(requisite)) {
                requisite = this.getDefaultPaxumRequisite();
            }
            return requisite;
        },
        getDefaultPaxumRequisite() {
            return {
                email: '',
                is_editable: 1,
            };
        },
        
        getEpaymentsRequisite(payment_system) {
            let requisite = _.get(payment_system, 'epayments_requisite', this.getDefaultEpaymentsRequisite());
            if (is_null(requisite)) {
                requisite = this.getDefaultEpaymentsRequisite();
            }
            return requisite;
        },
        getDefaultEpaymentsRequisite() {
            return {
                ewallet: '',
                is_editable: 1,
            };
        },
    },
});