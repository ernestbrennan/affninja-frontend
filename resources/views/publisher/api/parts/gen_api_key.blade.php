<div class="row">
	<div class="col-lg-12">
		<div class="well">

			<h4 class="m-t-none">{{ trans('api.api_key') }}</h4>

			<div id="api_key_wrap">
				@if(Session::get('user')['profile']['api_key'] != '')

					<div class="form-group">
						<div class="row">
							<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
								<div class="input-group">
									<input type="text" class="form-control" id="api_key" readonly
									       value="{{ Session::get('user')['profile']['api_key']  }}">
									<span class="input-group-btn">
									<button type="button" class="btn btn-default copy_to_clipboard" style="padding: 6px 12px;"
									        data-clipboard-demo="" data-clipboard-target="#api_key"
									        data-title="{{ trans('messages.copy_to_clipboard') }}"
									        data-toggle="tooltip" >
											<img class="clippy" src="/images/clippy.svg" width="13"
											     alt="{{ trans('messages.copy_to_clipboard') }}">
										</button>
                  </span>
								</div>
							</div>
						</div>

						<div class="row m-t">
							<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
								<button class="btn btn-success" id="regenerate_api_key">
									<i class="fa fa-refresh" aria-hidden="true"></i> {{  trans('api.regenerate_api_key') }}
								</button>
							</div>
						</div>
					</div>

				@else

					<button class="btn btn-sm btn-success" id="gen_api_key">
						<i class="fa fa-plus" aria-hidden="true"></i> {{  trans('api.generate_api_key') }}
					</button>

				@endif
			</div>
		</div>
	</div>
</div>