let navbar = new Vue({
    el: '#header',
    data: {
        menu: NavbarConfig,
        selected_item: {},
        location: [],
        user_role: App.user.role,
        alignment: 'submenu-left',
        ready: true,
    },

    mounted() {
        this.initLocationPaths();
    },

    watch: {
        'selected_item'() {
            this.$nextTick(() => {
                this.getSubmenuPosition();
            });
        },
    },

    methods: {
        getSubmenuPosition() {
            if (this.$refs.submenu.offsetWidth === 0) {
                return;
            }

            let menu = this.$refs.desktop,
                submenu = this.$refs.submenu,
                selected_item = this.$refs['item-' + _.findIndex(this.menu, {href: this.selected_item.href})][0];

            let menu_width = menu.offsetWidth,
                menu_center = menu.offsetLeft + (menu_width / 2),
                submenu_width = submenu.offsetWidth,
                selected_item_center = selected_item.offsetLeft + (selected_item.offsetWidth / 2);

            if (selected_item.offsetLeft < menu.offsetLeft + 150) {
                return this.alignment = 'submenu-left';
            }

            if (selected_item_center < menu_center) {
                if (submenu_width < (menu_width / 1.3)) {
                    return this.alignment = 'submenu-center';
                }

                return this.alignment = 'submenu-left';
            } else {
                if (submenu_width < (menu_width / 1.3)) {
                    return this.alignment = 'submenu-center';
                }

                return this.alignment = 'submenu-right';
            }
        },

        initLocationPaths() {
            this.location = [];

            let paths = location.pathname.match(/(\/\w+)/g);

            paths.forEach((item, i) => {
                let path = '';

                for (let k = 0; k <= i; k++) {
                    path += paths[k];
                }

                this.location.push(path);
            });

            this.setSelectedItem(this.getSelectedItem());
        },

        onClick(e, item) {
            if ((e.metaKey || e.ctrlKey) && !item.childrens) {
                return;
            }

            this.setSelectedItem(item);

            if (item.childrens) {
                this.undoDefaultBehavior(e);
            }
        },

        logout() {
            UserLoginer.logout();
        },

        getSelectedItem() {
            return _.find(this.menu, {href: this.location[0]}) || {};
        },

        getPermission(item) {
            if (item.permission !== undefined) {
                return item.permission;
            }

            return true;
        },

        changeSubmenu(e, item) {
            if (e.metaKey || e.ctrlKey) {
                this.undoDefaultBehavior(e);
                return window.open(item.href, '_blank');
            }

            if (!this.ready) {
                return this.undoDefaultBehavior(e);
            }

            let cur_item = _.find(this.selected_item.childrens, {href: this.location[1]});

            if (cur_item.href === this.location[1] && cur_item.inner_page) {
                return window.location = item.href;
            }

            this.undoDefaultBehavior(e);
            this.location.splice(1, 1, item.href);
            history.pushState(null, '', item.href + location.search);
            $('a[href="' + item.id + '"]').tab('show');
        },

        undoDefaultBehavior(e) {
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
        },

        setSelectedItem(item) {
            if (item.href === this.selected_item.href) {
                return;
            }

            this.selected_item = item;
        },
    },
});