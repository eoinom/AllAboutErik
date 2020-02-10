<template>
  <Layout> 
    <b-container fluid class="main-col">

      <!-- HEADER SLIDESHOW -->
      <!-- <b-row no-gutters style="max-height:833px; width:auto;" class="mb-1 px-1"> -->
      <b-row no-gutters class="mb-1 px-1">
        <b-col class="slideshowCol">
          
          <slideshow-images :slides="slides" />
          
          <b-container fluid class="slideshowOverlay">
            <b-row>
              <b-col class="mainContent">
                
                <g-image alt="Collections title image" v-if="titleImg != null" :src="titleImg" id="titleImg" class="mb-md-1 mb-lg-2 mb-xl-3"/>
                
                <p v-html="slideshowText" id="slideshowText" />    

                <!-- Scroll with arrow images - hidden on xs (e.g. portrait mobile devices) -->
                <!-- <ScrollDownArrow
                  scrollToElement="#videos"
                  class="d-none d-sm-inline"
                /> -->

              </b-col>
            </b-row>
          </b-container>

        </b-col>
      </b-row>
    </b-container>   
   

    <!-- <BackgroundMusic
      :audioFile="$page.RootsAndYouth.edges[0].node.bgAudio"
      :audioDuration="$page.RootsAndYouth.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.RootsAndYouth.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.RootsAndYouth.edges[0].node.bgAudioFadeOutDuration"
    /> -->

  </Layout>
</template>

<page-query>
{
  Collections: allCollectionsPage {
    edges {
      node {
        id
        pageTitle
        titleImg        
        slideshowText
        slides {
          orderNo
          img
          opacity
        }
        collections {
          title
          thumbnailImg
          thumbnailHoverImg
          link
        }
      }
    }
  }	
}
</page-query>


<script scoped>
// import BackgroundMusic from '../components/BackgroundMusic.vue'
import ScrollDownArrow from '../components/ScrollDownArrow.vue'
import SlideshowImages from '../components/SlideshowImages2.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.Collections.edges[0].node.pageTitle
    }
  },

  data() {
    return {
      videoIndex: null
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
      return this.$page.Collections.edges[0].node.slideshowText
    },
    // slide_images() {    
    //   return this.slides.map(a => a.img)
    // },
    collections() {
      return this.$page.Collections.edges[0].node.collections
    },  
  },

  methods: {
  },

  components: {
    'slideshow-images': require('../components/SlideshowImages2.vue').default,
    ScrollDownArrow,
    // BackgroundMusic,
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

.layout {
  background-color: #dddddd
}

.row {
  margin-bottom: 20px;
}

.main-col {
  /* padding: 0 6%; */
  max-width: 1458px;
}

.slideshowCol {
  position: relative;
  max-height:1224px; 
  width:auto;
  text-align: center;
}

.slideshowOverlay {
  z-index: 100;
  height: 100%;
  top: 0;
  position: absolute;
}

.slideshowOverlay .mainContent{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 2%;
  padding-left: 5%;
  padding-right: 5%;
  text-align: center;
  z-index: 500;
}

#titleImg {
  width: 100%;
  max-width: 755px;
  /* max-height: 100%; */
  height: auto;
  margin: auto;
}

#slideshowText {
  color: #FFFFFF;  
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 2.0625rem;
  letter-spacing: 2px;  
  text-align: justify;
  /* text-shadow: 2px 2px 5px rgba(0,0,0,0.65); */
  text-shadow: 0px 0px 250px #1C0F07,0px 0px 250px #1C0F07/* glow */, 1px 1px 2px rgba(28,16,23,0.89)/* drop shadow*/;
  /* width: 90%; */
}




/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .layout, .main-col {
    padding: 0 0;   
  }
  .slideshowOverlay .mainContent {
    /* padding-bottom: 0.5%; */
    padding-left: 15%;
    padding-right: 15%;
  }
  #slideshowText {
    font-size: 0.9rem;
    line-height: 14px;
    margin-bottom: 0px;
  }
  #mainText > p {
    margin-bottom: 0px !important;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  #mainText {
    font-size: 0.9rem;
    line-height: 14px;
  }
  #slideshowText p {
    margin-bottom: 0px !important;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #slideshowText {
    font-size: 1.2rem;
    line-height: 24px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  #slideshowText {
    font-size: 1.5rem;
    line-height: 33px;
  }
}

</style>
