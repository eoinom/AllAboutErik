<template>
  <div class="layout">
    <header class="header">
      <strong>
        <g-link to="/">{{ $static.metaData.siteName }}</g-link>
      </strong>
      <!-- <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about">About</g-link>
        <g-link class="nav__link" to="/roots-and-youth">Roots and Youth</g-link>
      </nav> -->
    </header>

    

    <div id="mySidenav" class="sidenav">
      <div class="nav-col">
        <div class="close-icon">
          <g-image alt="Close navigation menu" src="~/assets/images/menu-close.png" width="35px" @click="closeNav()"/>
          <g-image alt="Close navigation menu" src="~/assets/images/menu-close-hover.png" width="35px" @click="closeNav()" class="img-hover"/>
        </div>
        <nav v-for="nav in navs" :key="nav.label">
          <a :href="nav.to" class="nav_item">{{ nav.label.toUpperCase() }}</a>
          <hr />
        </nav>

      </div>
    </div>

    <g-image alt="Open navigation menu" src="~/assets/images/menu-open.png" width="135" @click="openNav()"/>
     
    <slot/>
  </div>
</template>

<static-query>
  query {
    metaData {
      siteName
    }
  }
</static-query>

<script>
export default {
  data () {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          label: 'Home',
          to: '/'
        },
        {
          label: 'Roots & Youth',
          to: '/roots-and-youth'
        },
        {
          label: 'Musical Journey',
          to: '/the-episodes'
        },
        {
          label: 'Short Films',
          to: '/short-films'
        },
        {
          label: 'Travels',
          to: '/travels'
        },
        {
          label: 'Collections',
          to: '/collections'
        },
        {
          label: 'Publications',
          to: '/publications'
        },
        {
          label: 'Archives',
          to: '/archives'
        },
        {
          label: 'Contact',
          to: '/contact'
        },
      ]
    }
  },
  methods: {    
    openNav() {
      /* Set the width of the side navigation to 224px */
      document.getElementById("mySidenav").style.width = "224px";
      document.getElementById("mySidenav").style.paddingLeft = "18px";
      document.getElementById("mySidenav").style.paddingRight = "18px";
    },    
    closeNav() {
      /* Hides the navigation menu by setting the width of it to 0 */
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("mySidenav").style.paddingLeft = "0";
      document.getElementById("mySidenav").style.paddingRight = "0";
    }
  }
}

</script>

<style>
body {
  /* font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; */
  margin:0;
  padding:0;
  /* line-height: 1.5; */
}

.layout {
  max-width: 760px;
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

.nav__link {
  margin-left: 20px;
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
  padding-top: 25px; /* Place content 60px from the top */
  
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  color: #FFFFFF;
  font-family: lato, sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 3px;  
  text-decoration: none;
  padding-top: 28px;
  padding-bottom: 28px;
  padding-left: 10px;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #E30829;
}

.close-icon {
  display: inline-block;
  padding-bottom: 35px;
  position: relative;  
  width: 35px;
}
.close-icon .img-hover {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
.close-icon:hover .img-hover {
  display: inline;
}

.sidenav hr {
  border-top: 0.5px solid #FFFFFF;
  border-bottom: 0.5px solid #FFFFFF;
  margin: 0;
}

/* Position and style the close button (top right corner) */
.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left .5s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
