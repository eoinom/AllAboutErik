<template>
  <div class="layout">
      <div class="openbtn">
        <img alt="Open navigation menu" src="../assets/images/menu-open.png" immediate=true @click="mainNavIsOpen = true" />
        <img alt="Open navigation menu" src="../assets/images/menu-open-hover.png" immediate=true @click="mainNavIsOpen = true" class="img-hover"/>
      </div>
    
    <!-- Main navigation menu -->
    <div id="sideNav-main" :class="{sideNavOpen: mainNavIsOpen}">
      <simplebar class="simple-scrollbar" data-simplebar-auto-hide="true">
        <div>
          <div class="closebtn">
            <img alt="Close navigation menu" src="../assets/images/menu-close.png" immediate=true @click="closeNav()"/>
            <img alt="Close navigation menu" src="../assets/images/menu-close-hover.png" immediate=true @click="closeNav()" class="img-hover"/>
          </div>

          <nav v-for="edge in $static.NavItems.edges" :key="edge.node.text">
            <a v-if="edge.node.to == ' '" href="" class="nav_item" @mouseover="onNavLinkHover(edge.node)">{{ edge.node.text.toUpperCase() }}</a>
            <router-link v-else :to="edge.node.to" class="nav_item" @mouseover.native="onNavLinkHover(edge.node)">{{ edge.node.text.toUpperCase() }}</router-link>
            <hr />
          </nav>

        </div>
      </simplebar>
    </div>

    <!-- Sub navigation menu -->
      <div id="sideNav-sub" :style="subSideNavStyles()">
        <div class="submenu-img-container">
          <g-link :to="activeNav.to">
            <div v-for="edge in $static.NavItems.edges" :key="edge.node.text">
              <g-image v-if="edge.node.img != null && edge.node.text === activeNav.text" :src="edge.node.img" />
            </div>
          </g-link>
        </div> 

        <div class="submenu-text-container">
          <g-link :to="activeNav.to" class="verb-text">{{ activeNav.verb }}</g-link>

          <br>

          <g-link v-if="activeNav.title" :to="activeNav.to" class="title-text">{{ activeNav.title }}</g-link>
          
          <g-link v-else-if="activeNav.titleMD" :to="activeNav.to" class="title-text">
            <span v-html="renderMarkdown(activeNav.titleMD)" />
          </g-link>

          <div v-if="showSubPageLinks" class="submenu-nav-container">
            <nav v-for="subPage in activeNav.subPages" :key="subPage.subPageText">
              <g-link :to="subPage.subPageTo" class="nav_item" @mouseover.native="onSubNavLinkHover(subPage)">{{ subPage.subPageText.toUpperCase() }}</g-link>
            </nav>
          </div>
        </div>
        
      </div>

    <!-- This transition is for all other page loads -->
    <!-- https://github.com/gridsome/gridsome/issues/24 -->
    <!-- https://github.com/gridsome/gridsome/issues/835 -->
    <transition name="page" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>

    <!-- Need this transition for the home page initial load -->
    <!-- https://gridsome.org/docs/page-transitions -->
    <transition name="home" appear>
      <main>
        <slot />
      </main>
    </transition>
    
  </div>
</template>

<static-query>
{
  NavItems: allNavMenuItem(sortBy: "orderNo", order: ASC) {
    totalCount
    edges {
      node {
        text
        to
        orderNo
        hasSubMenu
        img
        verb
        title
        titleMD
        subPages {
          subPageTo
          subPageText
        }
      }
    }
  }
}
</static-query>

<script type="text/javascript">
  import simplebar from 'simplebar-vue';
  import 'simplebar/dist/simplebar.min.css';
  const MarkdownIt = require('markdown-it')

  export default {
    data () {
      return {
        activeNav: {},
        activeSubNav: {},
        documentLoaded: false,
        mainNavIsOpen: false
      }
    },
    
    computed: {
      showSubSideNav() {        
        return this.activeNav.hasOwnProperty('hasSubMenu') && this.activeNav.hasSubMenu === true && this.mainNavIsOpen
      },
      showSubPageLinks() {
        return this.activeNav.hasOwnProperty('subPages') && this.activeNav.subPages.length > 0 && this.mainNavIsOpen
      }
    },

    methods: {
      subSideNavStyles() {
        if (this.documentLoaded) {
          let subNav = document.getElementById("sideNav-sub")
          if (subNav != null)
            this.showSubSideNav ? subNav.style.width = "240px" : subNav.style.width = "0" // needed to overwrite setting from closeNav()
        }
        return this.showSubSideNav ? 'width:240px' : 'width:0px'  // note the max-width settings in the media queries
      },   
      closeNav() {
        let mainNav = document.getElementById("sideNav-main")
        let subNav = document.getElementById("sideNav-sub")

        if (subNav && subNav.style.width !== "0px") {
          subNav.style.transition = "0.3s"
          mainNav.style.transition = "0.3s"
          mainNav.style.transitionDelay = "0.3s"           
        }
        else {
          mainNav.style.transition = "0.5s"
          mainNav.style.transitionDelay = "0s" 
        }        
        this.activeNav = {}
        this.mainNavIsOpen = false
      },
      onNavLinkHover(nav) { 
        this.activeNav = this.mainNavIsOpen ? Object.assign({}, nav) : {}
      },
      onSubNavLinkHover(subNav) {
        this.activeSubNav = this.mainNavIsOpen ? Object.assign({}, subNav) : {}
      },
      renderMarkdown(text) {
        const md = new MarkdownIt()
        return md.render(text) 
      }
    },

    mounted() {
      this.documentLoaded = true
    },

    components: {
      simplebar
    } 
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:100,400&display=swap');
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed&display=swap');

body {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  margin:0;
  padding:0;
}

.layout {
  max-width: 100%;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

/* The side navigation menu */
#sideNav-main {
  height: 100%; /* 100% Full-height */
  position: fixed; /* Stay in place */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #222222;
  overflow-x: hidden; /* Disable horizontal scroll */
  overflow-y: auto;  
  z-index: 2000; /* Stay on top */
  width: 0; /* set with JavaScript */
  padding: 25px 0;
  transition: all 0.5s ease 0s;
}

.sideNavOpen {
  width: 226px !important;
  padding: 25px 18px !important;
}

/* The navigation menu links */
#sideNav-main a {
  padding-top: 28px;
  padding-bottom: 28px;
  padding-left: 10px;
}

/* When you mouse over the navigation links, change their color */
#sideNav-main a:hover,
#sideNav-main a.router-link-exact-active {   /* https://stackoverflow.com/questions/46083220/how-to-vuejs-router-link-active-style */
  color: #E30829;
}

#sideNav-main hr {
  border-top: 0.5px solid white;
  border-bottom: 0.5px solid white;
  margin: 0;
}

.nav_item {
  color: white;
  display: block;
  font-family: 'Lato', sans-serif;
  font-feature-settings: "liga";
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 3px;  
}

/* The navigation (sub)menu links */
.submenu-nav-container a {
  padding-top: 14px;
  padding-bottom: 14px;
}

.submenu-nav-container a:hover,
.submenu-nav-container a.router-link-exact-active {   /* https://stackoverflow.com/questions/46083220/how-to-vuejs-router-link-active-style */
  color: #68c4eb;
}


.openbtn {
  cursor: pointer;
  display: inline-block;
  padding-bottom: 35px;
  top: 57px;
  left: 57px;
  position: fixed;  
  width: 35px;
  z-index: 1000;
}
.openbtn img {
  vertical-align: baseline;
}
.closebtn {
  cursor: pointer;
  display: inline-block;
  padding-bottom: 35px;
  position: relative;  
  width: 35px;
}
.closebtn .img-hover, .openbtn .img-hover {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
@media (hover) {
  .openbtn {
    display: inline-block;
    padding-bottom: 35px;
    top: 57px;
    left: 57px;
    position: fixed;  
    width: 35px;
    z-index: 1000;
  }
  .closebtn {
    display: inline-block;
    padding-bottom: 35px;
    position: relative;  
    width: 35px;
  }
  .closebtn .img-hover, .openbtn .img-hover {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }
  .closebtn:hover .img-hover, .openbtn:hover .img-hover {
    display: inline;
  }
}

.submenu-img-container {
  background: black;
}

.submenu-img-container img {
  display: block;
  margin: 0px auto;
  width: 100%;
  height: auto;
}

#sideNav-sub {
  height: 100%; /* 100% Full-height */
  max-width: 240px;
  padding-left: 0;
  padding-right: 0;
  position: fixed; /* Stay in place */
  z-index: 2000; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 226px;
  background-color: #333333;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 0px;
  transition: width 0.5s ease 0s;
}

.submenu-text-container {
  padding: 24px 21px 24px 21px;
}

.verb-text {
  color: rgb(198, 156, 109);
  cursor: pointer;
  display: block;
  font-family: 'Ubuntu Condensed', sans-serif;
  font-feature-settings: "liga";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 8px;
  line-height: 18px;
  overflow-wrap: break-word;
  pointer-events: auto;
  text-align: left;
  text-rendering: auto;
  text-transform: uppercase;
  transition-delay: 0s;
  transition-duration: 0.5s;
  transition-property: all;
  transition-timing-function: ease;
  margin-top: 9px;
  margin-bottom: 14px;
}
.verb-text:hover {
  color: rgb(198, 156, 109);
}

.title-text {
  color: rgb(127, 127, 127);
  cursor: pointer;
  display: inline;
  font-family: 'Lato', sans-serif;
  font-feature-settings: "liga";
  font-size: 25px;
  font-style: normal;
  font-weight: 100;
  letter-spacing: 4px;
  line-height: 35px;
  overflow-wrap: break-word;
  pointer-events: auto;
  text-align: left;
  text-rendering: auto;
  text-transform: uppercase;
  transition-delay: 0s;
  transition-duration: 0.5s;
  transition-property: all;
  transition-timing-function: ease;
}
.title-text:hover {
  color: rgb(127, 127, 127);
}

.simple-scrollbar {
  height: 100%;
}


/* Transition styles on router-view for fading the page */
.home-enter-active {
  transition-duration: 6.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-enter-active {
  transition-duration: 5.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.home-leave-active,
.page-leave-active {
  transition-duration: 1.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.home-enter,
.page-enter,
.home-leave-active,
.page-leave-active {
  opacity: 0;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  #sideNav-main {
    padding: 15px 0;
  }
  .sideNavOpen {
    width: 50% !important;
    padding: 15px 14px !important;
  }
  #sideNav-sub {
    max-width: 50%;
    left: 50%;
  }
  .nav_item {
    font-size: 12px;
  }
  .openbtn {
    top: 33px;
    left: 25px;
  }
  .openbtn img {
    max-width: 40px;
  }
  .closebtn {
    padding-bottom: 20px;
  }
  .closebtn img {
    max-width: 30px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  #sideNav-main {
    padding: 20px 0;
  }
  .sideNavOpen {
    width: 202px !important;
    padding: 20px 16px !important;
  }
  #sideNav-sub {
    max-width: 220px;
    left: 202px;
  }
  .openbtn {
    top: 39px;
    left: 35px;
  }
  .openbtn img {
    max-width: 50px;
  }
  .closebtn {
    padding-bottom: 20px;
  }
  .closebtn img {
    max-width: 32px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .openbtn {
    top: 41px;
    left: 46px;
  }
  .openbtn img {
    max-width: 60px;
  }
  .closebtn {
    padding-bottom: 30px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  .openbtn {
    top: 44px;
    left: 44px;
  }
  .openbtn img {
    max-width: 69px;
  }
}
</style>
