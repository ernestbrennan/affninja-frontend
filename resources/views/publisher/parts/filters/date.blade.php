<div class="filter">
	<button type="button" class="btn btn-sm btn-select" id="filter_date_button"
	        data-filter="date">
	</button>

	<div class="filter_wrap filter_date_wrap" id="filter_date_wrap">
		<div class="filter_date_from_wrap">
			<div id="filter_date_from" data-date-format="dd.mm.yyy"></div>
		</div>
		<div class="filter_date_to_wrap">
			<div id="filter_date_to" data-date-format="dd.mm.yyyy"></div>
		</div>
		<div class="filter_date_set_wrap">
			<ul class="set_date_filter">
				<li>
					<a href="#" data-date_from="{{ date('d.m.Y', time()) }}"
					   data-date_to="{{ date('d.m.Y', time()) }}">{{ trans('filters.today') }}
					</a>
				</li>
				<li>
					<a href="#" data-date_from="{{ date('d.m.Y', strtotime('yesterday')) }}"
					   data-date_to="{{ date('d.m.Y', strtotime('yesterday')) }}">{{ trans('filters.yesterday') }}
					</a>
				</li>
				<li>
					<a href="#" data-date_from="{{ date('d.m.Y', strtotime('-7 days')) }}"
					   data-date_to="{{ date('d.m.Y', time()) }}">{{ trans('filters.last_7_days') }}
					</a>
				</li>
				<li id="this_week_link_wrap">
					<a href="#" data-date_from="{{ date('d.m.Y', strtotime('this week')) }}"
					   data-date_to="{{ date('d.m.Y', time()) }}">{{ trans('filters.current_week') }}
					</a>
				</li>
				<li id="prev_week_link_wrap">
					<a href="#" data-date_from="{{ date('d.m.Y', strtotime('last week')) }}"
					   data-date_to="{{ date('d.m.Y', strtotime('last sunday')) }}">{{ trans('filters.prev_week') }}
					</a>
				</li>
				<li id="this_month_link_wrap">
					<a href="#" data-date_from="{{ date('01.m.Y', strtotime('yesterday')) }}"
					   data-date_to="{{ date('d.m.Y', time()) }}">{{ trans('filters.this_month') }}
					</a>
				</li>
				<li id="prev_month_link_wrap">
					<a href="#"
					   data-date_from="{{ date('d.m.Y', strtotime('first day of previous month')) }}"
					   data-date_to="{{ date('d.m.Y', strtotime('last day of previous month')) }}">{{ trans('filters.prev_month') }}
					</a>
				</li>
			</ul>
			<button type="button" class="btn btn-info btn-sm filter_submit filter_date_submit"
			        id="filter_date_submit"
			        data-filter="date">{{ trans('filters.apply') }}
			</button>
			<img class="filter_button_close" src="/images/close.svg" height="19"
			     width="19">
		</div>
	</div>
</div>