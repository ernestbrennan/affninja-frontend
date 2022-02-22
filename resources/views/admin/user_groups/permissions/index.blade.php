@extends('admin::app', [
'title' => trans('user_groups.group_members') . ' / ' . $group['title'],
'page_preloader' => true
])

@section('content')
    <div id="permissions">
        <div v-if="!group.is_default" class="row">
            <div class="col-xs-12">
                <div class="filters_panel_white">
                    <div class="filter multiselect-search" style="width: 275px;">
                        <select-item v-model="selected_item"
                                     :options="users"
                                     track_by="hash"
                                     label="email"
                                     :close_on_select="false"
                                     :search="true"
                                     :loading="loading"
                                     :hide_selected="true"
                                     :allow_empty="true"
                                     :clear_on_select="false"
                                     v-on:search-change="onSearch"
                                     :placeholder="LANG_MESSAGES.search">
                        </select-item>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <table v-show="selected_users.length" class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>{{ trans('messages.email') }}</th>
                        <th v-if="!group.is_default" class="w50"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="user in selected_users" :key="user.hash">
                        <td class="text-left">
                            @{{ user.email }}
                        </td>
                        <td v-if="!group.is_default" class="text-center">
                            <button @click="deleteUser(user)"
                                    class="btn btn-xs btn-outline btn-danger ladda-button" id="create_path"
                                    data-style="zoom-out">
                                <span class="ladda-label">{{ trans('messages.delete') }}</span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <empty-list-message v-if="!selected_users.length"
                                    message="{{trans('filters.nothing_found')}}"></empty-list-message>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        LANG_USER_GROUPS = {!! json_encode(Lang::get('user_groups')) !!};
    </script>
    <script src="/admin/user_groups/permissions/build.js?{{ Config::get('app.version') }}"></script>
    <script>
        vm.group = {!! json_encode($group) !!};
        vm.selected_users = {!! json_encode($group['users']) !!};
    </script>
@endsection