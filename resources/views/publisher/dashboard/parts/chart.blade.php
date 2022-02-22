<script type="text/x-template" id="chart-tpl">
  <div>
    <div class="row">
      <div class="col-xs-6 text-left">
        <btn-group-item :active="period" @updated="onSelectPeriod" class="m-b">
          <button class="btn btn-success btn-outline btn-sm" data-id="day" type="button"
          >@{{ LANG_DASHBOARD.day }}
          </button>
          <button class="btn btn-success btn-outline btn-sm" data-id="week" type="button"
          >@{{ LANG_DASHBOARD.week }}
          </button>
          <button class="btn btn-success btn-outline btn-sm" data-id="month" type="button"
          >@{{ LANG_DASHBOARD.month }}
          </button>
        </btn-group-item>
      </div>

      <div class="col-xs-6 text-right">
        <btn-group-item :active="currency_id" @updated="onSelectCurrency" class="m-b">
          <button class="btn btn-success btn-outline btn-sm" data-id="1" type="button">RUB</button>
          <button class="btn btn-success btn-outline btn-sm" data-id="3" type="button">USD</button>
          <button class="btn btn-success btn-outline btn-sm" data-id="5" type="button">EUR</button>
        </btn-group-item>
      </div>
    </div>
    <div class="relative" id="chart_wrap">
      <div v-show="no_chart_data"
           class="col-xs-12 absolute height-100-p z-index-1
                  display-flex-center flex-direction-column p-l-none">
        <h5>@{{ LANG_DASHBOARD.data_not_available }}</h5>
        <a href="/offers" class="link-blue center-block m-t-xs">@{{ LANG_DASHBOARD.choose_offer }}</a>
      </div>
      <div class="row">
        <div :style="{ opacity: no_chart_data ? 0.5 : 1, height: '300px' }"
             class="col-xs-12">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</script>