<ul class="nav nav-tabs" role="tablist">
  <li role="presentation">
    <a href="#" data-toggle="tab" data-tab="pending">
      <i class="fa fa-clock-o grey_t"></i> {{ trans('payments.pending_tab') }}
    </a>
  </li>
  <li role="presentation">
    <a data-toggle="tab" href="#tab_accepted_wrap" id="accepted_tab" data-tab="accepted">
      <i class="fa fa-shopping-cart light_green_t"></i> {{ trans('payments.accepted_tab') }}
    </a>
  </li>
  <li role="presentation">
    <a data-toggle="tab" href="#tab_paid_wrap" id="paid_tab" data-tab="paid">
      <i class="fa fa-check green_t"></i> {{ trans('payments.paid_tab') }}
    </a>
  </li>
  <li role="presentation">
    <a data-toggle="tab" href="#tab_cancelled_wrap" id="cancelled_tab" data-tab="cancelled">
      <i class="fa fa-ban red_t"></i> {{ trans('payments.cancelled_tab') }}
    </a>
  </li>
</ul>