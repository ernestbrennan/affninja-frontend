<h3>{{ trans('news.index_title') }}</h3>
<ul class="nav nav-tabs m-b">
  <li :class="[news_type === 'all' ? 'active' : '']">
    <a @click="news_type = 'all'">{{ trans('news.all_news') }}</a>
  </li>
  <li :class="[news_type === 'my' ? 'active' : '']">
    <a @click="news_type = 'my'">{{ trans('news.my_news') }}</a>
  </li>
</ul>

<div v-show="news_type === 'all'" class="hpanel overflow" id="all-news-panel">
  <all-news ref="all_news"></all-news>
</div>

<div v-show="news_type === 'my'" class="hpanel overflow" id="my-news-panel">
  <my-news ref="my_news"></my-news>
</div>
