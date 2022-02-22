@extends('publisher::app', [
'page_preloader'=> true,
'title' => trans('api.index_title'),
'no_page_header' => true,
])

@section('title'){{ trans('api.index_title') }} - {{ trans('app.name') }}@endsection

@section('content')
  @include('publisher::api.parts.gen_api_key')
@endsection

@section('scripts')
  <script>
      LANG_API = {!! json_encode(Lang::get('api')) !!};
  </script>
  <script src="/publisher/api/build.js?{{ Config::get('app.version') }}"></script>
@endsection