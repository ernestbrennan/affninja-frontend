@extends('support::app', [
'title' => trans('messages.moderation'),
'page_preloader' => true
])

@section('content')

    <div v-content-preloader="moderations_loading" id="moderation">

        <div  class="table-responsive" id="moderation_list_table">
            <table v-show="moderations.length" class="table table-bordered table-striped table-condensed">
                <thead>
                    <tr>
                        <th class="w120">{{ trans('messages.publisher') }}</th>
                        <th class="w100">{{ trans('messages.flow') }}</th>
                        <th>{{ trans('messages.moderation') }}</th>
                        <th class="w90"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="moderation in moderations">
                        <td>
                            <enter-in-user-cabinet
                                    v-if="moderation.flow.user.role !== 'administrator'"
                                    :email="moderation.flow.user.email"
                                    :hash="moderation.flow.user.hash">
                            </enter-in-user-cabinet>
                        </td>
                        <td>@{{ moderation.flow.title }}</td>
                        <td>
                          <div class="form-group" >
                              <label>{{ trans('flows.transit_page') }}:</label>
                              <pre class="word-break" style="max-height:180px; overflow-y: scroll;">@{{ moderation.attributes_array.TransitCode }}</pre>
                          </div>

                          <div class="form-group">
                              <label>{{ trans('flows.landing_page') }}:</label>
                              <pre class="word-break" style="max-height:180px; overflow-y: scroll;">@{{ moderation.attributes_array.LandingCode }}</pre>
                          </div>

                          <div class="form-group">
                              <label>{{ trans('flows.success_page') }}:</label>
                              <pre class="word-break" style="max-height:180px; overflow-y: scroll;">@{{ moderation.attributes_array.SuccessCode }}</pre>
                          </div>

                          <div class="form-group">
                              <label>{{ trans('flows.correct_page') }}:</label>
                              <pre class="word-break" style="max-height:180px; overflow-y: scroll;">@{{ moderation.attributes_array.CorrectCode }}</pre>
                          </div>
                        </td>
                        <td>
                            <button @click="moderationApply(moderation.hash)"
                                    :id="'moderation-apply-' + moderation.hash "
                                    class="btn btn-xs btn-success ladda-button pull-right"
                                    data-style="zoom-out">
                                <span class="ladda-label"> @{{ LANG_MESSAGES.moderation_apply  }}</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <empty-list-message v-show="!moderations.length" :message="LANG_MESSAGES.data_not_available"
        ></empty-list-message>
    </div>
@endsection

@section('scripts')
    <script>
        LANG_USERS = {!! json_encode(Lang::get('users')) !!};
    </script>
    <script src="/support/moderation/index/build.js?{{ Config::get('app.version') }}"></script>
@endsection