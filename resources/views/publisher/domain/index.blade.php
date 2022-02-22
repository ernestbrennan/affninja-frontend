@extends('publisher::app', [
'page_preloader'=> true,
'title' => trans('domains.title'),
'no_page_header' => true,
])

@section('title')
  {{ trans('domains.title') }} -  {{ trans('messages.title') }}
@endsection

@section('content')
  <div id="domains">
    <button @click="flows.length ? openCreateDomainModal() : null"
            :disabled="!flows.length"
            class="btn btn-success btn-sm"
    >{{ trans('domains.create') }}</button>
    @include('publisher::domain.parts.domain_list')
    @include('publisher::domain.parts.settings_modal')
    @include('publisher::domain.parts.replace_modal')
    <link-modal ref="link_modal"></link-modal>
  </div>

@endsection

@section('scripts')
  <script>
      LANG_DOMAINS = {!! json_encode(Lang::get('domains')) !!};
      LANG_FLOWS = {!! json_encode(Lang::get('flows')) !!};
  </script>
  <script src="/publisher/domain/build.js?{{ Config::get('app.version') }}"></script>
@endsection