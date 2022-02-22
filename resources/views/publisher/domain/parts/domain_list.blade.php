<div id="domains-list-wrap">
  <div v-if="domains.length" class="row m-t">
    <div class="container">
      <table class="table table-bordered table-hover table-stripped table-condensed">
        <thead>
        <tr>
          <th class="">@{{ LANG_DOMAINS.domain }}</th>
          <th class="">@{{ LANG_MESSAGES.flow }}</th>
          <template v-if="is_cloaking_enabled">
            <th class="">@{{ LANG_DOMAINS.donor }}</th>
            <th class="w95"></th>
            <th class="w95"></th>
          </template>
          <th class="w25"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="domain in domains">
          <td>
            <a :href="'http://' + domain.domain" target="_blank">@{{ domain.domain }}</a>
          </td>
          <td>
            <a v-if="domain.flow" :href="'/tools/flows/' + domain.flow.hash">@{{ domain.flow.title }}</a>
          </td>
          <template v-if="is_cloaking_enabled">

            <td v-if="domain.is_new_cloaking">
              <a :href="domain.donor_url" target="_blank">@{{ domain.donor_url }}</a>
            </td>
            <td v-else class="text-center">-</td>

            <td v-if="domain.is_new_cloaking">
              <a :href="'/tools/domains/' + domain.hash + '/paths'">
                @{{ LANG_DOMAINS.pages }} (@{{ domain.paths.length }})
              </a>
            </td>
            <td v-else class="text-center">-</td>

            <td v-if="domain.is_new_cloaking">
              <span @click="openReplacementsModal(domain)"
                    :class="['internal-link', pending_refresh_replacements ? 'disabled' : '']"
              >@{{ LANG_MESSAGES.replacements  }} (@{{  domain.replacements.length }})</span>
            </td>
            <td v-else class="text-center">-</td>

          </template>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown"
                      aria-expanded="false">
                <i class="fa fa-cog"></i> <span class="caret"></span>
              </button>
              <ul class="dropdown-menu pull-right">
                <li>
                  <a @click.prevent="openEditDomainModal(domain)" href="#">
                    @{{ LANG_MESSAGES.edit }}
                  </a>
                </li>
                <li>
                  <a @click.prevent="openLinkModal(domain)" href="#">@{{ LANG_DOMAINS.get_flow_link }}</a>
                </li>
                <li v-if="domain.is_new_cloaking">
                  <a @click.prevent="clearCache(domain)" href="#">@{{ LANG_MESSAGES.clear_cache }}</a>
                </li>
                <li class="divider"></li>
                <li>
                  <a @click.prevent="deleteDomain(domain.hash)" href="#">@{{ LANG_MESSAGES.delete }}</a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <empty-list-message v-if="!domains.length && flows.length"
                      :message="LANG_DOMAINS.empty_list_domains"
  ></empty-list-message>
  <empty-list-message v-if="!flows.length"
                      :message="LANG_DOMAINS.no_flows_message"
  ></empty-list-message>
</div>