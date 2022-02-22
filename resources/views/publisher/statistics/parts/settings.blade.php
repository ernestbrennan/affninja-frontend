<div class="hl_box hidden hl_box_stat_settings_wrap" id="stat_settings_wrap">
	<div class="hl_box_wrap">
		<span class="hl_box_title">{{ trans('messages.settings') }}</span>
		<div class="hl_box_body">
			<div class="form-group hidden">
				<div class="checkbox checkbox-inline checkbox-success">
					<input type="checkbox" id="is_mark_roi_rows" name="is_mark_roi_rows">
					<label class="fw_normal" for="is_mark_roi_rows">{{ trans('statistics.is_mark_roi_rows') }}</label>
				</div>
			</div>
			<div class="form-group">
				<button class="btn btn-sm btn-info"
				        id="stat_output_columns_btn">{{ trans('statistics.output_columns') }}</button>
			</div>

		</div>
		<a href="#" class="hl_box_close"></a>
	</div>
</div>