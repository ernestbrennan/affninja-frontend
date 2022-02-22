@extends('support::app', [
'title' => trans('publishers.index_title'),
'page_preloader' => true
])

@section('content')

    @include('support::user.index.publisher_edit_modal')

    <div id="users">
        <publisher-edit-modal></publisher-edit-modal>

        <div class="table-responsive" id="publishers_list_table">
            <table v-show="publishers.length" class="table table-bordered table-striped table-condensed">
                <thead>
                <tr>
                    <th class="w70">@{{ LANG_MESSAGES.hash }}</th>
                    <th>@{{ LANG_MESSAGES.email }}</th>
                    <th colspan="3">@{{ LANG_MESSAGES.balance }}</th>
                    <th class="w85">@{{ LANG_MESSAGES.phone }}</th>
                    <th class="w85">@{{ LANG_USERS.settings_telegram }}</th>
                    <th class="w85">@{{ LANG_MESSAGES.skype }}</th>
                    <th class="w30"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="publisher in publishers">
                    <td>@{{ publisher.hash }}</td>
                    <td class="nowrap">
                        <gravatar :email="publisher.email"></gravatar>
                        <enter-in-user-cabinet :email="publisher.email" :hash="publisher.hash"></enter-in-user-cabinet>
                    </td>
                    <td class="text-right nowrap w40">
                        <money :sum="+publisher.profile.balance_rub + +publisher.profile.hold_rub"
                               :currency_id="CURRENCY_RUB_ID"></money>
                    </td>
                    <td class="text-right nowrap w40">
                        <money :sum="+publisher.profile.balance_usd + +publisher.profile.hold_usd"
                               :currency_id="CURRENCY_USD_ID"></money>
                    </td>
                    <td class="text-right nowrap w40">
                        <money :sum="+publisher.profile.balance_eur + +publisher.profile.hold_eur"
                               :currency_id="CURRENCY_EUR_ID"></money>
                    </td>
                    <td>@{{ publisher.profile.phone }}</td>
                    <td>@{{ publisher.profile.telegram }}</td>
                    <td>@{{ publisher.profile.skype }}</td>
                    <td>
                        <div class="display-flex-rigth-center">
                            <span v-if="publisher.status === 'locked'"
                                  class="badge badge-sm badge-danger badge-btn m-r-xs"
                                  data-toggle="tooltip" :title="LANG_USERS.status_blocked">
                                <i class="fa fa-lock"></i>
                            </span>
                            <button @click="openPublisherEditModal(publisher)"
                                    class="btn btn-xs btn-warning pull-right"
                                    data-toggle="tooltip" :title="LANG_MESSAGES.edit">
                                <i class="fa fa-pencil"></i>
                            </button>
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
@endsection

@section('scripts')
    <script>
        LANG_USERS = {!! json_encode(Lang::get('users')) !!};
        LANG_USER_GROUPS = {!! json_encode(Lang::get('publisher_groups')) !!};
        LANG_FINANCE = {!! json_encode(Lang::get('finance')) !!};
    </script>
    <script src="/support/users/index/build.js?{{ Config::get('app.version') }}"></script>
@endsection