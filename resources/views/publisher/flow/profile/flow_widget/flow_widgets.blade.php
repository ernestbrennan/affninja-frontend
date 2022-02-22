<script type="x/template" id="flow-widgets-tpl">
  <div class="form-group">
    <div class="hpanel panel-collapse panel-widgets m-b-none">
      <facebook-pixel ref="facebook_pixel"></facebook-pixel>
      <yandex-metrika ref="yandex_metrika"></yandex-metrika>
      <custom-html ref="custom_html"></custom-html>
      <widget-modal ref="widget_modal"></widget-modal>

      <div class="panel-heading hbuilt">
        <div class="panel-tools">
          <a class="showhide"><i class="fa fa-chevron-down"></i></a>
        </div>
        <span class="panel-title">{{ trans('flows.analytics_settings') }}</span>
      </div>
      <div class="panel-body relative" style="display: none;">

        <div class="btn-group pull-right">
          <button class="btn btn-sm btn-outline btn-success dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
            {{ trans('messages.create_code') }} <span class="caret"></span>
          </button>
          <ul v-if="all_widgets.length" class="dropdown-menu">
            <li v-for="widget in all_widgets" @click.prevent="openCreateWidgetModal(widget)">
              <a href="#">@{{ widget.title }}</a>
            </li>
          </ul>
        </div>

        <div class="clearfix"></div>

        <div class="row widgets-container">
          <div v-for="widget_by_type in formatted_flow_widgets" v-if="widget_by_type && widget_by_type.length"
               class="widget-container col-lg-2 col-md-3 col-sm-6 col-xs-6 p-r-none">
            <div v-for="(widget, index) in widget_by_type" class="hpanel">
              <div class="panel-body relative">
                <div class="panel-tools">
                  <a @click.prevent="openEditWidgetModal(widget)" href="#">
                    <i class="fa fa-pencil"></i>
                  </a>
                  <a @click="deleteWidget(widget.widget.id, widget.hash)"
                     class="closebox" data-prevent_default="true"
                     title="{{ trans('flows.remove_widget') }}">
                    <i class="fa fa-times"></i>
                  </a>
                </div>
                <img :src="'/images/flow_widgets/' + widget.widget.id + '.png'"
                     :alt="widget.widget.title"
                     :title="widget.widget.title"
                     height="16">
                <span>@{{ getWidgetTitle(widget.widget.id, widget.widget.title) }}</span>
                <div class="widget-id-container">
                  <span class="widget-id">ID:
                  <template v-if="widget.widget.id === CUSTOM_CODE">@{{ index + 1 }}</template>
                  <template v-else> @{{ widget.attributes_array.id }}</template>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</script>