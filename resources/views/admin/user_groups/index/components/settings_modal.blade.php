<script type="text/x-template" id="settings-modal-tpl">
    <div class="modal fade" tabindex="-1" role="dialog" id="settings-modal">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 v-if="action === 'create'" class="modal-title">@{{ LANG_USER_GROUPS.create_group }}</h4>
                    <h4 v-if="action === 'edit'" class="modal-title">@{{ LANG_USER_GROUPS.edit_group }}</h4>
                </div>

                <div class="modal-body">
                    <div class="form-group">
                        <label class="control-label" for="title">@{{ LANG_MESSAGES.group }}:</label>
                        <input v-model="group_info.title" id="title" class="form-control">
                    </div>

                    <div class="form-group color-picker">
                        <label class="control-label" for="color">@{{ LANG_USER_GROUPS.color }}:</label>
                        <input v-model="group_info.color" type="color" id="color" class="form-control">
                    </div>

                    <div class="form-group">
                        <label class="control-label" for="description">@{{ LANG_MESSAGES.description }}:</label>
                        <textarea v-model="group_info.description" id="description" class="form-control"
                                  rows="5"></textarea>
                    </div>

                    <button v-if="action === 'create'" @click="createGroup"
                            class="btn btn-success btn-sm ladda-button" data-style="zoom-out"
                            id="create_user_groups_submit">
                        <span class="ladda-label">@{{ LANG_MESSAGES.add_btn }}</span>
                    </button>
                    <button v-if="action === 'edit'" @click="editGroup"
                            class="btn btn-success btn-sm ladda-button" data-style="zoom-out"
                            id="edit_user_groups_submit">
                        <span class="ladda-label">@{{ LANG_MESSAGES.save }}</span>
                    </button>
                </div>

            </div>
        </div>
    </div>
</script>