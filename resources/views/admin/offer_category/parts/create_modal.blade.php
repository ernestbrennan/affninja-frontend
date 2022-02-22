<div class="modal fade" tabindex="-1" role="dialog" id="create_offer_category_modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">{{ trans('offer_categories.modal_create_header') }}</h4>
			</div>
			<div class="modal-body">

				<form id="create_offer_category_form">

					<div class="form-group">
						<label class="control-label" for="title">{{ trans('offer_categories.title') }}:</label>
						<input type="text" name="title" id="title" class="form-control">
					</div>
					<div class="form-group">
						<label class="control-label" for="title_en">{{ trans('offer_categories.title_en') }}:</label>
						<input type="text" name="title_en" id="title_en" class="form-control">
					</div>

				</form>

				<button type="button" class="btn btn-success btn-sm ladda-button m-t" data-style="zoom-out"
				        id="create_offer_category_submit">
					<span class="ladda-label">{{ trans('messages.create_submit') }}</span>
				</button>
			</div>
		</div>
	</div>
</div>