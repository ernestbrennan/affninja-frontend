<form id="create_postback_form">
	<div class="form-group">
		<input type="text" class="form-control" name="url" placeholder="{{ trans('messages.url') }}">
	</div>
	<div class="form-group">
		<div class="tokens_wrap clearfix">

			<h5 class="m-b-sm">{{ trans('postbacks.available_url_tokens') }}</h5>

			@include('advertiser::user.parts.postback_tokens')

		</div>
	</div>
	<div class="form-group">
		<div class="checkbox checkbox-inline checkbox-success">
			<input type="checkbox" name="on_lead_add" id="on_lead_add">
			<label for="on_lead_add">{{ trans('postbacks.on_lead_add') }}</label>
		</div>

		<div class="checkbox checkbox-inline checkbox-success">
			<input type="checkbox" name="on_lead_approve"
			       id="on_lead_approve">
			<label for="on_lead_approve">{{ trans('postbacks.on_lead_approve') }}</label>
		</div>

		<div class="checkbox checkbox-inline checkbox-success">
			<input type="checkbox" name="on_lead_cancel" id="on_lead_cancel">
			<label for="on_lead_cancel">{{ trans('postbacks.on_lead_cancel') }}</label>
		</div>

	</div>
	<div class="form-group">
		<input type="hidden" name="flow_hash" value="0">
		<button type="button" class="btn btn-success btn-sm ladda-button" id="create_postback_submit" data-style="zoom-out">
			<i class="fa fa-plus" aria-hidden="true"></i>
			<span class="ladda-label">{{ trans('messages.create_submit') }}</span>
		</button>
	</div>
</form>