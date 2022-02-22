<script type="text/x-template" id="publishers-component-tpl">
  <div>
    <publisher-edit-modal :user_groups="user_groups"></publisher-edit-modal>
    <publisher-permissions-modal :user_groups="user_groups"></publisher-permissions-modal>
    <vue-datatable v-on:sorting-updated="onDatatableChangeSort" ref="datatable"></vue-datatable>

    <div class="filters_panel_white">
      <form id="filters">
        <user-statuses-filter></user-statuses-filter>
        <user-group-filter :groups="user_groups"></user-group-filter>
        <search-field-filter
                :search_fields="search_fields"
                :search_fields_width="'105px'"
                :allow_empty="false"
        ></search-field-filter>
        <currencies-filter v-show="search_field === 'balance' || search_field === 'hold'"
                           :multiple="false"
                           :fallback_selected_id="3"
                           :show_currency_title="true"
        ></currencies-filter>
        <constraint-filter
                v-show="search_field === 'balance' || search_field === 'hold'"></constraint-filter>
        <apply-filters></apply-filters>
      </form>

      <div class="display-flex pull-right">
        <div v-show="selected_users.length" class="btn-group">
          <button class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"
                  aria-expanded="false">
            @{{ LANG_USER_GROUPS.set_group }}&nbsp;&nbsp;<span class="caret"></span>
          </button>
          <ul class="dropdown-menu pull-right">
            <template v-if="user_groups.length">
              <li v-for="group in user_groups">
                <a @click.prevent="addUsersInGroup(group)"
                ><span class="user_group_point" :style="{backgroundColor: '#' + group.color}"></span
                  >@{{ group.title }}</a>
              </li>
            </template>
            <li v-if="user_groups.length" class="divider"></li>
            <li>
              <a href="/tools/user_groups" target="_blank">@{{ LANG_USER_GROUPS.add_group }}</a>
            </li>
          </ul>
        </div>
        <div>
          <button @click="openPublisherCreateModal" class="btn btn-outline btn-success btn-sm m-l-xs">
            {{ trans('messages.create_btn') }}
          </button>
        </div>
      </div>
    </div>

    <div v-show="!loading && Object.size(summary_info)" class="hpanel panel-collapse">
      <div class="panel-heading hbuilt">
        <div class="panel-tools">
          <a class="showhide" id="toggle_summary_panel"><i class="fa fa-chevron-down"></i></a>
        </div>
        <span class="panel-title">{{ trans('statistics.lead_summary_data') }}</span>
      </div>
      <div class="panel-body" style="display: none">
        <div class="row">
          <div class="col-lg-7 col-md-8 col-sm-12 col-xs-12">
            <div class="row m-b">
              <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"></div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <currency-sign-by-id :currency_id="CURRENCY_RUB_ID"></currency-sign-by-id>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <currency-sign-by-id :currency_id="CURRENCY_USD_ID"></currency-sign-by-id>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <currency-sign-by-id :currency_id="CURRENCY_EUR_ID"></currency-sign-by-id>
              </div>
            </div>
            <div class="row m-b">
              <div class="col-lg-1 col-md-1 col-sm-2 col-xs-2">@{{ LANG_MESSAGES.total }}</div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <money :sum="summary_info.balance_rub"></money>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <money :sum="summary_info.balance_usd"></money>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
                <money :sum="summary_info.balance_eur"></money>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="publishers_list_table">
      <table v-show="publishers.length" class="table table-bordered table-striped table-condensed text-left"
             id="publishers_sort_table">
        <thead>
        <tr>
          <th class="w20" style="min-width: 20px;"></th>
          <th class="w20" style="min-width: 20px;">@{{ LANG_MESSAGES.id }}</th>
          <th class="w70">@{{ LANG_MESSAGES.hash }}</th>
          <th data-column="email">@{{ LANG_MESSAGES.email }}</th>
          <th class="w85">@{{ LANG_MESSAGES.phone }}</th>
          <th data-column="created_at" class="w85">@{{ LANG_USERS.registration_date }}</th>
          <th data-column="balance_rub">
            <currency-sign-by-id :currency_id="CURRENCY_RUB_ID"></currency-sign-by-id>
          </th>
          <th data-column="balance_usd">
            <currency-sign-by-id :currency_id="CURRENCY_USD_ID"></currency-sign-by-id>
          </th>
          <th data-column="balance_eur">
            <currency-sign-by-id :currency_id="CURRENCY_EUR_ID"></currency-sign-by-id>
          </th>
          <th>@{{ LANG_MESSAGES.comment }}</th>
          <th class="w25"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in publishers">
          <td @click="toggleUserSelection(user)" class="checkbox_td pointer">
            <div class="checkbox checkbox-success">
              <input type="checkbox" :checked="_.indexOf(selected_users, user.id) !== -1">
              <label></label>
            </div>
          </td>
          <td @click="toggleUserSelection(user)" class="pointer">@{{ user.id }}</td>
          <td @click="toggleUserSelection(user)" class="pointer">@{{ user.hash }}</td>
          <td class="nowrap">
            <button v-if="user.status === 'locked'"
                    @click.stop="unlockPublisher(user, $event)"
                    class="btn btn-locked btn-danger ladda-button" data-style="zoom-out"
                    data-toggle="tooltip"
                    :data-title="LANG_USERS.unblock_btn">
              <i class="fa fa-lock"></i>
            </button>
            <gravatar v-else :email="user.email"></gravatar>
            <enter-in-user-cabinet :email="user.email" :hash="user.hash"></enter-in-user-cabinet>
            <span v-if="user.group" class="badge badge-sm pull-right"
                  :style="{backgroundColor: '#' + user.group.color}">
			  @{{ user.group.title }}
			</span>
          </td>
          <td>@{{ user.profile.phone }}</td>
          <td>@{{ user.created_at | datehour }}</td>
          <td class="text-right nowrap w40">
            <money :sum="+user.profile.balance_rub + +user.profile.hold_rub"
                   :currency_id="CURRENCY_RUB_ID" :mute_zero="true"></money>
          </td>
          <td class="text-right nowrap w40">
            <money :sum="+user.profile.balance_usd + +user.profile.hold_usd"
                   :currency_id="CURRENCY_USD_ID" :mute_zero="true"></money>
          </td>
          <td class="text-right nowrap w40">
            <money :sum="+user.profile.balance_eur + +user.profile.hold_eur"
                   :currency_id="CURRENCY_EUR_ID" :mute_zero="true"></money>
          </td>
          <td>@{{ user.profile.comment }}</td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown"
                      aria-expanded="false">
                <i class="fa fa-cog"></i> <span class="caret"></span>
              </button>
              <ul class="dropdown-menu dropdown-right">
                <li @click.prevent="openPublisherEditModal(user)"><a href="#">{{ trans('messages.edit') }}</a></li>
                <li @click.prevent="openPublisherPermissionsModal(user)"><a href="#">{{ trans('users.user_permissions')
                }}</a></li>
                <li @click="changeUserPassword(user.id)"
                ><a href="#">{{ trans('users.set_new_password') }}</a></li>
              </ul>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <empty-list-message v-show="!publishers.length && !pagination.active_ajax" :message="LANG_MESSAGES.is_empty"
    ></empty-list-message>
    <div id="scroll-preloader-container"></div>
  </div>
</script>
