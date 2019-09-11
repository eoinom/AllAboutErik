<template>
  <div class="layout">
    <!-- <header class="header"> -->
      <div class="openbtn">
        <g-image alt="Open navigation menu" src="~/assets/images/menu-open.png" width="135px" style="cursor:pointer" immediate=true @click="openNav()" />
        <g-image alt="Open navigation menu" src="~/assets/images/menu-open-hover.png" width="135px" style="cursor:pointer" immediate=true @click="openNav()" class="img-hover"/>
      </div>
    <!-- </header> -->
    
    <!-- Main navigation menu -->
    <div id="sideNav-main" class="sidenav">
      <simplebar class="simple-scrollbar" data-simplebar-auto-hide="true">
        <div>
          <div class="closebtn">
            <g-image alt="Close navigation menu" src="~/assets/images/menu-close.png" style="cursor:pointer" immediate=true @click="closeNav()"/>
            <g-image alt="Close navigation menu" src="~/assets/images/menu-close-hover.png" style="cursor:pointer" immediate=true @click="closeNav()" class="img-hover"/>
          </div>

          <!-- <nav v-for="nav in navs" :key="nav.label">
            <router-link :to="nav.to" class="nav_item" @mouseover.native="onNavLinkHover(nav)">{{ nav.label.toUpperCase() }}</router-link>
            <hr />
          </nav> -->

          <nav v-for="edge in $static.NavItems.edges" :key="edge.node.text">
            <router-link :to="edge.node.to" class="nav_item" @mouseover.native="onNavLinkHover(edge.node)">{{ edge.node.text.toUpperCase() }}</router-link>
            <hr />
          </nav>

        </div>
      </simplebar>
    </div>
    <!-- </simplebar> -->

    <!-- Sub navigation menu -->
    <div v-if="showSubSideNav">
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
          <router-link :to="activeNav.to">
            <!-- Maybe try ading a v-for loop of g-image with src to graphql nodes, add a hidden class and activate the one based on active Nav -->
            <div v-for="edge in $static.NavItems.edges" :key="edge.node.text">
              <g-image v-if="edge.node.img != null && edge.node.text === activeNav.text" :src="edge.node.img" />
              <!-- <g-image v-if="edge.node.img != null && edge.node.text === activeNav.text" :src="require(`!!assets-loader?@${edge.node.img}`)" /> -->
            </div>
            <!-- <g-image :src="activeNav.img" /> -->
            <!-- <img :src="activeImg" /> -->
          </router-link>
          <!-- <image-component :imageFile="activeNav.img" /> -->
        </div> 

        <div class="submenu-text-container">
          <router-link :to="activeNav.to" class="verb-text">{{ activeNav.verb }}</router-link>
          <br>
          <router-link :to="activeNav.to" class="title-text">{{ activeNav.title }}</router-link>

          <div v-if="showSubPageLinks" class="submenu-nav-container">
            <nav v-for="subPage in activeNav.subPages" :key="subPage.subPageText">
              <router-link :to="subPage.subPageTo" class="nav_item" @mouseover.native="onSubNavLinkHover(subPage)">{{ subPage.subPageText.toUpperCase() }}</router-link>
            </nav>
          </div>
        </div>
        
      </div>
    </div>
     
    <slot/>
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
        // navs: [
        //   {
        //     label: 'Home',
        //     to: '/',
        //     submenu: false
        //   },
        //   {
        //     label: 'Roots & Youth',
        //     to: '/roots-and-youth',
        //     submenu: true,
        //     img: "submenu-roots&youth.jpg",
        //     verb: 'watch',
        //     title: 'Biography Videos'
        //   },
        //   {
        //     label: 'Musical Journey',
        //     to: '/the-episodes',
        //     submenu: true,
        //     img: 'submenu-musical-journey.jpg',
        //     verb: 'listen & watch',
        //     subpages: [
        //       {
        //         label: 'The Episodes',
        //         to: '/the-episodes'
        //       },
        //       {
        //         label: 'Musical Friends',
        //         to: '/musical-friends'
        //       },
        //       {
        //         label: 'Early Productions',
        //         to: '/early-productions'
        //       },
        //       {
        //         label: 'Discography',
        //         to: '/discography'
        //       }
        //     ]
        //   },
        //   {
        //     label: 'Short Films',
        //     to: '/short-films',
        //     submenu: true,
        //     img: 'submenu-short-films.jpg',
        //     verb: 'watch',
        //     title: 'Short Films'
        //   },
        //   {
        //     label: 'Travels',
        //     to: '/travels',
        //     submenu: true,
        //     img: 'submenu-travels.jpg',
        //     verb: 'watch',
        //     title: 'Travel Videos'
        //   },
        //   {
        //     label: 'Collections',
        //     to: '/collections',
        //     submenu: true,
        //     img: 'submenu-collections.jpg',
        //     verb: 'view',
        //     title: 'Collection Galleries'
        //   },
        //   {
        //     label: 'Publications',
        //     to: '/publications',
        //     submenu: true,
        //     img: 'submenu-publications.jpg',
        //     verb: 'read',
        //     title: 'Published Books'
        //   },
        //   {
        //     label: 'Archives',
        //     to: '/archives',
        //     submenu: false
        //   },
        //   {
        //     label: 'Contact',
        //     to: '/contact',
        //     submenu: false
        //   },
        // ]
      }
    },
    
    computed: {
      activeImg() {
        // return '/assets/static/src/assets/images/' + this.activeNav.img
        // return '@/assets/images/' + this.activeNav.img
        return this.activeNav.img
      },
      showSubSideNav() {
        console.log('in showSubSideNav')
        console.log(this.activeNav.hasOwnProperty('hasSubMenu') && this.activeNav.hasSubMenu === true)
        return this.activeNav.hasOwnProperty('hasSubMenu') && this.activeNav.hasSubMenu === true
      },
      showSubPageLinks() {
        return this.activeNav.hasOwnProperty('subPages') && this.activeNav.subPages.length > 0
      }
    },

    methods: {    
      openNav() {
        /* Set the width of the side navigation */
        let mainNav = document.getElementById("sideNav-main")
        let subNav = document.getElementById("sideNav-sub")
        
        mainNav.style.transition = "0.5s"   
        mainNav.style.width = "190px"
        mainNav.style.paddingLeft = "18px"
        mainNav.style.paddingRight = "18px"

        subNav.style.transition = "0.5s"        
        subNav.style.transitionDelay = "0.5s"        
        subNav.style.width = "240px"
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
        console.log('in onNavLinkHover, this.activeNav:')
        console.log(this.activeNav)
      },
      onSubNavLinkHover(nav) {
        this.activeSubNav = Object.assign({}, nav)
      }
    },

    components: {
      'image-component':     require('~/components/ImageComponent.vue').default,
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
  /* line-height: 1.5; */
}

.layout {
  max-width: 100%;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

/* .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
} */


/* The side navigation menu */
.sidenav {
  height: 100%; /* 100% Full-height
  width: 0; /* set with JavaScript */
  padding-left: 0; /* set with JavaScript */
  padding-right: 0; /* set with JavaScript */
  position: fixed; /* Stay in place */
  /* position:absolute; Stay in place */
  z-index: 2000; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #222222;
  overflow-x: hidden; /* Disable horizontal scroll */
  overflow-y: auto; 
  padding-top: 25px; /* Offset content from the top */  
  /* transition: 0.5s; 0.5 second transition effect to slide in the sidenav */
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
  /* transition: 0.3s; */
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
  display: block;
  padding-bottom: 35px;
  top: 57px;
  left: 57px;
  position: absolute;  
  width: 35px;
  z-index: 1000;
}

.sidenav .closebtn {
  display: inline-block;
  padding-bottom: 35px;
  position: relative;  
  width: 35px;
}
.sidenav .closebtn .img-hover, .openbtn .img-hover {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
.sidenav .closebtn:hover .img-hover, .openbtn:hover .img-hover {
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
  width: 240px;
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
  /* transition: 0.5s; 0.5 second transition effect to slide in the sidenav */
  /* transition-delay: 0.3s; */
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
  text-decoration: none;
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
  text-decoration: none;
  text-transform: uppercase;
  transition-delay: 0s;
  transition-duration: 0.5s;
  transition-property: all;
  transition-timing-function: ease;
}

.simple-scrollbar {
  height: 100%;
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

@media (min-width : 768px) and (max-width : 1024px) {
  .openbtn {
    top: 46px;
    left: 46px;
  }

  .openbtn img {
    max-width: 60px;
  }
}

@media (max-width : 767px) {
  .openbtn {
    top: 35px;
    left: 35px;
  }

  .openbtn img {
    max-width: 50px;
  }
}
</style>
