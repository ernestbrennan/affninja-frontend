@extends('publisher::app', [
'page_preloader'=> true,
'title' => trans('finance.index_title'),
'no_page_header' => true,
])

@section('title')
  {{ trans('finance.index_title') }} - {{ trans('app.name') }}
@endsection

@section('content')
  @include('publisher::finance.parts.create_payment')
  @include('publisher::finance.parts.payment_list')

  <div id="finance">
    <div class="tab-content" id="tab-content-wrap">

      <div role="tabpanel" id="payment_tab_wrap" class="tab-pane">
        <div class="row m-b">
          <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <create-payment></create-payment>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <payment-list></payment-list>
          </div>
        </div>
      </div>

      <div role="tabpanel" id="specification_hold_tab_wrap" class="tab-pane">
        <div id="leads_on_hold_wrap"></div>
      </div>

      <div role="tabpanel" id="requisites_tab_wrap" class="tab-pane">
        @include('publisher::requisites.requisites')
        <requisites></requisites>
      </div>

    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_USERS = {!! json_encode(Lang::get('users')) !!};
      LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
      LANG_PAYMENTS = {!! json_encode(Lang::get('payments')) !!};
      BALANCE_RUB = {!! Session::get('user')['profile']['balance_rub'] !!};
      BALANCE_USD = {!! Session::get('user')['profile']['balance_usd'] !!};
      BALANCE_EUR = {!! Session::get('user')['profile']['balance_eur'] !!};
      DATATABLE_LENGTH = 25;
  </script>
  <script src="/publisher/finance/build.js?{{ Config::get('app.version') }}"></script>
@endsection