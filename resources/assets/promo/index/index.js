let vm = new Vue({
    el: '#app',
    data: {
        LANG_FORM: LANG_FORM,

        modal: null,
        scroll: false,
        action: getCookie('active_form') || 'sign_up',
    },

    mounted() {
        this.modal = $('#login_modal');

        callOnEnter('#passwordInput', function () {
            $("#loginBtn").click();
        });

        // this.initScrollHandlers();
        // this.initScrollEvents();
    },

    watch: {
        'action'() {
            if (this.action === 'login') {
                this.$refs['login-form'].is_forgot_form_visible = false;
            }
            setCookie('active_form', this.action);
        },
    },

    methods: {

        openLoginModal() {
            this.modal.modal();
        },

        onSelectAction(action) {
            this.action = action;
        },

        openAdvertiserRegModal() {
            this.$refs['advertiser-reg-modal'].openModal();
        },

        initScrollHandlers() {
            let self = this;

            $('body').scrollspy({
                target: '#navbar',
                offset: 80
            });

            $('.navbar-right .page-scroll').on('click', function (event) {
                let link = $(this);

                self.scroll = true;

                $('html, body').stop().animate({
                    scrollTop: $(link.attr('href')).offset().top - 50
                }, 500);

                setTimeout(() => {
                    self.scroll = false;
                }, 500);

                event.preventDefault();
            });
        },

        initScrollEvents() {
            let anchor = location.hash || '#home',
                self = this;

            this.$nextTick(() => {
                $('html, body').stop().animate({
                    scrollTop: $(anchor).offset().top - 50
                }, 500);
            });

            $('#navbar').on('activate.bs.scrollspy', function (e) {
                if (self.scroll) {
                    return;
                }

                let anchor = $(e.target).find('a').attr('href');
                self.setAnchor(anchor);
            });
        },

        setAnchor(anchor) {
            history.pushState(null, '', location.pathname + location.search + anchor);
        },
    }
});