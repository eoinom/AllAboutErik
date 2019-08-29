<template>
  <div class="layout">
    <header class="header">

    </header>
    
    <!-- Main navigation menu -->
    <div id="sideNav-main" class="sidenav">
      <div>
        <div class="closebtn">
          <g-image alt="Close navigation menu" src="~/assets/images/menu-close.png" @click="closeNav()"/>
          <g-image alt="Close navigation menu" src="~/assets/images/menu-close-hover.png" @click="closeNav()" class="img-hover"/>
        </div>
        <nav v-for="nav in navs" :key="nav.label">
          <router-link :to="nav.to" class="nav_item" @mouseover.native="onNavLinkHover(nav)">{{ nav.label.toUpperCase() }}</router-link>
          <!-- <g-link :to="nav.to" class="nav_item" @mouseover.native="onNavLinkHover(nav)">{{ nav.label.toUpperCase() }}</g-link> -->
          <hr />
        </nav>
      </div>
    </div>

    <!-- Sub navigation menu -->
    <div v-if="showSubSideNav()">
      <div id="sideNav-sub" class="sidenav-sub">
        <div class="submenu-img-container">
          <!-- <g-image :src="activeNav.img" width="240px" /> -->
          <!-- <g-image src="~/assets/images/submenu-musical-journey.jpg" width="240px" /> -->
          <!-- <image-component>
            <template v-slot:image>
              <g-image :src="activeNav.img" />
            </template>
          </image-component> -->
          <!-- <image-component imageFile="submenu-musical-journey.jpg" /> -->
          <!-- <g-image src="~/assets/images/submenu-musical-journey.jpg" /> -->
          <g-image :src="activeImg" />
          <!-- <image-component :imageFile="activeNav.img" /> -->
        </div> 

        <div class="submenu-text-container">
          <span class="verb-text">{{ activeNav.verb }}</span>
          <br>
          <span class="title-text">{{ activeNav.title }}</span>

          <div v-if="showSubPageLinks" class="submenu-nav-container">
            <nav v-for="subpage in activeNav.subpages" :key="subpage.label">
              <router-link :to="subpage.to" class="nav_item" @mouseover.native="onSubNavLinkHover(subpage)">{{ subpage.label.toUpperCase() }}</router-link>
            </nav>
          </div>
        </div>

        

      </div>
    </div>

    <g-image alt="Open navigation menu" src="~/assets/images/menu-open.png" width="135px" @click="openNav()"/>
     
    <slot/>
  </div>
</template>

<static-query>
</static-query>

<script type="text/javascript">
  export default {
    data () {
      return {
        activeNav: {},
        activeSubNav: {},
        navs: [
          {
            label: 'Home',
            to: '/',
            submenu: false
          },
          {
            label: 'Roots & Youth',
            to: '/roots-and-youth',
            submenu: true,
            img: "submenu-roots&youth.jpg",
            verb: 'watch',
            title: 'Biography Videos'
          },
          {
            label: 'Musical Journey',
            to: '/the-episodes',
            submenu: true,
            img: 'submenu-musical-journey.jpg',
            verb: 'listen & watch',
            subpages: [
              {
                label: 'The Episodes',
                to: '/the-episodes',
                isSubpage: true
              },
              {
                label: 'Musical Friends',
                to: '/musical-friends',
                isSubpage: true
              },
              {
                label: 'Early Productions',
                to: '/early-productions',
                isSubpage: true
              },
              {
                label: 'Discography',
                to: '/discography',
                isSubpage: true
              }
            ]
          },
          {
            label: 'Short Films',
            to: '/short-films',
            submenu: true,
            img: 'submenu-short-films.jpg',
            verb: 'watch',
            title: 'Short Films'
          },
          {
            label: 'Travels',
            to: '/travels',
            submenu: true,
            img: 'submenu-travels.jpg',
            verb: 'watch',
            title: 'Travel Videos'
          },
          {
            label: 'Collections',
            to: '/collections',
            submenu: true,
            img: 'submenu-collections.jpg',
            verb: 'view',
            title: 'Collection Galleries'
          },
          {
            label: 'Publications',
            to: '/publications',
            submenu: true,
            img: 'submenu-publications.jpg',
            verb: 'read',
            title: 'Published Books'
          },
          {
            label: 'Archives',
            to: '/archives',
            submenu: false
          },
          {
            label: 'Contact',
            to: '/contact',
            submenu: false
          },
        ]
      }
    },
    
    computed: {
      activeImg() {
        return '/assets/static/src/assets/images/' + this.activeNav.img
      },
      // showSubSideNav() {
      //   return this.activeNav.hasOwnProperty('submenu') && this.activeNav.submenu === true
      // },
      showSubPageLinks() {
        return this.activeNav.hasOwnProperty('subpages') && this.activeNav.subpages.length > 0
      }
    },

    methods: {    
      openNav() {
        /* Set the width of the side navigation */
        document.getElementById("sideNav-main").style.width = "190px"
        document.getElementById("sideNav-main").style.paddingLeft = "18px"
        document.getElementById("sideNav-main").style.paddingRight = "18px"
        document.getElementById("sideNav-sub").style.width = "240px"
      },    
      closeNav() {
        /* Hides the navigation menu by setting the width of it to 0 */
        document.getElementById("sideNav-main").style.width = "0"
        document.getElementById("sideNav-main").style.paddingLeft = "0"
        document.getElementById("sideNav-main").style.paddingRight = "0"
        document.getElementById("sideNav-sub").style.width = "0"
      },
      onNavLinkHover(nav) {
        this.activeNav = Object.assign({}, nav)
      },
      onSubNavLinkHover(nav) {
        this.activeSubNav = Object.assign({}, nav)
      },
      showSubSideNav() {
        if (this.activeNav.hasOwnProperty('submenu') && this.activeNav.submenu === true) {
          document.getElementById("sideNav-sub").style.width = "240px"
          return true
        }
        return false
      },
    },

    components: {
      'image-component':     require('~/components/ImageComponent.vue').default  
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
    /* line-height: 1.5; */
  }

  .layout {
    max-width: 100%;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    height: 80px;
  }


  /* The side navigation menu */
  .sidenav {
    height: 100%; /* 100% Full-height */
    width: 0; /* set with JavaScript */
    padding-left: 0; /* set with JavaScript */
    padding-right: 0; /* set with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #222222;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 25px; /* Offset content from the top */  
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
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
    text-decoration: none;
    transition: 0.3s;
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

  .sidenav .closebtn {
    display: inline-block;
    padding-bottom: 35px;
    position: relative;  
    width: 35px;
  }
  .sidenav .closebtn .img-hover {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .sidenav .closebtn:hover .img-hover {
    display: inline;
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
  }

  .sidenav-sub {
    height: 100%; /* 100% Full-height */
    /* width: 240px; */
    width: 0;  /* Set with Javascript */
    padding-left: 0;
    padding-right: 0;
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 226px;
    background-color: #333333;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 0px;
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
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

  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) {
    .sidenav {
      padding-top: 15px;
    }
    .sidenav a {
      font-size: 18px;
    }
  }
</style>
