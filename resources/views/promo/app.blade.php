<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="google-site-verification" content="DfKZ0t3bgwKBtDBzyZCK-6X43xZg_syvDElYHDPly8I"/>
  <title>{{ trans('app.name') }}</title>
  <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png?{{ Config::get('app.version') }}">
  <link rel="stylesheet" href="/promo/dist/vendor.css?{{ Config::get('app.version') }}"/>
  <link rel="stylesheet" href="/dist/style.css?{{ Config::get('app.version') }}"/>
  <link rel="stylesheet" href="/promo/dist/app.css?{{ Config::get('app.version') }}"/>
  <script src='https://www.google.com/recaptcha/api.js'></script>
  @yield('styles')
</head>
<body class="landing-page">

@include('promo::parts.page_preloader')

<div id="app">
  @yield('navbar')
  @yield('content')
</div>

<script>
    app_locale_code = '{!! App::getLocale() !!}';
    SENTRY_DSN = '{{ env('SENTRY_DSN_PUBLIC') }}';
    LANG_MESSAGES = {!! json_encode(Lang::get('messages')) !!};
    LANG_FILTERS = {!! json_encode(Lang::get('filters')) !!};
    LANG_FORM = {!! json_encode(Lang::get('form')) !!};
    MAIN_DOMAIN = '{{ env('MAIN_DOMAIN') }}';
    API_HOST = '{{ env('API_HOST') }}';
</script>
<script src="/dist/vendor.js?{{ Config::get('app.version') }}"></script>
<script src="/promo/app.js?{{ Config::get('app.version') }}"></script>
<script src="/dist/components.js?{{ Config::get('app.version') }}"></script>

@yield('scripts')

</body>
</html>