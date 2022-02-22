<script type="text/x-template" id="stat_by_report_tpl">
  <div class="table-responsive" id="report-tables">

    <vue-datatable @sorting-updated="onDatatableChangeSort" ref="datatable"></vue-datatable>
    @include('publisher::statistics.parts.group_first_level')

  </div>
</script>