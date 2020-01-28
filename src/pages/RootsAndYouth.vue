<template>
  <Layout> 
    <b-container fluid class="main-col">

      <!-- HEADER SLIDESHOW -->
      <b-row no-gutters style="max-height:1224px; width:auto;" class="mb-1 px-1">
        <b-col class="slideshowCol">
          
          <slideshow-images :slides="slides" />
          
          <b-container fluid class="slideshowOverlay">
            <b-row>
              <b-col class="mainContent">
                
                <g-image alt="Roots and Youth title image" v-if="titleImg != null" :src="titleImg" id="titleImg" class="mb-md-1 mb-lg-2 mb-xl-3"/>
                
                <span v-html="mainText" id="mainText" />    

                <!-- Scroll with arrow images - hidden on xs (e.g. portrait mobile devices) -->
                <ScrollDownArrow
                  scrollToElement="#videos"
                  class="d-none d-sm-inline"
                />

              </b-col>
            </b-row>
          </b-container>

        </b-col>
      </b-row>

      <!-- VIDEOS -->
      <b-row no-gutters id="videos" class="mb-1">
        <b-col cols="12" lg="6" 
          v-for="(video, index) in videos" 
          :key="video.title" @click="videoIndex = index" 
          class="my-1 px-1" >

          <video-thumbnail-roots :video="video" />

        </b-col>
      </b-row>

      <!-- COMPLETE FILM -->
      <b-row v-if="fullVideo != null" no-gutters class="mb-0 px-1">
        <b-col>
          <b-row id="completeFilmContainer" class="mx-0 mb-2">
            <b-col class="completeFilmContent" @click="videoIndex = allVideos.length-1">
              <b-row align-v="center" align-h="center" class="mb-0 py-4">

                <b-col cols="auto" id="completeFilmPlayIconCol" style="text-align:right" class="pr-1">
                  <g-image alt="Play symbol" src="~/assets/images/playarrowcircle-black.png" id="fullVideoPlayImg"/>
                  <g-image alt="Play symbol" src="~/assets/images/playarrowcircle-hover.png" id="fullVideoPlayImg-hover"/>
                </b-col>

                <b-col cols="auto" id="completeFilmIconTextCol" style="text-align:left" class="pl-1">
                  <p class="playFilmText mb-0">
                    PLAY FILM
                  </p>
                  <p v-if="fullVideo.duration != null" class="fullVideoDurationText mb-2">
                    {{ durationInMinsText(fullVideo.duration) }} 
                  </p>
                </b-col>

                <b-col cols="auto">
                  <p id="completeFilmSubText" class="mb-0 mt-1">{{ fullVideo.text }} </p>  
                </b-col>
                
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>   
   

    <BackgroundMusic
      :audioFile="$page.RootsAndYouth.edges[0].node.bgAudio"
      :audioDuration="$page.RootsAndYouth.edges[0].node.bgAudioDuration"
      :audioFadeInDuration="$page.RootsAndYouth.edges[0].node.bgAudioFadeInDuration"
      :audioFadeOutDuration="$page.RootsAndYouth.edges[0].node.bgAudioFadeOutDuration"
    />
    
    <VideoLightBox
      :videos="allVideos"
      :index="videoIndex"
      :disable-scroll="true"
      @close="videoIndex = null"
    />

  </Layout>
</template>

<page-query>
{
  RootsAndYouth: allRootsAndYouth {
    edges {
      node {
        id
        pageTitle
        headingImg
        content
        bgAudio
        bgAudioDuration
        bgAudioFadeInDuration
        bgAudioFadeOutDuration
        slides {
          orderNo
          img
        }
        slideDuration
        videos {
          title
          subText
          url
          thumbnailImg
          orderNo
          duration
        }
        fullVideo {
          title
          text
          url
          duration
        }
      }
    }
  }	
}
</page-query>


<script scoped>
import BackgroundMusic from '../components/BackgroundMusic.vue'
import ScrollDownArrow from '../components/ScrollDownArrow.vue'
import SlideshowImages from '../components/SlideshowImages2.vue'
import VideoLightBox from '../components/VideoLightBox.vue'
import VideoThumbnailRoots from '../components/VideoThumbnailRoots.vue'

export default { 
  metaInfo() {
    return {
      title: this.$page.RootsAndYouth.edges[0].node.pageTitle
    }
  },

  data() {
    return {
      videoIndex: null
    }
  },

  computed: {
    titleImg() {
      return this.$page.RootsAndYouth.edges[0].node.headingImg
    },
    slides() {
      return this.$page.RootsAndYouth.edges[0].node.slides
    },  
    mainText(){
      return this.$page.RootsAndYouth.edges[0].node.content
    },
    videos() {
      return this.$page.RootsAndYouth.edges[0].node.videos
    },
    fullVideo() {
      return this.$page.RootsAndYouth.edges[0].node.fullVideo
    },
    allVideos() {
      const allVids = [...this.videos];
      allVids.push(this.fullVideo)
      return allVids
    },
    images() {    
      return this.slides.map(a => a.img)
    }
  },

  methods: {
    durationInMinsText(secs) {
      let mins = Math.floor(secs / 60)
      if (mins >= 60) {
        let hrs = Math.floor(mins / 60)
        mins = mins - (hrs * 60)
        if (mins < 10)
          mins = '0' + mins
        if (hrs == 1)
          return '1 hr ' + mins + ' min'
        else
          return hrs + ' hrs ' + mins + ' min'
      }
      else {
        secs = secs - (mins * 60)
        if (secs < 10)
          secs = '0' + secs
        return mins + ':' + secs + ' min'
      }
    }
  },

  components: {
    'slideshow-images': require('../components/SlideshowImages2.vue').default,
    ScrollDownArrow,
    BackgroundMusic,
    VideoLightBox,
    VideoThumbnailRoots
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
  padding: 0 6%;   
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
  padding-left: 19%;
  padding-right: 19%;
  text-align: center;
  z-index: 500;
}

#titleImg {
  width: 100%;
  max-width: 1492px;
  height: auto;
  margin: auto;
}

#mainText {
  color: #FFFFFF;  
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-size: 1.85rem;
  font-weight: 500;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.65);
  line-height: 43px;
  letter-spacing: 2px;    
}



#completeFilmContainer {
  background-color: #FFFFFF;
  text-align: center;
}

.completeFilmContent:hover {
  color:	#EED047;
  cursor: pointer;
}
.completeFilmContent #fullVideoPlayImg-hover {
  display: none;
}
.completeFilmContent:hover #fullVideoPlayImg-hover {
  display: inline;
  cursor: pointer;
}
.completeFilmContent:hover #fullVideoPlayImg {
  display: none;
}

.playFilmText {
  font-family: 'NeueHaasGroteskText Pro55';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.125rem;   /* 18px at 16px default size */
  text-transform: uppercase;
  letter-spacing: 5px;
}

.fullVideoDurationText {
  font-family: 'Lora', serif;
  font-weight: 700;
  font-size: 0.875rem;   /* 14px at 16px default size */
  margin-top: -2px;
}

#completeFilmSubText {
  font-family: 'NeueHaasGroteskText Pro65';
  font-feature-settings: 'liga';
  font-weight: 500;
  font-size: 1.4375rem;   /* 23px at 16px default size */
  letter-spacing: 1px;
  text-align: justify;
  line-height: 35px;
  max-width: 420px;
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
  #mainText {
    font-size: 0.9rem;
    line-height: 14px;
    margin-bottom: 0px;
  }
  #mainText > p {
    margin-bottom: 0px !important;
  }
  #completeFilmSubText {
    font-size: 1.2rem;
    text-align: center;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
  #mainText {
    font-size: 0.9rem;
    line-height: 14px;
  }
  #mainText p {
    margin-bottom: 0px !important;
  }
  #completeFilmSubText {
    font-size: 1.32rem;
    text-align: center;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #mainText {
    font-size: 1.2rem;
    line-height: 24px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) { 
  #mainText {
    font-size: 1.5rem;
    line-height: 33px;
  }
}

</style>
