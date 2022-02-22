/**
 *
 * Методы кастомной сортировки.
 *
 * Для того что бы запустить этот метод, нужно вызвать функцию init.
 *
 * Параметры метода инициализации:
 * - table_id -
 * - callback -
 *
 * Пример вызова init функции:
 * CustomSort.initTable({
        table_id: 'stat_by_lead',
        callback() {
            ContentPreloader.show('#statistics_table_wrap');
        }
 */
let CustomSort = {

    table: null,
    onsort_callback: null,

    initDefaultSorting(default_sorting_column, default_sorting) {
        let sorting = UrlParameter.getSorting();
        if (sorting === 'null') {
            sorting = default_sorting;
        }

        let sorting_column = UrlParameter.getSortingColumn();
        if (sorting_column === 'null') {
            sorting_column = default_sorting_column;
        }

        this.setSortingValues(sorting, sorting_column);
    },

    initTable(params) {

        this.table = $('#' + params.table_id);
        this.table.addClass('dataTable dataTableCustom');

        this.onsort_callback = params.onsort_callback;

        this.destroy();

        if (this.table.find('tbody tr').exists()) {
            this.addOnSortEvent();
        }
    },

    addOnSortEvent(callback) {

        this.addThIcons();

        var self = this;
        this.table.find('thead th[data-column]').on('click', function (e) {
            e.stopImmediatePropagation();

            var sorting, sorting_column = $(this).data('column');

            if ($(this).hasClass('sorting_desc')) {
                sorting = 'asc';
            } else {
                sorting = 'desc';
            }

            $(this).closest('tr').find('th[data-column]').removeClass('sorting_asc sorting_desc');
            $(this).addClass('sorting_' + sorting);

            self.setSortingValues(sorting, sorting_column);

            if (self.onsort_callback) {
                self.onsort_callback();
            }
        });
    },

    setSortingValues(sorting, sorting_column) {
        UrlParameter.setSorting(sorting);
        UrlParameter.setSortingColumn(sorting_column);
    },

    getSorting() {
        let url = UrlParameter.getSorting();
        return url === 'null' ? 'desc' : url;
    },

    getSortingColumn() {
        let url = UrlParameter.getSortingColumn();
        return url === 'null' ? null : url;
    },

    addThIcons() {

        var th_for_sort = this.table.find('thead th[data-column]');

        var sorting = this.getSorting();
        var sorting_column = this.getSortingColumn();

        th_for_sort
            .addClass('sorting')
            .filter('[data-column=' + sorting_column + ']')
            .addClass('sorting_' + sorting);
    },

    destroy() {
        this.table.find('thead th[data-column]')
            .removeClass('sorting sorting_asc sorting_desc')
            .off();
    },

    validateSortingColumn() {
        var sorting_column = UrlParameter.getSortingColumn();

        if (!this.table.find('[data-column=' + sorting_column + ']').exists()) {
            UrlParameter.setSortingColumn(this.getDefaultTableSorting());
        }
    },

    getDefaultTableSorting() {
        return this.table.find('thead th[data-column]').first().data('column');
    },

    getInstance() {
        return _.cloneDeep(this);
    },
};