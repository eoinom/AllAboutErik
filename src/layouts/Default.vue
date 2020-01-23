<template>
  <div class="layout">
      <div class="openbtn">
        <img alt="Open navigation menu" src="../assets/images/menu-open.png" immediate=true @click="openNav()" />
        <img alt="Open navigation menu" src="../assets/images/menu-open-hover.png" immediate=true @click="openNav()" class="img-hover"/>
      </div>
    
    <!-- Main navigation menu -->
    <div id="sideNav-main" class="sidenav">
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
    <!-- </simplebar> -->

    <!-- Sub navigation menu -->
      <div id="sideNav-sub" class="sidenav-sub" :style="subSideNavStyles()">
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
          <g-link :to="activeNav.to" class="title-text">{{ activeNav.title }}</g-link>

          <div v-if="showSubPageLinks" class="submenu-nav-container">
            <nav v-for="subPage in activeNav.subPages" :key="subPage.subPageText">
              <g-link :to="subPage.subPageTo" class="nav_item" @mouseover.native="onSubNavLinkHover(subPage)">{{ subPage.subPageText.toUpperCase() }}</g-link>
            </nav>
          </div>
        </div>
        
      </div>
    <!-- </div> -->

    <!-- This transition is for all other page loads -->
    <!-- https://github.com/gridsome/gridsome/issues/24 -->
    <transition name="page">
      <router-view/>
    </transition>

    <!-- Need this transition for the home page initial load -->
    <!-- https://gridsome.org/docs/page-transitions -->
    <transition name="page" appear>
      <main>
        <slot />
      </main>
    </transition>
     
    <!-- <slot/> -->
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

  export default {
    data () {
      return {
        activeNav: {},
        activeSubNav: {},
        windowWidth: 0,
        windowHeight: 0,
        documentLoaded: false
      }
    },
    
    computed: {
      showSubSideNav() {        
        return this.activeNav.hasOwnProperty('hasSubMenu') && this.activeNav.hasSubMenu === true
      },
      showSubPageLinks() {
        return this.activeNav.hasOwnProperty('subPages') && this.activeNav.subPages.length > 0
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
      openNav() {
        /* Set the width of the side navigation */
        let mainNav = document.getElementById("sideNav-main")        
        mainNav.style.transition = "0.5s"

        if (this.windowWidth >= 768)  { // i.e. tablets & up
          mainNav.style.width = "226px"
          mainNav.style.paddingLeft = "18px"
          mainNav.style.paddingRight = "18px"
        }
        else if (this.windowWidth >= 576)  { // i.e. landscape phones
          mainNav.style.width = "202px"
          mainNav.style.paddingLeft = "16px"
          mainNav.style.paddingRight = "16px"
        }
        else  { // i.e. portrait phones
          mainNav.style.width = (this.windowWidth / 2.0) + 'px'
          mainNav.style.paddingLeft = "14px"
          mainNav.style.paddingRight = "14px"
        }
      },    
      closeNav() {
        /* Hides the navigation menu by setting the width of it to 0 */  
        let mainNav = document.getElementById("sideNav-main")
        let subNav = document.getElementById("sideNav-sub")
        if (subNav === null || subNav.style.width == "0") {
          mainNav.style.transition = "0.5s"
        }
        else {
          subNav.style.transition = "0.3s"
          subNav.style.width = "0"
          mainNav.style.transition = "0.3s"
          mainNav.style.transitionDelay = "0.3s"          
        }
        mainNav.style.width = "0"
        mainNav.style.paddingLeft = "0"
        mainNav.style.paddingRight = "0"
      },
      onNavLinkHover(nav) {        
        this.activeNav = Object.assign({}, nav)
      },
      onSubNavLinkHover(nav) {
        this.activeSubNav = Object.assign({}, nav)
      }
    },

    mounted() {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight

      this.$nextTick(() => {
        window.addEventListener('resize', () => {        
          this.windowWidth = window.innerWidth
          this.windowHeight = window.innerHeight 
        });
      })

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
.sidenav {
  height: 100%; /* 100% Full-height
  width: 0; /* set with JavaScript */
  padding-left: 0; /* set with JavaScript */
  padding-right: 0; /* set with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 2000; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #222222;
  overflow-x: hidden; /* Disable horizontal scroll */
  overflow-y: auto; 
  padding-top: 25px; /* Offset content from the top */  
}

/* The navigation menu links */
.sidenav a {
  padding-top: 28px;
  padding-bottom: 28px;
  padding-left: 10px;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover,
.sidenav a.router-link-exact-active {   /* https://stackoverflow.com/questions/46083220/how-to-vuejs-router-link-active-style */
  color: #E30829;
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

.sidenav hr {
  border-top: 0.5px solid white;
  border-bottom: 0.5px solid white;
  margin: 0;
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

.sidenav-sub {
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
  transition: width 0.5s;
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

.simple-scrollbar {
  height: 100%;
}


/* Transition styles on router-view for fading the page */
.page-enter-active {
  transition-duration: 5.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-leave-active {
  transition-duration: 1.5s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav-sub {
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
  .sidenav-sub {
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
