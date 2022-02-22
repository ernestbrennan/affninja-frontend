@extends('admin::app', [
'title' => trans('templates.page_title'),
'page_preloader' => true,
])

@section('content')

  <div id="templates">
    <div class="row">
      <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <div class="form-group">
          <label for="title" class="control-label">{{ trans('messages.title') }}:</label>
          <input v-model="template.title" class="form-control" id="title">
        </div>
      </div>
    </div>
    <div class="row m-t-sm">
      <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
        <div class="form-group">
          <label for="title_en" class="control-label">{{ trans('messages.title_en') }}:</label>
          <input v-model="template.title_en" class="form-control" id="title_en">
        </div>
      </div>
    </div>
    <div class="row m-t">
      <div class="col-xs-4">
        <div class="form-group">
          <button @click="createTemplate()" :disabled="!can_create_template"
                  class="btn btn-success btn-outline btn-sm ladda-button btn-filter"
                  id="create-template-submit" data-spinner-color="#666" data-style="zoom-out" type="button">
            {{ trans('messages.create') }}
          </button>
        </div>
      </div>
    </div>
    <div class="row m-t">
      <div class="col-xs-12" id="target-templates-wrap">
        @include('admin::target_templates.components.list')
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_TEMPLATES = {!! json_encode(Lang::get('templates')) !!};
  </script>
  <script src="/admin/target_templates/build.js?{{ Config::get('app.version') }}"></script>
@endsection