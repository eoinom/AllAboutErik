<template>
  <Layout> 
    <header id="header" :style="headerStyle">
      <g-image :src="titleImg" id="titleImg" class="my-4" />
    </header>

    <b-container fluid id="mainContainer" class="pb-5 pb-xl-3 px-1">

      <!-- VIDEOS -->
      <b-row no-gutters align-h="center" id="videos" class="mt-2 mt-sm-3">
        <b-col cols="6" sm="4" xl="3" 
          align-self="center" 
          v-for="(video, index) in videos" 
          :key="video.title" 
          @click="videoIndex = index" 
          class="mb-2 px-2 mb-sm-3 px-sm-3" >
          
          <video-thumbnail-short-films :video="video" />

        </b-col>
      </b-row>

    </b-container>


    <!-- <BackgroundMusic
      :audioFile="$page.TheEpisodes.edges[0].node.bgAudio"
      :audioDuration="$page.TheEpisodes.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.TheEpisodes.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.TheEpisodes.edges[0].node.bgAudioFadeOutDuration"
    /> -->
    
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
  ShortFilms: allShortFilms {
    edges {
      node {
        id
        pageTitle
        headerBgImg
        titleImg
        mainVideoUrl
        videos {
          title
          subText
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
import VideoThumbnailShortFilms from '../components/VideoThumbnailShortFilms.vue'
import ScrollToTop from '../components/ScrollToTop.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.ShortFilms.edges[0].node.pageTitle
    }
  },

  data() {
    return {
      videoIndex: null
    }
  },

  computed: {
    headerBgImg() {
      return this.$page.ShortFilms.edges[0].node.headerBgImg
    },
    titleImg() {
      return this.$page.ShortFilms.edges[0].node.titleImg
    },    
    // mainVideo(){
    //   return this.$page.ShortFilms.edges[0].node.mainVideoUrl
    // },
    videos() {
      return this.$page.ShortFilms.edges[0].node.videos
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
    VideoThumbnailShortFilms,
    ScrollToTop
  },
}
</script>



<style scoped>

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
  max-width: 1396px;
  padding: 0;
  text-align: center;
}

/* #mainVideo {
  max-width: 100%;
} */


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
