<div class="modal fade" tabindex="-1" role="dialog" id="edit_offer_category_modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span>&times;</span>
				</button>
				<h4 class="modal-title">{{ trans('offer_categories.modal_edit_header') }}</h4>
			</div>
			<div class="modal-body">

				<form id="edit_offer_category_form">
					<input type="hidden" name="offer_category_id" id="offer_category_id"
					       value="{{ $offer_category['id'] }}">
					<div class="form-group">
						<label class="control-label" for="title">{{ trans('offer_categories.title') }}:</label>
						<input name="title" id="title" class="form-control"
						       value="{{ $offer_category['title'] }}">
					</div>
					<div class="form-group">
						<label class="control-label" for="title_en">{{ trans('offer_categories.title_en') }}:</label>
						<input name="title_en" id="title_en" class="form-control"
							   value="{{ $title_en }}">
					</div>

				</form>

				<button type="button" class="btn btn-success btn-sm ladda-button m-t" data-style="zoom-out"
				        id="edit_offer_category_submit">
					<span class="ladda-label">{{ trans('messages.edit_submit') }}</span>
				</button>
			</div>
		</div>
	</div>
</div>