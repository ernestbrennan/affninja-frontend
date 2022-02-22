<div id="change_profile_tab" class="tab-pane @if(empty(app('request')->input('tab'))) active @endif">
	<div class="settings_tab_wrapper" id="change_profile_wrapper">
		<div class="row">
			<div class="col-xs-12">
				<profile-form></profile-form>

				<script type="text/x-template" id="profile-form-tpl">

					<form id="change_profile_form">

						<div class="row">
							<div class="col-lg-5 col-md-6 col-sm-8 col-xs-12">

								<div class="form-group">
									<label class="control-label" for="full_name">
										{{ trans('users.settings_full_name') }}:
									</label>
									<input v-model="full_name" class="form-control" id="full_name">
								</div>

								<div class="form-group">
									<label class="control-label" for="skype">
										{{ trans('messages.skype') }}:
									</label>
									<input v-model="skype" class="form-control" id="skype">
								</div>

								<div class="form-group">
									<label class="control-label" for="telegram">
										{{ trans('users.settings_telegram') }}:
									</label>
									<input v-model="telegram" class="form-control" id="telegram" >
								</div>

								<vue-timezone v-model="timezone"></vue-timezone>

								<div class="form-group">
									<button @click="changeProfile()"
													type="button"
													class="btn btn-sm btn-success ladda-button"
													id="change_profile_submit"
													data-style="zoom-out">
									<span class="ladda-label">
										{{ trans('messages.save') }}
									</span>
									</button>
								</div>
							</div>
						</div>
					</form>
				</script>
			</div>
		</div>
	</div>
</div>