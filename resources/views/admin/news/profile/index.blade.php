@php
  $title = \count($news) ? trans('news.edit') :  trans('news.create')
@endphp

@extends('admin::app', [
'page_preloader'=> true,
'title' => $title,
'no_page_header' => true,
])

@section('content')
  @include('admin::news.profile.preview_modal')

  {{-- Vue root --}}
  <div class="m-t" id="profile">
    <preview-modal></preview-modal>

    <div>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label class="control-label" for="news_title">{{ trans('news.news_title') }}:</label>
            <input v-model="news.title" id="news_title" class="form-control">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 m-t">
          <div class="form-group">
            <label class="control-label" for="offer_title">
              {{ trans('messages.offer') }}:
            </label>
            <offer-search v-model="selected_offer"></offer-search>
          </div>
        </div>

        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 m-t">
          <div class="form-group">
            <label class="control-label" for="offer_title">
              {{ trans('messages.type') }}:
            </label>
            <select-item v-model="selected_type" :options="types"></select-item>
          </div>
        </div>

        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6 m-t">
          <div class="form-group">
            <label for="news_published_at">{{ trans('news.published_at') }}:</label>
            <datetime-picker v-model="news.published_at"></datetime-picker>
          </div>
        </div>
      </div>

      <div class="row m-t-lg">
        <div class="col-xs-12">
          <div class="form-group">
            <text-editor v-model="news.body"></text-editor>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 m-t">
          <div class="form-group">
            <div class="form-group">
              <button v-if="NEWS_INFO === null" @click="createNews" :disabled="!can_send_form"
                      class="btn btn-success btn-sm ladda-button"
                      id="create-news-submit" type="button" data-style="zoom-out">
                <span class="ladda-label">{{ trans('messages.create') }}</span>
              </button>
              <button v-if="NEWS_INFO !== null" @click="editNews" :disabled="!can_send_form"
                      class="btn btn-success btn-sm ladda-button"
                      id="edit-news-submit" type="button" data-style="zoom-out">
                <span class="ladda-label">{{ trans('messages.save') }}</span>
              </button>
              <button @click="showPreview" class="btn btn-success btn-outline btn-sm ladda-button pull-right"
                      type="button" data-style="zoom-out">
                <span class="ladda-label">{{ trans('news.news_preview') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_NEWS = {!! json_encode(Lang::get('news')) !!};
      NEWS_INFO = {!! json_encode($news === null ? null : $news['response']) !!};
      OFFER_INFO = {!! json_encode($offer_info ?? []) !!};
  </script>
  <script src="/admin/news/profile/build.js?{{ Config::get('app.version') }}"></script>
@endsection