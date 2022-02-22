@extends('promo::app')

{{--@section('navbar')--}}
    {{--@include('promo::index.parts.navbar')--}}
{{--@endsection--}}

@section('content')
  <div class="promo-container">
      <div class="reg-form publishers-reg-form">
        <div class="header">
          <h4 class="modal-title m-t-none">
            <template v-if="action === 'sign_up'">{{ trans('form.sign_up') }}</template>
            <template v-else-if="action === 'login'">{{ trans('form.login') }}</template>
          </h4>
          <btn-group-item :active="action" @updated="onSelectAction">
            <button class="btn btn-success btn-outline btn-sm" data-id="sign_up"
                    type="button">{{ trans('form.sign_up') }}</button>
            <button class="btn btn-success btn-outline btn-sm" data-id="login"
                    type="button">{{ trans('form.login') }}</button>
          </btn-group-item>
        </div>
        <publisher-reg-form v-show="action === 'sign_up'"></publisher-reg-form>
        <login-form v-show="action === 'login'" ref="login-form"></login-form>
      </div>
  </div>

    {{--<header id="home">--}}
        {{--<advertiser-reg-modal ref="advertiser-reg-modal"></advertiser-reg-modal>--}}

        {{--<div class="container">--}}
            {{--<div class="heading col-lg-7 col-md-7 col-sm-7 col-xs-12">--}}
                {{--<h1>--}}
                    {{--Welcome to Homer landing page--}}
                {{--</h1>--}}
                {{--<span>Contrary to popular belief, Lorem Ipsum is not<br/> simply random text for print.</span>--}}
                {{--<p class="small">--}}
                    {{--Lorem Ipsum is simply dummy text of the printing and tLorem Ipsum is Lorem Ipsum is simply dummy of--}}
                    {{--the simply dummy text of the ypesetting.--}}
                {{--</p>--}}
            {{--</div>--}}
            {{--<div class="heading-image col-lg-5 col-md-5 col-sm-5 col-xs-12" data-child="img-animate"--}}
                 {{--data-effect="fadeInRight">--}}
                {{--<div class="reg-form publishers-reg-form">--}}
                    {{--<div class="header">--}}
                        {{--<h4 class="modal-title m-t-none">--}}
                            {{--<template v-if="action === 'sign_up'">{{ trans('form.sign_up') }}</template>--}}
                            {{--<template v-else-if="action === 'login'">{{ trans('form.login') }}</template>--}}
                        {{--</h4>--}}
                        {{--<btn-group-item :active="action" @updated="onSelectAction">--}}
                            {{--<button class="btn btn-success btn-outline btn-sm" data-id="sign_up"--}}
                                    {{--type="button">{{ trans('form.sign_up') }}</button>--}}
                            {{--<button class="btn btn-success btn-outline btn-sm" data-id="login"--}}
                                    {{--type="button">{{ trans('form.login') }}</button>--}}
                        {{--</btn-group-item>--}}
                    {{--</div>--}}
                    {{--<publisher-reg-form v-show="action === 'sign_up'"></publisher-reg-form>--}}
                    {{--<login-form v-show="action === 'login'" ref="login-form"></login-form>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</header>--}}
    {{--<section class="header-info">--}}
        {{--<div class="container">--}}
            {{--<div class="row">--}}
                {{--<div class="col-md-4">--}}
                    {{--<h4>HTML5 & CSS3</h4>--}}
                    {{--<p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh--}}
                        {{--ultricies vehicula ut id elit. Morbi leo risus.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-4">--}}
                    {{--<h4>Staggering Animations</h4>--}}
                    {{--<p>It is a long established fact that a reader will be distracted by the readable content of a page--}}
                        {{--when looking at its layout. The point of.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-4">--}}
                    {{--<h4>Unique Dashboard</h4>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form, by injected humour.</p>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</section>--}}
    {{--<section class="bg-light publishers" id="publishers">--}}
        {{--<div class="container">--}}
            {{--<div class="row text-center">--}}
                {{--<div class="col-lg-12">--}}
                    {{--<h2><span class="text-success">Publisher</span></h2>--}}
                    {{--<p>Lorem Ipsum available, but the majority have suffered alteration euismod. </p>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="row text-center">--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-airplay text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-science text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-display1 text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-cloud-upload text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="row text-center">--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-global text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-battery text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-users text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-ticket text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</section>--}}
    {{--<section class="advertisers" id="advertisers">--}}
        {{--<div class="container">--}}
            {{--<div class="row text-center">--}}
                {{--<div class="col-lg-12">--}}
                    {{--<h2><span class="text-success">Advertiser</span></h2>--}}
                    {{--<p>Lorem Ipsum available, but the majority have suffered alteration euismod. </p>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="row text-center">--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-airplay text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-science text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-display1 text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-cloud-upload text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="row text-center">--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-global text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-battery text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-users text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
                {{--<div class="col-md-3">--}}
                    {{--<h4 class="m-t-lg"><i class="pe-7s-ticket text-success icon-big"></i></h4>--}}
                    {{--<strong>Lorem Ipsum available</strong>--}}
                    {{--<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered--}}
                        {{--alteration in some form.</p>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="row text-center m-t-lg">--}}
                {{--<button @click="openAdvertiserRegModal" class="btn btn-success btn-outline"--}}
                        {{--type="button">--}}
                    {{--{{ trans('form.submit_application') }}--}}
                {{--</button>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</section>--}}
    {{--<section id="contact">--}}
        {{--<div class="container">--}}
            {{--<div class="row text-center">--}}
                {{--<div class="col-md-6 col-md-offset-3">--}}
                    {{--<h2><span class="text-success">Contact with us</span> anytime</h2>--}}
                    {{--<p>--}}
                        {{--Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web--}}
                        {{--sites still in their infancy. Various versions have evolved over the years, sometimes.--}}
                    {{--</p>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="row text-center m-t-lg">--}}
                {{--<div class="col-md-4 col-md-offset-3">--}}
                    {{--<contact-form class="m-b"></contact-form>--}}
                {{--</div>--}}
                {{--<div class="col-md-3 text-left">--}}
                    {{--<address>--}}
                        {{--<strong><span class="navy">Company name, Inc.</span></strong><br/>--}}
                        {{--601 Street name, 123<br/>--}}
                        {{--New York, De 34101<br/>--}}
                        {{--<abbr title="Phone">P:</abbr> (123) 678-8674--}}
                    {{--</address>--}}
                    {{--<p class="text-color">--}}
                        {{--Consectetur adipisicing elit. Aut eaque, totam corporis laboriosam veritatis quis ad--}}
                        {{--perspiciatis, totam corporis laboriosam veritatis, consectetur adipisicing elit quos non quis ad--}}
                        {{--perspiciatis, totam corporis ea,--}}
                    {{--</p>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</section>--}}
@endsection

@section('scripts')
    <script src="/promo/dist/index/build.js?{{ Config::get('app.version') }}"></script>
@endsection