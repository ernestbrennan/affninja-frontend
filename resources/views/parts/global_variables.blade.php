<script>
    MAIN_DOMAIN = '{{ env('MAIN_DOMAIN') }}';
    APP_NAME = '{{ trans('app.name') }}';
    API_HOST = '{{ env('API_HOST') }}';
    CDN_HOST = '{{ env('CDN_HOST') }}';
    APP_ENV = '{{ env('APP_ENV') }}';
    SENTRY_DSN = '{{ env('SENTRY_DSN_PUBLIC') }}';
    SOCKET_URL = '{{ env('SOCKET_URL') }}';

    LANG_GLOBAL_APP = {!! json_encode(Lang::get('app')) !!};
    LANG_MESSAGES = {!! json_encode(Lang::get('messages')) !!};
    LANG_NAVBAR = {!! json_encode(Lang::get('navbar')) !!};
    LANG_TARGET_GEO = {!! json_encode(Lang::get('target_geo')) !!};
    LANG_FILTERS = {!! json_encode(Lang::get('filters')) !!};

    app_locale_code = '{!! App::getLocale() !!}';

    App = {
        user: {!! json_encode(Session::get('user')) !!}
    };
</script>