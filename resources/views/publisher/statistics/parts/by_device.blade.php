<script type="text/x-template" id="stat_by_device_tpl">
  <div class="table-responsive" id="device-tables">

    <vue-datatable @sorting-updated="onDatatableChangeSort" ref="datatable"></vue-datatable>
    @include('publisher::statistics.parts.group_first_level')

  </div>
</script>