@extends('admin::app', [
'page_preloader'=> true,
'title' => trans('news.index_title'),
'no_page_header' => true,
])

@section('content')
  <div id="list">
    <div class="filters_panel_white">
      @include('admin::news.list.filters')

      <a href="/tools/news/create" class="btn btn-success btn-outline btn-sm ladda-button btn-filter pull-right"
         data-spinner-color="#666" data-style="zoom-out" type="button"
      >{{ trans('messages.add_btn') }}</a>
    </div>

    <div class="row">
      <div class="col-xs-12" id="list-wrap" v-content-preloader="pagination.loading && pagination.page === 1">
        @include('admin::news.list.list')
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_NEWS = {!! json_encode(Lang::get('news')) !!};
  </script>
  <script src="/admin/news/list/build.js?{{ Config::get('app.version') }}"></script>
@endsection