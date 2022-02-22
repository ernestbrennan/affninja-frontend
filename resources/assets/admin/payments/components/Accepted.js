Vue.component('accepted', {
    template: '#accepted_payments_tpl',
    props: ['not_confirm'],
    mixins: [payments_mixin, datatable_mixin],
    data() {
        return {
            payments: [],
            loading: false,
            prev_params: {},
            preloader: null,
        }
    },

    created() {
        bus.$on('payment-accepted', payment => {
            this.payments.unshift(payment);
            this.drawDatatableAfterAddRow();
        });
    },

    mounted() {
        this.initDatatableConfig('#accepted_payments_table', '#tab_accepted_wrap', {
            columnDefs: [
                {targets: 0, type: 'real_date'},
                {targets: 7, type: 'title-numeric'},
                {targets: 8, orderable: false},
            ],
        });
    },

    watch: {
        'loading'() {
            if (this.loading) {
                filters_bus.$emit('apply-filter-start');

                this.preloader = ContentPreloader.show('#tab_accepted_wrap');
            } else {
                filters_bus.$emit('apply-filter-stop');

                ContentPreloader.hide(this.preloader);
                this.drawDatatable(this.payments.length);
            }
        },
    },

    methods: {
        getPayments(params, filters_submit) {
            if (_.isEqual(params, this.prev_params) && !filters_submit) {
                return;
            }

            this.prev_params = _.clone(params);
            this.loading = true;

            params.status = 'accepted';
            params.with = ['processed_user', 'paid_user', 'user.publisher'];

            api.get('/payment.getList', {params: params}).then(response => {
                this.payments = response.data.response.data;

                this.loading = false;
            }, () => {
                this.loading = false;
            });
        },

        paidPayment(e, payment, index) {
            if (this.not_confirm) {
                return this.paidPaymentRequest(e, payment, index);
            }

            Swal.show(LANG_PAYMENTS.on_paid_msg, LANG_MESSAGES.yes_paid_it).then(() => {
                this.paidPaymentRequest(e, payment, index);
            }, () => {
            });
        },

        paidPaymentRequest(e, payment, index) {
            let ladda = LaddaPreloader.start('#paid_accepted_payment-' + payment.id),
                params = {
                    hash: payment.hash,
                    with: ['processed_user', 'paid_user', 'user.publisher'],
                };

            api.post('/payment.pay', params).then(response => {

                this.deleteDatatableRow(e.target);
                this.payments.splice(index, 1);

                bus.$emit('payment-paid', response.data.response);

                LaddaPreloader.stop(ladda);
            }).catch(() => {
                LaddaPreloader.stop(ladda);
            });
        },
    }
});
