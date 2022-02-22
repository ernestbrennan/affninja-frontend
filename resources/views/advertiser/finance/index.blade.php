@extends('advertiser::app', [
'title' => trans('finance.index_title'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  @include('advertiser::finance.parts.filters')
  @include('advertiser::finance.parts.summary_info')
  @include('advertiser::finance.parts.transactions_list')

  <div class="tab-content" id="finance">
    <filters></filters>
    <summary-info></summary-info>
    <transaction-list></transaction-list>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
      LANG_STATISTICS = {!! json_encode(Lang::get('statistics')) !!};
  </script>
  <script src="/affiliate/finance/build.js?{{ Config::get('app.version') }}"></script>
@endsection