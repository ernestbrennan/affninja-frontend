@extends('admin::app', [
'title' => trans('navbar.leads'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
    @include('admin::leads.parts.new_lead_modal')
    @include('admin::leads.parts.by_leads')

    <div id="leads">
        @include('admin::leads.parts.filters')

        <div class="data_table_wrap" id="leads_table_wrap">
            <div id="vue_stat_tpl_wrap">
                <by-leads :currency_id="currency_id" ref="by_leads"
                ></by-leads>
                <div id="scroll-preloader-container"></div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        LANG_STATISTICS = {!! json_encode(Lang::get('statistics')) !!};
        LANG_LEADS = {!! json_encode(Lang::get('leads')) !!};
        LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
        STAT_SETTINGS = {!! $stat_settings['response']['data'] ?? '{}' !!};
    </script>
    <script src="/admin/leads/build.js?{{ Config::get('app.version') }}"></script>
@endsection