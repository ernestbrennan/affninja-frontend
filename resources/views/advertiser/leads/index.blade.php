@extends('advertiser::app', [
'title' => trans('navbar.leads'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  <div>
    @include('advertiser::leads.parts.filters')
  </div>

  <div id="leads">
    @include('advertiser::leads.parts.by_lead')
  </div>

@endsection

@section('scripts')
  <script>
      LANG_ORDERS = {!! json_encode(Lang::get('orders')) !!};
      LANG_STATISTICS = {!!  json_encode(Lang::get('statistics')) !!};
      LANG_LEADS = {!!  json_encode(Lang::get('leads')) !!};
  </script>
  <script src="/affiliate/leads/build.js?{{ Config::get('app.version') }}"></script>
@endsection