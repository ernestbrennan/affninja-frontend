<div id="postback-settings-modal-tpl">
    <div class="modal fade" id="postback-settings-modal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <template v-if="action === 'create'">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="font-light">{{ trans('postbacks.creating_postback') }}</h4>
                    </template>

                    <template v-if="action === 'edit'">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="font-light">{{ trans('postbacks.editing_postback') }}</h4>
                    </template>
                </div>

                <div class="modal-body">
                    <div class="form-group">
                        <label for="url">{{ trans('messages.url') }}:</label>
                        <input v-model="postback.url" type="text" class="form-control"
                               placeholder="{{ trans('postbacks.url_placeholder') }}">
                    </div>
                    <div class="form-group">
                        <div class="tokens_wrap clearfix">

                            <h5 class="m-b-sm">{{ trans('postbacks.available_url_tokens') }}:</h5>

                            <div v-for="(value, token) in tokens" @click="setToken(value, token)"
                                 :class="['label', 'label-default', 'label_token', value ? 'checked' : '']">
                                <i class="fa fa-plus"></i>
                                @{{ '{' + token + '}' }}
                            </div>

                        </div>
                    </div>
                    <div class="form-group m-b-none-i">
                        <div class="checkbox checkbox-inline checkbox-success">
                            <input v-model="postback.on_lead_add"
                                   v-bind:true-value="1"
                                   v-bind:false-value="0"
                                   type="checkbox" id="on_lead_add">
                            <label for="on_lead_add">{{ trans('postbacks.on_lead_add') }}</label>
                        </div>
                        <div class="checkbox checkbox-inline checkbox-success">
                            <input v-model="postback.on_lead_approve"
                                   v-bind:true-value="1"
                                   v-bind:false-value="0"
                                   type="checkbox"
                                   id="on_lead_approve">
                            <label for="on_lead_approve">{{ trans('postbacks.on_lead_approve') }}</label>
                        </div>
                        <div class="checkbox checkbox-inline checkbox-success">
                            <input v-model="postback.on_lead_cancel"
                                   v-bind:true-value="1"
                                   v-bind:false-value="0"
                                   type="checkbox" id="on_lead_cancel">
                            <label for="on_lead_cancel">{{ trans('postbacks.on_lead_cancel') }}</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <a class="internal-link" data-toggle="collapse" href="#postback_description"
                           aria-expanded="false"
                           aria-controls="postback_description">
                            {{ trans('postbacks.more') }}
                        </a>
                        <div class="collapse" id="postback_description">
                            <table class="table table-hover table-condensed m-t">
                                <tbody>
                                <tr>
                                    <td>{offer_hash}</td>
                                    <td>{{ trans('postbacks.offer_hash') }}</td>
                                </tr>
                                <tr>
                                    <td>{flow_hash}</td>
                                    <td>{{ trans('postbacks.flow_hash') }}</td>
                                </tr>
                                <tr>
                                    <td>{landing_hash}</td>
                                    <td>{{ trans('postbacks.landing_hash') }}</td>
                                </tr>
                                <tr>
                                    <td>{transit_hash}</td>
                                    <td>{{ trans('postbacks.transit_hash') }}</td>
                                </tr>
                                <tr>
                                    <td>{clickid}</td>
                                    <td>{{ trans('postbacks.clickid') }}</td>
                                </tr>
                                <tr>
                                    <td>{ip}</td>
                                    <td>{{ trans('postbacks.ip') }}</td>
                                </tr>
                                <tr>
                                    <td>{data1...data4}</td>
                                    <td>{{ trans('postbacks.data1-data4') }}</td>
                                </tr>
                                <tr>
                                    <td>{unixtime}</td>
                                    <td>{{ trans('postbacks.unixtime') }}</td>
                                </tr>
                                <tr>
                                    <td>{type}</td>
                                    <td>{{ trans('postbacks.type') }}</td>
                                </tr>
                                <tr>
                                    <td>{currency}</td>
                                    <td>{{ trans('postbacks.currency') }}</td>
                                </tr>
                                <tr>
                                    <td>{payout}</td>
                                    <td>{{ trans('postbacks.payout') }}</td>
                                </tr>
                                <tr>
                                    <td>{payout_usd}</td>
                                    <td>{{ trans('postbacks.payout_usd') }}</td>
                                </tr>
                                <tr>
                                    <td>{lead_hash}</td>
                                    <td>{{ trans('postbacks.lead_hash') }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <template v-if="action === 'create'">
                        <button @click="createPostback" :disabled="!postback_changed"
                                class="btn btn-success btn-sm ladda-button"
                                id="create_postback"
                                data-style="zoom-out">
                            <span class="ladda-label">{{ trans('messages.add_btn') }}</span>
                        </button>
                    </template>
                    <template v-if="action === 'edit'">
                        <button @click="editPostback" :disabled="!postback_changed"
                                class="btn btn-success btn-sm ladda-button"
                                id="edit_postback"
                                data-style="zoom-out">
                            <span class="ladda-label">{{ trans('messages.save') }}</span>
                        </button>
                    </template>
                </div>

            </div>
        </div>
    </div>
</div>