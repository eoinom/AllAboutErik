<template>
  <Layout>

    <BackgroundMusic
      :audioFile="node.bgAudio"
      :audioDuration="node.bgAudioDuration"
      :audioFadeInDuration="node.bgAudioFadeInDuration"
      :audioFadeOutDuration="node.bgAudioFadeOutDuration"
      :maxVolume=1.0
    />

    <b-container fluid class="main-col m-0, p-0">
      <b-row no-gutters class="mb-1 px-1">
        <b-col class="slideshowCol" :style="slideshowColStyles">

          <!-- HEADER SLIDESHOW -->
          <SlideshowKenBurnsSmall 
            :slides="slides" 
            height="100vh"
            maxImgHeight="100vh"
            :scaleImgToContainer=true
          />

          <!-- SLIDESHOW OVERLAY -->
          <div class="slideshowOverlay mb-3" :style="slideshowOverlayStyles">
            <div class="mainContent mx-auto">

              <g-image alt="Archives title image" v-if="titleImg != null" :src="titleImg" id="titleImg" class="mb-md-1 mb-lg-2 mb-xl-3"/>

              <div v-html="slideshowText" id="slideshowText" />

              <div id="scrollDownContainer">
                <ScrollDownArrow scrollToElement="#tilesRow" />
              </div>

            </div>
          </div>

        </b-col>
      </b-row>
    </b-container>

    <!-- TILES -->
    <ArchivesTiles :tiles="tiles" :style="tilesContainerStyles" />

    <ScrollToTop
      text="BACK TO THE TOP"
      :includeArrow="true"
    />
  </Layout>
</template>

<page-query>
{
  Archives: allArchivesIndex {
    edges {
      node {
        pageTitle
        titleImg
        content
        bgAudio
        bgAudioDuration
        bgAudioFadeInDuration
        bgAudioFadeOutDuration
        slides {
          img
          panStart
          scaleFrom
          scaleTo
        }
        tiles {
          text
          opacity
          img
          img_bright
        }
      }
    }
  }
}
</page-query>


<script scoped>
import ArchivesTiles from '../../components/ArchivesTiles.vue'
import BackgroundMusic from '../../components/BackgroundMusic.vue'
import ScrollDownArrow from '../../components/ScrollDownArrow.vue'
import ScrollToTop from '../../components/ScrollToTop.vue'
import SlideshowKenBurnsSmall from '../../components/SlideshowKenBurnsSmall.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.Archives.edges[0].node.pageTitle
    }
  },

  components: {
    ArchivesTiles,
    BackgroundMusic,
    ScrollDownArrow,
    ScrollToTop,
    SlideshowKenBurnsSmall
  },

  data() {
    return {
      scrollY: 0.0,
      targetPosY: 0.0,
      windowHeight: 0
    }
  },

  computed: {
    node() {
      return this.$page.Archives.edges[0].node
    },
    titleImg() {
      return this.node.titleImg
    },
    slideshowText() {
      return this.node.content
    },
    slides() {
      return this.node.slides
    },
    slideshowColStyles() {
      return {
        opacity: this.scrollY < this.targetPosY ? 1.0 - (this.scrollY / this.targetPosY) : 0.0
      }
    },
    slideshowOverlayStyles() {
      return {
        opacity: this.scrollY < (this.targetPosY / 2) ? 1.0 - (this.scrollY / (this.targetPosY / 2)) : 0.0
      }
    },
    tiles() {
      return this.node.tiles
    },
    tilesContainerStyles() {
      return {
        paddingTop: this.windowHeight + 'px'
      }
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
      let element = document.getElementById('tilesRow')      
      let elemRect = element.getBoundingClientRect()
      this.targetPosY = elemRect.top - bodyRect.top
    }.bind(this), 500);

    this.windowHeight = window.innerHeight
    window.addEventListener('resize', this.onResize)
    window.addEventListener('orientationchange', this.onResize)
  },

  methods: {
    addScrollListener() {      
      window.addEventListener('scroll', this.scrollFunction);
    },
    scrollFunction() {    
      if (this.scrollY != window.pageYOffset) {
        this.scrollY = window.pageYOffset
        let bodyRect = document.body.getBoundingClientRect()
        let element = document.getElementById('tilesRow')
        let elemRect = element.getBoundingClientRect()
        this.targetPosY = elemRect.top - bodyRect.top
      }
    },
    onResize() {
      if (this.windowHeight != window.innerHeight) {
        this.windowHeight = window.innerHeight
        
        let bodyRect = document.body.getBoundingClientRect()
        let element = document.getElementById('tilesRow')
        let elemRect = element.getBoundingClientRect()
        this.targetPosY = elemRect.top - bodyRect.top
      }
    }
  },
}
</script>



<style scoped lang="scss">

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}


.layout {
  padding: 0;
}

.row {
  margin-bottom: 20px;
}

.main-col {
  max-width: 100%;
  min-height: 600px;
  position: fixed;
  z-index: 0;
}

.slideshowCol {
  position: relative;
  width: auto;
  text-align: center;
  overflow-x: hidden;
  overflow-y: hidden;
}

.slideshowOverlay {
  position: absolute;
  bottom: 0;
  z-index: 10;
  width: 100%;
  padding-bottom: 12vh;
}

.mainContent{
  bottom: 0;
  max-width: 1289px;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
  z-index: 20;
}

#titleImg {
  width: 70%;
  max-width: 538px;
  min-width: 250px;
  height: auto;
  margin: auto;
  padding-bottom: 15px;
}

#slideshowText {
  color: #FFFFFF;
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 2.0625rem;
  letter-spacing: 2px;
  text-align: center;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media only screen and (max-width: 1199.98px) {
  #slideshowText {
    font-size: calc(1rem + 6 * (100vw - 300px) / (1200 - 300) ); /* varies between 16px (1rem) at 300px vw and 22px (1.375rem) at 1200px vw */
    line-height: calc(1.0625rem + 16 * (100vw - 300px) / (1200 - 300) ); /* varies between 17px (1.0625rem) at 300px vw and 33px (2.0625rem) at 1200px vw */
  }
}

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) and (orientation: landscape) {
  #slideshowText {
    font-size: 14.5px;
  }
  .slideshowOverlay {
    padding-bottom: 0px;
    margin-bottom: 8px !important;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) and (orientation: landscape) {
  #slideshowText {
    font-size: 16px;
  }
  .slideshowOverlay {
    padding-bottom: 4px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) and (orientation: landscape) {
  #slideshowText {
    font-size: 18px;
  }
  .slideshowOverlay {
    padding-bottom: 4px;
  }
}

</style>
