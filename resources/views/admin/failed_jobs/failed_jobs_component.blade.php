<script type="text/x-template" id="failed_jobs_tpl">
  <div class="row">
    <div class="col-xs-12">
      <button v-if="failed_jobs.length" @click="retryAll" class="btn btn-danger btn-sm m-b ladda-button" id="retry-all"
      data-style="zoom-out">
        Восстановить все
      </button>
      <div class="table-responsive" id="failed_jobs_table_wrap">
        <table class="table table-hover table-striped table-bordered text-left" id="failed_jobs_table">
          <thead>
          <tr>
            <th class="w85">{{ trans('messages.date') }}</th>
            <th class="w105">{{ trans('messages.queue') }}</th>
            <th>{{ trans('messages.task') }}</th>
            <th class="w105">{{ trans('messages.lead') }}</th>
            <th class="w105">{{ trans('messages.exception') }}</th>
            <th class="w105"></th>
            <th class="w100"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(failed_job, index) in failed_jobs">
            <td>@{{ failed_job.failed_at | datehour }}</td>
            <td>@{{ failed_job.queue }}</td>
            <td>
              <small class="internal-link" data-toggle="collapse" :data-target="'#job' + failed_job.id"
                     aria-expanded="false" aria-controls="collapseExample"
              >@{{ parseJobName(failed_job.payload) }}</small>
              <div :id="'job' + failed_job.id" class="collapse">@{{ failed_job.payload }}</div>
            </td>
            <td>@{{ parseLeadId(failed_job.payload) }}</td>
            <td>
              <small class="internal-link" data-toggle="collapse" :data-target="'#exception' + failed_job.id"
                     aria-expanded="false" aria-controls="collapseExample"
              >@{{ parseException(failed_job.exception) }}</small>
              <div :id="'exception' + failed_job.id" class="collapse">@{{ failed_job.exception }}</div>
            </td>
            <td>
              <button @click="retryJob(failed_job.id, index)" :id="'restore-' + failed_job.id"
                      class="btn btn-xs btn-success ladda-button" data-style="zoom-out">
                  <span class="ladda-label">{{ trans('messages.restore') }}</span>
              </button>
            </td>
            <td>
              <button @click="deleteFailedJob(failed_job.id, index)" :id="'delete-' + failed_job.id"
                      class="btn btn-xs btn-danger ladda-button" data-style="zoom-out">
                  <span class="ladda-label">{{ trans('messages.delete_btn') }}</span>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <h5 v-show="failed_jobs.length < 1" class="text-center m-t">{{ trans('failed_jobs.list_not_found') }}</h5>
      </div>
    </div>
  </div>
</script>