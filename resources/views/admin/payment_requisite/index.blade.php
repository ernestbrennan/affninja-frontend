@extends('admin::app', [
'title' => trans('payment_requisites.index_title')
])

@section('content')
  <div class="row">
    <div class="col-xs-12">
      @if(count($payment_requisites['response']) < 1)

        <h5 class="text-center">{{ trans('payment_requisites.is_empty') }}</h5>
      @else
        <table class="table table-hover table-striped table-bordered">
          <thead>
          <th style="width: 150px;">{{ trans('payment_requisites.details_th') }}</th>
          <th>{{ trans('payment_requisites.user_th') }}</th>
          <th style="width: 52px;">{{ trans('payment_requisites.primary_th') }}</th>
          <th style="width: 131px;">{{ trans('payment_requisites.verified_th') }}</th>
          <th style="width: 100px;"></th>
          </thead>
          <tbody>
          @foreach($payment_requisites['response'] AS $payment_requisite)
            <tr class="payment_requisite" data-payment_requisite_hash="{{ $payment_requisite['hash'] }}">
              <td>
                <img class="payment_system_flag_img"
                     src="{{ env('CDN_HOST') }}{{ $payment_requisite['payment_system']['thumb_path'] }}"
                     alt="{{ $payment_requisite['payment_system']['title'] }}"> {{ $payment_requisite['details'] }}
              </td>
              <td>
                {{ $payment_requisite['user']['email'] }}
                <br>
                <small>{{ getNameUserRole($payment_requisite['user']['role']) }}</small>
              </td>
              <td>
                <div class="checkbox checkbox-success">
                  <input class="set_primary_payment_requisite_submit" type="checkbox"
                         name="is_primary"
                         data-payment_requisite_hash="{{ $payment_requisite['hash'] }}"
                         data-payment_requisite_currency_id="{{ $payment_requisite['currency_id'] }}"
                         data-payment_requisite_user_id="{{ $payment_requisite['user_id'] }}"
                         id="is_primary-{{ $payment_requisite['hash'] }}"
                         @if($payment_requisite['is_primary'] == 1) checked disabled @endif>
                  <label for="is_primary-{{ $payment_requisite['hash'] }}"></label>
                </div>
              </td>
              <td>
                @if($payment_requisite['is_verified'] == 0)
                  <button class="btn btn-sm btn-default verify_payment_requisite_submit ladda-button"
                          data-style="zoom-out"
                          data-payment_requisite_hash="{{ $payment_requisite['hash'] }}"
                          id="verify_payment_requisite_submit-{{ $payment_requisite['hash'] }}"
                  ><span class="ladda-label">
												<i class="fa fa-check" aria-hidden="true"></i> {{ trans('messages.verify_it') }}
										</span>
                  </button>
                @else
                  <span class="green badge">{{ trans('messages.is_verified') }}</span>
                @endif
              </td>
              <td>
                <button class="btn btn-sm btn-danger delete_payment_requisite_submit ladda-button"
                        data-payment_requisite_hash="{{ $payment_requisite['hash'] }}"
                        data-style="zoom-out"
                        id="delete_payment_requisite_submit-{{ $payment_requisite['hash'] }}"
                ><span class="ladda-label">
											<i class="fa fa-trash" aria-hidden="true"></i> {{ trans('messages.delete_it') }}
										</span>
                </button>
              </td>
            </tr>
          @endforeach
          </tbody>
        </table>
      @endif
    </div>
  </div>
@endsection

@section('scripts')
  <script src="/admin/payment_requisite/index.js?{{ Config::get('app.version') }}"></script>
  <script>
      LANG = {!! json_encode(Lang::get('payment_requisites')) !!};
  </script>
@endsection