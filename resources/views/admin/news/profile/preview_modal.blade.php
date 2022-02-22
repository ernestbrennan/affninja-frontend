<script type="text/x-template" id="preview-modal-tpl">
  <div class="modal fade news-preview" tabindex="-1" role="dialog" id="news-preview-modal">
    <div class="modal-content container">
      <div class="modal-header row">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">@{{ news.title }}</h4>
        <span v-if="news.published_at !== ''" class="small">@{{ news.published_at | datehour }}</span>
      </div>
      <div class="modal-body row">
        <div class="col-lg-12">
          <div class="hpanel">
            <div class="panel-body" v-html="news.body"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>