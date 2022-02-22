// Памятка к использованию:
// В списке обязательно нужно указывать уникальный :key
// Метод deleteDatatableRow обязательно вызывается перед тем, как будет удалено значение из массива Vue

const datatable_mixin = {
    data() {
        return {
            datatable_original_table: null,
            datatable: null,
            datatable_was_initialized: false,
            datatable_config: {},
            datatable_preloader: null,
            datatable_loading: false,
        }
    },

    created() {
        extendDatatable();
    },

    watch: {
        'datatable_loading'() {
            if (this.datatable_loading) {
                return ContentPreloader.show(this.datatable_preloader);
            }

            ContentPreloader.hide($(this.datatable_preloader));
        }
    },

    methods: {
        initDatatableConfig(table_selector, preloader_selector, config) {
            this.datatable_config = config;
            this.datatable_preloader = preloader_selector;

            Vue.nextTick(() => {
                this.datatable_original_table = $(table_selector);
            });
        },

        drawDatatable(array_length) {
            this.datatable_loading = true;
            this.destroyDatatable();

            if (!array_length) {
                return this.datatable_loading = false;
            }

            Vue.nextTick(() => {
                this.runDatatable();
                runTooltip();
            });
        },

        drawDatatableAfterAddRow() {
            this.destroyDatatable();

            Vue.nextTick(() => {
                this.runDatatable();
                this.datatable.page(0).draw('page');
                runTooltip();
            });
        },

        deleteDatatableRow(target) {
            if (is_null(this.datatable)) {
                return;
            }

            let cur_page = this.datatable.page();

            // После удаления row местонахождение сбрасывается на первую страницу
            this.datatable.row($(target).parentsUntil('tbody')).remove().draw();

            if (!this.datatable.rows().count()) {
                return this.destroyDatatable();
            }

            this.fixDatatablePage(cur_page);
        },

        fixDatatablePage(cur_page) {
            let page_count = this.datatable.page.len(),
                rows_count = this.datatable.rows().count();

            cur_page = rows_count <= page_count ? 0 :
                rows_count % page_count > 0 ? cur_page : cur_page - 1;

            this.datatable.page(cur_page).draw('page');
        },
        runDatatable() {
            let default_config = {
                language: {
                    paginate: {
                        previous: LANG_MESSAGES.prev_small,
                        next: LANG_MESSAGES.next_small,
                    }
                },
                // bAutoWidth Отменяет задание ширины колонок в style
                bAutoWidth: false,
                pageLength: 25,
                bLengthChange: false,
                bInfo: false,
                bFilter: false,
                aaSorting: [[0, "desc"]],
                drawCallback: function (info) {
                    if ($('#' + info.sTableId + '_wrapper .paginate_button').size() === 3) {
                        return $('#' + info.sTableId + '_wrapper .dataTables_paginate').css('display', 'none');
                    }

                    stylePagginationBtns();
                },
            };

            this.datatable = this.datatable_original_table.DataTable(_.merge(default_config, this.datatable_config));
            this.datatable_loading = false;
        },

        destroyDatatable() {
            if (this.datatable !== null) {
                this.datatable.destroy();
                this.datatable = null;
            }
        },
    },
};