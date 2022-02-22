@extends('publisher::app', [
'page_preloader'=> true,
'title'=> trans('flows.index_title'),
'no_page_header' => true,
])

@section('title'){{ trans('flows.index_title') }} - {{ trans('app.name') }}@endsection

@section('content')
  @include('publisher::flow.index.components.filters')
  <div id="flows">
    @include('publisher::flow.index.components.create_modal')
    @include('publisher::flow.index.components.list')
    @include('publisher::flow.index.components.clone_modal')
    <link-modal ref="link_modal"></link-modal>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_FLOWS = {!! json_encode(Lang::get('flows')) !!};
      LANG_DOMAINS = {!! json_encode(Lang::get('domains')) !!};
  </script>
  <script src="/publisher/flow/build.js?{{ Config::get('app.version') }}"></script>
@endsection