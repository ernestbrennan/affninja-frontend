@extends('publisher::app')

@section('title')
  {{ trans('news.title') }} - {{ trans('app.name') }}
@endsection

@section('content')
  <div class="content">
    <div class="row">
      <div class="col-lg-12">
        <div id="news">

          @forelse($news['response']['data'] as $news)
            <div class="hpanel">
              <div class="panel-body">
                <div class="tab-content">
                  <div class="news-section" style="height: auto">
                    <div id="note3" class="tab-pane">
                      <div class="pull-right text-muted m-l-lg">
                        {{ date('d.m.Y H:i', strtotime($news['created_at'])) }}
                      </div>
                      <h3>{{ $news['title'] }}</h3>
                      <hr>
                      <div class="note-content">
                        {{ $news['body'] }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          @empty
            <h3>{{ trans('news.empty') }}</h3>
          @endforelse

        </div>
      </div>
      <div class="hpanel text-center" id="newsLoading" style="display: none;">
        <h5 class="font-light m-b-xs">
          {{ trans('news.loading') }}
        </h5>
      </div>
    </div>
    <a href="#" class="btn back-to-top btn-light btn-fixed-bottom">
      <span class="glyphicon glyphicon-chevron-up"></span>
    </a>
  </div>
@endsection

@section('scripts')

  <script src="/publisher/news/index.js?{{ Config::get('app.version') }}"></script>

@endsection