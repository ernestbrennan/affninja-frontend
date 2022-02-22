@extends('admin::app', [
'title' => trans('comebacker_audio.list_title'),
'page_preloader' => true,
])

@section('content')
  @include('admin::comebacker_audio.comebacker-audio-component')

  <div id="comebacker_audio_list">
    <comebacker-audio :comebacker_audio_list="comebacker_audio_list"
                      :locales="locales"
                      ref="comebacker_audio"
    ></comebacker-audio>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_COMEBACKER_AUDIO = {!! json_encode(Lang::get('comebacker_audio')) !!};
  </script>
  <script src="/admin/comebacker_audio/build.js?{{ Config::get('app.version') }}"></script>
  <script>
      vm.comebacker_audio_list = {!! json_encode($comebacker_audio_list['response']) !!};
      vm.locales = {!! json_encode($locales['response']) !!};
  </script>
@endsection