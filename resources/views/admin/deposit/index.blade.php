@extends('admin::app', [
'page_preloader'=> true,
'title' => trans('navbar.advertiser_balance'),
'no_page_header' => true,
])

@section('content')
  @include('admin::deposit.parts.deposit_modal')
  @include('admin::deposit.parts.write_off_modal')
  @include('admin::deposit.parts.advertiser_balance')

  <div id="advertiser-balance">

    <div class="filters_panel_white">
      @include('admin::deposit.parts.filters')
      <div class="pull-right">
        <button @click="openCreateDepositModal" :disabled="!advertisers.length"
                class="btn btn-success btn-sm">
          <span class="glyphicon glyphicon-arrow-up"></span>
          {{ trans('finance.replenishment') }}
        </button>
        <button @click="openCreateWriteOffModal" :disabled="!advertisers.length"
                class="btn btn-success btn-sm">
          <span class="glyphicon glyphicon-arrow-down"></span>
          {{ trans('finance.write_off') }}
        </button>
      </div>
    </div>
    <advertiser-balance :advertisers="advertisers"></advertiser-balance>
    <deposit-modal :advertisers="advertisers"></deposit-modal>
    <write-off-modal :advertisers="advertisers"></write-off-modal>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_DEPOSITS = {!! json_encode(Lang::get('deposits')) !!};
  </script>
  <script src="/admin/deposit/build.js?{{ Config::get('app.version') }}"></script>
@endsection