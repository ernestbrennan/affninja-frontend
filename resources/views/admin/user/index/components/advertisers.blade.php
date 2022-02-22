<script type="text/x-template" id="advertisers-component-template">
	<div>
		<advertiser-settings-modal></advertiser-settings-modal>
    <div class="filters_panel_white">
      <button @click="openCreateModal" class="btn btn-outline btn-success btn-sm pull-right" type="button"
      >{{ trans('messages.create_btn') }}</button>
    </div>
		<div id="advertisers_list_table">
			<div v-show="!loading && Object.size(summary_info)" class="hpanel panel-collapse">
				<div class="panel-heading hbuilt">
					<div class="panel-tools">
						<a class="showhide" id="toggle_summary_panel"><i class="fa fa-chevron-down"></i></a>
					</div>
					<span class="panel-title">{{ trans('statistics.lead_summary_data') }}</span>
				</div>
				<div class="panel-body" style="display: none">
					<div class="row">
						<div class="col-lg-7 col-md-8 col-sm-12 col-xs-12">
							<div class="row m-b">
								<div class="col-lg-1 col-md-1 col-sm-2 col-xs-2"></div>
								<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
									<currency-sign-by-id :currency_id="CURRENCY_RUB_ID"></currency-sign-by-id>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
									<currency-sign-by-id :currency_id="CURRENCY_USD_ID"></currency-sign-by-id>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
									<currency-sign-by-id :currency_id="CURRENCY_EUR_ID"></currency-sign-by-id>
								</div>
							</div>
							<div class="row m-b">
								<div class="col-lg-1 col-md-1 col-sm-2 col-xs-2">@{{ LANG_MESSAGES.total }}</div>
								<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
									<money :sum="summary_info.balance_rub"></money>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
									<money :sum="summary_info.balance_usd"></money>
								</div>
								<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
									<money :sum="summary_info.balance_eur"></money>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<table v-show="advertisers.length" class="table table-bordered table-striped table-condensed">
				<thead>
				<tr>
					<th class="w40">@{{ LANG_MESSAGES.id }}</th>
					<th class="w75">@{{ LANG_MESSAGES.hash }}</th>
					<th>@{{ LANG_MESSAGES.title }}</th>
					<th>@{{ LANG_MESSAGES.email }}</th>
					<th>@{{ LANG_MESSAGES.skype }}</th>
					<th class="w35"></th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="advertiser in advertisers">
					<td>@{{ advertiser.id }}</td>
					<td>@{{ advertiser.hash }}</td>
					<td>@{{ advertiser.profile.info }}</td>
					<td>
						<button v-if="advertiser.status === 'locked'"
								@click.stop="unlockAdvertiser(advertiser, $event)"
								class="btn btn-locked btn-danger ladda-button" data-style="zoom-out"
								data-toggle="tooltip"
								:data-title="LANG_USERS.unblock_btn">
							<i class="fa fa-lock"></i>
						</button>
						<gravatar v-else :email="advertiser.email"></gravatar>
						<enter-in-user-cabinet :email="advertiser.email" :hash="advertiser.hash"></enter-in-user-cabinet>
					</td>
					<td class="status">
						@{{ advertiser.profile.skype }}
					</td>
					<td>
						<div class="btn-group">
							<button type="button" class="btn btn-default dropdown-toggle btn-sm" data-toggle="dropdown"
									aria-expanded="false">
								<i class="fa fa-cog"></i> <span class="caret"></span>
							</button>
							<ul class="dropdown-menu dropdown-right">
								<li @click.prevent="openAdvertiserEditModal(advertiser)">
									<a href="#">{{ trans('messages.edit') }}</a>
								</li>
								<li @click.prevent="changeUserPassword(advertiser.id)">
									<a href="#">{{ trans('users.set_new_password') }}</a>
								</li>
								<li @click.prevent="openAdvertiserAccountModal(advertiser.id, advertiser.email)">
									<a href="#">{{ trans('users.accounts') }}</a>
								</li>
							</ul>
						</div>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="scroll-preloader-container"></div>
	</div>
</script>
