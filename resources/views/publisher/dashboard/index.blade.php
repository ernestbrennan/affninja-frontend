@extends('publisher::app', [
    'page_preloader'=> true,
    'title' => trans('dashboard.index_title'),
    'no_page_header' => true,
])

@section('title'){{ trans('dashboard.index_title') }} - {{ trans('app.name') }}@endsection

@section('content')
  @include('publisher::dashboard.parts.chart')
  @include('publisher::dashboard.parts.payments')

  <div class="dashboard" id="dashboard">
    <div class="row">
      <div class="col-xs-12">
        <chart></chart>
      </div>
    </div>
    <div class="row m-t">
      <div class="col-xs-6">
        @include('publisher::dashboard.parts.offers')
      </div>
      <div class="col-xs-6">
        @include('publisher::dashboard.parts.news_list')
      </div>
    </div>
    <div class="row m-t">
      <div class="col-xs-12">
        <payment-list></payment-list>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_DASHBOARD = {!! json_encode(Lang::get('dashboard')) !!};
      LANG_PAYMENTS = {!! json_encode(Lang::get('payments')) !!};
      LANG_NEWS = {!! json_encode(Lang::get('news')) !!};
      LANG_OFFERS = {!! json_encode(Lang::get('offers')) !!};
      LANG_STATISTICS = {!! json_encode(Lang::get('statistics')) !!};
      LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
      LANG_POSTBACKOUT = {!! json_encode(Lang::get('postbackout')) !!};

      {{-- @todo Remove me, im ill --}}
          DATATABLE_LENGTH = 5;
  </script>
  <script src="/publisher/dashboard/build.js?{{ Config::get('app.version') }}"></script>
@endsection