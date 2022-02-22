@extends('publisher::app', [
'page_preloader'=> true,
'title' => trans('domains.domain_pages') . ' ' . $domain['domain']
])

@section('title')
  {{ trans('domains.domain_pages') }} {{ $domain['domain'] }}
@endsection

@section('content')
  <div id="paths">
    @include('publisher::domain.paths.settings_modal')

    <div class="row">
      <div class="col-xs-12 m-b">
        <button @click="openSettingsModal('create')"
                :disabled="!flows.length"
                class="btn btn-sm btn-success">
          @{{ lang_domains.create_domain_page }}
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12" id="paths-list">
        <empty-list-message v-if="!paths.length" :message="lang_domains.pages_missing"></empty-list-message>
        <table v-if="paths.length" class="table table-bordered table-hover table-stripped table-condensed">
          <thead>
          <tr>
            <th>
              @{{ lang_messages.page }}
            </th>
            <th>URL</th>
            <th>
              @{{ lang_messages.flow }}
            </th>
            <th class="w75">
              @{{ lang_messages.status }}
            </th>
            <th class="w25"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(path, index) in paths">
            <td>
              @{{ path.path }}
            </td>
            <td>
              <a :href="domain_info.host + path.path" target="_blank"
              >@{{ domain_info.host }}@{{ path.path }}</a>
            </td>
            <td>
              <a :href="'/tools/flows/' + path.flow.hash" target="_blank">@{{ path.flow.title }}</a>
            </td>
            <td>
              <div v-if="path.status === 'moneypage'" class="label label-success text-capitalize"
              >{{ trans('domains.path_active_status') }}</div>
              <div v-else-if="path.status === 'moneypage_for'" class="label label-warning text-capitalize"
              >{{ trans('domains.path_active_for_status') }}</div>
              <div v-else-if="path.status === 'safepage'" class="label label-danger text-capitalize"
              >{{ trans('domains.path_block_all_status') }}</div>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown"
                        aria-expanded="false">
                  <i class="fa fa-cog"></i> <span class="caret"></span>
                </button>
                <ul class="dropdown-menu pull-right">
                  <li>
                    <a @click.prevent="openSettingsModal('edit', path)" href="#">@{{ lang_messages.edit }}</a>
                  </li>
                  <li class="divider"></li>
                  <li>
                    <a @click.prevent="removePath(path)" href="#">@{{ lang_messages.delete }}</a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
@endsection

@section('scripts')
  <script>
      LANG_DOMAINS = {!! json_encode(Lang::get('domains')) !!};
      LANG_FLOWS = {!! json_encode(Lang::get('flows')) !!};

      DOMAIN_INFO = {!! json_encode($domain) !!};
  </script>
  <script src="/publisher/domain/paths/build.js?{{ Config::get('app.version') }}"></script>
@endsection