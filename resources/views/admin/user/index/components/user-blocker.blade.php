<script type="text/x-template" id="user-blocker-component-template">
	<div class="modal fade" tabindex="-1" role="dialog" id="user_blocker_modal">
		<div class="modal-dialog">
			<div class="modal-content">
				<form id="user_blocker_form">

					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">{{ trans('users.block_user_modal_title')  }} <b>@{{ user_info.email }}</b></h4>
					</div>

					<div class="modal-body">
						<form>
							<div class="form-group">
								<label class="control-label" for="reason_for_blocking">
									{{ trans('users.reason_for_blocking') }}:
								</label>
								<textarea v-model="user_info.reason_for_blocking" id="reason_for_blocking" class="form-control"
								          style="height:140px;"></textarea>
							</div>
						</form>
					</div>

					<div class="modal-footer">
						<button @click="blockUser('#user_blocker_submit')" class="btn btn-sm btn-danger ladda-button"
						        id="user_blocker_submit" data-style="zoom-out">
							<span class="ladda-label"><i class="fa fa-lock"></i> {{ trans('users.block_btn') }}</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</script>
