<script type="text/x-template" id="transaction-list-tpl">
  <div class="row relative">
    <div class="col-lg-12 col-md-12 col-sm-12-col-xs-12">
      <div id="transaction-list-wrap">

        <div v-show="transactions.length && group_by === null" class="table-responsive">
          <table class="table table-hover table-striped table-bordered table-condensed dataTable-with-colspan"
                 style="text-align: left;"
                 id="finance_table">
            <thead>
            <tr>
              <th class="date_th" style="width: 78px">@{{ LANG_MESSAGES.date }}</th>
              <th style="width: 50px">@{{ LANG_FINANCE.payment_id }}</th>
              <th style="width: 50px">@{{ LANG_FINANCE.payment_type }}</th>
              <th colspan="4">@{{ LANG_MESSAGES.information }}</th>
              <th style="width: 80px">@{{ LANG_FINANCE.incoming }}</th>
              <th style="width: 80px">@{{ LANG_FINANCE.costs }}</th>
            </tr>
            <tr>
              <th style="width: 110px"></th>
              <th style="width: 50px"></th>
              <th style="width: 50px"></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th style="width: 80px"></th>
              <th style="width: 80px"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="transaction in transactions">
              <td :data-sort="transaction.created_at">@{{ transaction.created_at | datehour }}</td>
              <td>
                @{{ transaction.hash }}
              </td>
              <td>
                <div v-if="transaction.type === 'advertiser.unhold' || transaction.type === 'advertiser.write-off'"
                     class="label label-danger">
                  @{{ LANG_FINANCE.write_off }}
                </div>
                <div v-else-if="transaction.type === 'advertiser.cancel' || transaction.type === 'advertiser.deposit'"
                     class="label label-success">
                  @{{ LANG_FINANCE.replenishment }}
                </div>
              </td>
              <template v-if="transaction.type === 'advertiser.unhold'">
                <td>
                  <template v-if="transaction.lead">
                    <div class="nowrap">
                      <i v-if="transaction.lead.status === 'approved'"
                         class="fa fa-check success"></i>
                      <i v-if="transaction.lead.status === 'cancelled' || transaction.lead.status === 'trashed'"
                         class="fa fa-times danger"></i>
                      <a :href="getLeadLink(transaction.lead)" target="_blank"
                      >@{{ '#' + transaction.lead.hash }}</a>
                    </div>
                  </template>
                </td>
                <td>
                  <a v-if="transaction.lead && transaction.lead.offer !== null"
                     :href="'/offer/' + transaction.lead.offer.hash"
                     v-html="transaction.lead.offer.title"
                     class="nowrap"
                     target="_blank"
                  ></a>
                </td>
                <td>
                  <template v-if="transaction.lead">
                    <country-flag :country="transaction.lead.country" :small="true"></country-flag>
                    <target-title :label="transaction.lead.target.label"
                                  :title="transaction.lead.target.template.title"
                                  data-toggle="tooltip"
                                  data-title="{{ trans('messages.target') }}"
                    ></target-title>
                  </template>
                </td>
                <td><span>@{{ LANG_FINANCE.confirmed_action }}</span></td>
              </template>
              <template v-if="transaction.type === 'advertiser.write-off'">
                <td style="border-right: none"></td>
                <td style="border-right: none"></td>
                <td style="border-right: none"></td>
                <td>@{{ LANG_FINANCE.write_off_manual }}</td>
              </template>
              <template v-if="transaction.type === 'advertiser.cancel' || transaction.type === 'advertiser.deposit'">
                <td style="border-right: none">
                                    <span v-if="transaction.type === 'advertiser.deposit'"
                                    >@{{ transaction.deposit.replenishment_method }}</span>
                </td>
                <td style="border-right: none"></td>
                <td style="border-right: none"></td>
                <td>@{{ transaction.description }}</td>
              </template>
              <td class="text-right" :data-title="transaction.type === 'advertiser.cancel' || transaction.type === 'advertiser.deposit'
                            ? transaction.balance_sum.replace('-', '') : 0">
                <money v-if="transaction.type === 'advertiser.cancel' || transaction.type === 'advertiser.deposit'"
                       :sum="transaction.balance_sum.replace(/[-,]/g, '')"
                       :currency_id="transaction.currency_id"></money>
              </td>
              <td class="text-right" :data-title=" transaction.type === 'advertiser.unhold' || transaction.type === 'advertiser.write-off'
                                ? transaction.balance_sum.replace(/[-,]/g, '') : 0">
                <money v-if="transaction.type === 'advertiser.unhold' || transaction.type === 'advertiser.write-off'"
                       :sum="transaction.balance_sum.replace('-', '')"
                       :currency_id="transaction.currency_id"></money>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        {{-- Grouping by date --}}
        <div v-if="transactions.length && group_by === 'date'" class="table-responsive">
          <table class="table table-hover table-striped table-bordered table-condensed">
            <thead>
            <tr>
              <th>@{{ LANG_MESSAGES.date }}</th>
              <template v-for="currency in currencies_ids">
                <th class="w80">
                  @{{ LANG_FINANCE.incoming }},
                  <currency-sign-by-id :currency_id="currency"></currency-sign-by-id>
                </th>
                <th class="w80">
                  @{{ LANG_FINANCE.costs }},
                  <currency-sign-by-id :currency_id="currency"></currency-sign-by-id>
                </th>
              </template>
            </tr>
            </thead>
            <tbody>
            <tr v-for="date_info in group_by_dates">
              <td>@{{ date_info.title | date }}</td>
              <template v-for="currency_info in date_info.data">
                <td class="text-right">
                  <money :sum="currency_info.replenishment_sum"></money>
                </td>
                <td class="text-right">
                  <money :sum="currency_info.write_off_sum"></money>
                </td>
              </template>
            </tr>
            </tbody>
            <tfoot class="total-footer border-top-fix">
            <tr>
              <td><b>@{{ LANG_STATISTICS.total }}</b></td>
              <template v-for="currency_info in group_by_dates_total">
                <td class="text-right">
                  <money :sum="currency_info.replenishment_sum"></money>
                </td>
                <td class="text-right">
                  <money :sum="currency_info.write_off_sum"></money>
                </td>
              </template>
            </tr>
            </tfoot>
          </table>
        </div>

        {{-- Grouping by offer --}}
        <div v-if="transactions.length && group_by === 'offer'" class="table-responsive">
          <table class="table table-hover table-striped table-bordered table-condensed">
            <thead>
            <tr>
              <th>@{{ LANG_MESSAGES.date }}</th>
              <template v-for="currency in currencies_ids">
                <th class="w80">
                  @{{ LANG_FINANCE.incoming }},
                  <currency-sign-by-id :currency_id="currency"></currency-sign-by-id>
                </th>
                <th class="w80">
                  @{{ LANG_FINANCE.costs }},
                  <currency-sign-by-id :currency_id="currency"></currency-sign-by-id>
                </th>
              </template>
            </tr>
            </thead>
            <tbody>
            <tr v-for="offer_info in group_by_offers">
              <td>
                <a v-if="offer_info.hash" :href="'/offer/' + offer_info.hash"
                   v-html="offer_info.title"
                   class="nowrap"
                   target="_blank"
                ></a>
                <span v-else>
                                    @{{ offer_info.title }}
                                </span>
              </td>
              <template v-for="currency_info in offer_info.data">
                <td class="text-right">
                  <money :sum="currency_info.replenishment_sum"></money>
                </td>
                <td class="text-right">
                  <money :sum="currency_info.write_off_sum"></money>
                </td>
              </template>
            </tr>
            </tbody>
            <tfoot class="total-footer border-top-fix">
            <tr>
              <td><b>@{{ LANG_STATISTICS.total }}</b></td>
              <template v-for="currency_info in group_by_offers_total">
                <td class="text-right">
                  <money :sum="currency_info.replenishment_sum"></money>
                </td>
                <td class="text-right">
                  <money :sum="currency_info.write_off_sum"></money>
                </td>
              </template>
            </tr>
            </tfoot>
          </table>
        </div>

        {{-- Grouping by country --}}
        <div v-if="transactions.length && group_by === 'country'" class="table-responsive">
          <table class="table table-hover table-striped table-bordered table-condensed">
            <thead>
            <tr>
              <th>@{{ LANG_MESSAGES.date }}</th>
              <template v-for="currency in currencies_ids">
                <th class="w80">
                  @{{ LANG_FINANCE.incoming }},
                  <currency-sign-by-id :currency_id="currency"></currency-sign-by-id>
                </th>
                <th class="w80">
                  @{{ LANG_FINANCE.costs }},
                  <currency-sign-by-id :currency_id="currency"></currency-sign-by-id>
                </th>
              </template>
            </tr>
            </thead>
            <tbody>
            <tr v-for="country_info in group_by_countries">
              <td>@{{ country_info.title }}</td>
              <template v-for="currency_info in country_info.data">
                <td class="text-right">
                  <money :sum="currency_info.replenishment_sum"></money>
                </td>
                <td class="text-right">
                  <money :sum="currency_info.write_off_sum"></money>
                </td>
              </template>
            </tr>
            </tbody>
            <tfoot class="total-footer border-top-fix">
            <tr>
              <td><b>@{{ LANG_STATISTICS.total }}</b></td>
              <template v-for="currency_info in group_by_countries_total">
                <td class="text-right">
                  <money :sum="currency_info.replenishment_sum"></money>
                </td>
                <td class="text-right">
                  <money :sum="currency_info.write_off_sum"></money>
                </td>
              </template>
            </tr>
            </tfoot>
          </table>
        </div>

        {{-- Group by operation --}}
        <div v-if="transactions.length && group_by === 'operation' && group_by_operation !== null"
             class="table-responsive">
          <table class="table table-hover table-striped table-bordered table-condensed">
            <thead>
            <tr>
              <th>@{{ LANG_FILTERS.operation }}</th>
              <th v-for="currency in currencies_ids" class="w80">
                @{{ LANG_FINANCE.payout }},
                <currency-sign-by-id :currency_id="currency"></currency-sign-by-id>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="operation in group_by_operation">
              <td>@{{ LANG_FINANCE[operation.title] }}</td>
              <td v-for="currency_info in operation.data" class="text-right">
                <money :sum="currency_info.operation_sum"></money>
              </td>
            </tr>
            </tbody>
            <tfoot class="total-footer border-top-fix">
            <tr>
              <td><b>@{{ LANG_STATISTICS.total }}</b></td>
              <td v-for="currency_info in group_by_operation_total" class="text-right">
                <money :sum="currency_info.total_sum"></money>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
        <empty-list-message v-if="!transactions.length"
                            :message="LANG_FINANCE.transactions_not_found"></empty-list-message>
      </div>
    </div>
  </div>
</script>