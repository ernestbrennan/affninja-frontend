@extends('admin::app', [
'title' => trans('navbar.advertisers_leads'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  <div id="advertisers">
    <table v-if="advertisers.length" class="table table-bordered table-striped table-condensed">
      <thead>
      <tr>
        <th class="w40">ID</th>
        <th class="w75">Hash</th>
        <th>@{{ LANG_MESSAGES.email }}</th>
        <th>@{{ LANG_LEADS.unpaid_count }}</th>
        <th class="w95"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="advertiser in advertisers">
        <td>@{{ advertiser.id }}</td>
        <td>@{{ advertiser.hash }}</td>
        <td>
          <gravatar :email="advertiser.email"></gravatar>
          <enter-in-user-cabinet :email="advertiser.email" :hash="advertiser.hash"></enter-in-user-cabinet>
        </td>
        <td class="text-right">@{{ advertiser.profile.unpaid_leads_count }}</td>
        <td>
          <a :href="'/finance/' + advertiser.hash + '/completion'" target="_blank"
          ><i class="fa fa-external-link"></i>{{ trans('leads.complete_leads') }}</a>
        </td>
      </tr>
      </tbody>
    </table>
    <empty-list-message v-if="!advertisers.length" :message="LANG_LEADS.empty_сomp_advertisers"></empty-list-message>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_LEADS = {!! json_encode(Lang::get('leads')) !!};
      LANG_USERS = {!! json_encode(Lang::get('users')) !!};
  </script>
  <script src="/admin/leads/completion/advertisers/build.js?{{ Config::get('app.version') }}"></script>
@endsection