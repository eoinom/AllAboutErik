<template>
  <Layout>

    <BackgroundMusic
      :audioFile="$page.Collections.edges[0].node.bgAudio"
      :audioDuration="$page.Collections.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.Collections.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.Collections.edges[0].node.bgAudioFadeOutDuration"
      :playMusic="playMusic"
    />

    <b-container fluid class="main-col">
      <b-row no-gutters class="mb-1 px-1">
        <b-col class="slideshowCol">

          <!-- HEADER SLIDESHOW -->
          <SlideshowKenBurnsSmall :slides="slides" :height="slideshowHeight" />

          <!-- SLIDESHOW OVERLAY -->
          <div class="slideshowOverlay">
            <div class="mainContent">

              <g-image alt="Collections title image" v-if="titleImg != null" :src="titleImg" id="titleImg" class="mb-md-1 mb-lg-2 mb-xl-3"/>

              <div v-html="slideshowText" id="slideshowText" />

            </div>
          </div>

        </b-col>
      </b-row>
    </b-container>


    <b-container fluid class="collectionsContainer">
      <b-row no-gutters align-h="center" class="collectionsRow mb-1">
        <b-col
          v-for="(collection, index) in collections"
          :key="index"
          cols=""
          align-self="center"
          class="collectionsCols p-0 mx-0 my-2"
        >
          <CollectionThumbnail :collection="collection" />          
        </b-col>
      </b-row>
    </b-container>

    <BackToTop />

  </Layout>
</template>

<page-query>
{
  Collections: allCollectionsIndex {
    edges {
      node {
        id
        pageTitle
        titleImg
        bgAudio
        bgAudioDuration
        bgAudioFadeInDuration
        bgAudioFadeOutDuration
        content
        slides {
          orderNo
          img
          opacity
          panStart
          scaleFrom
          scaleTo
        }
        collections {
          title
          thumbnailImg
          thumbnailHoverImg
        }
      }
    }
  }
}
</page-query>


<script scoped>
import BackgroundMusic from '../../components/BackgroundMusic.vue'
import CollectionThumbnail from '../../components/CollectionThumbnail.vue'
import BackToTop from '../../components/BackToTop.vue'
import SlideshowKenBurnsSmall from '../../components/SlideshowKenBurnsSmall.vue'

export default {
  metaInfo() {
    return {
      title: this.$page.Collections.edges[0].node.pageTitle
    }
  },

  components: {
    BackgroundMusic,
    CollectionThumbnail,
    BackToTop,
    SlideshowKenBurnsSmall
  },

  data() {
    return {
      videoIndex: null,
      mainColHeight: 600,
      interval: null,
      playMusic: true
    }
  },

  computed: {
    titleImg() {
      return this.$page.Collections.edges[0].node.titleImg
    },
    slides() {
      return this.$page.Collections.edges[0].node.slides
    },
    slideshowText(){
      return this.$page.Collections.edges[0].node.content
    },
    collections() {
      return this.$page.Collections.edges[0].node.collections
    },
    slideshowHeight() {
      let height = this.mainColHeight + 30
      return height + 'px'
    }
  },

  created() {
    if (this.$route.query.hasOwnProperty('playMusic')) {
      this.playMusic = this.$route.query.playMusic == 'true'
    }
  },

  mounted() {
    this.observeTextBlockHeight()

    setTimeout(clearInterval(this.interval), 8000)
    
    window.addEventListener('resize', () => {
      let textEl = document.getElementById('slideshowText')
      this.mainColHeight = this.getElementOffset(textEl).bottom
    })
  },

  methods: {
    observeTextBlockHeight() {
      this.interval = setInterval(function () {    
        let textEl = document.getElementById('slideshowText')
        this.mainColHeight = this.getElementOffset(textEl).bottom
        console.log('observing, ')
      }.bind(this), 500);
    },
    getElementOffset(el) {
      let top = 0
      // let left = 0
      let bottom = 0
      let element = el
      let height = el.offsetHeight

      // Loop through the DOM tree
      // and add it's parent's offset to get page offset
      do {
        top += element.offsetTop || 0;
        // left += element.offsetLeft || 0;
        element = element.offsetParent
      } while (element)

      bottom = top + height

      return {
        top,
        // left,
        bottom,
      }
    }
  }
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../../assets/fonts/nhaasgrotesktxpro-65md.woff') format('woff'), /* Pretty Modern Browsers */
       url('../../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

* {
  --collectionWidth: 357.8px;
  --collectionScale: 1.0;
  --maxCollectionsPerRow: 7;
  --extraMargin: 6px;
  --collectionsDivWidth: calc(var(--maxCollectionsPerRow) * (var(--collectionScale)*var(--collectionWidth) + var(--extraMargin)));   /* Full width for a 27" screen */
}

.layout {
  padding: 0;
}

.row {
  margin-bottom: 20px;
}

.main-col {
  max-width: 1458px;
  min-height: 600px;
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
  top: 0;
  z-index: 100;
}

.mainContent{
  bottom: 0;
  width: 100%;
  padding-bottom: 20px;
  padding-top: 85px;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
  z-index: 500;
}

#titleImg {
  width: 100%;
  max-width: 650px;
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
  line-height: 1.75rem;
  letter-spacing: 2px;
  text-align: justify;
  text-shadow: 0px 0px 250px #1C0F07,0px 0px 250px #1C0F07/* glow */, 1px 1px 2px rgba(28,16,23,0.89)/* drop shadow*/;
}

.collectionsContainer {
  margin-bottom: 88px;
}

.collectionsContainer,
.collectionsRow {
  padding: 0;
  max-width: var(--collectionsDivWidth);
}

.collectionsCols {
  max-width: calc(var(--collectionsDivWidth) / var(--maxCollectionsPerRow));
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media only screen and (max-width: 575.98px) {
  * {
    --collectionScale: 0.65;
    --maxCollectionsPerRow: 1;
  }
  .layout, .main-col {
    padding: 0 0;
  }
  .mainContent {
    padding-left: 15%;
    padding-right: 15%;
  }
  #slideshowText {
    font-size: calc(1rem + 2 * (100vw - 375px) / (576 - 375) ); /* varies between 16px (1rem) and 18px */
    line-height: calc(1.0625rem + 3 * (100vw - 375px) / (576 - 375) ); /* varies between 17px (1.0625rem) and 20px */
    margin-bottom: 0px;
  }
  #slideshowText > p {
    margin-bottom: 0px !important;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media only screen and (min-width: 576px) and (max-width: 767.98px) {
  * {
    --collectionScale: 0.55934;
    --maxCollectionsPerRow: 2;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
  #slideshowText {
    font-size: calc(1.125rem + 1.2 * (100vw - 576px) / (768 - 576) ); /* varies between 18px (1.125rem) and 19.2px */
    line-height: 24px;
  }
  #slideshowText p {
    margin-bottom: 0px !important;
  }
}

/* Medium devices (tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991.98px) {
  * {
    --collectionScale: 0.7;
    --maxCollectionsPerRow: 2;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
  #slideshowText {
    font-size: calc(1.2rem + 1.8 * (100vw - 768px) / (992 - 768) ); /* varies between 19.2px (1.2rem) and 21px */
    line-height: 24px;
  }
}

/* Large devices (desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199.98px) {
  * {
    --collectionScale: 0.7;
    --maxCollectionsPerRow: 3;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
  #slideshowText {
    font-size: 1.3125rem;
    line-height: 1.65rem;
  }
}


/* Special breakpoint */
@media only screen and (min-width: 1200px) and (max-width: 1499.98px) {
  * {
    --collectionScale: 0.9;
    --maxCollectionsPerRow: 3;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
}


/* Special breakpoint */
@media only screen and (min-width: 1500px) and (max-width: 1749.98px) {
  .mainContent {
    padding-left: 10%;
    padding-right: 10%;
  }
}

/* Special breakpoint */
@media only screen and (min-width: 1500px) and (max-width: 2539.98px) {
  * {
    --maxCollectionsPerRow: 4;
  }
}

</style>
