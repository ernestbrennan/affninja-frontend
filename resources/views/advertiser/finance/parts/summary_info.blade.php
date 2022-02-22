<script type="text/x-template" id="summary-info-tpl">
  <div class="hpanel panel-collapse">
    <div class="panel-heading hbuilt">
      <div class="panel-tools">
        <a class="showhide" id="toggle_summary_panel"><i class="fa fa-chevron-down"></i></a>
      </div>
      <span class="panel-title">{{ trans('statistics.lead_summary_data') }}</span>
    </div>
    <div class="panel-body" style="display: none">
      <div class="row">
        <div class="col-lg-7 col-md-8 col-sm-12 col-xs-12">
          <div class="row m-b">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">@{{ LANG_FINANCE.incoming }}</div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">@{{ LANG_FINANCE.costs }}</div>
          </div>
          <div v-for="item in summary" :key="item.currrency_id" class="row m-b">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              @{{ LANG_FINANCE.payout + ',' }}
              <currency-sign-by-id :currency_id="item.currency_id" :key="item.currrency_id"></currency-sign-by-id>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <money :sum="item.income"></money>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <money :sum="item.expense"></money>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>