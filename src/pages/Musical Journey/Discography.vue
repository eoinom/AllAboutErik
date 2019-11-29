<template>
  <Layout class="pb-5">
    <img :src="backgroundImgUrl" id="bgImg" :style="bgStyles" />
    
    <header id="header" :style="headerStyles">
      <g-image :src="titleImg" id="titleImg" class="mb-4" />
      <p v-html="titleSubText" id="titleSubText" />
      <div id="scrollDownContainer">
        <ScrollDownArrow
          scrollToElement="#topOfMainBody"
        />
      </div>
      <p id="targetForOpacity"></p>
    </header>

    <div id="topOfMainBody"></div>

    <b-container fluid class="main-col">
      <span v-html="content" id="content" />
    </b-container>

    <ScrollToTop
      text="BACK TO THE TOP"
      :includeArrow="true"
    />

  </Layout>
</template>

<page-query>
{
  Discography: allDiscography {
    edges {
      node {
        pageTitle
        backgroundImages {
          img
        }
        titleImg
        titleText
        content
        albums {          
          artist
          title
          thumbnailImg
          trackListing
          label
          format
          country
          released
          style
          credits
        }
      }
    }
  }	
}
</page-query>


<script scoped>
import ScrollDownArrow from '../../components/ScrollDownArrow.vue'
import ScrollToTop from '../../components/ScrollToTop.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.Discography.edges[0].node.pageTitle
    }
  },

  data() {
    return {
      scrollY: 0.0,
      targetPosY: 0.0,
      windowWidth: 0.0,
      windowHeight: 0.0,
      bgImgWidth: 2560.0,
      bgImgHeight: 1380.0
    }
  },

  computed: {
    titleImg() {
      return this.$page.Discography.edges[0].node.titleImg
    },    
    titleSubText() {
      return this.$page.Discography.edges[0].node.titleText
    },
    content() {
      return this.$page.Discography.edges[0].node.content
    },
    backgroundImgUrl() {
      return this.$page.Discography.edges[0].node.backgroundImages[0].img
    },
    bodyOpacity() {
      let css = {}
      css.opacity = this.scrollY < this.targetPosY ? this.scrollY / this.targetPosY : 1.0
      return css
    },
    headerStyles() {
      let css = {}
      css.opacity = this.scrollY < this.targetPosY ? 1.0 - (this.scrollY / this.targetPosY) : 0.0
      css.paddingTop = this.paddingTop + 'px'
      return css
    },
    bgImgAspectRatio() {      
      return this.bgImgHeight > 0 ? this.bgImgWidth / this.bgImgHeight : 0.0
    },
    windowAspectRatio() {
      return this.windowWidth / this.windowHeight
    },
    bgStyles() {
      let css = {}
      css.opacity = this.scrollY < this.targetPosY ? 1.0 - (this.scrollY / this.targetPosY) : 0.0
      if (this.bgImgAspectRatio <= this.windowAspectRatio)
        css.width = this.windowWidth + 'px';
      else
        css.height = this.windowHeight + 'px';
      return css
    },
    paddingTop() {
      return (this.windowHeight / 2) - 150
    },    
  },

  methods: {
    scrollFunction() {
      // console.log('in scroll EventListener');      
      if (this.scrollY != window.pageYOffset) {
        this.scrollY = window.pageYOffset 
        // console.log('this.scrollY = ' + this.scrollY);
        let bodyRect = document.body.getBoundingClientRect()
        let element = document.getElementById('topOfMainBody')
        let elemRect = element.getBoundingClientRect()
        this.targetPosY = elemRect.top - bodyRect.top
        // console.log('in scrollFunction, elemRect.top - bodyRect.top = ' + elemRect.top + ' - ' + bodyRect.top + ' = ' + this.targetPosY);
      }
    },
    addScrollListener() {
      // console.log('in addScrollListener');      
      window.addEventListener('scroll', this.scrollFunction);
    }
  },

  mounted() {
    this.addScrollListener()
    
    setTimeout(function(){
      if (window.pageYOffset != 0) {
        window.scrollTo(0, 0); // scroll to top of page (avoid inconsistent behaviour of using browser back button)
        this.scrollY = window.pageYOffset
      }
      let bodyRect = document.body.getBoundingClientRect()
      let element = document.getElementById('topOfMainBody')      
      let elemRect = element.getBoundingClientRect()
      this.targetPosY = elemRect.top - bodyRect.top
      // console.log('in mounted setTimeout, elemRect.top - bodyRect.top = ' + elemRect.top + ' - ' + bodyRect.top + ' = ' + this.targetPosY);
    }.bind(this), 500);

    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    this.$nextTick(() => {
      window.addEventListener('resize', () => {
      // console.log('in resize EventListener');      
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight

        let bodyRect = document.body.getBoundingClientRect()
        let element = document.getElementById('topOfMainBody')
        let elemRect = element.getBoundingClientRect()
        this.targetPosY = elemRect.top - bodyRect.top
        // console.log('in resize, elemRect.top - bodyRect.top = ' + elemRect.top + ' - ' + bodyRect.top + ' = ' + this.targetPosY);
      });
    })
  },

  components: {
    ScrollDownArrow,
    ScrollToTop
  },
}
</script>



<style scoped>

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

.layout {
  padding-top: 8px;
}

#bgImg {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
  width: auto;
  height: auto;
  min-height: 100%;
  min-width: 100%;    
  overflow: hidden;
  z-index: -1;
}

#header {
  /* position: absolute;
  bottom: 0; */
  width: 100%;
  padding-bottom: 2%;
  padding-left: 19%;
  padding-right: 19%;
  text-align: center;
  /* z-index: 500; */
}

#titleImg {
  width: 100%;
  max-width: 1203px;
  min-width: 350px;
  height: auto;
  margin: auto;
  /* padding-left: 115px;
  padding-right: 115px; */
}

#titleSubText {
  color: white;
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-size: 24px;
  font-weight: 500;
  line-height: 34px;
  letter-spacing: 2px;
  text-align: justify;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.29);
  transition: inherit;
}

#scrollDownContainer {
  margin-top: 80px;
}

.main-col {
  background-color: rgba(255, 255, 255, 0.75);
  width: 1200px;

  /* font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  text-align: left;
  font-size: 14px;
  line-height: 17px;
  font-feature-settings: 'liga';
  text-rendering: auto;
  margin: 0px;
  padding: 0px;
  border-width: 0px;
  border-style: solid;
  border-color: transparent;
  transform-origin: left top;
  background-repeat: no-repeat;
  display: inline;
  float: left;
  z-index: 94;
  height: 29278px;
  background-color: rgba(255,255,255,0.75);
  position: relative;
  margin-right: -10000px;
  opacity: 0.91889; */
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  /* #titleImg {
    padding-left: 50px;
    padding-right: 50px;
  } */
  #titleSubText {
    font-size: 16px;
    line-height: 22.85px;
    /* letter-spacing: 3.4px; */
  }
  .main-col {
    width: 80%;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  /* #titleImg {
    padding-left: 75px;
    padding-right: 75px;
  } */
  #titleSubText {
    font-size: 20px;
    line-height: 28.5px;
    /* letter-spacing: 4.3px; */
  }
  .main-col {
    width: 80%;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  /* #titleImg {
    padding-left: 100px;
    padding-right: 100px;
  } */
  /* #titleSubText {
    font-size: 24px;
    line-height: 34px;
    letter-spacing: 5.1px;
  } */
  .main-col {
    width: 80%;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  /* #titleImg {
    padding-left: 105px;
    padding-right: 105px;
  } */
  .main-col {
    width: 80%;
  }
}

@media (min-width: 1200px) and (max-width: 1499.98px) {
  .main-col {
    width: 80%;
  }
}

</style>
