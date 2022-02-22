<script type="text/x-template" id="global-postback-list-tpl">
    <div role="tabpanel" class="tab-pane" id="postback_tab_wrap">
        @include('publisher::postback.postback_settings_modal')

        <div class="row">
            <div class="col-xs-12">
                <button @click.prevent="openPostbackCreateModal"
                        class="btn btn-sm btn-outline btn-success pull-right">
                    {{ trans('messages.add_btn') }}
                </button>
            </div>
        </div>
        <div id="postback-list-wrap">
            <div v-if="postbacks.length" class="row">
                <div class="col-xs-12">

                    <table class="table table-hover m-t">
                        <tbody>
                        <tr v-for="postback in postbacks">
                            <td>
                                <a :href="postback.url" target="_blank">
                                    @{{ postback.url }}
                                </a>
                            </td>
                            <td class="w25">
                                <div class="btn-group pull-right">
                                    <button type="button" class="btn btn-default btn-sm dropdown-toggle"
                                            data-toggle="dropdown" aria-expanded="false">
                                        <i class="fa fa-cog"></i>
                                        <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li @click="openPostbackEditModal(postback)">
                                            <a href="#">@{{ LANG_MESSAGES.edit }}</a>
                                        </li>
                                        <li class="divider"></li>
                                        <li @click="deletePostback(postback)">
                                            <a href="#">@{{ LANG_MESSAGES.delete }}</a>
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
    </div>
</script>