<script type="text/x-template" id="flow-postback-list-tpl">
  <div class="form-group">
    <div class="hpanel panel-collapse">
        @include('publisher::postback.postback_settings_modal')

        <div class="panel-heading hbuilt">
            <div class="panel-tools">
                <a class="showhide"><i class="fa fa-chevron-down"></i></a>
            </div>
            <span class="panel-title">{{ trans('flows.postbacks') }}</span>
        </div>
        <div class="panel-body" style="display: none">
            <div class="row">
                <div class="col-xs-12">
                    <button @click.prevent="openPostbackCreateModal"
                            class="btn btn-sm btn-outline btn-success pull-right"
                    >{{ trans('messages.create_postback') }}</button>
                </div>
            </div>
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
                                <button @click.prevent="openPostbackEditModal(postback)"
                                        class="btn btn-outline btn-warning btn-xs"
                                        data-toggle="tooltip"
                                        data-title="{{ trans('postbacks.edit_postback') }}">
                                    <i class="fa fa-pencil"></i>
                                </button>
                            </td>
                            <td class="w25">
                                <button @click.prevent="deletePostback(postback)"
                                        class="btn btn-outline btn-danger btn-xs"
                                        data-toggle="tooltip"
                                        data-title="{{ trans('postbacks.remove_postback') }}">
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
  </div>
</script>