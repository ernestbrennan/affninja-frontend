@extends('publisher::app', [
'page_preloader'=> true,
'title' => trans('cloudflare.index_title')
])

@section('title'){{ trans('cloudflare.index_title') }} - {{ trans('app.name') }}@endsection

@section('content')
  <h4>Отключение IPv6 для домена</h4>
  <div class="row">
    <div class="col-lg-6">
      <form class="form" method="POST" action="{{ route('publisher::cloudflare.disableIpv6') }}">
        @if ($errors->any())
          <div class="alert alert-danger">
            <ul>
              @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
              @endforeach
            </ul>
          </div>
        @endif
        <div class="form-group">
          <label for="email">Email аккаунта</label>
          <input class="form-control" type="email" name="email" id="email" value="">
        </div>
        <div class="form-group">
          <label for="domains">Домены через запятую</label>
          <input class="form-control" name="domains" id="domains" value="">
        </div>
        <div class="form-group">
          <label for="auth_key">Global API Key</label>
          <input class="form-control" name="auth_key" id="auth_key" value="">
        </div>
        <div class="form-group">
          <button class="btn btn-success">
            Отключить IPv6
          </button>
        </div>
      </form>
    </div>
  </div>
@endsection