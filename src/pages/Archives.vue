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
          <SlideshowKenBurnsSmall :slides="slides" height="100vh" />

          <!-- SLIDESHOW OVERLAY -->
          <div class="slideshowOverlay mb-5 pb-5" :style="slideshowOverlayStyles">
            <div class="mainContent mx-auto">

              <g-image alt="Archives title image" v-if="titleImg != null" :src="titleImg" id="titleImg" class="mb-md-1 mb-lg-2 mb-xl-3"/>

              <div v-html="slideshowText" id="slideshowText" />

              <div id="scrollDownContainer" class="pb-5">
                <ScrollDownArrow scrollToElement="#tilesRow" />
              </div>

            </div>
          </div>

        </b-col>
      </b-row>
    </b-container>


    <b-container fluid id="tilesContainer" :style="tilesContainerStyles">
      <b-row no-gutters align-h="center" id="tilesRow" class="mb-5 pb-4">
        <b-col
          v-for="(tile, index) in tiles"
          :key="index"
          cols="3"
          align-self="center"
          class="tilesCols p-0 mx-3 my-3"
        >
          <ArchivesThumbnail :thumbnailObj="tile" />
        </b-col>
      </b-row>
    </b-container>

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
import ArchivesThumbnail from '../components/ArchivesThumbnail.vue'
import BackgroundMusic from '../components/BackgroundMusic.vue'
import ScrollDownArrow from '../components/ScrollDownArrow.vue'
import ScrollToTop from '../components/ScrollToTop.vue'
import SlideshowKenBurnsSmall from '../components/SlideshowKenBurnsSmall.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.Archives.edges[0].node.pageTitle
    }
  },

  components: {
    ArchivesThumbnail,
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
      this.windowHeight = window.innerHeight
      
      let bodyRect = document.body.getBoundingClientRect()
      let element = document.getElementById('tilesRow')
      let elemRect = element.getBoundingClientRect()
      this.targetPosY = elemRect.top - bodyRect.top
    }
  },
}
</script>



<style scoped lang="scss">

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
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
  max-height: 1224px;
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
}

.mainContent{
  bottom: 0;
  width: 1289px;
  padding-bottom: 20px;
  padding-top: 85px;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
  z-index: 20;
}

#titleImg {
  width: 100%;
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
  text-shadow: 0px 0px 250px #1C0F07,0px 0px 250px #1C0F07/* glow */, 1px 1px 2px rgba(28,16,23,0.89)/* drop shadow*/;
}

#tilesContainer {
  width: 100%;
  max-width: 2048px;
  padding: 0;
  text-align: center;
  z-index: 50;
}

.tilesCols {
  max-width: 480px;
  background-color: black;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {

}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {

}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 

}

</style>
