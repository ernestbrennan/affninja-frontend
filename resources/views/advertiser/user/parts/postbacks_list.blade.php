@if(count($postbacks['response']) > 0)
	@foreach($postbacks['response'] AS $key=> $postback)
		<div class="hpanel m-t">
			<div class="panel-heading hbuilt">
				<div class="panel-tools">
					<a class="closebox delete_postback_submit"
					   title="{{ trans('postbacks.remove_postback') }}"
					   data-postback_hash="{{ $postback['hash'] }}"
					   data-prevent_default="true">
						<i class="fa fa-times"></i>
					</a>
				</div>
				{{ trans('messages.id') }}: {{ $postback['hash'] }}
			</div>
			<div class="panel-body">
				<form id="edit_postback_form-{{ $postback['hash'] }}"
				      class="edit_postback_form" data-postback_hash="{{ $postback['hash'] }}">

					<div class="form-group">
						<input type="url" class="form-control"
						       name="url"
						       value="{{ $postback['url'] }}"
						       placeholder="{{ trans('postbacks.url') }}"
						       data-original_value="{{ $postback['url'] }}">
					</div>

					<div class="form-group">
						<div class="checkbox checkbox-inline checkbox-success">
							<input type="checkbox"
							       name="on_lead_add"
							       id="on_lead_add-{{ $postback['hash'] }}"
							       @if($postback['on_lead_add']) checked @endif
							       data-original_value="{{ $postback['on_lead_add'] }}">
							<label for="on_lead_add-{{ $postback['hash'] }}">
								{{ trans('postbacks.on_lead_add') }}
							</label>
						</div>
						<div class="checkbox checkbox-inline checkbox-success">
							<input type="checkbox"
							       name="on_lead_approve"
							       id="on_lead_approve-{{ $postback['hash'] }}"
							       @if($postback['on_lead_approve']) checked @endif
							       data-original_value="{{ $postback['on_lead_approve'] }}">
							<label for="on_lead_approve-{{ $postback['hash'] }}">
								{{ trans('postbacks.on_lead_approve') }}
							</label>
						</div>

						<div class="checkbox checkbox-inline checkbox-success">
							<input type="checkbox"
							       name="on_lead_cancel"
							       id="on_lead_cancel-{{ $postback['hash'] }}"
							       @if($postback['on_lead_cancel']) checked @endif
							       data-original_value="{{ $postback['on_lead_cancel'] }}">
							<label for="on_lead_cancel-{{ $postback['hash'] }}">
								{{ trans('postbacks.on_lead_cancel') }}
							</label>
						</div>

					</div>

					<div class="form-group">
						<input type="hidden" name="postback_hash"
						       value="{{ $postback['hash'] }}">
						<button type="button"
						        class="btn btn-success edit_postback_submit btn-sm ladda-button"
						        data-postback_hash="{{ $postback['hash'] }}"
						        id="edit_postback_submit-{{ $postback['hash'] }}"
						        data-style="zoom-out">
							<i class="fa fa-pencil" aria-hidden="true"></i>
							<span class="ladda-label">{{ trans('messages.save') }}</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	@endforeach
@endif