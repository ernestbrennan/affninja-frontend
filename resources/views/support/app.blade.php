<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{ $title }} - {{ trans('app.name') }}</title>
  <link rel="shortcut icon" type="image/ico" href="/images/favicon.png?{{ Config::get('app.version') }}"/>
  <link rel="stylesheet" href="/dist/vendor.css?{{ Config::get('app.version') }}"/>
  <link rel="stylesheet" href="/dist/style.css?{{ Config::get('app.version') }}"/>
</head>
<body class="hide-sidebar boxed">

@include('parts.adblock_message')
@include('parts.preloaders')
@include('support::parts.header')
@include('parts.ie7-message')

<div class="body">
  <div class="container">
    <div class="row">
      <div class="boxed-wrapper">
        <div id="wrapper">
          @include('parts.main_content')
        </div>
      </div>
    </div>
  </div>
</div>

@include('parts.global_variables')

<script src="/dist/vendor.js?{{ Config::get('app.version') }}"></script>
<script src="/support/dist/app.js?{{ Config::get('app.version') }}"></script>
<script src="/dist/components.js?{{ Config::get('app.version') }}"></script>
<script src="/support/navbar.js?{{ Config::get('app.version') }}"></script>
<script src="/common/ad.js?{{ Config::get('app.version') }}"></script>

@include('parts.date_constants')

@yield('scripts')

@include('parts.socket-io')
@include('parts.adblock_script')

</body>
</html>