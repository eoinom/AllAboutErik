<template>
  <Layout> 

    <BackgroundMusic
      :audioFile="$page.Travels.edges[0].node.bgAudio"
      :audioDuration="$page.Travels.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.Travels.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.Travels.edges[0].node.bgAudioFadeOutDuration"
    />

    <header id="header" :style="headerStyle">
      <g-image :src="titleImg" id="titleImg" class="my-4" />
    </header>

    <b-container fluid id="mainContainer" class="pb-5 px-1">

      <!-- MAIN VIDEO -->
      <b-row no-gutters align-h="center" align-v="center" id="mainVideoContainer" class="my-2 my-sm-3 px-2 px-sm-3">
        <b-col cols="12" align-self="center" style="max-width: 960px">          
          <iframe 
            :src="mainVideoUrl + '?autoplay=1&loop=1&mute=1&color=505050'" 
            width="960" height="540" 
            frameborder="0"
            id="mainVideo" />
          <span v-html="mainVideoText" id="mainVideoText" class="" />
        </b-col>
      </b-row>

      <!-- VIDEOS -->
      <b-row no-gutters align-h="center" id="videos">
        <b-col cols="12" sm="6" lg="4" xl="3"
          v-for="(video, index) in videos" 
          :key="video.title" 
          @click="videoIndex = index" 
          class="mb-2 mb-sm-3 px-2 px-sm-1" >
          
          <video-thumbnail-travels :video="video" />

        </b-col>
      </b-row>

    </b-container>


    <VideoLightBox
      :videos="videos"
      :index="videoIndex"
      :disable-scroll="true"
      @close="videoIndex = null"
    />

    <ScrollToTop 
      text="BACK TO THE TOP"
      :includeArrow="true"
    />

  </Layout>
</template>

<page-query>
{
  Travels: allTravels {
    edges {
      node {
        id
        pageTitle
        headerBgImg
        titleImg
        mainVideoUrl
        mainVideoText
        bgAudio
        bgAudioDuration
        bgAudioFadeInDuration
        bgAudioFadeOutDuration
        videos {
          title
          url
          thumbnailImg
          duration
        }
      }
    }
  }	
}
</page-query>


<script scoped>
import BackgroundMusic from '../components/BackgroundMusic.vue'
import VideoLightBox from '../components/VideoLightBox.vue'
import VideoThumbnailTravels from '../components/VideoThumbnailTravels.vue'
import ScrollToTop from '../components/ScrollToTop.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.Travels.edges[0].node.pageTitle
    }
  },

  data() {
    return {
      videoIndex: null
    }
  },

  computed: {
    headerBgImg() {
      return this.$page.Travels.edges[0].node.headerBgImg
    },
    titleImg() {
      return this.$page.Travels.edges[0].node.titleImg
    },
    mainVideoUrl(){
      return this.$page.Travels.edges[0].node.mainVideoUrl
    },
    mainVideoText(){
      return this.$page.Travels.edges[0].node.mainVideoText
    },
    videos() {
      return this.$page.Travels.edges[0].node.videos
    },
    headerStyle() {
      return {
        '--headerBgImg': 'url(' + this.headerBgImg + ')'
      }
    },
  },

  methods: {
  },

  mounted() {
  },

  components: {
    BackgroundMusic,
    VideoLightBox,
    VideoThumbnailTravels,
    ScrollToTop
  },
}
</script>



<style scoped>

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

#header {
  background-image: var(--headerBgImg);
  background-position: center;
  background-color: rgba(0, 0, 0, 0.32);
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
}

#titleImg {
  max-width: 70%;
}

#mainContainer {
  width: 100%;
  max-width: 2178px;
  padding: 0;
  text-align: center;
}

#mainVideo {
  max-width: 100%;
  --containerWidth: calc(100vw - 32px);
  max-height: calc(0.5625*var(--containerWidth));
}

#mainVideoText {
  color: white;
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.4375rem;
  letter-spacing: 1px;
  text-align: center;
  text-shadow: 0px 0px 7px rgba(0,0,0,0.5),0px 0px 7px rgba(0,0,0,0.5);
  line-height: 2.1875rem;
  position: absolute;
  bottom: 70px;
  left: 0;
  right: 0;
  padding: 0 120px;
}


/* Responsive breakpoints ref: https://getbootstrap.com/docs/4.3/layout/overview/ */

@media (max-width: 400px) {
  #titleImg {
    max-width: 60%;
  }
}
@media (min-width: 400.01px) and (max-width: 575.98px) {
  #titleImg {
    max-width: 65%;
  }
}

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {    
  #mainVideo {
    --containerWidth: calc(100vw - 16px);
  }
  #mainVideoText {
    font-size: 1.125rem;
    line-height: 1.71875rem;
    bottom: 20px;
    padding: 0 10px;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  #mainVideoText {
    font-size: 1.3125rem;
    line-height: 2rem;
    bottom: 40px;
    padding: 0 100px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #mainVideoText {
    font-size: 1.4rem;
    line-height: 2.125rem;
    bottom: 50px;
    padding: 0 106px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  #mainVideoText {
    font-size: 1.4rem;
    line-height: 2.125rem;
    bottom: 60px;
    padding: 0 113px;
  }
}

@media (min-width: 977px) { 
  #mainVideoContainer {
    margin: 8px 0;
  }
}

</style>
