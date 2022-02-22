<nav class="navbar navbar-default navbar-fixed-top new-promo-navbar" id="vue-navbar">
    <div class="container">
        <div class="navbar-header">
            <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse"
                    class="navbar-toggle collapsed" type="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class="logo">
                <a href="/index">
                    <div class="logo-svg"></div>
                </a>
            </div>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li><a @click="setAnchor('#home')" class="page-scroll" page-scroll href="#home">Home</a></li>
                <li><a @click="setAnchor('#publishers')" class="page-scroll" page-scroll href="#publishers">Publisher</a></li>
                <li><a @click="setAnchor('#advertisers')" class="page-scroll" page-scroll href="#advertisers">Advertiser</a></li>
                <li><a @click="setAnchor('#contact')" class="page-scroll" page-scroll href="#contact">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>