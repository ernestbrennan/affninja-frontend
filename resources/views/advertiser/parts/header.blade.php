<div :class="selected_item.childrens ? '' : 'header-mb'" id="header">
  <nav class="navbar navbar-default">
    <div class="container">
      <div class="row menu-flex-left-center">
        {{-- Brand and toggle get grouped for better mobile display --}}
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#mobile-menu" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div id="logo">
            <a href="/">
              <div class="logo-svg"></div>
            </a>
          </div>
        </div>

        {{-- Mobile menu --}}
        <div class="collapse navbar-collapse" id="mobile-menu">
          <ul class="nav navbar-nav">
            <li class="dropdown-disabled">
              <a href="#">
                <navbar-clock></navbar-clock>
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a href="/settings?tab=profile">
                <span class="text-bold">{{ trans('messages.settings') }}</span>
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li v-for="item in menu" :class="['dropdown', item.href === location[0] ? 'active' : '']">
              <template v-if="item.childrens && item.childrens.length">
                <a :title="item.title" class="dropdown-toggle" href="#" data-toggle="dropdown">
                  <span class="title">@{{ item.title}}</span>
                  <span class="caret"></span>
                </a>
                <transition enter-active-class="slideInUp"
                            leave-active-class="slideOutDown">
                  <ul class="dropdown-menu">
                    <li v-for="child in item.childrens" v-show="getPermission(child)"
                        :class="[child.href === location[1] ? 'active' : '']">
                      <a v-if="child.id && item.href === location[0]"
                         @click="changeSubmenu($event, child)" :href="child.id" data-toggle="tab">
                        @{{ child.title }}
                      </a>
                      <a v-else :href="child.href">
                        @{{ child.title }}
                      </a>
                    </li>
                  </ul>
                </transition>
              </template>
              <template v-else>
                <a :href="item.href" :title="item.title"
                   :class="['dropdown', item.active ? 'active' : '']">
                  <span class="title">@{{ item.title }}</span>
                </a>
              </template>
            </li>
            <li role="separator" class="divider"></li>
            @if (Session::get('foreign_user_hash'))
              <li>
                <a class="return_to_admin_cabinet" href="#"
                   data-foreign_user_hash="{{ Session::get('foreign_user_hash') }}">
                  {{ trans('messages.return') }}
                </a>
              </li>
            @endif
            <li>
              <a @click="logout" href="#">
                {{ trans('navbar.logout') }}
              </a>
            </li>
          </ul>
        </div>

        {{-- Desktop menu --}}
        <ul class="nav navbar-nav desktop-menu" id="desktop-menu" ref="desktop">
          <li v-for="(item, index) in menu"
              :class="[selected_item.href === item.href ? 'active' : '', item.childrens ? '' : 'navbar-border']"
              :ref="'item-' + index">
            <a @click="onClick($event, item)" :href="item.href">
              <span class="title">@{{ item.title }}</span>
              <span v-if="item.childrens && item.childrens.length" class="caret"></span>
            </a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <balance-item></balance-item>
          <li class="custom-dropdown">
            <button class="btn btn-default dropdown-toggle btn-sm"
                    data-toggle="dropdown" aria-expanded="false">
              <span class="user-login text-bold">{{ Session::get('user')['email'] }}</span>
              <i class="fa fa-user-circle-o" aria-hidden="true"></i> <span class="caret"></span>
            </button>
            <ul class="dropdown-menu dropdown-right">
              <li class="dropdown-disabled">
                <a href="#">
                  <navbar-clock></navbar-clock>
                </a>
              </li>
              <li role="separator" class="divider"></li>
              <li>
                <a href="/settings?tab=profile">
                  <span class="text-bold">{{ trans('messages.settings') }}</span>
                </a>
              </li>
              <li role="separator" class="divider"></li>
              @if (Session::get('foreign_user_hash'))
                <li>
                  <a class="return_to_admin_cabinet" href="#"
                     data-foreign_user_hash="{{ Session::get('foreign_user_hash') }}">
                    {{ trans('messages.return') }}
                  </a>
                </li>
              @endif
              <li>
                <a @click="logout" href="#">
                  {{ trans('navbar.logout') }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div v-show="selected_item.childrens">
      <div class="menu_hr"></div>
      <div class="container-fluid" id="desktop-submenu">
        <div class="container">
          <div :class="['row menu-flex-left-center submenu', alignment]">
            <ul class="nav navbar-nav" ref="submenu">
              <li v-for="child in selected_item.childrens" :key="child.href"
                  :class="[child.href === location[1] ? 'active' : '']"
                  v-show="getPermission(child)">
                <a v-if="child.id && selected_item.href === location[0]"
                   @click="changeSubmenu($event, child)" :href="child.id" data-toggle="tab">
                  @{{ child.title }}
                </a>
                <a v-else :href="child.href">
                  @{{ child.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>