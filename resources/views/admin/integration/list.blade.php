@extends('admin::app', [
'title' => trans('integrations.list_title'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')

  @include('admin::integration.components.cc_integrations')

  <div class="hpanel" id="integration_list">
    <cc_integrations ref="cc_integrations"></cc_integrations>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_INTEGRATIONS = {!! json_encode(Lang::get('integrations')) !!};
  </script>
  <script src="/admin/intagration/build.js?{{ Config::get('app.version') }}"></script>
@endsection