@extends('admin::app', [
'title' => trans('payments.index_title'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  <div class="hpanel">
    @include('admin::payments.templates.pending')
    @include('admin::payments.templates.accepted')
    @include('admin::payments.templates.paid')
    @include('admin::payments.templates.cancelled')

    <div class="tab-content" id="payments">
      @include('admin::payments.parts.tabs')
      @include('admin::payments.parts.filters')
      @include('admin::payments.parts.create_payment_modal')

      <create-payment-modal ref="create-payment-modal"></create-payment-modal>
      <alert-modal></alert-modal>

      <div class="tab-pane" style="display: block;">
        <div class="payments tab-pane" id="tab_pending_wrap" role="tabpanel">
          <pending :not_confirm="not_confirm" :user_groups="user_groups" ref="pending"></pending>
        </div>
        <div class="payments" id="tab_accepted_wrap" role="tabpanel">
          <accepted :not_confirm="not_confirm" ref="accepted"></accepted>
        </div>
        <div class="payments" id="tab_paid_wrap" role="tabpanel">
          <paid ref="paid"></paid>
        </div>
        <div class="payments" id="tab_cancelled_wrap" role="tabpanel">
          <cancelled ref="cancelled"></cancelled>
        </div>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_PAYMENTS = {!! json_encode(Lang::get('payments')) !!};
      LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
      LANG_NAVBAR = {!! json_encode(Lang::get('navbar')) !!};
  </script>
  <script src="/admin/finance/build.js?{{ Config::get('app.version') }}"></script>
@endsection