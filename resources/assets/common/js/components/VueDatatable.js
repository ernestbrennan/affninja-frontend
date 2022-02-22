Vue.component('vue-datatable', {
    template: `<div class="vue-datatable hidden"></div>`,
    data() {
        return {
            sort_by: null,
            sorting: null,
            table: null,
        }
    },
    methods: {
        init(table_id, sort_by, sorting) {
            if (this.table !== null) {
                this.destroy();
            }

            this.table = $('#' + table_id);

            this.table.addClass('dataTable dataTableCustom');

            this.sort_by = sort_by;
            this.sorting = sorting;

            this.destroy();

            if (this.table.find('tbody tr').exists()) {
                this.addOnSortEvent();
            }
        },

        addOnSortEvent() {

            this.addThIcons();

            let self = this;
            this.table.find('thead th[data-column]').on('click', function (e) {
                e.stopImmediatePropagation();

                let sorting, sort_by = $(this).data('column');

                if ($(this).hasClass('sorting_desc')) {
                    sorting = 'asc';
                } else {
                    sorting = 'desc';
                }

                $(this).closest('tr').find('th[data-column]').removeClass('sorting_asc sorting_desc');
                $(this).addClass('sorting_' + sorting);

                self.$emit('sorting-updated', {
                    sorting: sorting,
                    sort_by: sort_by,
                });
            });
        },

        addThIcons() {
            this.table.find('thead th[data-column]')
                .addClass('sorting')
                .filter('[data-column=' + this.sort_by + ']')
                .addClass('sorting_' + this.sorting);
        },

        destroy() {
            this.table.find('thead th[data-column]')
                .removeClass('sorting sorting_asc sorting_desc')
                .off();
        },

        getDefaultTableSorting() {
            return this.table.find('thead th[data-column]').first().data('column');
        },
    }
});