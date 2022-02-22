@if(isset($page_preloader) && $page_preloader)
  @include('parts.page_preloader')
@endif
@include('parts.ajax_preloader')