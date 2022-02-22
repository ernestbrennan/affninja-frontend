<script type="text/x-template" id="user-group-list-tpl">
    <div class="table">
        <table v-if="user_groups.length" class="table table-hover table-striped table-bordered table-condensed">
            <thead>
            <tr>
                <th style="width: 100px;">@{{LANG_MESSAGES.group }}</th>
                <th style="width: 50px;">@{{LANG_USER_GROUPS.color }}</th>
                <th>@{{LANG_MESSAGES.description }}</th>
                <th style="width: 80px;">@{{LANG_MESSAGES.users }}</th>
                <th style="width: 30px;"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="group in user_groups">
                <td class="text-left">
                    @{{ group.title }}
                </td>
                <td class="text-left">
                    <span class="badge badge-sm" :style="{background: '#' + group.color}">@{{ group.color }}</span>
                </td>
                <td>
                    @{{ group.description }}
                </td>
                <td>
                    <a :href="'/users/user_groups/' + group.id + '/permissions'" target="_blank">
                        @{{ group.users.length }}
                    </a>
                </td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"
                                aria-expanded="false">
                            <i class="fa fa-cog"></i> <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu pull-right">
                            <li>
                                <a @click.prevent="openEditGroupModal(group)">
                                    {{ trans('messages.edit') }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <empty-list-message v-if="!user_groups.length" :message="LANG_USER_GROUPS.group_not_found"
        ></empty-list-message>
    </div>
</script>