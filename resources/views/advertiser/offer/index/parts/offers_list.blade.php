<script type="text/x-template" id="all_offers_list_tpl">
  <div v-content-preloader="pagination.loading && pagination.page === 1" style="height: 100%;">
    <empty-list-message v-if="offers.length == 0 && pagination.finished"
                        message="{{ trans('offers.on_get_list_not_found') }}"></empty-list-message>
    <div v-if="offers.length" v-for="offer in offers" class="offer m-b">
      <div class="hpanel hdefault" :data-ll="offer.title">
        <div class="panel-body">
          <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs p-r-none">
              <div class="preview">
                <img :src="CDN_HOST + offer.thumb_path" :alt="offer.title">
                <div class="labels text-right">
                  <private-label :is_private="offer.is_private"></private-label>
                  <offer-labels :labels="offer.labels"></offer-labels>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-3">
              <div>
                <a class="offer_list_title" :href="'/offers/' + offer.hash" v-html="offer.title"></a>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4 w220">
              <div v-if="offer.targets.length" v-for="target in offer.targets">
                <div class="offer_target_title">
                  <target-title :label="target.label"
                                :title="target.template.title"
                                class="link_dotted"
                                data-toggle="collapse"
                                :data-target="'.target-' + target.hash"
                  ></target-title>
                </div>
                <div :class="[ target.hash == offer.targets[0].hash ? 'in' : '', 'collapse p-l-sm', 'target-' + target.hash]">

                  <div v-for="(target_geo, index) in target.target_geo"
                       :class="[{'hidden-target-geo': index > 2 }, {'no-borders toggle-border': index == 2},
                                     {'no-borders': index === (target.target_geo.length - 1)}]"
                       class="offer_target_geo_wrap clearfix"
                       :style="{display: index > 2 ? 'none' : 'block'}">
                    <target-geo-item :target_geo="target_geo" :show_coefficients="true"></target-geo-item>
                  </div>
                  <div class="show-more" v-show="target.target_geo.length > 3">
                    <span @click="toggleTargetGeoVisibility(target.hash)"
                          :class="'btn-toggle-' + target.hash" class="closed internal-link btn-toggle">
                      {{ trans('messages.show_all') }} <i class="fa fa-chevron-down"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="scroll-preloader-container"></div>
  </div>
</script>