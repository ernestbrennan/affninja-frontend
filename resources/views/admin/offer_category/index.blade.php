@extends('admin::app', [
'title' => trans('offer_categories.index_title'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  <div class="filters_panel_white">
    <button class="btn btn-success btn-outline btn-sm pull-right"
            id="create_offer_category_open_modal_btn" type="button">
      {{ trans('messages.create_btn') }}
    </button>
  </div>

  <div class="row">
    @foreach($offer_categories['response'] AS $offer_category)
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 offer_category m-b"
           data-offer_category_id="{{ $offer_category['id'] }}">
        <div class="hpanel">
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-10 col-md-9 col-sm-8 col-xs-8">
                <a href="#" class="edit_offer_category_open_modal_btn break-all"
                   data-offer_category_id="{{ $offer_category['id'] }}"
                >{{ $offer_category['title'] }}</a>
              </div>
              <div class="col-lg-2 col-md-3 col-sm-4 col-xs-4 pull-right text-right">
                <div class="panel-tools">
                  <a class="closebox delete_offer_category_submit"
                     data-prevent_default="true"
                     data-offer_category_id="{{ $offer_category['id'] }}"
                     title="{{ trans('offer_categories.delete_msg') }}">
                    <i class="fa fa-times"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    @endforeach
  </div>
@endsection

@section('scripts')
  <script>
      LANG = {!! json_encode(Lang::get('offer_categories')) !!};
  </script>
  <script src="/admin/offer_category/build.js?{{ Config::get('app.version') }}"></script>
@endsection