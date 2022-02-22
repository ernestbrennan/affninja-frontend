let Datatable = {
    table: null,
    datatable: null,
    default_config: {
        language: {
            paginate: {
                previous: LANG_MESSAGES.prev_small,
                next: LANG_MESSAGES.next_small
            }
        },
        pageLength: 50,
        bLengthChange: false,
        bInfo: false,
        bFilter: false,
        columnDefs: [],
        aaSorting: [[0, "asc"]],
        drawCallback: function (info) {
            if ($('#' + info.sTableId + '_wrapper .paginate_button').size() === 3) {
                $('.dataTables_paginate').css('display', 'none');
            }
        }
    },

    init(id, config, fixedheader = true) {
        this.initDatatable(id, config).then(() => {
            if (fixedheader) {
                this.initFixedHeader(id, config);
            }
        });
    },

    initDatatable(id, config) {
        return new Promise((resolve, reject) => {
            this.destroyDatatable();

            this.table = $('#' + id);

            _.merge(this.default_config, config);

            this.datatable = this.table.DataTable(this.default_config);

            resolve();
        });
    },

    initFixedHeader() {
        // Run fixed header
        this.table.floatThead({
            zIndex: 2,
            responsiveContainer: function ($table) {
                return $table.closest('.table-responsive');
            }
        });
    },

    destroyDatatable() {
        if (this.datatable !== null) {
            this.datatable.destroy();
            this.datatable = null;
        }

        if (this.table !== null) {
            this.table.floatThead('destroy');
            this.table = null;
        }
    },

    getInstance() {
        return _.cloneDeep(this);
    },
};