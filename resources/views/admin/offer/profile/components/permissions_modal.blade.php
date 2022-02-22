<script type="text/x-template" id="permissions-modal-tpl">
  <div class="modal fade" tabindex="-1" role="dialog" ref="permissions-modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span>&times;</span>
          </button>
          <h4 class="modal-title">{{ trans('offers.access_rights') }} <b>@{{ title }}</b></h4>
        </div>
        <div class="modal-body">
          <div class="form-group filters_panel_white">
            <div v-show="tab === 'groups'" class="select" style="width: 275px;">
              <select-item v-model="selected_item"
                           :options="groups"
                           track_by="id"
                           label="title"
                           :search="true"
                           :close_on_select="false"
                           :allow_empty="true"
                           :placeholder="SEARCH_MSG"
              ></select-item>
            </div>
            <div v-show="tab === 'publishers'" class="select" style="width: 275px;">
              <select-item v-model="selected_item"
                           :options="publishers"
                           track_by="hash"
                           label="email"
                           :close_on_select="false"
                           :search="true"
                           :loading="loading"
                           :hide_selected="true"
                           :allow_empty="true"
                           @search-change="onSearch"
                           :placeholder="SEARCH_MSG"
                           :clear_on_select="true"
              ></select-item>
            </div>
            <btn-group-item v-show="!only_publishers" :active="tab" @updated="onTabUpdated" class="pull-right m-b">
              <button class="btn btn-sm btn-success btn-outline" data-id="groups" type="button"
              >{{ trans('user_groups.groups') }}</button>
              <button class="btn btn-sm btn-success btn-outline" data-id="publishers" type="button"
              >{{ trans('navbar.users') }}</button>
            </btn-group-item>
            <button v-show="only_publishers" class="btn btn-sm btn-success btn-outline pull-right m-b active" data-id="publishers" type="button"
            >{{ trans('navbar.users') }}</button>
          </div>

          <div v-show="tab === 'groups' && !only_publishers" class="form-group m-b-none">
            <table v-show="selected_groups.length" class="table table-striped table-hover">
              <thead>
              <tr>
                <th></th>
                <th class="w50" style="max-width: 50px;"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="group in selected_groups" :key="group.id">
                <td class="text-left">
                  @{{ group.title }}
                </td>
                <td class="text-center">
                  <button @click="deleteGroup(group)"
                          :id="'group-' + _uid + group.id"
                          class="btn btn-xs btn-outline btn-danger ladda-button"
                          data-style="zoom-out" data-spinner-color="#666">
                    <span class="ladda-label">{{ trans('messages.delete') }}</span>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
            <empty-list-message v-if="!selected_groups.length" message="{{trans('filters.nothing_found')}}"
            ></empty-list-message>
          </div>

          <div v-show="tab === 'publishers'" class="form-group">
            <table v-show="selected_publishers.length" class="table table-striped table-hover">
              <thead>
              <tr>
                <th></th>
                <th class="w50" style="max-width: 50px;"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="publisher in selected_publishers" :key="publisher.hash">
                <td class="text-left">
                  @{{ publisher.email }}
                </td>
                <td class="text-center">
                  <button @click="deletePublisher(publisher)"
                          :id="'publisher-' + _uid + publisher.hash"
                          class="btn btn-xs btn-outline btn-danger ladda-button"
                          data-style="zoom-out" data-spinner-color="#666">
                    <span class="ladda-label">{{ trans('messages.delete') }}</span>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
            <empty-list-message v-if="!selected_publishers.length" message="{{trans('filters.nothing_found')}}"
            ></empty-list-message>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>