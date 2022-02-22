<div class="table">
  <table v-if="templates.length" class="table table-condensed text-left table-light-td editable-table"
         id="templates_table">
    <thead>
    <tr>
      <th style="min-width: 300px;">{{ trans('messages.title') }}</th>
      <th style="min-width: 300px;">{{ trans('messages.title_en') }}</th>
      <th class="w50"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="template in templates" :key="template.id">
      <td>
        <input v-model="template.title" class="form-control">
      </td>
      <td>
        <input v-model="template.translations[0].title" class="form-control">
      </td>
      <td>
        <button @click="editTemplate(template)" :id="'edit-template-submit-' + template.id"
                class="btn btn-success btn-outline pull-right btn-xs ladda-button"
                data-spinner-color="#666" data-style="zoom-out" type="button">
          {{ trans('messages.save') }}
        </button>
      </td>
    </tr>
    </tbody>
  </table>
  <empty-list-message v-if="!templates.length" :message="LANG_TEMPLATES.on_get_list_not_found"
  ></empty-list-message>
</div>
