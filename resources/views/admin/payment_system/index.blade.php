@extends('admin::app', [
'title' => trans('payment_systems.index_title'),
'page_preloader' => true,
'no_page_header' => true,
])

@section('content')
  <div class="table-responsive min-height90" id="payment_systems">
    <multiselect @edited="onPublisherPrivacyUpdated" ref="multiselect"><span slot="noResult">{{ trans('filters.nothing_found') }}</span></multiselect>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>{{ trans('messages.payment_system') }}</th>
        <th>{{ trans('messages.currency') }}</th>
        <th>{{ trans('finance.fixed_comission_short') }}</th>
        <th>{{ trans('finance.percentage_comission_short') }}</th>
        <th>{{ trans('payment_systems.min_payout') }}</th>
        <th class="w60">{{ trans('messages.status') }}</th>
        <th class="w40"></th>
        <th class="w40"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="payment_system in payment_systems">
        <td class="text-left">
          <span class="break-all internal-link" @click="openEditModal(payment_system)">
            @{{ payment_system.title }}
          </span>
        </td>
        <td class="text-center"><currency-code-by-id :currency_id="payment_system.currency_id"></currency-code-by-id></td>
        <td class="text-center">@{{ payment_system.fixed_comission }}</td>
        <td class="text-center">@{{ payment_system.percentage_comission }}</td>
        <td class="text-center">@{{ payment_system.min_payout }}</td>
        <td class="text-left">
          <div v-if="payment_system.status === 'active'">
            <span class="label label-success">{{ trans('messages.is_public') }}</span>
          </div>
          <div v-if="payment_system.status === 'stopped'">
            <span class="label label-danger">
              {{ trans('messages.is_private') }} (@{{ payment_system.publishers ? payment_system.publishers.length : 0 }})
            </span>
          </div>
        </td>
        <td class="text-center">
          <button v-if="payment_system.status == 'stopped'"
                  @click="openPublisherPrivacyModal(payment_system)"
                  class="btn btn-outline btn-default btn-xs"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-title="{{ trans('users.user_permissions') }}">
            <i class="fa fa-eye"></i>
          </button>
        </td>
        <td class="text-center">
          <button @click="openEditModal(payment_system)"
                  class="btn btn-outline btn-warning btn-xs"
                  data-toggle="tooltip"
                  data-placement="left"
                  data-title="{{ trans('messages.edit') }}">
            <i class="fa fa-pencil"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    @include('admin::payment_system.parts.edit_modal')
  </div>
@endsection

@section('scripts')
  <script>
      LANG_PAYMENT_SYSTEMS = {!! json_encode(Lang::get('payment_systems')) !!};
  </script>
  <script src="/admin/payment_system/build.js?{{ Config::get('app.version') }}"></script>
@endsection