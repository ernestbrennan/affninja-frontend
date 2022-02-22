<script type="text/x-template" id="requisites-tpl">
  <div id="change_requisite_tab" class="tab-pane">
    <div class="settings_tab_wrapper" id="change_requisite_wrapper">

      <div id="requisites">
        <div v-if="show_paxum_rub || show_paxum_usd || show_paxum_eur" class="hpanel hdefault">
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <h4 class="m-b">Paxum</h4>
                  <div class="form-group">
                    <label class="control-label" for="paxum">{{ trans('payment_requisites.paxum_email') }}:</label>
                    <input v-model="paxum.email" :disabled="paxum.is_editable == 0" class="form-control" id="paxum" type="email">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="show_epayments_rub || show_epayments_usd || show_epayments_eur" class="hpanel hdefault">
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <h4 class="m-b">ePayments</h4>
                  <div class="form-group">
                    <label class="control-label" for="epayments">eWallet:</label>
                    <input v-model="epayments.ewallet" :disabled="epayments.is_editable == 0" class="form-control" id="epayments">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="show_webmoney_rub || show_webmoney_usd || show_webmoney_eur" class="hpanel hdefault">
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <h4 class="m-b">Webmoney</h4>
                  <div v-if="show_webmoney_rub" class="form-group">
                    <label class="control-label" for="wmr">WMR:</label>
                    <input v-model="wmr.purse" :disabled="wmr.is_editable == 0" v-mask="'R############'" class="form-control" id="wmr">
                  </div>
                  <div v-if="show_webmoney_usd" class="form-group">
                    <label class="control-label" for="wmz">WMZ:</label>
                    <input v-model="wmz.purse" :disabled="wmz.is_editable == 0" v-mask="'Z############'" class="form-control" id="wmz">
                  </div>
                  <div v-if="show_webmoney_eur" class="form-group">
                    <label class="control-label" for="wme">WME:</label>
                    <input v-model="wme.purse" :disabled="wme.is_editable == 0" v-mask="'E############'" class="form-control" id="wme">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="show_swift_rub || show_swift_usd || show_swift_eur" class="hpanel hdefault hidden">
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="form-group">
                  <h4 class="m-b">{{ trans('payment_requisites.credit_card') }}</h4>
                  <div class="form-group">
                    <label class="control-label" for="card_number">{{ trans('payment_requisites.card_number') }}:</label>
                    <input v-model="swift.card_number" v-mask="'#### #### #### ####'" class="form-control" id="card_number">
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="month">{{ trans('payment_requisites.expires') }}:</label>
                    <div class="row">
                      <div class="col-xs-6">
                        <select v-model="swift.expires.month" class="form-control" id="month">
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                      </div>
                      <div class="col-xs-6">
                        <select v-model="swift.expires.year" class="form-control" id="credit_cart_term_year">
                          <option value="17">2017</option>
                          <option value="18">2018</option>
                          <option value="19">2019</option>
                          <option value="20">2020</option>
                          <option value="21">2021</option>
                          <option value="22">2022</option>
                          <option value="23">2023</option>
                          <option value="24">2024</option>
                          <option value="25">2025</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="card_holder">{{ trans('payment_requisites.card_holder') }}:</label>
                    <input v-model="swift.card_holder" class="form-control font-uppercase" id="card_holder">
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="phone">{{ trans('users.settings_phone') }}:</label>
                    <input v-model="swift.phone" class="form-control" id="phone">
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="document">{{ trans('payment_requisites.document') }}:</label>
                    <input v-model="swift.document" class="form-control font-uppercase" id="document">
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="tax_id">Tax ID:</label>
                    <input v-model="swift.tax_id" class="form-control" id="tax_id">
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="birthday">{{ trans('payment_requisites.birthday') }}:</label>
                    <input v-model="swift.birthday" class="form-control" id="birthday" v-mask="'##.##.####'">
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="country">{{ trans('messages.country') }}:</label>
                    <input v-model="swift.country" class="form-control" id="country">
                  </div>
                  <div class="form-group">
                    <label class="control-label" for="street">{{ trans('messages.address') }}:</label>
                    <input v-model="swift.street" class="form-control" id="street">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button @click="editRequisites" class="btn btn-sm btn-success ladda-button" id="edit_requisites" data-style="zoom-out" type="button">
          <span class="ladda-label">{{ trans('messages.save') }}</span>
        </button>
      </div>
    </div>
  </div>
</script>