@extends('publisher::app', ['page_preloader'=> true, 'title' => trans('postbackout.title'), 'no_page_header' => true,])

@section('title')
    {{ trans('postbackout.title') }} - {{ trans('app.name') }}
@endsection

@section('content')
    @include('publisher::postbackout.parts.filters')

    <div class="table-responsive m-t-sm">
        <div class="data_table_wrap" id="postbackout_logs_table_wrap"></div>
    </div>
@endsection

@section('scripts')
    <script>
        LANG_POSTBACKOUT = {!! json_encode(Lang::get('postbackout')) !!};
    </script>
    <script src="/publisher/postbackout/build.js?{{ Config::get('app.version') }}"></script>
@endsection