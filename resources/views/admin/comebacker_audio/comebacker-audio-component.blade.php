<script type="text/x-template" id="comebacker-audio-component-template">
	<div>

		{{-- ComebackerAudios settings modal --}}
		<div v-if="comebacker_audio_info" id="comebacker_audio_settings_modal" class="modal fade" role="dialog"
		     tabindex="-1">
			<div class="modal-dialog ">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
						<h4 class="modal-title" v-show="action == 'create'">{{ trans('comebacker_audio.create_header') }}</h4>
						<h4 class="modal-title" v-show="action == 'edit'">{{ trans('comebacker_audio.edit_header') }}</h4>
					</div>
					<div class="modal-body">
						<form id="comebacker_audio_settings_form" enctype="multipart/form-data">

							<div class="form-group">
								<label id="comebacker_audio_title" class="control-label"
								       for="comebacker_audio_title">{{ trans('messages.title') }}:
								</label>
								<input v-model.lazy="comebacker_audio_info.title"
								       id="comebacker_audio_title" type="text" class="form-control">
							</div>

							<div class="form-group">
								<label class="control-label" for="comabecker_audio_locale_id">{{ trans('messages.locale') }}:</label>
								<select v-model="comebacker_audio_info.locale_id"
								        class="form-control" name="locale_id" id="comabecker_audio_locale_id">
									<option v-for="(locale, index) in locales" :value="locale.id">
										@{{ locale.title }}
									</option>
								</select>
							</div>

							<div class="form-group">
								<label class="control-label" for="comebacker_audio_audio">{{ trans('messages.audio') }}:</label>
								<input v-on:change="uploadAudio" type="file" id="comebacker_audio_audio" class="form-control">
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button v-show="action == 'create'" v-on:click="createComebackerAudio"
						        id="create_comebacker_audio_submit"
						        type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
							<span class="ladda-label">{{ trans('messages.create_submit') }}</span>
						</button>
						<button v-show="action == 'edit'" v-on:click="editComebackerAudio"
						        id="edit_comebacker_audio_submit"
						        type="button" class="btn btn-success btn-sm ladda-button" data-style="zoom-out">
							<span class="ladda-label">{{ trans('messages.edit_submit') }}</span>
						</button>
					</div>
				</div>
			</div>
		</div>

		{{-- Listing of comebacker audio --}}
    <div class="filters_panel_white">
      <button v-on:click="openComebackerAudioCreateModal" type="button" class="btn btn-success btn-outline btn-sm pull-right">
        {{ trans('messages.create_btn') }}
      </button>
    </div>
		<div class="row m-t">
			<div class="co12-lg-8 col-md-12 col-sm-12-col-xs-12">
				<div class="table-responsive">
					<h4 v-if="comebacker_audio_list.length < 1" class="text-center">
						{{ trans('comebacker_audio.list_not_fount') }}
					</h4>
					<table v-if="comebacker_audio_list.length > 0" class="table">
						<thead>
						<tr>
							<th>#</th>
							<th>{{ trans('messages.title') }}</th>
							<th class="w130">{{ trans('messages.locale') }}</th>
							<th class="w200">{{ trans('messages.audio') }}</th>
							<th class="w120">{{ trans('messages.created') }}</th>
							<th class="w125"></th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(comebacker_audio, index) in comebacker_audio_list">
							<td>@{{ comebacker_audio.id }}</td>
							<td>@{{ comebacker_audio.title }}</td>
							<td>
								<img :src="'{{ env('CDN_HOST') }}' + comebacker_audio.locale.thumb_path"
								     :alt="comebacker_audio.locale.title" class="flag">
								@{{ comebacker_audio.locale.title }}
							</td>
							<td>
								<audio :src="comebacker_audio.audio_path | audioSrc" controls></audio>
							</td>
							<td>@{{ comebacker_audio.created_at | datehour }}</td>
							<td>
								<button v-on:click="openComebackerAudioEditModal(index)" class="btn btn-xs btn-warning">
									<i class="fa fa-pencil"></i> {{ trans('messages.edit_submit') }}
								</button>
								<button v-on:click="deleteComebackerAudio(comebacker_audio.id, index)"
								        :id="'comebacker_audio_delete_submit-' + comebacker_audio.id"
								        class="btn btn-xs btn-danger ladda-button" data-style="zoom-out">
									<i class="fa fa-trash" aria-hidden="true"></i>
									<span class="ladda-label"> {{ trans('messages.delete_it') }}</span>
								</button>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</script>