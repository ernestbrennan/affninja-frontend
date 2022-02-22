let TableHighlighter = {
    init() {
        $(document).on("mouseover", ".table-highlight td", this.highlightTableCell);
        $(document).on("mouseout", ".table-highlight td", this.highlightTableCell);
    },

    highlightTableCell(e) {
        let _this = $(this), column;
        $(".highlighted_td_center").removeClass("highlighted_td_center");
        $(".highlighted_td").removeClass("highlighted_td");

        if (e.type === 'mouseover') {
            _this.addClass("highlighted_td_center");
            _this.parent().addClass("highlighted_td");
            if (column = _this.data("column")) {
                $('[data-column="' + column + '"]').addClass("highlighted_td");
            }
        }
    }
};