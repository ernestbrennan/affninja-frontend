<div class="table">
  <table v-if="news_list.length" class="table table-condensed text-left table-light-td"
         id="balance_transactions_table">
    <thead>
    <tr>
      <th class="w95" style="min-width: 90px;">{{ trans('messages.offer') }}</th>
      <th class="w200">{{ trans('news.news_title') }}</th>
      <th class="w130">{{ trans('messages.type') }}</th>
      <th style="min-width: 250px;"></th>
      <th class="datehour_th" style="min-width: 127px;">{{ trans('news.published_at_sm') }}</th>
      <th class="w50"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="news in news_list" :key="news.hash">
      <td>
        <div v-if="news.offer">
          <div class="text-left">
            <a class="offer_list_title" :href="'/offers/' + news.offer.hash" v-html="news.offer.title"></a>
          </div>
          <div class="preview small-preview">
            <img :src="CDN_HOST + news.offer.thumb_path" :alt="news.offer.title">
            <div class="labels text-right">
              <offer-inactive-label :status="news.offer.status"></offer-inactive-label>
              <private-label :is_private="news.offer.is_private"></private-label>
              <offer-labels :labels="news.offer.labels"></offer-labels>
            </div>
          </div>
        </div>
      </td>
      <td>
        <a :href="'/tools/news/' + news.hash + '/edit'">@{{ news.title }}</a>
      </td>
      <td class="nowrap">@{{ LANG_NEWS[news.type] }}</td>
      <td v-html="news.body"></td>
      <td class="text-left">
        @{{ news.published_at | datehour }}
        <i v-show="checkPublicationDate(news.published_at)" class="fa fa-eye-slash"
           style="font-size: 14px; color: #0099ff"
           :data-title="LANG_NEWS.not_published" data-toggle="tooltip"></i>
      </td>
      <td>
        <div class="btn-group pull-right">
          <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"
                  aria-expanded="false">
            <i class="fa fa-cog"></i> <span class="caret"></span>
          </button>
          <ul class="dropdown-menu pull-right">
            <li>
              <a :href="'/tools/news/' + news.hash + '/edit'">{{ trans('messages.edit') }}</a>
            </li>
            <li class="divider"></li>
            <li>
              <a @click.prevent="deleteNews(news.id)">
                {{ trans('messages.delete') }}
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <div id="scroll-preloader-container"></div>
  <preloader v-show="news_list.length && pagination.loading && !pagination.finished"></preloader>
  <empty-list-message v-if="!news_list.length" :message="LANG_NEWS.on_get_list_not_found"
  ></empty-list-message>
</div>
