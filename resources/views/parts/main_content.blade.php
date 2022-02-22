@if(!isset($no_page_header))
  <h3 class="page-title">{{ $title }}</h3>
@else
  @yield('page_header')
@endif
<div class="content @if(isset($no_page_header)) p-t @endif">
  @yield('content')
</div>