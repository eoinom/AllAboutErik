<template>
  <Layout>  

    <BackgroundMusic
      :audioFile="$page.Collections.edges[0].node.bgAudio"
      :audioDuration="$page.Collections.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.Collections.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.Collections.edges[0].node.bgAudioFadeOutDuration"
    />

    <b-container fluid class="main-col">

      <!-- HEADER SLIDESHOW -->
      <!-- <b-row no-gutters style="max-height:833px; width:auto;" class="mb-1 px-1"> -->
      <b-row no-gutters class="mb-1 px-1">
        <b-col class="slideshowCol">

          <!-- <div class="slideshow"> -->
            <slideshow-kenburns-small :slides="slides" />
          <!-- </div> -->
          
          <b-container fluid class="slideshowOverlay">
            <b-row>
              <b-col class="mainContent">
                
                <g-image alt="Collections title image" v-if="titleImg != null" :src="titleImg" id="titleImg" class="mb-md-1 mb-lg-2 mb-xl-3"/>
                
                <div v-html="slideshowText" id="slideshowText" />    

              </b-col>
            </b-row>
          </b-container>

        </b-col>
      </b-row>
    </b-container>


    <b-container fluid class="collections">
      <b-row no-gutters align-h="center" class="mb-1"> 

        <div v-for="(collection, index) in collections" :key="index" style="max-width:80%">
          <b-col class="p-0 mx-0 mx-sm-1 mx-md-2 mx-xl-1 my-2" >
            <collection-thumbnail :collection="collection" />
          </b-col>
        </div>

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
  Collections: allCollectionsPage {
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
import BackgroundMusic from '../components/BackgroundMusic.vue'
import CollectionThumbnail from '../components/CollectionThumbnail.vue'
import ScrollToTop from '../components/ScrollToTop.vue'
import SlideshowImages from '../components/SlideshowImages2.vue'
import SlideshowKenBurnsSmall from '../components/SlideshowKenBurnsSmall.vue'

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
      return this.$page.Collections.edges[0].node.content
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
    'slideshow-kenburns-small': require('../components/SlideshowKenBurnsSmall.vue').default,
    BackgroundMusic,
    CollectionThumbnail,
    ScrollToTop
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
  padding: 0;
}

.row {
  margin-bottom: 20px;
}

.main-col {
  /* padding: 0 6%; */
  max-width: 1458px;
  height: 670px;
}

.slideshowCol {
  position: relative;
  max-height: 1224px; 
  width: auto;
  text-align: center;
}

/* .slideshow {
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
} */

.slideshowOverlay {
  z-index: 100;
  height: 100%;
  top: 0;
  position: absolute;
}

.slideshowOverlay .mainContent{
  /* position: absolute; */
  bottom: 0;
  width: 100%;
  /* padding-bottom: 2%; */
  margin-bottom: -55px;
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

.collections {
  padding: 0;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  .layout, .main-col {
    padding: 0 0;   
  }
  .main-col {
    margin-bottom: 100px;
  }
  .slideshowOverlay .mainContent {
    /* padding-bottom: 0.5%; */
    padding-left: 15%;
    padding-right: 15%;
  }
  /* #titleImg {
    width: 100%;
    min-width: 100%;
  } */
  #slideshowText {
    /* font-size: 0.9rem;
    line-height: 14px; */
    font-size: calc(1rem + 2 * (100vw - 375px) / (576 - 375) ); /* varies between 16px (1rem) and 18px */
    line-height: calc(1.0625rem + 3 * (100vw - 375px) / (576 - 375) ); /* varies between 17px (1.0625rem) and 20px */
    margin-bottom: 0px;
  }
  #slideshowText > p {
    margin-bottom: 0px !important;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .main-col {
    margin-bottom: 30px;
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
@media (min-width: 768px) and (max-width: 991.98px) {
  .main-col {
    margin-bottom: 30px;
  }
  #slideshowText {
    font-size: calc(1.2rem + 1.8 * (100vw - 768px) / (992 - 768) ); /* varies between 19.2px (1.2rem) and 21px */
    line-height: 24px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {  
  .main-col {
    margin-bottom: 30px;
  }
  #slideshowText {
    font-size: 1.3125rem;
    line-height: 33px;
  }
}


/* Special breakpoint */
@media (min-width: 1500px) and (max-width: 2539.98px) {  
  .collections {
    max-width: 1500px;
  }
}

</style>
