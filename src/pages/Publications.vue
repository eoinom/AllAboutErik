<template>
  <Layout>

    <BackgroundMusic
      :audioFile="$page.Publications.edges[0].node.bgAudio"
      :audioDuration="$page.Publications.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.Publications.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.Publications.edges[0].node.bgAudioFadeOutDuration"
    />

    <b-container fluid class="main-col">
      <b-row no-gutters class="mb-1 mt-4 px-1">
        <b-col class="slideshowCol">

          <!-- HEADER SLIDESHOW -->
          <SlideshowKenBurnsSmall :slides="slides" height="420px" />

          <!-- SLIDESHOW OVERLAY -->
          <div class="slideshowOverlay">
            <div class="mainContent">
              <g-image alt="Publications title image" v-if="titleImg != null" :src="titleImg" id="titleImg" class="mb-md-1 mb-lg-2 mb-xl-3"/>
            </div>
          </div>

        </b-col>
      </b-row>
    </b-container>


    <b-container fluid class="publicationsContainer">
      <b-row no-gutters align-h="center" class="publicationsRow mb-1">
        <b-col
          v-for="(publication, index) in publications"
          :key="index"
          cols=""
          align-self="center"
          class="publicationsCols p-0 mx-0 my-2"
        >
          <CollectionThumbnail :collection="publication" />          
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
  Publications: allPublicationsIndex {
    edges {
      node {
        id
        pageTitle
        titleImg
        bgAudio
        bgAudioDuration
        bgAudioFadeInDuration
        bgAudioFadeOutDuration
        slides {
          img
          opacity
          panStart
          scaleFrom
          scaleTo
        }
        publications {
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
import BackgroundMusic from '../components/BackgroundMusic.vue'
import CollectionThumbnail from '../components/CollectionThumbnail.vue'
import ScrollToTop from '../components/ScrollToTop.vue'
import SlideshowKenBurnsSmall from '../components/SlideshowKenBurnsSmall.vue'

export default {
  metaInfo() {
    return {
      title: this.$page.Publications.edges[0].node.pageTitle
    }
  },

  components: {
    BackgroundMusic,
    CollectionThumbnail,
    ScrollToTop,
    SlideshowKenBurnsSmall
  },

  data() {
    return {
    }
  },

  computed: {
    titleImg() {
      return this.$page.Publications.edges[0].node.titleImg
    },
    slides() {
      return this.$page.Publications.edges[0].node.slides
    },
    publications() {
      return this.$page.Publications.edges[0].node.publications
    }
  },

  methods: {
  },

  mounted() {
  },
}
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lora:700i&display=swap');

@font-face {
  font-family: NeueHaasGroteskText Pro55;
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-55rg.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-55rg.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

@font-face {
  font-family: NeueHaasGroteskText Pro65;
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot'); /* IE9 Compat Modes */
  src: url('../assets/fonts/nhaasgrotesktxpro-65md.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('../assets/fonts/nhaasgrotesktxpro-65md.woff') format('woff'), /* Pretty Modern Browsers */
       url('../assets/fonts/nhaasgrotesktxpro-65md.svg#NHaasGroteskTXPro-55Rg') format('svg'); /* Legacy iOS */
  font-weight: normal;
}

* {
  --publicationWidth: 357.8px;
  --publicationScale: 1.0;
  --maxPublicationsPerRow: 7;
  --extraMargin: 6px;
  --publicationsDivWidth: calc(var(--maxPublicationsPerRow) * (var(--publicationScale)*var(--publicationWidth) + var(--extraMargin)));   /* Full width for a 27" screen */
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
  width: 100%;
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
  max-width: 755px;
  min-width: 250px;
  height: auto;
  margin: auto;
  padding-bottom: 15px;
}

.publicationsContainer,
.publicationsRow {
  padding: 0;
  max-width: var(--publicationsDivWidth);
}

.publicationsCols {
  max-width: calc(var(--publicationsDivWidth) / var(--maxPublicationsPerRow));
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  * {
    --publicationScale: 0.65;
    --maxPublicationsPerRow: 1;
  }
  .layout, .main-col {
    padding: 0 0;
  }
  .mainContent {
    padding-left: 15%;
    padding-right: 15%;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  * {
    --publicationScale: 0.55934;
    --maxPublicationsPerRow: 2;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  * {
    --publicationScale: 0.7;
    --maxPublicationsPerRow: 2;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  * {
    --publicationScale: 0.7;
    --maxPublicationsPerRow: 3;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
}


/* Special breakpoint */
@media (min-width: 1200px) and (max-width: 1499.98px) {
  * {
    --publicationScale: 0.9;
    --maxPublicationsPerRow: 3;
  }
  .mainContent {
    padding-left: 12%;
    padding-right: 12%;
  }
}


/* Special breakpoint */
@media (min-width: 1500px) and (max-width: 1749.98px) {
  .mainContent {
    padding-left: 10%;
    padding-right: 10%;
  }
}

/* Special breakpoint */
@media (min-width: 1500px) and (max-width: 2539.98px) {
  * {
    --maxPublicationsPerRow: 4;
  }
}

</style>
