<script type="x/template" id="flow_groups_tpl">
    <div id="flow_groups">
        <div class="row">
            <div class="col-lg-6 col-md-8 col-sm-12 col-xs-12">
                <label for="glow_group_hash">{{ trans('messages.group') }}:</label>
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                        <multiselect
                                v-if="flow_groups.length"
                                :value="selected_flow_group"
                                :options="flow_groups"
                                track-by="hash"
                                label="title"
                                :searchable="true"
                                :close-on-select="true"
                                :show-labels="false"
                                placeholder=""
                                :allow-empty="false"
                                @input="updateSelected"
                        ><span slot="noResult">{{ trans('filters.nothing_found') }}</span></multiselect>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8 p-l-none">
                        <div class="btn-group">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
                                    aria-expanded="false">
                                <i class="fa fa-cog"></i> <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu pull-right">
                                <li>
                                    <a @click.prevent="openSettingsModal('create')">
                                        {{ trans('messages.create') }}
                                    </a>
                                </li>
                                <li :class="[!selected_flow_group.hash ? 'disabled' : '']">
                                    <a @click.prevent="openSettingsModal('edit')">
                                        {{ trans('messages.edit') }}
                                    </a>
                                </li>
                                <li class="divider"></li>
                                <li :class="[!selected_flow_group.hash ? 'disabled' : '']">
                                    <a @click.prevent="deleteCurrentFlowGroup">
                                        {{ trans('messages.delete') }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{--Settings modal--}}
        <div class="modal fade" tabindex="-1" role="dialog" id="settings_modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span>&times;</span>
                        </button>
                        <h4 v-if="action === 'create'" class="modal-title">{{ trans('flow_groups.create_header') }}</h4>
                        <h4 v-if="action === 'edit'" class="modal-title">{{ trans('flow_groups.edit_header') }}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="title">{{ trans('messages.title') }}:</label>
                            <input v-model.lazy="group_title" class="form-control" id="title" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-if="action === 'create'" @click="createFlowGroup"
                                class="btn btn-success btn-sm ladda-button"
                                data-style="zoom-out" id="create_flow_group_submit" type="button">

                            <span class="ladda-group">{{ trans('messages.create_submit') }}</span>
                        </button>
                        <button v-if="action === 'edit'" @click="editFlowGroup"
                                class="btn btn-success btn-sm ladda-button"
                                id="edit_flow_group_submit" data-style="zoom-out" type="button">
                            <span class="ladda-group">{{ trans('messages.edit') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>