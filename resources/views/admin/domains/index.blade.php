@extends('admin::app', [
'title' => trans('domains.domains'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  @include('admin::domains.domains_component')

  <div id="domains">
    <domains></domains>
  </div>

@endsection

@section('scripts')
  <script>
      LANG_Domains = {!! json_encode(Lang::get('domains')) !!};
  </script>
  <script src="/admin/domains/build.js?{{ Config::get('app.version') }}"></script>
@endsection