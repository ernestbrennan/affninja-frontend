<div role="tabpanel" class="tab-pane" id="postback_tab_wrap">
	<div class="panel-body">
		<div class="row">
			<div class="col-xs-12">
				<button type="button" class="btn btn-sm btn-success" id="open_create_postback_modal">
					<i class="fa fa-plus" aria-hidden="true"></i>
					{{ trans('messages.create_btn') }}
				</button>
			</div>
		</div>
		<div class="row m-t" @if(count($postbacks['response']) < 1) style="display:none;"@endif>
			<div class="col-xs-12">
				<div id="postbacks">

					@include('advertiser::user.parts.postbacks_list')

				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" tabindex="-1" role="dialog" id="create_postback_modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="font-light">{{ trans('postbacks.create_postback') }}</h4>
			</div>
			<div class="modal-body">

				@include('advertiser::user.parts.create_postback_form')

			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->